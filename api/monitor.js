
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
  });
}

module.exports = async function handler(req, res) {
  if (req.headers['x-vercel-cron'] !== '1') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const now = new Date();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);

    const { data: users } = await supabase.from('users').select('email, created_at');
    const { data: payments } = await supabase.from('payments').select('amount, created_at');

    const newToday = (users || []).filter(u => new Date(u.created_at) > yesterday);
    const revenue = (payments || []).reduce(function(s, p) { return s + p.amount / 100; }, 0);
    const paidToday = (payments || []).filter(p => new Date(p.created_at) > yesterday);

    var msg = '📊 LEGALIAI Daily\n\n';
    msg += 'Users: ' + (users || []).length + ' total\n';
    msg += 'Revenue: $' + revenue.toFixed(0) + ' total\n';
    msg += 'New today: ' + newToday.length + '\n';
    msg += 'Paid today: $' + paidToday.reduce(function(s,p){return s+p.amount/100;},0).toFixed(0) + '\n';

    if (newToday.length > 0) {
      msg += '\nNEW USERS:\n';
      newToday.forEach(function(u) { msg += '- ' + u.email + '\n'; });
    }

    await sendTelegram(msg);
    return res.status(200).json({ success: true });

  } catch (err) {
    await sendTelegram('Monitor error: ' + err.message);
    return res.status(500).json({ error: err.message });
  }
};
