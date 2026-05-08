import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass RLS — this is server-side only
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });
}

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const now = new Date();
    const yesterday = new Date(now - 86400000);
    const { data: users } = await supabase.from('users').select('email, created_at');
    const { data: payments } = await supabase.from('payments').select('amount, created_at');
    const total = (payments || []).reduce((s, p) => s + p.amount / 100, 0);
    const newToday = (users || []).filter(u => new Date(u.created_at) > yesterday);
    const paidToday = (payments || []).filter(p => new Date(p.created_at) > yesterday);
    const revenueToday = paidToday.reduce((s, p) => s + p.amount / 100, 0);
    
    let msg = 'LEGALIAI Daily ' + now.toDateString() + '\n';
    msg += 'Users: ' + (users || []).length + ' total\n';
    msg += 'Revenue: $' + total.toFixed(0) + ' total\n';
    msg += 'New today: ' + newToday.length;
    if (newToday.length > 0) {
      msg += '\nNew: ' + newToday.map(u => u.email).join(', ');
    }
    if (paidToday.length > 0) {
      msg += '\nPaid today: $' + revenueToday.toFixed(0);
    }
    
    await sendTelegram(msg);
    return res.status(200).json({ ok: true, users: (users || []).length });
  } catch (err) {
    await sendTelegram('Monitor error: ' + err.message);
    return res.status(500).json({ error: err.message });
  }
}
