export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, language } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const subjects = {
    en: "You're in — your N-400 preparation is ready",
    es: "Ya tienes acceso — tu preparación N-400 está lista",
    pt: "Você está dentro — sua preparação N-400 está pronta",
    zh: "您已加入 — 您的N-400准备就绪",
    tl: "Nandito ka na — handa na ang iyong paghahanda sa N-400",
    vi: "Bạn đã vào — quá trình chuẩn bị N-400 của bạn đã sẵn sàng",
    hi: "आप अंदर हैं — आपकी N-400 तैयारी तैयार है",
  };

  const intros = {
    en: "Your preparation is unlocked.",
    es: "Tu preparación está desbloqueada.",
    pt: "Sua preparação está desbloqueada.",
    zh: "您的准备课程已解锁。",
    tl: "Naka-unlock na ang iyong paghahanda.",
    vi: "Quá trình chuẩn bị của bạn đã được mở khóa.",
    hi: "आपकी तैयारी अनलॉक हो गई है।",
  };

  const steps = {
    en: ["Complete your Document Checklist — know exactly what to gather", "Walk through your N-400 Form — understand every question", "Get your Risk Assessment — know your risks before USCIS does", "Practice your Interview — 20 civics questions with AI feedback"],
    es: ["Completa tu Lista de Documentos — sabe exactamente qué reunir", "Recorre tu Formulario N-400 — entiende cada pregunta", "Obtén tu Evaluación de Riesgos — conoce tus riesgos antes que USCIS", "Practica tu Entrevista — 20 preguntas cívicas con retroalimentación de IA"],
    pt: ["Complete sua Lista de Documentos — saiba exatamente o que reunir", "Percorra seu Formulário N-400 — entenda cada pergunta", "Obtenha sua Avaliação de Riscos — conheça seus riscos antes do USCIS", "Pratique sua Entrevista — 20 perguntas cívicas com feedback de IA"],
    zh: ["完成您的文件清单 — 准确了解需要收集什么", "浏览您的N-400表格 — 了解每个问题", "获取您的风险评估 — 在USCIS之前了解您的风险", "练习您的面试 — 20道公民测验题，附AI反馈"],
    tl: ["Kumpletuhin ang iyong Listahan ng Dokumento", "Suriin ang iyong N-400 Form", "Makuha ang iyong Risk Assessment", "Magsanay para sa iyong Panayam"],
    vi: ["Hoàn thành Danh sách Tài liệu của bạn", "Xem qua Mẫu N-400 của bạn", "Nhận Đánh giá Rủi ro của bạn", "Luyện tập Phỏng vấn của bạn"],
    hi: ["अपनी दस्तावेज़ चेकलिस्ट पूरी करें", "अपना N-400 फॉर्म देखें", "अपना जोखिम मूल्यांकन प्राप्त करें", "अपने साक्षात्कार का अभ्यास करें"],
  };

  const lang = language || "en";
  const subject = subjects[lang] || subjects.en;
  const intro = intros[lang] || intros.en;
  const stepList = steps[lang] || steps.en;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#000;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #222;max-width:600px;">
        
        <!-- Header -->
        <tr><td style="padding:40px 48px 32px;border-bottom:1px solid #222;">
          <p style="margin:0;font-family:Georgia,serif;font-size:20px;letter-spacing:12px;color:#C9A84C;font-weight:300;">LEGALIAI</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:48px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;color:#C9A84C;">${intro.toUpperCase()}</p>
          <h1 style="margin:0 0 32px;font-family:Georgia,serif;font-size:32px;font-weight:300;letter-spacing:2px;color:#F0F0F0;line-height:1.3;">${subject}</h1>
          
          <p style="margin:0 0 32px;font-size:15px;color:#aaa;line-height:1.9;">
            Your $49 payment was received. Everything is unlocked and waiting for you at 
            <a href="https://legaliai.com" style="color:#C9A84C;">legaliai.com</a>.
          </p>

          <p style="margin:0 0 16px;font-size:11px;letter-spacing:3px;color:#C9A84C;">YOUR 4 STEPS</p>
          
          ${stepList.map((step, i) => `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
            <tr>
              <td width="40" valign="top" style="padding:16px 0 16px 20px;">
                <div style="width:28px;height:28px;background:#C9A84C;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#000;">${i + 1}</div>
              </td>
              <td style="padding:16px 20px;background:#111;border:1px solid #1a1a1a;">
                <p style="margin:0;font-size:14px;color:#ccc;line-height:1.6;">${step}</p>
              </td>
            </tr>
          </table>`).join("")}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
            <tr><td align="center">
              <a href="https://legaliai.com" style="display:inline-block;background:#C9A84C;color:#000;padding:18px 56px;font-size:13px;letter-spacing:4px;font-weight:700;text-decoration:none;">GO TO MY DASHBOARD</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 48px;border-top:1px solid #111;">
          <p style="margin:0;font-size:11px;color:#444;text-align:center;line-height:1.8;">
            LEGALIAI · Preparation guidance only · Not legal advice<br/>
            For complex situations, consult a licensed immigration attorney.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LEGALIAI <noreply@legaliai.com>",
        to: email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Resend error:", err);
      return res.status(500).json({ error: "Email failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}
