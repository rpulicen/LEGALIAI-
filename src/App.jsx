import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lscxxjiqridkdpggxkiv.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "tl", label: "Tagalog" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "hi", label: "हिन्दी" },
  { code: "pt", label: "Português" },
];

const T = {
  en: {
    tagline: "YOUR U.S. CITIZENSHIP APPLICATION —\nPREPARED, NOT GUESSED.",
    sub: "AI-powered step-by-step preparation for your N-400. No lawyer needed. $49 one-time.",
    cta: "START MY PREPARATION",
    t1: "PLAIN ENGLISH GUIDANCE", t2: "PERSONALIZED TO YOUR SITUATION", t3: "NOT LEGAL ADVICE — PREPARATION ONLY",
    disclaimer: "LEGALIAI provides preparation guidance only. This is not legal advice. For complex situations, consult a licensed immigration attorney.",
    emailTitle: "ENTER YOUR EMAIL TO START", emailSub: "We'll send you a secure login link. No password needed.",
    sendLink: "SEND MAGIC LINK", checkEmail: "CHECK YOUR EMAIL", checkEmailSub: "Your magic link has been sent. Click the link in your email to continue.",
    q1: "HOW LONG HAVE YOU BEEN A PERMANENT RESIDENT?", q2: "ARE YOU MARRIED TO A U.S. CITIZEN?",
    q3: "HAVE YOU TRAVELED OUTSIDE THE U.S. FOR MORE THAN 6 MONTHS AT A TIME?",
    q4: "ANY CRIMINAL HISTORY INCLUDING MINOR OFFENSES?", q5: "WHAT COUNTRY WERE YOU BORN IN?",
    yes: "YES", no: "NO", next: "NEXT", finish: "FINISH",
    q1opts: ["Less than 3 years", "3–5 years", "5–10 years", "More than 10 years"],
    paywallTitle: "YOUR PERSONALIZED N-400 PREPARATION IS READY.",
    paywallSub: "Unlock everything for $49 one-time.",
    unlock: "UNLOCK NOW", paywallNote: "Secure payment. Instant access. No subscription.",
    dashTitle: "YOUR PREPARATION DASHBOARD",
    modules: ["DOCUMENT CHECKLIST", "FORM WALKTHROUGH", "RISK ASSESSMENT", "INTERVIEW PREP"],
    modDesc: ["Know exactly what to gather.", "Understand every question.", "Know your risks before USCIS does.", "Practice until you're confident."],
    start: "START", resume: "RESUME", review: "REVIEW",
    notStarted: "NOT STARTED", inProgress: "IN PROGRESS", complete: "✓ COMPLETE",
    signOut: "SIGN OUT",
    aiDisclaimer: "This is preparation guidance only, not legal advice. For complex situations, consult a licensed immigration attorney.",
    generating: "Generating your personalized analysis...",
    docTitle: "YOUR DOCUMENT CHECKLIST", formTitle: "N-400 FORM WALKTHROUGH",
    riskTitle: "YOUR RISK ASSESSMENT", interviewTitle: "INTERVIEW PREP",
    yourAnswer: "Type your answer here...", practiced: "✓ PRACTICED", practice: "PRACTICE THIS",
    back: "← BACK", where: "WHERE TO GET IT:", why: "WHY USCIS NEEDS IT:",
    means: "WHAT THIS MEANS:", example: "EXAMPLE:", mistake: "⚠ COMMON MISTAKE:",
    action: "WHAT TO DO:", selectCountry: "Select your country...",
    docsComplete: "All documents gathered! Your checklist is complete.",
    progressOf: "of", questionsCompleted: "questions practiced",
    aiPowered: "AI-POWERED", personalized: "PERSONALIZED TO YOU",
  },
  es: {
    tagline: "TU SOLICITUD DE CIUDADANÍA —\nPREPARADA, NO ADIVINADA.",
    sub: "Preparación paso a paso con IA para el N-400. Sin abogado. $49 pago único.",
    cta: "INICIAR MI PREPARACIÓN",
    t1: "GUÍA EN ESPAÑOL CLARO", t2: "PERSONALIZADO A TU SITUACIÓN", t3: "NO ES ASESORÍA LEGAL — SOLO PREPARACIÓN",
    disclaimer: "LEGALIAI proporciona orientación de preparación únicamente. Esto no es asesoramiento legal. Para situaciones complejas, consulta a un abogado de inmigración.",
    emailTitle: "INGRESA TU CORREO PARA COMENZAR", emailSub: "Te enviaremos un enlace de acceso seguro. Sin contraseña.",
    sendLink: "ENVIAR ENLACE MÁGICO", checkEmail: "REVISA TU CORREO", checkEmailSub: "Tu enlace fue enviado. Haz clic en él en tu correo para continuar.",
    q1: "¿CUÁNTO TIEMPO LLEVAS SIENDO RESIDENTE PERMANENTE?", q2: "¿ESTÁS CASADO/A CON UN/A CIUDADANO/A AMERICANO/A?",
    q3: "¿HAS VIAJADO FUERA DE EE.UU. POR MÁS DE 6 MESES SEGUIDOS?",
    q4: "¿TIENES ANTECEDENTES PENALES, INCLUSO INFRACCIONES MENORES?", q5: "¿EN QUÉ PAÍS NACISTE?",
    yes: "SÍ", no: "NO", next: "SIGUIENTE", finish: "FINALIZAR",
    q1opts: ["Menos de 3 años", "3–5 años", "5–10 años", "Más de 10 años"],
    paywallTitle: "TU PREPARACIÓN PERSONALIZADA N-400 ESTÁ LISTA.",
    paywallSub: "Desbloquea todo por $49 pago único.",
    unlock: "DESBLOQUEAR AHORA", paywallNote: "Pago seguro. Acceso inmediato. Sin suscripción.",
    dashTitle: "TU PANEL DE PREPARACIÓN",
    modules: ["LISTA DE DOCUMENTOS", "GUÍA DEL FORMULARIO", "EVALUACIÓN DE RIESGOS", "PREPARACIÓN PARA ENTREVISTA"],
    modDesc: ["Sabe exactamente qué reunir.", "Entiende cada pregunta del formulario.", "Conoce tus riesgos antes que USCIS.", "Practica hasta estar completamente seguro/a."],
    start: "COMENZAR", resume: "CONTINUAR", review: "REVISAR",
    notStarted: "NO INICIADO", inProgress: "EN PROGRESO", complete: "✓ COMPLETO",
    signOut: "CERRAR SESIÓN",
    aiDisclaimer: "Esta es solo orientación de preparación, no asesoramiento legal. Para situaciones complejas, consulta a un abogado de inmigración.",
    generating: "Generando tu análisis personalizado...",
    docTitle: "TU LISTA DE DOCUMENTOS", formTitle: "GUÍA DEL FORMULARIO N-400",
    riskTitle: "TU EVALUACIÓN DE RIESGOS", interviewTitle: "PREPARACIÓN PARA ENTREVISTA",
    yourAnswer: "Escribe tu respuesta aquí...", practiced: "✓ PRACTICADO", practice: "PRACTICAR ESTA",
    back: "← VOLVER", where: "DÓNDE OBTENERLO:", why: "POR QUÉ LO NECESITA USCIS:",
    means: "QUÉ SIGNIFICA ESTO:", example: "EJEMPLO:", mistake: "⚠ ERROR COMÚN:",
    action: "QUÉ HACER:", selectCountry: "Selecciona tu país...",
    docsComplete: "¡Todos los documentos reunidos! Tu lista está completa.",
    progressOf: "de", questionsCompleted: "preguntas practicadas",
    aiPowered: "CON IA", personalized: "PERSONALIZADO PARA TI",
  },
  zh: {
    tagline: "您的美国公民申请 —\n准备充分，而非猜测。",
    sub: "AI驱动的N-400逐步准备指南。无需律师。一次性$49。",
    cta: "开始我的准备",
    t1: "简明中文指导", t2: "根据您的情况个性化定制", t3: "非法律建议 — 仅为准备指导",
    disclaimer: "LEGALIAI仅提供准备指导，这不是法律建议。对于复杂情况，请咨询持牌移民律师。",
    emailTitle: "输入您的电子邮件开始", emailSub: "我们将发送安全登录链接，无需密码。",
    sendLink: "发送魔法链接", checkEmail: "查看您的邮件", checkEmailSub: "魔法链接已发送，请点击邮件中的链接继续。",
    q1: "您成为永久居民多久了？", q2: "您是否与美国公民结婚？",
    q3: "您是否曾在美国境外旅行超过6个月？",
    q4: "是否有犯罪记录，包括轻微违规？", q5: "您出生在哪个国家？",
    yes: "是", no: "否", next: "下一步", finish: "完成",
    q1opts: ["不到3年", "3–5年", "5–10年", "超过10年"],
    paywallTitle: "您的个性化N-400准备已就绪。", paywallSub: "一次性$49解锁所有内容。",
    unlock: "立即解锁", paywallNote: "安全支付。即时访问。无订阅。",
    dashTitle: "您的准备控制台",
    modules: ["文件清单", "表格指南", "风险评估", "面试准备"],
    modDesc: ["了解需要收集哪些文件。", "理解表格中的每个问题。", "在USCIS之前了解您的风险。", "练习直到充满信心。"],
    start: "开始", resume: "继续", review: "复习",
    notStarted: "未开始", inProgress: "进行中", complete: "✓ 已完成",
    signOut: "退出登录",
    aiDisclaimer: "这仅是准备指导，不是法律建议。对于复杂情况，请咨询持牌移民律师。",
    generating: "正在生成您的个性化分析...",
    docTitle: "您的文件清单", formTitle: "N-400表格指南",
    riskTitle: "您的风险评估", interviewTitle: "面试准备",
    yourAnswer: "在此输入您的答案...", practiced: "✓ 已练习", practice: "练习这道题",
    back: "← 返回", where: "获取地点：", why: "USCIS要求原因：",
    means: "含义：", example: "示例：", mistake: "⚠ 常见错误：",
    action: "建议行动：", selectCountry: "选择您的国家...",
    docsComplete: "所有文件已收集！您的清单已完成。",
    progressOf: "/", questionsCompleted: "道题已练习",
    aiPowered: "AI驱动", personalized: "为您个性化定制",
  },
  tl: {
    tagline: "ANG IYONG APLIKASYON SA PAGKAMAMAMAYAN —\nHANDA, HINDI NAHULAAN.",
    sub: "Hakbang-hakbang na paghahanda gamit ang AI para sa N-400. Walang abogado. $49 isang beses.",
    cta: "SIMULAN ANG AKING PAGHAHANDA",
    t1: "GABAY SA SIMPLENG TAGALOG", t2: "INANGKOP SA IYONG SITWASYON", t3: "HINDI LEGAL NA PAYO — PAGHAHANDA LAMANG",
    disclaimer: "Ang LEGALIAI ay nagbibigay lamang ng gabay sa paghahanda. Hindi ito legal na payo. Para sa mga kumplikadong sitwasyon, kumonsulta sa isang lisensyadong abogado.",
    emailTitle: "ILAGAY ANG IYONG EMAIL PARA MAGSIMULA", emailSub: "Magpapadala kami ng secure na link. Walang password.",
    sendLink: "MAGPADALA NG MAGIC LINK", checkEmail: "SURIIN ANG IYONG EMAIL", checkEmailSub: "Naipadala na ang iyong magic link. I-click ang link sa email mo para magpatuloy.",
    q1: "GAANO KATAGAL KA NANG PERMANENTENG RESIDENTE?", q2: "IKA'Y KASAL BA SA ISANG MAMAMAYANG AMERIKANO?",
    q3: "NAGLAKBAY KA BA SA LABAS NG U.S. NG HIGIT SA 6 NA BUWAN NANG SABAY-SABAY?",
    q4: "MAY KASAYSAYAN BA NG KRIMEN, KASAMA ANG MALILIIT NA PAGKAKASALA?", q5: "SA ANONG BANSA KA IPINANGANAK?",
    yes: "OO", no: "HINDI", next: "SUSUNOD", finish: "TAPUSIN",
    q1opts: ["Wala pang 3 taon", "3–5 taon", "5–10 taon", "Higit sa 10 taon"],
    paywallTitle: "HANDA NA ANG IYONG PERSONALISADONG N-400 NA PAGHAHANDA.", paywallSub: "I-unlock ang lahat para sa $49 isang beses.",
    unlock: "I-UNLOCK NGAYON", paywallNote: "Ligtas na bayad. Agarang access. Walang subscription.",
    dashTitle: "ANG IYONG DASHBOARD NG PAGHAHANDA",
    modules: ["LISTAHAN NG DOKUMENTO", "GABAY SA FORM", "PAGTATASA NG PANGANIB", "PAGHAHANDA SA PANAYAM"],
    modDesc: ["Alamin kung ano ang kukolektahin.", "Unawain ang bawat tanong sa form.", "Alamin ang iyong mga panganib bago pa ang USCIS.", "Magsanay hanggang maging kumpiyansa."],
    start: "SIMULAN", resume: "ITULOY", review: "SURIIN",
    notStarted: "HINDI PA SINIMULAN", inProgress: "ISINASAGAWA", complete: "✓ TAPOS NA",
    signOut: "MAG-SIGN OUT",
    aiDisclaimer: "Ito ay gabay sa paghahanda lamang, hindi legal na payo. Para sa mga kumplikadong sitwasyon, kumonsulta sa isang lisensyadong abogado.",
    generating: "Ginagawa ang iyong personalisadong pagsusuri...",
    docTitle: "ANG IYONG LISTAHAN NG DOKUMENTO", formTitle: "GABAY SA FORM N-400",
    riskTitle: "ANG IYONG PAGTATASA NG PANGANIB", interviewTitle: "PAGHAHANDA SA PANAYAM",
    yourAnswer: "I-type ang iyong sagot dito...", practiced: "✓ NASANAY NA", practice: "ISANAY ITO",
    back: "← BUMALIK", where: "SAAN MAKUKUHA:", why: "BAKIT KAILANGAN NG USCIS:",
    means: "ANG IBIG SABIHIN:", example: "HALIMBAWA:", mistake: "⚠ KARANIWANG PAGKAKAMALI:",
    action: "ANO ANG GAGAWIN:", selectCountry: "Piliin ang iyong bansa...",
    docsComplete: "Lahat ng dokumento ay nakolekta na! Kumpleto na ang iyong listahan.",
    progressOf: "sa", questionsCompleted: "mga tanong ang nasanay",
    aiPowered: "PINAPAGANA NG AI", personalized: "PERSONALISADO PARA SA IYO",
  },
  vi: {
    tagline: "ĐƠN XIN QUỐC TỊCH HOA KỲ CỦA BẠN —\nĐƯỢC CHUẨN BỊ, KHÔNG PHẢI ĐỐN MÒ.",
    sub: "Chuẩn bị từng bước với AI cho N-400. Không cần luật sư. $49 một lần.",
    cta: "BẮT ĐẦU CHUẨN BỊ CỦA TÔI",
    t1: "HƯỚNG DẪN TIẾNG VIỆT RÕ RÀNG", t2: "CÁ NHÂN HÓA THEO TÌNH HUỐNG CỦA BẠN", t3: "KHÔNG PHẢI TƯ VẤN PHÁP LÝ — CHỈ CHUẨN BỊ",
    disclaimer: "LEGALIAI chỉ cung cấp hướng dẫn chuẩn bị. Đây không phải tư vấn pháp lý. Với các trường hợp phức tạp, hãy tham khảo luật sư di trú có giấy phép.",
    emailTitle: "NHẬP EMAIL ĐỂ BẮT ĐẦU", emailSub: "Chúng tôi sẽ gửi liên kết đăng nhập bảo mật. Không cần mật khẩu.",
    sendLink: "GỬI LIÊN KẾT MAGIC", checkEmail: "KIỂM TRA EMAIL CỦA BẠN", checkEmailSub: "Liên kết magic đã được gửi. Nhấp vào liên kết trong email để tiếp tục.",
    q1: "BẠN LÀ THƯỜNG TRÚ NHÂN ĐƯỢC BAO LÂU RỒI?", q2: "BẠN CÓ KẾT HÔN VỚI CÔNG DÂN MỸ KHÔNG?",
    q3: "BẠN CÓ ĐI DU LỊCH NGOÀI HOA KỲ HƠN 6 THÁNG LIÊN TIẾP KHÔNG?",
    q4: "CÓ TIỀN SỬ HÌNH SỰ NÀO, KỂ CẢ VI PHẠM NHỎ KHÔNG?", q5: "BẠN SINH RA Ở QUỐC GIA NÀO?",
    yes: "CÓ", no: "KHÔNG", next: "TIẾP THEO", finish: "HOÀN THÀNH",
    q1opts: ["Dưới 3 năm", "3–5 năm", "5–10 năm", "Hơn 10 năm"],
    paywallTitle: "CHUẨN BỊ N-400 CÁ NHÂN HÓA CỦA BẠN ĐÃ SẴN SÀNG.", paywallSub: "Mở khóa tất cả với $49 một lần.",
    unlock: "MỞ KHÓA NGAY", paywallNote: "Thanh toán an toàn. Truy cập ngay lập tức. Không đăng ký.",
    dashTitle: "BẢNG ĐIỀU KHIỂN CHUẨN BỊ CỦA BẠN",
    modules: ["DANH SÁCH TÀI LIỆU", "HƯỚNG DẪN MẪU ĐƠN", "ĐÁNH GIÁ RỦI RO", "CHUẨN BỊ PHỎNG VẤN"],
    modDesc: ["Biết chính xác những gì cần thu thập.", "Hiểu từng câu hỏi trong mẫu đơn.", "Biết rủi ro của bạn trước USCIS.", "Luyện tập cho đến khi tự tin hoàn toàn."],
    start: "BẮT ĐẦU", resume: "TIẾP TỤC", review: "XEM LẠI",
    notStarted: "CHƯA BẮT ĐẦU", inProgress: "ĐANG TIẾN HÀNH", complete: "✓ HOÀN THÀNH",
    signOut: "ĐĂNG XUẤT",
    aiDisclaimer: "Đây chỉ là hướng dẫn chuẩn bị, không phải tư vấn pháp lý. Với các trường hợp phức tạp, hãy tham khảo luật sư di trú có giấy phép.",
    generating: "Đang tạo phân tích cá nhân hóa của bạn...",
    docTitle: "DANH SÁCH TÀI LIỆU CỦA BẠN", formTitle: "HƯỚNG DẪN MẪU ĐƠN N-400",
    riskTitle: "ĐÁNH GIÁ RỦI RO CỦA BẠN", interviewTitle: "CHUẨN BỊ PHỎNG VẤN",
    yourAnswer: "Nhập câu trả lời của bạn tại đây...", practiced: "✓ ĐÃ LUYỆN TẬP", practice: "LUYỆN TẬP CÂU NÀY",
    back: "← QUAY LẠI", where: "NƠI LẤY TÀI LIỆU:", why: "TẠI SAO USCIS CẦN:",
    means: "Ý NGHĨA:", example: "VÍ DỤ:", mistake: "⚠ LỖI THƯỜNG GẶP:",
    action: "PHẢI LÀM GÌ:", selectCountry: "Chọn quốc gia của bạn...",
    docsComplete: "Đã thu thập tất cả tài liệu! Danh sách của bạn đã hoàn thành.",
    progressOf: "/", questionsCompleted: "câu hỏi đã luyện tập",
    aiPowered: "ĐƯỢC ĐIỀU KHIỂN BỞI AI", personalized: "CÁ NHÂN HÓA CHO BẠN",
  },
  hi: {
    tagline: "आपका अमेरिकी नागरिकता आवेदन —\nतैयार, अनुमान नहीं।",
    sub: "आपके N-400 के लिए AI-संचालित चरण-दर-चरण तैयारी। कोई वकील नहीं। एकमुश्त $49।",
    cta: "मेरी तैयारी शुरू करें",
    t1: "सरल हिंदी में मार्गदर्शन", t2: "आपकी स्थिति के अनुसार व्यक्तिगत", t3: "कानूनी सलाह नहीं — केवल तैयारी",
    disclaimer: "LEGALIAI केवल तैयारी मार्गदर्शन प्रदान करता है। यह कानूनी सलाह नहीं है। जटिल मामलों के लिए, लाइसेंस प्राप्त वकील से परामर्श करें।",
    emailTitle: "शुरू करने के लिए अपना ईमेल दर्ज करें", emailSub: "हम एक सुरक्षित लॉगिन लिंक भेजेंगे। कोई पासवर्ड नहीं।",
    sendLink: "मैजिक लिंक भेजें", checkEmail: "अपना ईमेल जांचें", checkEmailSub: "आपका मैजिक लिंक भेज दिया गया है। जारी रखने के लिए ईमेल में लिंक पर क्लिक करें।",
    q1: "आप कितने समय से स्थायी निवासी हैं?", q2: "क्या आप किसी अमेरिकी नागरिक से विवाहित हैं?",
    q3: "क्या आप एक बार में 6 महीने से अधिक अमेरिका से बाहर गए हैं?",
    q4: "क्या कोई आपराधिक इतिहास है, जिसमें छोटे अपराध भी शामिल हैं?", q5: "आप किस देश में पैदा हुए थे?",
    yes: "हाँ", no: "नहीं", next: "अगला", finish: "समाप्त करें",
    q1opts: ["3 साल से कम", "3–5 साल", "5–10 साल", "10 साल से अधिक"],
    paywallTitle: "आपकी व्यक्तिगत N-400 तैयारी तैयार है।", paywallSub: "एकमुश्त $49 में सब कुछ अनलॉक करें।",
    unlock: "अभी अनलॉक करें", paywallNote: "सुरक्षित भुगतान। तत्काल पहुंच। कोई सदस्यता नहीं।",
    dashTitle: "आपका तैयारी डैशबोर्ड",
    modules: ["दस्तावेज़ चेकलिस्ट", "फॉर्म वॉकथ्रू", "जोखिम मूल्यांकन", "साक्षात्कार तैयारी"],
    modDesc: ["जानें कि क्या इकट्ठा करना है।", "फॉर्म के हर सवाल को समझें।", "USCIS से पहले अपने जोखिम जानें।", "जब तक पूरा आत्मविश्वास न आए अभ्यास करें।"],
    start: "शुरू करें", resume: "जारी रखें", review: "समीक्षा करें",
    notStarted: "शुरू नहीं हुआ", inProgress: "प्रगति में", complete: "✓ पूर्ण",
    signOut: "साइन आउट",
    aiDisclaimer: "यह केवल तैयारी मार्गदर्शन है, कानूनी सलाह नहीं।",
    generating: "आपका व्यक्तिगत विश्लेषण तैयार हो रहा है...",
    docTitle: "आपकी दस्तावेज़ चेकलिस्ट", formTitle: "N-400 फॉर्म वॉकथ्रू",
    riskTitle: "आपका जोखिम मूल्यांकन", interviewTitle: "साक्षात्कार तैयारी",
    yourAnswer: "यहाँ अपना उत्तर टाइप करें...", practiced: "✓ अभ्यास किया", practice: "इसका अभ्यास करें",
    back: "← वापस", where: "कहाँ से प्राप्त करें:", why: "USCIS को क्यों चाहिए:",
    means: "इसका अर्थ:", example: "उदाहरण:", mistake: "⚠ सामान्य गलती:",
    action: "क्या करें:", selectCountry: "अपना देश चुनें...",
    docsComplete: "सभी दस्तावेज़ इकट्ठे हो गए! आपकी चेकलिस्ट पूरी हो गई।",
    progressOf: "में से", questionsCompleted: "प्रश्नों का अभ्यास किया",
    aiPowered: "AI-संचालित", personalized: "आपके लिए व्यक्तिगत",
  },
  pt: {
    tagline: "SUA SOLICITAÇÃO DE CIDADANIA AMERICANA —\nPREPARADA, NÃO ADIVINHADA.",
    sub: "Preparação passo a passo com IA para o N-400. Sem advogado. $49 pagamento único.",
    cta: "INICIAR MINHA PREPARAÇÃO",
    t1: "ORIENTAÇÃO EM PORTUGUÊS CLARO", t2: "PERSONALIZADO PARA SUA SITUAÇÃO", t3: "NÃO É ASSESSORIA JURÍDICA — APENAS PREPARAÇÃO",
    disclaimer: "LEGALIAI fornece apenas orientação de preparação. Isso não é assessoria jurídica. Para situações complexas, consulte um advogado de imigração licenciado.",
    emailTitle: "INSIRA SEU EMAIL PARA COMEÇAR", emailSub: "Enviaremos um link de acesso seguro. Sem senha.",
    sendLink: "ENVIAR LINK MÁGICO", checkEmail: "VERIFIQUE SEU EMAIL", checkEmailSub: "Seu link mágico foi enviado. Clique no link no seu email para continuar.",
    q1: "HÁ QUANTO TEMPO VOCÊ É RESIDENTE PERMANENTE?", q2: "VOCÊ É CASADO/A COM UM/A CIDADÃO/Ã AMERICANO/A?",
    q3: "VOCÊ VIAJOU PARA FORA DOS EUA POR MAIS DE 6 MESES CONSECUTIVOS?",
    q4: "TEM ALGUM HISTÓRICO CRIMINAL, INCLUINDO INFRAÇÕES MENORES?", q5: "EM QUAL PAÍS VOCÊ NASCEU?",
    yes: "SIM", no: "NÃO", next: "PRÓXIMO", finish: "FINALIZAR",
    q1opts: ["Menos de 3 anos", "3–5 anos", "5–10 anos", "Mais de 10 anos"],
    paywallTitle: "SUA PREPARAÇÃO PERSONALIZADA N-400 ESTÁ PRONTA.", paywallSub: "Desbloqueie tudo por $49 pagamento único.",
    unlock: "DESBLOQUEAR AGORA", paywallNote: "Pagamento seguro. Acesso imediato. Sem assinatura.",
    dashTitle: "SEU PAINEL DE PREPARAÇÃO",
    modules: ["LISTA DE DOCUMENTOS", "GUIA DO FORMULÁRIO", "AVALIAÇÃO DE RISCOS", "PREPARAÇÃO PARA ENTREVISTA"],
    modDesc: ["Saiba exatamente o que reunir.", "Entenda cada pergunta do formulário.", "Conheça seus riscos antes do USCIS.", "Pratique até se sentir completamente confiante."],
    start: "INICIAR", resume: "CONTINUAR", review: "REVISAR",
    notStarted: "NÃO INICIADO", inProgress: "EM ANDAMENTO", complete: "✓ CONCLUÍDO",
    signOut: "SAIR",
    aiDisclaimer: "Isto é apenas orientação de preparação, não assessoria jurídica. Para situações complexas, consulte um advogado de imigração licenciado.",
    generating: "Gerando sua análise personalizada...",
    docTitle: "SUA LISTA DE DOCUMENTOS", formTitle: "GUIA DO FORMULÁRIO N-400",
    riskTitle: "SUA AVALIAÇÃO DE RISCOS", interviewTitle: "PREPARAÇÃO PARA ENTREVISTA",
    yourAnswer: "Digite sua resposta aqui...", practiced: "✓ PRATICADO", practice: "PRATICAR ESTA",
    back: "← VOLTAR", where: "ONDE OBTER:", why: "POR QUÊ O USCIS PRECISA:",
    means: "O QUE ISSO SIGNIFICA:", example: "EXEMPLO:", mistake: "⚠ ERRO COMUM:",
    action: "O QUE FAZER:", selectCountry: "Selecione seu país...",
    docsComplete: "Todos os documentos reunidos! Sua lista está completa.",
    progressOf: "de", questionsCompleted: "perguntas praticadas",
    aiPowered: "MOVIDO POR IA", personalized: "PERSONALIZADO PARA VOCÊ",
  },
};

