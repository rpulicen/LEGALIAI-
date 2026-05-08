// api/autopush.js
// Allows Claude to push files directly to GitHub + auto-deploy via Vercel
// Called by Claude with: POST /api/autopush
// Body: { files: [{path, content}], message, secret }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { files, message, secret } = req.body;

  // Security check
  if (secret !== process.env.AUTOPUSH_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = 'rpulicen/LEGALIAI-';
  const BRANCH = 'main';

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not set' });
  }

  try {
    const results = [];

    for (const file of files) {
      const { path: filePath, content } = file;

      // Get current file SHA (needed for updates)
      let sha;
      try {
        const getRes = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${filePath}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        if (getRes.ok) {
          const data = await getRes.json();
          sha = data.sha;
        }
      } catch (e) {
        // File doesn't exist yet — that's fine
      }

      // Push the file
      const pushRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message || `auto: update ${filePath}`,
            content: Buffer.from(content).toString('base64'),
            branch: BRANCH,
            ...(sha ? { sha } : {}),
          }),
        }
      );

      const pushData = await pushRes.json();
      results.push({
        file: filePath,
        status: pushRes.ok ? 'pushed' : 'failed',
        sha: pushData.content?.sha,
      });
    }

    // Send Telegram notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const successCount = results.filter(r => r.status === 'pushed').length;
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `🤖 *Claude Auto-Push*\n\n✅ ${successCount}/${files.length} files pushed\n📝 ${message}\n\n_Vercel deploying now..._`,
            parse_mode: 'Markdown',
          }),
        }
      );
    }

    return res.status(200).json({ success: true, results, message });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
