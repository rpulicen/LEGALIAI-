// api/monitor.js
// Vercel Cron Job — runs daily at 8am ET
// Sends Telegram message with daily status
// Schedule: "0 12 * * *" (8am ET = 12pm UTC)

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
}

module.exports = async function handler(req, res) {
  // Security: only allow cron or manual trigger
  const authHeader = req.headers.authorization;
  if (
    req.headers['x-vercel-cron'] !== '1' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const now = new Date();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const last7days = new Date(now - 7 * 24 * 60 * 60 * 1000);

    // Pull all data
    const { data: allUsers } = await supabase
      .from('users').select('email, created_at').order('created_at', { ascending: false });

    const { data: allPayments } = await supabase
      .from('payments').select('amount, created_at, user_id').order('created_at', { ascending: false });

    const { data: progressData } = await supabase
      .from('progress').select('user_id, status, updated_at').eq('status', 'COMPLETE');

    const newUsersToday = allUsers?.filter(u => new Date(u.created_at) > yesterday) || [];
    const newUsers7d = allUsers?.filter(u => new Date(u.created_at) > last7days) || [];
    const totalRevenue = allPayments?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;
    const newPaymentsToday = allPayments?.filter(p => new Date(p.created_at) > yesterday) || [];
    const revenueToday = newPaymentsToday.reduce((sum, p) => sum + (p.amount / 100), 0);

    // Paid but inactive
    const paidUserIds = new Set(allPayments?.map(p => p.user_id) || []);
    const activeUserIds = new Set(progressData?.map(p => p.user_id) || []);
    const paidButInactive = [...paidUserIds].filter(id => !activeUserIds.has(id)).length;

    // Build Telegram message
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const hasNewUser = newUsersToday.length > 0;
    const hasPayment = newPaymentsToday.length > 0;

    let msg = `${hasNewUser ? '🚨' : hasPayment ? '💰' : '📊'} *LEGALIAI — ${dateStr}*

`;
    msg += `👤 Users: *${allUsers?.length || 0}* total (+${newUsers7d.length} this week)
`;
    msg += `💵 Revenue: *$${totalRevenue.toFixed(0)}* total (+$${revenueToday.toFixed(0)} today)
`;
    msg += `✅ Modules completed: *${progressData?.length || 0}*

`;

    if (hasNewUser) {
      msg += `🚨 *NEW USER TODAY:*
`;
      newUsersToday.forEach(u => { msg += `• ${u.email}
`; });
      msg += '
';
    } else {
      msg += `😴 No new users today
`;
    }

    if (hasPayment) {
      msg += `💰 *PAYMENT TODAY: $${revenueToday.toFixed(0)}*

`;
    }

    if (paidButInactive > 0) {
      msg += `⚠️ ${paidButInactive} paid user(s) never used the app
`;
    }

    msg += `
_legaliai.com · 190 URLs live_`;

    await sendTelegram(msg);

    return res.status(200).json({
      success: true,
      users: allUsers?.length,
      revenue: totalRevenue,
      newToday: newUsersToday.length,
    });

  } catch (error) {
    console.error('Monitor error:', error);
    await sendTelegram(`❌ LEGALIAI monitor error: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}