const g = (lang, key) => {
  const langT = T[lang] || T["en"];
  return langT[key] !== undefined ? langT[key] : (T["en"][key] || key);
};

const COUNTRIES = ["Afghanistan","Albania","Algeria","Argentina","Australia","Bangladesh","Bolivia","Brazil","Cambodia","Canada","Chile","China","Colombia","Cuba","Dominican Republic","Ecuador","Egypt","El Salvador","Ethiopia","France","Germany","Ghana","Guatemala","Haiti","Honduras","India","Indonesia","Iran","Iraq","Jamaica","Japan","Jordan","Kenya","Laos","Lebanon","Liberia","Malaysia","Mexico","Morocco","Myanmar","Nepal","Nicaragua","Nigeria","Pakistan","Panama","Peru","Philippines","Russia","Senegal","Sierra Leone","Somalia","South Korea","Sri Lanka","Sudan","Syria","Taiwan","Thailand","Trinidad and Tobago","Ukraine","Venezuela","Vietnam","Yemen","Zimbabwe","Other"];

const N400_SECTIONS = [
  { section: "Part 1 — Eligibility", questions: [
    { id: "1a", q: "Are you at least 18 years old?", explain: "You must be 18 or older to apply for naturalization on your own.", example: "Yes, I am 26 years old.", mistake: "Applying before your 18th birthday." },
    { id: "1b", q: "Have you been a lawful permanent resident for at least 5 years?", explain: "Most applicants need 5 years as a green card holder. If married to a U.S. citizen, it's 3 years.", example: "Yes, I received my green card in 2018.", mistake: "Counting from when you applied, not when you received your green card." },
  ]},
  { section: "Part 2 — Information About You", questions: [
    { id: "2a", q: "What is your full legal name?", explain: "Use your exact name as it appears on your green card.", example: "Maria Elena Rodriguez Garcia", mistake: "Using a nickname or shortened version of your name." },
    { id: "2b", q: "Have you used any other names?", explain: "Include maiden names, names from previous marriages, or any name you've legally used.", example: "Yes, before marriage my name was Maria Elena Lopez.", mistake: "Forgetting to list a name used in another country." },
  ]},
  { section: "Part 3 — Residence & Employment", questions: [
    { id: "3a", q: "Where have you lived in the last 5 years?", explain: "List every address where you lived for more than 3 months in the past 5 years.", example: "123 Main St, Miami FL (2020–present)", mistake: "Forgetting a short-term address or leaving gaps." },
    { id: "3b", q: "Where have you worked in the last 5 years?", explain: "List every employer including part-time jobs and self-employment.", example: "ABC Corp, Miami FL, Manager (2021–present)", mistake: "Forgetting freelance or gig work." },
  ]},
  { section: "Part 4 — Travel Outside the U.S.", questions: [
    { id: "4a", q: "Have you traveled outside the U.S. in the last 5 years?", explain: "List every trip outside the U.S. even if just for a few days.", example: "Mexico, June 1–10 2023, 9 days", mistake: "Forgetting short weekend trips or trips to Canada." },
    { id: "4b", q: "Have you ever been absent from the U.S. for more than 6 months?", explain: "A single trip over 6 months can break your continuous residence. This is critical.", example: "Yes, I was in Brazil from Jan–Aug 2019.", mistake: "Not disclosing this — USCIS will find it in travel records." },
  ]},
  { section: "Part 5 — Marital History", questions: [
    { id: "5a", q: "What is your current marital status?", explain: "Select: single, married, divorced, widowed, or separated.", example: "Married since March 15, 2015.", mistake: "Selecting married if legally separated." },
  ]},
];

