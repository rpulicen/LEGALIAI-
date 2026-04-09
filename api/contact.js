export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LEGALIAI Contact <noreply@legaliai.com>",
        to: ["rod.puliceno@gmail.com"],
        reply_to: email,
        subject: subject || `New message from ${name} — LEGALIAI`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #F5F5F5; padding: 40px; border: 1px solid #1a1a1a;">
            <h1 style="font-family: Georgia, serif; color: #C9A84C; font-size: 24px; letter-spacing: 4px; font-weight: 300; margin-bottom: 32px;">NEW MESSAGE — LEGALIAI</h1>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; letter-spacing: 2px; width: 100px;">FROM</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #F5F5F5;">${name}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; letter-spacing: 2px;">EMAIL</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #C9A84C;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; letter-spacing: 2px;">SUBJECT</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #F5F5F5;">${subject || "General inquiry"}</td></tr>
            </table>
            <div style="margin-top: 32px; padding: 24px; background: #0a0a0a; border: 1px solid #1a1a1a; border-left: 3px solid #C9A84C;">
              <p style="color: #888; font-size: 11px; letter-spacing: 2px; margin-bottom: 12px;">MESSAGE</p>
              <p style="color: #F5F5F5; line-height: 1.8; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #333; font-size: 11px; margin-top: 32px;">Reply directly to this email to respond to ${name}.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Resend error:", err);
      return res.status(500).json({ error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
