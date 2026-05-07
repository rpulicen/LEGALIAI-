// api/monitor.js
// Vercel Cron Job — runs daily at 8am ET
// Sends automated status report to rod.puliceno@gmail.com
// Schedule configured in vercel.json: "0 12 * * *" (8am ET = 12pm UTC)

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  // Security: only allow cron or manual trigger with secret
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

    // --- PULL ALL DATA ---

    // Total users + new today
    const { data: allUsers } = await supabase
      .from('users')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    const newUsersToday = allUsers?.filter(u =>
      new Date(u.created_at) > yesterday
    ) || [];

    const newUsers7d = allUsers?.filter(u =>
      new Date(u.created_at) > last7days
    ) || [];

    // Payments
    const { data: allPayments } = await supabase
      .from('payments')
      .select('amount, created_at, user_id')
      .order('created_at', { ascending: false });

    const totalRevenue = allPayments?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;
    const newPaymentsToday = allPayments?.filter(p =>
      new Date(p.created_at) > yesterday
    ) || [];
    const revenueToday = newPaymentsToday.reduce((sum, p) => sum + (p.amount / 100), 0);

    // App usage — who completed modules
    const { data: progressData } = await supabase
      .from('progress')
      .select('user_id, status, updated_at')
      .eq('status', 'COMPLETE')
      .order('updated_at', { ascending: false });

    const completedToday = progressData?.filter(p =>
      new Date(p.updated_at) > yesterday
    ) || [];

    // Paid but never used app
    const paidUserIds = new Set(allPayments?.map(p => p.user_id) || []);
    const activeUserIds = new Set(progressData?.map(p => p.user_id) || []);
    const paidButInactive = [...paidUserIds].filter(id => !activeUserIds.has(id));

    // --- BUILD EMAIL ---

    const statusEmoji = newUsersToday.length > 0 ? '🚨' : newUsers7d.length > 0 ? '📈' : '📊';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0a0a0a; color: #F5F5F5; padding: 32px; }
    .card { background: #111; border: 1px solid #222; border-radius: 4px; padding: 20px; margin-bottom: 12px; }
    .label { color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
    .value { color: #C9A84C; font-size: 32px; font-weight: 300; }
    .sub { color: #555; font-size: 12px; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    .alert { background: #0a1a0a; border-left: 3px solid #4ade80; padding: 12px 16px; margin-bottom: 8px; }
    .warn { background: #1a0a0a; border-left: 3px solid #e05555; padding: 12px 16px; margin-bottom: 8px; }
    .user-row { padding: 8px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; color: #888; }
    h2 { color: #C9A84C; font-size: 13px; letter-spacing: 3px; font-weight: 500; margin-bottom: 12px; }
    h1 { color: #F5F5F5; font-size: 18px; font-weight: 300; letter-spacing: 4px; margin-bottom: 4px; }
  </style>
</head>
<body>
  <h1>LEGALIAI — DAILY REPORT</h1>
  <p style="color:#444;font-size:12px;margin-bottom:24px">${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

  <div class="grid">
    <div class="card">
      <div class="label">Total Users</div>
      <div class="value">${allUsers?.length || 0}</div>
      <div class="sub">+${newUsers7d.length} last 7 days</div>
    </div>
    <div class="card">
      <div class="label">Total Revenue</div>
      <div class="value">$${totalRevenue.toFixed(0)}</div>
      <div class="sub">+$${revenueToday.toFixed(0)} today</div>
    </div>
    <div class="card">
      <div class="label">Modules Completed</div>
      <div class="value">${progressData?.length || 0}</div>
      <div class="sub">+${completedToday.length} today</div>
    </div>
  </div>

  ${newUsersToday.length > 0 ? `
  <div class="card">
    <h2>🚨 NEW USERS TODAY</h2>
    ${newUsersToday.map(u => `
      <div class="user-row">
        <strong style="color:#F5F5F5">${u.email}</strong>
        <span style="color:#555;float:right">${new Date(u.created_at).toLocaleTimeString()}</span>
      </div>
    `).join('')}
  </div>
  ` : `<div class="warn"><strong style="color:#e9a8a8">No new users today.</strong> <span style="color:#666">The Brazilian Facebook post would help fix this.</span></div>`}

  ${newPaymentsToday.length > 0 ? `
  <div class="alert"><strong style="color:#4ade80">💰 ${newPaymentsToday.length} payment(s) today — $${revenueToday.toFixed(0)}</strong></div>
  ` : ''}

  ${paidButInactive.length > 0 ? `
  <div class="card">
    <h2>⚠️ PAID BUT NEVER USED APP (${paidButInactive.length})</h2>
    <p style="color:#666;font-size:12px">These users paid but have no progress records. UX dropoff.</p>
    ${paidButInactive.map(id => {
      const user = allUsers?.find(u => u.id === id);
      return `<div class="user-row">${user?.email || id}</div>`;
    }).join('')}
  </div>
  ` : ''}

  <div class="card">
    <h2>RECENT SIGNUPS</h2>
    ${(allUsers?.slice(0, 5) || []).map(u => `
      <div class="user-row">
        <strong style="color:#F5F5F5">${u.email}</strong>
        <span style="color:#555;float:right">${new Date(u.created_at).toLocaleDateString()}</span>
      </div>
    `).join('')}
  </div>

  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1a1a1a">
    <p style="color:#333;font-size:11px;letter-spacing:1px">
      LEGALIAI AUTO-MONITOR — runs daily at 8am ET<br/>
      190 URLs live · legaliai.com
    </p>
  </div>
</body>
</html>`;

    // Send email
    await resend.emails.send({
      from: 'LEGALIAI Monitor <monitor@legaliai.com>',
      to: 'rod.puliceno@gmail.com',
      subject: `${statusEmoji} LEGALIAI Daily — ${allUsers?.length || 0} users · $${totalRevenue.toFixed(0)} revenue · ${now.toLocaleDateString()}`,
      html,
    });

    return res.status(200).json({
      success: true,
      users: allUsers?.length,
      revenue: totalRevenue,
      newToday: newUsersToday.length,
      paidButInactive: paidButInactive.length,
    });

  } catch (error) {
    console.error('Monitor error:', error);
    return res.status(500).json({ error: error.message });
  }
}