const INTERVIEW_QUESTIONS = [
  "Why do you want to become a U.S. citizen?",
  "What is the supreme law of the land?",
  "What does the Constitution do?",
  "What do we call the first ten amendments to the Constitution?",
  "How many amendments does the Constitution have?",
  "What are two rights in the Declaration of Independence?",
  "Who is in charge of the executive branch?",
  "Who makes federal laws?",
  "What are the two parts of the U.S. Congress?",
  "How many U.S. Senators are there?",
  "How long is a term for a U.S. Senator?",
  "Who is your state's Governor?",
  "What is the capital of your state?",
  "What is the name of the Speaker of the House of Representatives now?",
  "How many justices are on the Supreme Court?",
  "Name one power of the states.",
  "Name one war fought by the United States in the 1900s.",
  "Name one American Indian tribe in the United States.",
  "What is the economic system in the United States?",
  "What is the 'rule of law'?",
];

const MODULE_NAMES = ["documents","form","risk","interview"];
const MODULE_IDX = {documents:0,form:1,risk:2,interview:3};

export default function App() {
  const [page, setPage] = useState("landing");
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [user, setUser] = useState(null);
  const [onboardingAnswers, setOnboardingAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [aiContent, setAiContent] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [formAnswers, setFormAnswers] = useState({});
  const [formFeedback, setFormFeedback] = useState({});
  const [interviewAnswers, setInterviewAnswers] = useState({});
  const [interviewFeedback, setInterviewFeedback] = useState({});
  const [practiced, setPracticed] = useState({});
  const [docChecks, setDocChecks] = useState({});
  const [moduleProgress, setModuleProgress] = useState({0:"NOT STARTED",1:"NOT STARTED",2:"NOT STARTED",3:"NOT STARTED"});

  const t = (key) => g(lang, key);
  const langName = LANGUAGES.find(l => l.code === lang)?.label || "English";

  // ── AUTO COMPLETE: check if all docs checked ──
  useEffect(() => {
    if (!aiContent.documents || aiContent.documents.length === 0) return;
    const allChecked = aiContent.documents.every((_,i) => docChecks[i]);
    if (allChecked && moduleProgress[0] !== "COMPLETE") {
      setModuleProgress(prev => ({ ...prev, 0: "COMPLETE" }));
      if (user) {
        supabase.from("progress").upsert(
          { user_id: user.id, module: "documents", status: "COMPLETE", updated_at: new Date().toISOString() },
          { onConflict: "user_id,module" }
        );
      }
    }
  }, [docChecks, aiContent.documents]);

  // ── LOAD PROGRESS ──
  const loadProgress = async (u) => {
    const { data } = await supabase.from("progress").select("*").eq("user_id", u.id);
    if (data && data.length > 0) {
      const newProgress = {0:"NOT STARTED",1:"NOT STARTED",2:"NOT STARTED",3:"NOT STARTED"};
      data.forEach(row => { if (MODULE_IDX[row.module] !== undefined) newProgress[MODULE_IDX[row.module]] = row.status; });
      setModuleProgress(newProgress);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); setPage("dashboard"); loadProgress(session.user); }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); setPage("dashboard"); loadProgress(session.user); }
    });
    const savedLang = localStorage.getItem("legaliai_lang");
    if (savedLang) setLang(savedLang);
  }, []);

  // ── LANGUAGE CHANGE — regenerate AI content ──
  const handleLangChange = (code) => {
    setLang(code);
    localStorage.setItem("legaliai_lang", code);
    setShowLangMenu(false);
    // Clear AI content so it regenerates in new language
    setAiContent({});
    setFormFeedback({});
    setInterviewFeedback({});
  };

  const getProgressLabel = (idx) => {
    const s = moduleProgress[idx];
    if (s === "COMPLETE") return t("complete");
    if (s === "IN PROGRESS") return t("inProgress");
    return t("notStarted");
  };

  const getProgressColor = (idx) => {
    const s = moduleProgress[idx];
    if (s === "COMPLETE") return "#4ade80";
    if (s === "IN PROGRESS") return "#C9A84C";
    return "#333";
  };

  const getBtnLabel = (idx) => {
    const s = moduleProgress[idx];
    if (s === "COMPLETE") return t("review");
    if (s === "IN PROGRESS") return t("resume");
    return t("start");
  };

  const handleSendMagicLink = async () => {
    if (!email) return;
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: "https://legaliai.com" } });
    setMagicSent(true);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); setPage("landing"); };
  const handleStartCTA = () => { if (user) setPage("onboarding"); else setShowEmailModal(true); };
  const handleOnboardingNext = () => { if (currentQ < 4) setCurrentQ(currentQ + 1); else { saveOnboardingAnswers(); setPage("paywall"); } };
  const saveOnboardingAnswers = async () => { if (user) await supabase.from("onboarding_answers").upsert({ user_id: user.id, answers: onboardingAnswers }); };

  const handleModuleOpen = async (idx) => {
    const moduleName = MODULE_NAMES[idx];
    setPage(moduleName);
    if (moduleProgress[idx] === "NOT STARTED") {
      setModuleProgress(prev => ({ ...prev, [idx]: "IN PROGRESS" }));
      if (user) {
        await supabase.from("progress").upsert(
          { user_id: user.id, module: moduleName, status: "IN PROGRESS", updated_at: new Date().toISOString() },
          { onConflict: "user_id,module" }
        );
      }
    }
    if (idx === 0 && !aiContent.documents) generateDocuments();
    if (idx === 2 && !aiContent.risk) generateRisk();
  };

  const callAI = async (prompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const generateDocuments = async () => {
    setLoadingAI(true);
    try {
      const text = await callAI(`You are an immigration preparation assistant. Based on these N-400 answers: ${JSON.stringify(onboardingAnswers)}, generate a personalized document checklist. Return ONLY a valid JSON array with no extra text or markdown: [{"name":"...","source":"...","reason":"..."}]. Respond entirely in ${langName}.`);
      const cleaned = text.replace(/```json|```/g, "").trim();
      setAiContent(prev => ({ ...prev, documents: JSON.parse(cleaned) }));
    } catch {
      setAiContent(prev => ({ ...prev, documents: [
        { name: "Permanent Resident Card (Green Card)", source: "Your physical card", reason: "Proves your immigration status to USCIS" },
        { name: "Passport from birth country", source: "Home country embassy or your files", reason: "Confirms your identity and nationality" },
        { name: "Tax returns (last 5 years)", source: "IRS.gov or your tax preparer", reason: "Proves continuous U.S. residence" },
        { name: "Travel records", source: "Passport stamps or personal calendar", reason: "Documents all trips outside the U.S." },
        { name: "Marriage certificate (if applicable)", source: "Vital records office where you married", reason: "Required if married to a U.S. citizen" },
      ]}));
    }
    setLoadingAI(false);
  };

  const generateRisk = async () => {
    setLoadingAI(true);
    try {
      const text = await callAI(`You are an immigration preparation assistant. Based on these N-400 answers: ${JSON.stringify(onboardingAnswers)}, identify 3-5 personal risk factors for this application. Return ONLY a valid JSON array with no extra text or markdown: [{"title":"...","explanation":"...","action":"..."}]. Respond entirely in ${langName}. Be specific and write in plain simple language.`);
      const cleaned = text.replace(/```json|```/g, "").trim();
      setAiContent(prev => ({ ...prev, risk: JSON.parse(cleaned) }));
    } catch {
      setAiContent(prev => ({ ...prev, risk: [
        { title: "Continuous Residence", explanation: "Any trip over 6 months could interrupt your continuous residence requirement.", action: "Gather all travel records and be prepared to explain any long trips with documentation." },
        { title: "Good Moral Character", explanation: "USCIS reviews the past 5 years of your conduct and history.", action: "Disclose all interactions with law enforcement, even minor traffic violations." },
      ]}));
    }
    setLoadingAI(false);
  };

  const handleFormFeedback = async (qId, question, answer) => {
    if (!answer.trim()) return;
    const feedback = await callAI(`Review this N-400 answer. Question: "${question}" Answer: "${answer}". Give 2-3 sentences of specific feedback. Is it complete? Any red flags? What to improve? Respond in ${langName}.`);
    setFormFeedback(prev => ({ ...prev, [qId]: feedback }));
  };

  const handleInterviewSubmit = async (idx, question, answer) => {
    if (!answer.trim()) return;
    const feedback = await callAI(`Evaluate this N-400 interview answer. Question: "${question}" Answer: "${answer}". Rate clarity 1-10, give one specific strength and one specific improvement tip. Be encouraging and constructive. 3 sentences max. Respond in ${langName}.`);
    setInterviewFeedback(prev => ({ ...prev, [idx]: feedback }));
    const newPracticed = { ...practiced, [idx]: true };
    setPracticed(newPracticed);
    // Mark interview complete if all practiced
    if (Object.keys(newPracticed).length === INTERVIEW_QUESTIONS.length && moduleProgress[3] !== "COMPLETE") {
      setModuleProgress(prev => ({ ...prev, 3: "COMPLETE" }));
      if (user) await supabase.from("progress").upsert({ user_id: user.id, module: "interview", status: "COMPLETE", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
    }
  };

  // ── STYLES ──
  const goldBtn = { background: "#C9A84C", border: "none", color: "#000", padding: "16px 48px", fontSize: "13px", letterSpacing: "4px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" };
  const backBtn = { background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit", display: "block" };
  const card = { background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "28px", marginBottom: "2px" };

  const Nav = () => (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 40px",background:"rgba(0,0,0,0.98)",borderBottom:"1px solid #1a1a1a" }}>
      <div onClick={() => setPage("landing")} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",letterSpacing:"12px",color:"#C9A84C",cursor:"pointer",fontWeight:300 }}>LEGALIAI</div>
      <div style={{ display:"flex",alignItems:"center",gap:"24px" }}>
        {user && <span style={{ color:"#444",fontSize:"12px",letterSpacing:"1px" }}>{user.email}</span>}
        {user && <button onClick={handleSignOut} style={{ background:"none",border:"none",color:"#444",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",fontFamily:"inherit" }}>{t("signOut")}</button>}
        <div style={{ position:"relative" }}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} style={{ background:"none",border:"1px solid #222",color:"#777",padding:"7px 16px",fontSize:"12px",letterSpacing:"1px",cursor:"pointer",fontFamily:"inherit" }}>
            🌐 {LANGUAGES.find(l => l.code === lang)?.label}
          </button>
          {showLangMenu && (
            <div style={{ position:"absolute",right:0,top:"110%",background:"#080808",border:"1px solid #222",minWidth:"190px",zIndex:200,boxShadow:"0 20px 60px rgba(0,0,0,0.8)" }}>
              {LANGUAGES.map(l => (
                <div key={l.code} onClick={() => handleLangChange(l.code)} style={{ padding:"13px 20px",color:lang===l.code?"#C9A84C":"#777",cursor:"pointer",fontSize:"14px",borderBottom:"1px solid #111",fontFamily:"'Cormorant Garamond',serif",background:lang===l.code?"#111":"transparent" }}>{l.label}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const Disclaimer = () => <p style={{ color:"#2a2a2a",fontSize:"11px",textAlign:"center",letterSpacing:"1px",lineHeight:"1.8",margin:"48px auto 0",maxWidth:"600px" }}>{t("disclaimer")}</p>;

  // ── LANDING ──
  if (page === "landing") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      {showEmailModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#080808",border:"1px solid #C9A84C",padding:"64px",maxWidth:"500px",width:"90%",textAlign:"center" }}>
            {!magicSent ? <>
              <h2 style={{ color:"#F5F5F5",fontSize:"20px",letterSpacing:"5px",marginBottom:"12px",fontWeight:300 }}>{t("emailTitle")}</h2>
              <p style={{ color:"#555",fontSize:"13px",letterSpacing:"1px",marginBottom:"32px",lineHeight:1.8 }}>{t("emailSub")}</p>
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleSendMagicLink()} type="email" placeholder="your@email.com" style={{ width:"100%",background:"#111",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"16px 20px",fontSize:"15px",marginBottom:"16px",boxSizing:"border-box",outline:"none",fontFamily:"inherit" }} />
              <button onClick={handleSendMagicLink} style={{ ...goldBtn, width:"100%", padding:"18px" }}>{t("sendLink")}</button>
              <button onClick={() => setShowEmailModal(false)} style={{ marginTop:"20px",background:"none",border:"none",color:"#333",fontSize:"12px",cursor:"pointer",fontFamily:"inherit" }}>✕ Cancel</button>
            </> : <>
              <div style={{ fontSize:"48px",marginBottom:"24px" }}>✉️</div>
              <h2 style={{ color:"#C9A84C",fontSize:"20px",letterSpacing:"5px",marginBottom:"12px",fontWeight:300 }}>{t("checkEmail")}</h2>
              <p style={{ color:"#888",fontSize:"14px",letterSpacing:"1px",lineHeight:"1.8" }}>{t("checkEmailSub")}</p>
            </>}
          </div>
        </div>
      )}
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"80px 40px",textAlign:"center" }}>
        <div style={{ display:"inline-block",border:"1px solid #1a1a1a",padding:"6px 16px",marginBottom:"32px" }}>
          <span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px" }}>{t("aiPowered")} · {t("personalized")}</span>
        </div>
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(28px,5vw,60px)",letterSpacing:"4px",fontWeight:300,lineHeight:1.3,marginBottom:"28px",whiteSpace:"pre-line" }}>{t("tagline")}</h1>
        <p style={{ color:"#777",fontSize:"18px",letterSpacing:"2px",marginBottom:"52px",lineHeight:1.8,maxWidth:"700px",margin:"0 auto 52px" }}>{t("sub")}</p>
        <button onClick={handleStartCTA} style={{ ...goldBtn, fontSize:"14px", padding:"22px 64px" }}
          onMouseOver={e => e.currentTarget.style.background="#e6c060"}
          onMouseOut={e => e.currentTarget.style.background="#C9A84C"}
        >{t("cta")}</button>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",margin:"80px 0 0" }}>
          {[t("t1"),t("t2"),t("t3")].map((text,i) => (
            <div key={i} style={{ background:"#0a0a0a",border:"1px solid #1a1a1a",padding:"44px 32px" }}>
              <div style={{ color:"#C9A84C",fontSize:"24px",marginBottom:"20px" }}>⟡</div>
              <p style={{ color:"#666",fontSize:"12px",letterSpacing:"2px",lineHeight:"2" }}>{text}</p>
            </div>
          ))}
        </div>
        <Disclaimer />
      </div>
    </div>
  );

  // ── ONBOARDING ──
  if (page === "onboarding") {
    const questions = [
      { key:"residency", type:"choice", label:t("q1"), opts:t("q1opts") },
      { key:"married_citizen", type:"yesno", label:t("q2") },
      { key:"long_travel", type:"yesno", label:t("q3") },
      { key:"criminal", type:"yesno", label:t("q4") },
      { key:"country", type:"dropdown", label:t("q5") },
    ];
    const q = questions[currentQ];
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ height:"3px",background:"#111",position:"fixed",top:"80px",left:0,right:0,zIndex:99 }}>
          <div style={{ height:"100%",background:"#C9A84C",width:`${(currentQ/5)*100}%`,transition:"width 0.5s ease" }} />
        </div>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 80px)",padding:"40px" }}>
          <p style={{ color:"#333",fontSize:"11px",letterSpacing:"5px",marginBottom:"48px" }}>QUESTION {currentQ+1} OF 5</p>
          <h2 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,36px)",letterSpacing:"3px",fontWeight:300,textAlign:"center",maxWidth:"720px",marginBottom:"56px",lineHeight:1.4 }}>{q.label}</h2>
          {q.type === "yesno" && (
            <div style={{ display:"flex",gap:"16px",marginBottom:"40px" }}>
              {[t("yes"),t("no")].map((opt,i) => (
                <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev,[q.key]:i===0?"yes":"no" }))}
                  style={{ background:onboardingAnswers[q.key]===(i===0?"yes":"no")?"#C9A84C":"transparent", border:`1px solid ${onboardingAnswers[q.key]===(i===0?"yes":"no")?"#C9A84C":"#2a2a2a"}`, color:onboardingAnswers[q.key]===(i===0?"yes":"no")?"#000":"#777", padding:"18px 52px",fontSize:"13px",letterSpacing:"4px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,transition:"all 0.2s" }}>{opt}</button>
              ))}
            </div>
          )}
          {q.type === "choice" && (
            <div style={{ display:"flex",flexDirection:"column",gap:"12px",marginBottom:"40px",width:"100%",maxWidth:"520px" }}>
              {q.opts.map((opt,i) => (
                <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev,[q.key]:opt }))}
                  style={{ background:onboardingAnswers[q.key]===opt?"#C9A84C":"transparent", border:`1px solid ${onboardingAnswers[q.key]===opt?"#C9A84C":"#2a2a2a"}`, color:onboardingAnswers[q.key]===opt?"#000":"#777", padding:"18px 32px",fontSize:"14px",letterSpacing:"2px",cursor:"pointer",fontFamily:"inherit",fontWeight:onboardingAnswers[q.key]===opt?700:400,textAlign:"left",transition:"all 0.2s" }}>{opt}</button>
              ))}
            </div>
          )}
          {q.type === "dropdown" && (
            <select value={onboardingAnswers[q.key]||""} onChange={e => setOnboardingAnswers(prev => ({ ...prev,[q.key]:e.target.value }))}
              style={{ background:"#0a0a0a",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"16px 20px",fontSize:"15px",marginBottom:"40px",width:"100%",maxWidth:"520px",fontFamily:"inherit",outline:"none",cursor:"pointer" }}>
              <option value="">{t("selectCountry")}</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          <button onClick={handleOnboardingNext} style={goldBtn}>{currentQ < 4 ? t("next") : t("finish")}</button>
        </div>
      </div>
    );
  }

  // ── PAYWALL ──
  if (page === "paywall") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Nav />
      <div style={{ textAlign:"center",padding:"40px",maxWidth:"640px" }}>
        <div style={{ width:"80px",height:"1px",background:"#C9A84C",margin:"0 auto 40px" }} />
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(22px,4vw,44px)",letterSpacing:"3px",fontWeight:300,marginBottom:"20px",lineHeight:1.3 }}>{t("paywallTitle")}</h1>
        <p style={{ color:"#777",fontSize:"18px",letterSpacing:"2px",marginBottom:"52px",lineHeight:1.8 }}>{t("paywallSub")}</p>
        <button onClick={() => setPage("dashboard")} style={{ ...goldBtn, display:"block", margin:"0 auto 20px", padding:"24px 80px", fontSize:"15px" }}
          onMouseOver={e => e.currentTarget.style.background="#e6c060"}
          onMouseOut={e => e.currentTarget.style.background="#C9A84C"}
        >{t("unlock")}</button>
        <p style={{ color:"#333",fontSize:"12px",letterSpacing:"2px" }}>{t("paywallNote")}</p>
        <div style={{ width:"80px",height:"1px",background:"#1a1a1a",margin:"40px auto 0" }} />
        <Disclaimer />
      </div>
    </div>
  );

  // ── DASHBOARD ──
  if (page === "dashboard") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"1000px",margin:"0 auto",padding:"60px 40px" }}>
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,34px)",letterSpacing:"6px",fontWeight:300,marginBottom:"64px",textAlign:"center" }}>{t("dashTitle")}</h1>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px" }}>
          {t("modules").map((mod,i) => (
            <div key={i} style={{ background:"#0a0a0a",border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#2a4a2a":moduleProgress[i]==="IN PROGRESS"?"#3a3010":"#1a1a1a"}`,padding:"40px",display:"flex",flexDirection:"column",gap:"16px",transition:"border-color 0.3s" }}>
              <div style={{ fontSize:"28px" }}>{["📋","📝","⚠️","🎤"][i]}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"4px",fontWeight:300,margin:0 }}>{mod}</h3>
              <p style={{ color:"#444",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{t("modDesc")[i]}</p>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"20px",borderTop:"1px solid #111" }}>
                <span style={{ color:getProgressColor(i),fontSize:"10px",letterSpacing:"2px",fontWeight:600 }}>{getProgressLabel(i)}</span>
                <button onClick={() => handleModuleOpen(i)} style={{ background: moduleProgress[i]==="COMPLETE"?"transparent":"#C9A84C", border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#4ade80":"#C9A84C"}`, color:moduleProgress[i]==="COMPLETE"?"#4ade80":"#000", padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>{getBtnLabel(i)}</button>
              </div>
            </div>
          ))}
        </div>
        <Disclaimer />
      </div>
    </div>
  );

  // ── DOCUMENTS ──
  if (page === "documents") {
    const allChecked = aiContent.documents && aiContent.documents.length > 0 && aiContent.documents.every((_,i) => docChecks[i]);
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
          <button onClick={() => setPage("dashboard")} style={backBtn}>{t("back")}</button>
          <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"8px" }}>{t("docTitle")}</h1>
          {aiContent.documents && <p style={{ color:"#444",fontSize:"12px",letterSpacing:"2px",marginBottom:"40px" }}>{Object.values(docChecks).filter(Boolean).length} / {aiContent.documents.length} gathered</p>}
          {loadingAI && <div style={{ padding:"40px",textAlign:"center" }}><p style={{ color:"#C9A84C",letterSpacing:"2px",fontSize:"13px" }}>{t("generating")}</p></div>}
          {allChecked && (
            <div style={{ background:"#0a1a0a",border:"1px solid #4ade80",padding:"20px 24px",marginBottom:"24px",textAlign:"center" }}>
              <p style={{ color:"#4ade80",fontSize:"13px",letterSpacing:"2px",margin:0 }}>✓ {t("docsComplete")}</p>
            </div>
          )}
          {aiContent.documents && aiContent.documents.map((doc,i) => (
            <div key={i} style={{ ...card, display:"flex", gap:"20px", alignItems:"flex-start", borderLeft:docChecks[i]?"3px solid #4ade80":"3px solid transparent",transition:"border-color 0.3s" }}>
              <input type="checkbox" checked={!!docChecks[i]} onChange={e => setDocChecks(prev => ({ ...prev,[i]:e.target.checked }))} style={{ marginTop:"4px",accentColor:"#C9A84C",width:"20px",height:"20px",cursor:"pointer",flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <h3 style={{ color:docChecks[i]?"#444":"#F5F5F5",fontSize:"15px",letterSpacing:"2px",margin:"0 0 10px",textDecoration:docChecks[i]?"line-through":"none",transition:"all 0.2s" }}>{doc.name}</h3>
                <p style={{ color:"#666",fontSize:"12px",letterSpacing:"1px",margin:"0 0 6px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px" }}>{t("where")}</span> {doc.source}</p>
                <p style={{ color:"#555",fontSize:"12px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px" }}>{t("why")}</span> {doc.reason}</p>
              </div>
            </div>
          ))}
          <p style={{ color:"#1a1a1a",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
        </div>
      </div>
    );
  }

  // ── FORM ──
  if (page === "form") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={backBtn}>{t("back")}</button>
        <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"40px" }}>{t("formTitle")}</h1>
        {N400_SECTIONS.map((section,si) => (
          <div key={si} style={{ marginBottom:"40px" }}>
            <h2 style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"5px",marginBottom:"16px",fontWeight:400,paddingBottom:"12px",borderBottom:"1px solid #111" }}>{section.section}</h2>
            {section.questions.map((q) => (
              <div key={q.id} style={card}>
                <h3 style={{ color:"#F5F5F5",fontSize:"15px",letterSpacing:"1px",margin:"0 0 16px",fontWeight:400 }}>{q.q}</h3>
                <div style={{ background:"#050505",border:"1px solid #111",padding:"16px",marginBottom:"16px" }}>
                  <p style={{ color:"#666",fontSize:"12px",letterSpacing:"1px",margin:"0 0 8px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px" }}>{t("means")}</span> {q.explain}</p>
                  <p style={{ color:"#555",fontSize:"12px",letterSpacing:"1px",margin:"0 0 8px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px" }}>{t("example")}</span> {q.example}</p>
                  <p style={{ color:"#555",fontSize:"12px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}><span style={{ color:"#e05555",fontSize:"10px",letterSpacing:"3px" }}>{t("mistake")}</span> {q.mistake}</p>
                </div>
                <textarea value={formAnswers[q.id]||""} onChange={e => setFormAnswers(prev => ({ ...prev,[q.id]:e.target.value }))}
                  onBlur={() => handleFormFeedback(q.id, q.q, formAnswers[q.id])}
                  placeholder={t("yourAnswer")}
                  style={{ width:"100%",background:"#080808",border:"1px solid #1a1a1a",color:"#F5F5F5",padding:"14px",fontSize:"14px",fontFamily:"inherit",resize:"vertical",minHeight:"90px",boxSizing:"border-box",outline:"none",lineHeight:1.8 }} />
                {formFeedback[q.id] && (
                  <div style={{ marginTop:"12px",borderLeft:"2px solid #C9A84C",paddingLeft:"14px" }}>
                    <p style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"2px",margin:"0 0 6px" }}>AI FEEDBACK</p>
                    <p style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{formFeedback[q.id]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <p style={{ color:"#1a1a1a",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  // ── RISK ──
  if (page === "risk") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={backBtn}>{t("back")}</button>
        <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"40px" }}>{t("riskTitle")}</h1>
        {loadingAI && <div style={{ padding:"40px",textAlign:"center" }}><p style={{ color:"#C9A84C",letterSpacing:"2px",fontSize:"13px" }}>{t("generating")}</p></div>}
        {aiContent.risk && aiContent.risk.map((risk,i) => (
          <div key={i} style={{ ...card, borderLeft:"3px solid #C9A84C",marginBottom:"12px" }}>
            <h3 style={{ color:"#C9A84C",fontSize:"12px",letterSpacing:"4px",margin:"0 0 14px",fontWeight:400 }}>⚠ {risk.title}</h3>
            <p style={{ color:"#888",fontSize:"14px",letterSpacing:"1px",margin:"0 0 16px",lineHeight:"1.9" }}>{risk.explanation}</p>
            <div style={{ background:"#050505",border:"1px solid #111",padding:"14px" }}>
              <p style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px",margin:"0 0 6px" }}>{t("action")}</p>
              <p style={{ color:"#F5F5F5",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:"1.8" }}>{risk.action}</p>
            </div>
          </div>
        ))}
        <p style={{ color:"#1a1a1a",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  // ── INTERVIEW ──
  if (page === "interview") {
    const practicedCount = Object.keys(practiced).length;
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
          <button onClick={() => setPage("dashboard")} style={backBtn}>{t("back")}</button>
          <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"8px" }}>{t("interviewTitle")}</h1>
          <p style={{ color:"#444",fontSize:"12px",letterSpacing:"2px",marginBottom:"40px" }}>{practicedCount} {t("progressOf")} {INTERVIEW_QUESTIONS.length} {t("questionsCompleted")}</p>
          <div style={{ height:"4px",background:"#0a0a0a",marginBottom:"40px",borderRadius:"2px" }}>
            <div style={{ height:"100%",background:"#C9A84C",width:`${(practicedCount/INTERVIEW_QUESTIONS.length)*100}%`,transition:"width 0.5s ease",borderRadius:"2px" }} />
          </div>
          {INTERVIEW_QUESTIONS.map((q,i) => (
            <div key={i} style={{ ...card, borderLeft:practiced[i]?"3px solid #4ade80":"3px solid transparent",transition:"border-color 0.3s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px" }}>
                <h3 style={{ color:practiced[i]?"#555":"#F5F5F5",fontSize:"14px",letterSpacing:"1px",margin:0,fontWeight:400,flex:1,paddingRight:"16px",lineHeight:1.6 }}>{i+1}. {q}</h3>
                {practiced[i] && <span style={{ color:"#4ade80",fontSize:"10px",letterSpacing:"2px",whiteSpace:"nowrap",fontWeight:600 }}>{t("practiced")}</span>}
              </div>
              <textarea value={interviewAnswers[i]||""} onChange={e => setInterviewAnswers(prev => ({ ...prev,[i]:e.target.value }))}
                placeholder={t("yourAnswer")}
                style={{ width:"100%",background:"#080808",border:"1px solid #1a1a1a",color:"#F5F5F5",padding:"14px",fontSize:"14px",fontFamily:"inherit",resize:"vertical",minHeight:"80px",boxSizing:"border-box",outline:"none",marginBottom:"14px",lineHeight:1.8 }} />
              <button onClick={() => handleInterviewSubmit(i, q, interviewAnswers[i])}
                style={{ background:practiced[i]?"transparent":"#C9A84C",border:`1px solid ${practiced[i]?"#4ade80":"#C9A84C"}`,color:practiced[i]?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>
                {practiced[i] ? t("practiced") : t("practice")}
              </button>
              {interviewFeedback[i] && (
                <div style={{ marginTop:"14px",borderLeft:"2px solid #C9A84C",paddingLeft:"14px" }}>
                  <p style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"2px",margin:"0 0 6px" }}>AI FEEDBACK</p>
                  <p style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{interviewFeedback[i]}</p>
                </div>
              )}
            </div>
          ))}
          <p style={{ color:"#1a1a1a",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
        </div>
      </div>
    );
  }

  return null;
}
