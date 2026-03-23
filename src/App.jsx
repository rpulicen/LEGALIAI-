import { useState, useEffect } from "react";
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
    generating: "Generating your personalized analysis...", thinking: "Evaluating your answer...",
    docTitle: "YOUR DOCUMENT CHECKLIST", formTitle: "N-400 FORM WALKTHROUGH",
    riskTitle: "YOUR RISK ASSESSMENT", interviewTitle: "INTERVIEW PREP",
    yourAnswer: "Type your answer here...", practiced: "✓ PRACTICED", practice: "PRACTICE THIS",
    back: "← BACK", where: "WHERE TO GET IT:", why: "WHY USCIS NEEDS IT:",
    means: "WHAT THIS MEANS:", example: "EXAMPLE:", mistake: "⚠ COMMON MISTAKE:",
    action: "WHAT TO DO:", selectCountry: "Select your country...",
    docsComplete: "All documents gathered! Your checklist is complete.",
    progressOf: "of", questionsCompleted: "questions practiced",
    aiFeedback: "AI FEEDBACK",
    interviewNote: "Questions are in English because your USCIS interview will be in English. AI feedback will be in your selected language.",
  },
  es: {
    tagline: "TU SOLICITUD DE CIUDADANÍA —\nPREPARADA, NO ADIVINADA.",
    sub: "Preparación paso a paso con IA para el N-400. Sin abogado. $49 pago único.",
    cta: "INICIAR MI PREPARACIÓN",
    t1: "GUÍA EN ESPAÑOL CLARO", t2: "PERSONALIZADO A TU SITUACIÓN", t3: "NO ES ASESORÍA LEGAL — SOLO PREPARACIÓN",
    disclaimer: "LEGALIAI proporciona orientación de preparación únicamente. Esto no es asesoramiento legal. Para situaciones complejas, consulta a un abogado de inmigración.",
    emailTitle: "INGRESA TU CORREO PARA COMENZAR", emailSub: "Te enviaremos un enlace de acceso seguro. Sin contraseña.",
    sendLink: "ENVIAR ENLACE MÁGICO", checkEmail: "REVISA TU CORREO", checkEmailSub: "Tu enlace fue enviado. Haz clic en él para continuar.",
    q1: "¿CUÁNTO TIEMPO LLEVAS SIENDO RESIDENTE PERMANENTE?", q2: "¿ESTÁS CASADO/A CON UN/A CIUDADANO/A AMERICANO/A?",
    q3: "¿HAS VIAJADO FUERA DE EE.UU. POR MÁS DE 6 MESES SEGUIDOS?",
    q4: "¿TIENES ANTECEDENTES PENALES, INCLUSO INFRACCIONES MENORES?", q5: "¿EN QUÉ PAÍS NACISTE?",
    yes: "SÍ", no: "NO", next: "SIGUIENTE", finish: "FINALIZAR",
    q1opts: ["Menos de 3 años", "3–5 años", "5–10 años", "Más de 10 años"],
    paywallTitle: "TU PREPARACIÓN PERSONALIZADA N-400 ESTÁ LISTA.", paywallSub: "Desbloquea todo por $49 pago único.",
    unlock: "DESBLOQUEAR AHORA", paywallNote: "Pago seguro. Acceso inmediato. Sin suscripción.",
    dashTitle: "TU PANEL DE PREPARACIÓN",
    modules: ["LISTA DE DOCUMENTOS", "GUÍA DEL FORMULARIO", "EVALUACIÓN DE RIESGOS", "PREPARACIÓN PARA ENTREVISTA"],
    modDesc: ["Sabe exactamente qué reunir.", "Entiende cada pregunta del formulario.", "Conoce tus riesgos antes que USCIS.", "Practica hasta estar completamente seguro/a."],
    start: "COMENZAR", resume: "CONTINUAR", review: "REVISAR",
    notStarted: "NO INICIADO", inProgress: "EN PROGRESO", complete: "✓ COMPLETO",
    signOut: "CERRAR SESIÓN",
    aiDisclaimer: "Esta es solo orientación de preparación, no asesoramiento legal. Para situaciones complejas, consulta a un abogado de inmigración.",
    generating: "Generando tu análisis personalizado...", thinking: "Evaluando tu respuesta...",
    docTitle: "TU LISTA DE DOCUMENTOS", formTitle: "GUÍA DEL FORMULARIO N-400",
    riskTitle: "TU EVALUACIÓN DE RIESGOS", interviewTitle: "PREPARACIÓN PARA ENTREVISTA",
    yourAnswer: "Escribe tu respuesta aquí...", practiced: "✓ PRACTICADO", practice: "PRACTICAR ESTA",
    back: "← VOLVER", where: "DÓNDE OBTENERLO:", why: "POR QUÉ LO NECESITA USCIS:",
    means: "QUÉ SIGNIFICA ESTO:", example: "EJEMPLO:", mistake: "⚠ ERROR COMÚN:",
    action: "QUÉ HACER:", selectCountry: "Selecciona tu país...",
    docsComplete: "¡Todos los documentos reunidos! Tu lista está completa.",
    progressOf: "de", questionsCompleted: "preguntas practicadas",
    aiFeedback: "RETROALIMENTACIÓN DE IA",
    interviewNote: "Las preguntas están en inglés porque tu entrevista USCIS será en inglés. La retroalimentación de la IA estará en español.",
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
    generating: "正在生成您的个性化分析...", thinking: "正在评估您的答案...",
    docTitle: "您的文件清单", formTitle: "N-400表格指南",
    riskTitle: "您的风险评估", interviewTitle: "面试准备",
    yourAnswer: "在此输入您的答案...", practiced: "✓ 已练习", practice: "练习这道题",
    back: "← 返回", where: "获取地点：", why: "USCIS要求原因：",
    means: "含义：", example: "示例：", mistake: "⚠ 常见错误：",
    action: "建议行动：", selectCountry: "选择您的国家...",
    docsComplete: "所有文件已收集！您的清单已完成。",
    progressOf: "/", questionsCompleted: "道题已练习",
    aiFeedback: "AI反馈",
    interviewNote: "问题用英文显示，因为您的USCIS面试将用英文进行。AI反馈将用中文显示。",
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
    q3: "NAGLAKBAY KA BA SA LABAS NG U.S. NG HIGIT SA 6 NA BUWAN?",
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
    generating: "Ginagawa ang iyong personalisadong pagsusuri...", thinking: "Sinusuri ang iyong sagot...",
    docTitle: "ANG IYONG LISTAHAN NG DOKUMENTO", formTitle: "GABAY SA FORM N-400",
    riskTitle: "ANG IYONG PAGTATASA NG PANGANIB", interviewTitle: "PAGHAHANDA SA PANAYAM",
    yourAnswer: "I-type ang iyong sagot dito...", practiced: "✓ NASANAY NA", practice: "ISANAY ITO",
    back: "← BUMALIK", where: "SAAN MAKUKUHA:", why: "BAKIT KAILANGAN NG USCIS:",
    means: "ANG IBIG SABIHIN:", example: "HALIMBAWA:", mistake: "⚠ KARANIWANG PAGKAKAMALI:",
    action: "ANO ANG GAGAWIN:", selectCountry: "Piliin ang iyong bansa...",
    docsComplete: "Lahat ng dokumento ay nakolekta na! Kumpleto na ang iyong listahan.",
    progressOf: "sa", questionsCompleted: "mga tanong ang nasanay",
    aiFeedback: "FEEDBACK NG AI",
    interviewNote: "Ang mga tanong ay nasa Ingles dahil ang iyong panayam sa USCIS ay isasagawa sa Ingles. Ang feedback ng AI ay nasa Tagalog.",
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
    generating: "Đang tạo phân tích cá nhân hóa của bạn...", thinking: "Đang đánh giá câu trả lời của bạn...",
    docTitle: "DANH SÁCH TÀI LIỆU CỦA BẠN", formTitle: "HƯỚNG DẪN MẪU ĐƠN N-400",
    riskTitle: "ĐÁNH GIÁ RỦI RO CỦA BẠN", interviewTitle: "CHUẨN BỊ PHỎNG VẤN",
    yourAnswer: "Nhập câu trả lời của bạn tại đây...", practiced: "✓ ĐÃ LUYỆN TẬP", practice: "LUYỆN TẬP CÂU NÀY",
    back: "← QUAY LẠI", where: "NƠI LẤY TÀI LIỆU:", why: "TẠI SAO USCIS CẦN:",
    means: "Ý NGHĨA:", example: "VÍ DỤ:", mistake: "⚠ LỖI THƯỜNG GẶP:",
    action: "PHẢI LÀM GÌ:", selectCountry: "Chọn quốc gia của bạn...",
    docsComplete: "Đã thu thập tất cả tài liệu! Danh sách của bạn đã hoàn thành.",
    progressOf: "/", questionsCompleted: "câu hỏi đã luyện tập",
    aiFeedback: "PHẢN HỒI AI",
    interviewNote: "Câu hỏi bằng tiếng Anh vì buổi phỏng vấn USCIS sẽ bằng tiếng Anh. Phản hồi AI sẽ bằng tiếng Việt.",
  },
  hi: {
    tagline: "आपका अमेरिकी नागरिकता आवेदन —\nतैयार, अनुमान नहीं।",
    sub: "आपके N-400 के लिए AI-संचालित चरण-दर-चरण तैयारी। कोई वकील नहीं। एकमुश्त $49।",
    cta: "मेरी तैयारी शुरू करें",
    t1: "सरल हिंदी में मार्गदर्शन", t2: "आपकी स्थिति के अनुसार व्यक्तिगत", t3: "कानूनी सलाह नहीं — केवल तैयारी",
    disclaimer: "LEGALIAI केवल तैयारी मार्गदर्शन प्रदान करता है। यह कानूनी सलाह नहीं है। जटिल मामलों के लिए लाइसेंस प्राप्त वकील से परामर्श करें।",
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
    aiDisclaimer: "यह केवल तैयारी मार्गदर्शन है, कानूनी सलाह नहीं। जटिल मामलों के लिए लाइसेंस प्राप्त वकील से परामर्श करें।",
    generating: "आपका व्यक्तिगत विश्लेषण तैयार हो रहा है...", thinking: "आपके उत्तर का मूल्यांकन हो रहा है...",
    docTitle: "आपकी दस्तावेज़ चेकलिस्ट", formTitle: "N-400 फॉर्म वॉकथ्रू",
    riskTitle: "आपका जोखिम मूल्यांकन", interviewTitle: "साक्षात्कार तैयारी",
    yourAnswer: "यहाँ अपना उत्तर टाइप करें...", practiced: "✓ अभ्यास किया", practice: "इसका अभ्यास करें",
    back: "← वापस", where: "कहाँ से प्राप्त करें:", why: "USCIS को क्यों चाहिए:",
    means: "इसका अर्थ:", example: "उदाहरण:", mistake: "⚠ सामान्य गलती:",
    action: "क्या करें:", selectCountry: "अपना देश चुनें...",
    docsComplete: "सभी दस्तावेज़ इकट्ठे हो गए! आपकी चेकलिस्ट पूरी हो गई।",
    progressOf: "में से", questionsCompleted: "प्रश्नों का अभ्यास किया",
    aiFeedback: "AI प्रतिक्रिया",
    interviewNote: "प्रश्न अंग्रेजी में हैं क्योंकि USCIS साक्षात्कार अंग्रेजी में होगा। AI प्रतिक्रिया हिंदी में होगी।",
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
    generating: "Gerando sua análise personalizada...", thinking: "Avaliando sua resposta...",
    docTitle: "SUA LISTA DE DOCUMENTOS", formTitle: "GUIA DO FORMULÁRIO N-400",
    riskTitle: "SUA AVALIAÇÃO DE RISCOS", interviewTitle: "PREPARAÇÃO PARA ENTREVISTA",
    yourAnswer: "Digite sua resposta aqui...", practiced: "✓ PRATICADO", practice: "PRATICAR ESTA",
    back: "← VOLTAR", where: "ONDE OBTER:", why: "POR QUÊ O USCIS PRECISA:",
    means: "O QUE ISSO SIGNIFICA:", example: "EXEMPLO:", mistake: "⚠ ERRO COMUM:",
    action: "O QUE FAZER:", selectCountry: "Selecione seu país...",
    docsComplete: "Todos os documentos reunidos! Sua lista está completa.",
    progressOf: "de", questionsCompleted: "perguntas praticadas",
    aiFeedback: "FEEDBACK DA IA",
    interviewNote: "As perguntas estão em inglês porque sua entrevista no USCIS será em inglês. O feedback da IA estará em português.",
  },
};

const g = (lang, key) => {
  const langT = T[lang] || T["en"];
  return langT[key] !== undefined ? langT[key] : (T["en"][key] || key);
};

// Fallback document lists in each language
const FALLBACK_DOCS = {
  en: [
    { name: "Permanent Resident Card (Green Card)", source: "Your physical card", reason: "Proves your immigration status to USCIS" },
    { name: "Passport from birth country", source: "Home country embassy or your files", reason: "Confirms your identity and nationality" },
    { name: "Tax returns (last 5 years)", source: "IRS.gov or your tax preparer", reason: "Proves continuous U.S. residence" },
    { name: "Travel records", source: "Passport stamps or personal calendar", reason: "Documents all trips outside the U.S." },
    { name: "Marriage certificate (if applicable)", source: "Vital records office where you married", reason: "Required if married to a U.S. citizen" },
  ],
  es: [
    { name: "Tarjeta de Residente Permanente (Green Card)", source: "Tu tarjeta física", reason: "Prueba tu estatus migratorio ante USCIS" },
    { name: "Pasaporte del país de nacimiento", source: "Embajada de tu país o tus archivos", reason: "Confirma tu identidad y nacionalidad" },
    { name: "Declaraciones de impuestos (últimos 5 años)", source: "IRS.gov o tu contador", reason: "Prueba residencia continua en EE.UU." },
    { name: "Registros de viajes", source: "Sellos del pasaporte o calendario personal", reason: "Documenta todos los viajes fuera de EE.UU." },
    { name: "Acta de matrimonio (si aplica)", source: "Registro civil donde te casaste", reason: "Requerido si estás casado/a con ciudadano/a americano/a" },
  ],
  pt: [
    { name: "Cartão de Residente Permanente (Green Card)", source: "Seu cartão físico", reason: "Comprova seu status de imigração ao USCIS" },
    { name: "Passaporte do país de nascimento", source: "Embaixada do seu país ou seus arquivos", reason: "Confirma sua identidade e nacionalidade" },
    { name: "Declarações de imposto de renda (últimos 5 anos)", source: "IRS.gov ou seu contador", reason: "Comprova residência contínua nos EUA" },
    { name: "Registros de viagem", source: "Carimbos do passaporte ou calendário pessoal", reason: "Documenta todas as viagens fora dos EUA" },
    { name: "Certidão de casamento (se aplicável)", source: "Cartório onde se casou", reason: "Necessário se casado/a com cidadão/ã americano/a" },
  ],
  zh: [
    { name: "永久居民卡（绿卡）", source: "您的实体卡", reason: "向USCIS证明您的移民身份" },
    { name: "出生国护照", source: "本国大使馆或您的文件", reason: "确认您的身份和国籍" },
    { name: "纳税申报表（过去5年）", source: "IRS.gov或您的税务师", reason: "证明在美国的连续居住" },
    { name: "旅行记录", source: "护照印章或个人日历", reason: "记录所有出境旅行" },
    { name: "结婚证（如适用）", source: "结婚登记的民政局", reason: "若与美国公民结婚则需要" },
  ],
  tl: [
    { name: "Permanent Resident Card (Green Card)", source: "Ang iyong pisikal na card", reason: "Nagpapatunay ng iyong status sa imigrasyon sa USCIS" },
    { name: "Pasaporte mula sa bansang pinanganak", source: "Embahada ng iyong bansa o iyong mga file", reason: "Nagpapatunay ng iyong pagkakakilanlan at nasyonalidad" },
    { name: "Mga tax return (nakaraang 5 taon)", source: "IRS.gov o iyong tax preparer", reason: "Nagpapatunay ng tuloy-tuloy na tirahan sa U.S." },
    { name: "Mga rekord ng paglalakbay", source: "Mga selyo ng pasaporte o personal na kalendaryo", reason: "Nagdodokumento ng lahat ng mga biyahe sa labas ng U.S." },
    { name: "Sertipiko ng kasal (kung naaangkop)", source: "Opisyal na talaan kung saan kayo ikinasal", reason: "Kinakailangan kung kasal sa isang mamamayang Amerikano" },
  ],
  vi: [
    { name: "Thẻ Thường Trú Nhân (Green Card)", source: "Thẻ vật lý của bạn", reason: "Chứng minh tình trạng nhập cư với USCIS" },
    { name: "Hộ chiếu từ nước sinh quán", source: "Đại sứ quán nước bạn hoặc hồ sơ của bạn", reason: "Xác nhận danh tính và quốc tịch của bạn" },
    { name: "Khai thuế (5 năm gần nhất)", source: "IRS.gov hoặc người làm thuế của bạn", reason: "Chứng minh cư trú liên tục tại Hoa Kỳ" },
    { name: "Hồ sơ đi lại", source: "Dấu hộ chiếu hoặc lịch cá nhân", reason: "Ghi lại tất cả các chuyến đi ngoài Hoa Kỳ" },
    { name: "Giấy đăng ký kết hôn (nếu có)", source: "Cơ quan hộ tịch nơi bạn kết hôn", reason: "Bắt buộc nếu kết hôn với công dân Hoa Kỳ" },
  ],
  hi: [
    { name: "स्थायी निवासी कार्ड (ग्रीन कार्ड)", source: "आपका भौतिक कार्ड", reason: "USCIS को आपकी आव्रजन स्थिति साबित करता है" },
    { name: "जन्म देश का पासपोर्ट", source: "अपने देश का दूतावास या आपकी फाइलें", reason: "आपकी पहचान और राष्ट्रीयता की पुष्टि करता है" },
    { name: "टैक्स रिटर्न (पिछले 5 साल)", source: "IRS.gov या आपके टैक्स प्रिपेरर", reason: "अमेरिका में निरंतर निवास साबित करता है" },
    { name: "यात्रा रिकॉर्ड", source: "पासपोर्ट स्टैम्प या व्यक्तिगत कैलेंडर", reason: "अमेरिका से बाहर सभी यात्राओं का दस्तावेज़ीकरण" },
    { name: "विवाह प्रमाण पत्र (यदि लागू हो)", source: "जहाँ शादी हुई वहाँ का महत्वपूर्ण रिकॉर्ड कार्यालय", reason: "यदि अमेरिकी नागरिक से विवाहित हैं तो आवश्यक" },
  ],
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
  const [isSignIn, setIsSignIn] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [user, setUser] = useState(null);
  const [onboardingAnswers, setOnboardingAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [aiContent, setAiContent] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState({});
  const [formAnswers, setFormAnswers] = useState({});
  const [formFeedback, setFormFeedback] = useState({});
  const [interviewAnswers, setInterviewAnswers] = useState({});
  const [interviewFeedback, setInterviewFeedback] = useState({});
  const [practiced, setPracticed] = useState({});
  const [docChecks, setDocChecks] = useState({});
  const [moduleProgress, setModuleProgress] = useState({0:"NOT STARTED",1:"NOT STARTED",2:"NOT STARTED",3:"NOT STARTED"});

  const t = (key) => g(lang, key);
  const langName = LANGUAGES.find(l => l.code === lang)?.label || "English";

  // Auto-complete documents when all checked
  useEffect(() => {
    if (!aiContent.documents || aiContent.documents.length === 0) return;
    const allChecked = aiContent.documents.every((_, i) => docChecks[i]);
    if (allChecked && moduleProgress[0] !== "COMPLETE") {
      setModuleProgress(prev => ({ ...prev, 0: "COMPLETE" }));
      if (user) {
        const saveComplete = async () => {
          await supabase.from("progress").upsert({ user_id: user.id, module: "documents", status: "COMPLETE", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
          await supabase.from("progress").update({ status: "COMPLETE", updated_at: new Date().toISOString() }).eq("user_id", user.id).eq("module", "documents");
        };
        saveComplete();
      }
    }
  }, [docChecks, aiContent.documents]);

  const loadProgress = async (u) => {
    const { data } = await supabase.from("progress").select("*").eq("user_id", u.id);
    const newP = {0:"NOT STARTED",1:"NOT STARTED",2:"NOT STARTED",3:"NOT STARTED"};
    if (data && data.length > 0) {
      data.forEach(row => { if (MODULE_IDX[row.module] !== undefined) newP[MODULE_IDX[row.module]] = row.status; });
    }
    setModuleProgress(newP);
    return newP;
  };

  const goToDashboard = async () => {
    if (user) await loadProgress(user);
    setPage("dashboard");
  };

  useEffect(() => {
    const routeUser = async (u) => {
      setUser(u);
      loadProgress(u);
      // Check payment success redirect first
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        await supabase.from("users").upsert({ id: u.id, email: u.email }, { onConflict: "id" });
        await supabase.from("payments").upsert(
          { user_id: u.id, stripe_session_id: "stripe_" + Date.now(), amount: 4900, paid_at: new Date().toISOString() },
          { onConflict: "user_id" }
        );
        // Send welcome email
        try {
          const savedLang = localStorage.getItem("legaliai_lang") || "en";
          await fetch("/api/send-welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: u.email, language: savedLang }),
          });
        } catch (e) { console.error("Welcome email failed:", e); }
        window.history.replaceState({}, "", "/");
        setPage("dashboard");
        return;
      }
      // Check if already paid
      const { data: payments } = await supabase.from("payments").select("id").eq("user_id", u.id).limit(1);
      if (payments && payments.length > 0) { setPage("dashboard"); return; }
      // Check if onboarding done
      const { data: answers } = await supabase.from("onboarding_answers").select("id").eq("user_id", u.id).limit(1);
      if (answers && answers.length > 0) { setPage("paywall"); return; }
      setPage("onboarding");
    };

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) routeUser(session.user);
    });
    supabase.auth.onAuthStateChange(async (_e, session) => {
      if (session?.user) routeUser(session.user);
    });
    const savedLang = localStorage.getItem("legaliai_lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const handleLangChange = (code) => {
    setLang(code);
    localStorage.setItem("legaliai_lang", code);
    setShowLangMenu(false);
    setAiContent({});
    setFormFeedback({});
    setInterviewFeedback({});
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

  const getProgressLabel = (idx) => {
    const s = moduleProgress[idx];
    if (s === "COMPLETE") return t("complete");
    if (s === "IN PROGRESS") return t("inProgress");
    return t("notStarted");
  };

  const handleSendMagicLink = async () => {
    if (!email) return;
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: "https://legaliai.com" } });
    setMagicSent(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPage("landing");
    window.location.href = "https://legaliai.com";
  };
  const handleStartCTA = () => { if (user) setPage("onboarding"); else { setIsSignIn(false); setShowEmailModal(true); } };
  const handleSignIn = () => { setIsSignIn(true); setShowEmailModal(true); };
  const handleOnboardingNext = () => { if (currentQ < 4) setCurrentQ(currentQ + 1); else { saveOnboardingAnswers(); setPage("paywall"); } };
  const saveOnboardingAnswers = async () => { if (user) await supabase.from("onboarding_answers").upsert({ user_id: user.id, answers: onboardingAnswers }); };

  const handleUnlock = async () => {
    if (!user) { setShowEmailModal(true); return; }
    try {
      const res = await fetch("/api/stripe-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, email: user.email }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { console.error("Stripe error:", err); }
  };

  const handleModuleOpen = async (idx) => {
    const moduleName = MODULE_NAMES[idx];
    setPage(moduleName);
    // Always verify with Supabase before setting IN PROGRESS — never overwrite COMPLETE
    if (user) {
      const { data: existing } = await supabase.from("progress").select("status").eq("user_id", user.id).eq("module", moduleName).limit(1);
      const currentStatus = existing?.[0]?.status;
      if (currentStatus === "COMPLETE") {
        setModuleProgress(prev => ({ ...prev, [idx]: "COMPLETE" }));
      } else if (!currentStatus || currentStatus === "NOT STARTED") {
        setModuleProgress(prev => ({ ...prev, [idx]: "IN PROGRESS" }));
        await supabase.from("progress").upsert({ user_id: user.id, module: moduleName, status: "IN PROGRESS", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
      }
    } else if (moduleProgress[idx] === "NOT STARTED") {
      setModuleProgress(prev => ({ ...prev, [idx]: "IN PROGRESS" }));
    }
    if (idx === 0 && !aiContent.documents) generateDocuments();
    if (idx === 2 && !aiContent.risk) generateRisk();
  };

  // ── CORE: call our Vercel API proxy (fixes CORS) ──
  const callAI = async (prompt) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.text || "";
  };

  const generateDocuments = async () => {
    setLoadingAI(true);
    try {
      const text = await callAI(`You are an immigration preparation assistant. Based on these N-400 answers: ${JSON.stringify(onboardingAnswers)}, generate a personalized document checklist. IMPORTANT: Respond ENTIRELY in ${langName}. Translate ALL text including document names into ${langName}. Return ONLY a valid JSON array with no markdown or extra text: [{"name":"...","source":"...","reason":"..."}]`);
      const docs = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAiContent(prev => ({ ...prev, documents: docs }));
    } catch {
      setAiContent(prev => ({ ...prev, documents: FALLBACK_DOCS[lang] || FALLBACK_DOCS["en"] }));
    }
    setLoadingAI(false);
  };

  const generateRisk = async () => {
    setLoadingAI(true);
    try {
      const text = await callAI(`You are an immigration preparation assistant. Based on these N-400 answers: ${JSON.stringify(onboardingAnswers)}, identify 3-5 personal risk factors. IMPORTANT: Respond ENTIRELY in ${langName}. Return ONLY a valid JSON array with no markdown or extra text: [{"title":"...","explanation":"...","action":"..."}]`);
      const risks = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAiContent(prev => ({ ...prev, risk: risks }));
    } catch {
      setAiContent(prev => ({ ...prev, risk: [
        { title: lang === "pt" ? "Residência Contínua" : lang === "es" ? "Residencia Continua" : "Continuous Residence", explanation: lang === "pt" ? "Qualquer viagem de mais de 6 meses pode interromper seu requisito de residência contínua." : lang === "es" ? "Cualquier viaje de más de 6 meses puede interrumpir tu residencia continua." : "Any trip over 6 months could interrupt your continuous residence requirement.", action: lang === "pt" ? "Reúna todos os registros de viagem e esteja preparado para explicar viagens longas." : lang === "es" ? "Reúne todos los registros de viaje y prepárate para explicar viajes largos." : "Gather all travel records and be ready to explain any long trips." },
      ]}));
    }
    setLoadingAI(false);
  };

  const handleFormFeedback = async (qId, question, answer) => {
    if (!answer.trim()) return;
    setLoadingFeedback(prev => ({ ...prev, [qId]: true }));
    try {
      const feedback = await callAI(`Review this N-400 answer. Question: "${question}" Answer: "${answer}". Give 2-3 sentences of specific feedback. Is it complete? Any red flags? What to improve? IMPORTANT: Respond ENTIRELY in ${langName}.`);
      setFormFeedback(prev => ({ ...prev, [qId]: feedback }));
    } catch { setFormFeedback(prev => ({ ...prev, [qId]: "Could not get feedback. Please try again." })); }
    setLoadingFeedback(prev => ({ ...prev, [qId]: false }));
  };

  const handleInterviewSubmit = async (idx, question, answer) => {
    if (!answer.trim()) return;
    setLoadingFeedback(prev => ({ ...prev, [`interview_${idx}`]: true }));
    try {
      const feedback = await callAI(`Evaluate this N-400 interview answer. Question: "${question}" Answer: "${answer}". Rate clarity 1-10, give one specific strength and one specific improvement tip. Be encouraging. 3 sentences max. IMPORTANT: Respond ENTIRELY in ${langName}.`);
      setInterviewFeedback(prev => ({ ...prev, [idx]: feedback }));
      const newPracticed = { ...practiced, [idx]: true };
      setPracticed(newPracticed);
      if (Object.keys(newPracticed).length === INTERVIEW_QUESTIONS.length && moduleProgress[3] !== "COMPLETE") {
        setModuleProgress(prev => ({ ...prev, 3: "COMPLETE" }));
        if (user) await supabase.from("progress").upsert({ user_id: user.id, module: "interview", status: "COMPLETE", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
        setPage("interview_complete");
      }
    } catch { setInterviewFeedback(prev => ({ ...prev, [idx]: "Could not get feedback. Please try again." })); }
    setLoadingFeedback(prev => ({ ...prev, [`interview_${idx}`]: false }));
  };

  const goldBtn = { background: "#C9A84C", border: "none", color: "#000", padding: "16px 48px", fontSize: "13px", letterSpacing: "4px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" };
  const backBtn = { background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit", display: "block" };
  const card = { background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "28px", marginBottom: "2px" };

  const Nav = () => (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 40px",background:"rgba(0,0,0,0.98)",borderBottom:"1px solid #2a2a2a" }}>
      <div onClick={() => user ? goToDashboard() : setPage("landing")} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",letterSpacing:"12px",color:"#C9A84C",cursor:"pointer",fontWeight:300 }}>LEGALIAI</div>
      <div style={{ display:"flex",alignItems:"center",gap:"24px" }}>
        {user && <span style={{ color:"#777",fontSize:"12px",letterSpacing:"1px" }}>{user.email}</span>}
        {user && <button onClick={handleSignOut} style={{ background:"none",border:"none",color:"#777",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",fontFamily:"inherit" }}>{t("signOut")}</button>}
        {!user && <button onClick={handleSignIn} style={{ background:"none",border:"1px solid #333",color:"#C9A84C",padding:"7px 18px",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",fontFamily:"inherit" }}>SIGN IN</button>}
        <div style={{ position:"relative" }}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} style={{ background:"none",border:"1px solid #222",color:"#aaa",padding:"7px 16px",fontSize:"12px",letterSpacing:"1px",cursor:"pointer",fontFamily:"inherit" }}>
            🌐 {LANGUAGES.find(l => l.code === lang)?.label}
          </button>
          {showLangMenu && (
            <div style={{ position:"absolute",right:0,top:"110%",background:"#0d0d0d",border:"1px solid #222",minWidth:"190px",zIndex:200,boxShadow:"0 20px 60px rgba(0,0,0,0.8)" }}>
              {LANGUAGES.map(l => (
                <div key={l.code} onClick={() => handleLangChange(l.code)} style={{ padding:"13px 20px",color:lang===l.code?"#C9A84C":"#777",cursor:"pointer",fontSize:"14px",borderBottom:"1px solid #222",fontFamily:"'Cormorant Garamond',serif",background:lang===l.code?"#111":"transparent" }}>{l.label}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const Disclaimer = () => <p style={{ color:"#555",fontSize:"11px",textAlign:"center",letterSpacing:"1px",lineHeight:"1.8",margin:"48px auto 0",maxWidth:"600px" }}>{t("disclaimer")}</p>;

  if (page === "landing") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      {showEmailModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#0d0d0d",border:"1px solid #C9A84C",padding:"64px",maxWidth:"500px",width:"90%",textAlign:"center" }}>
            {!magicSent ? <>
              <h2 style={{ color:"#F5F5F5",fontSize:"20px",letterSpacing:"5px",marginBottom:"12px",fontWeight:300 }}>{isSignIn ? "SIGN IN TO LEGALIAI" : t("emailTitle")}</h2>
              <p style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",marginBottom:"32px",lineHeight:1.8 }}>{t("emailSub")}</p>
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleSendMagicLink()} type="email" placeholder="your@email.com" style={{ width:"100%",background:"#111",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"16px 20px",fontSize:"15px",marginBottom:"16px",boxSizing:"border-box",outline:"none",fontFamily:"inherit" }} />
              <button onClick={handleSendMagicLink} style={{ ...goldBtn, width:"100%", padding:"18px" }}>{t("sendLink")}</button>
              <button onClick={() => setShowEmailModal(false)} style={{ marginTop:"20px",background:"none",border:"none",color:"#666",fontSize:"12px",cursor:"pointer",fontFamily:"inherit" }}>✕</button>
            </> : <>
              <div style={{ fontSize:"48px",marginBottom:"24px" }}>✉️</div>
              <h2 style={{ color:"#C9A84C",fontSize:"20px",letterSpacing:"5px",marginBottom:"12px",fontWeight:300 }}>{t("checkEmail")}</h2>
              <p style={{ color:"#bbb",fontSize:"14px",letterSpacing:"1px",lineHeight:"1.8" }}>{t("checkEmailSub")}</p>
            </>}
          </div>
        </div>
      )}
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"80px 40px",textAlign:"center" }}>
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(28px,5vw,60px)",letterSpacing:"4px",fontWeight:300,lineHeight:1.3,marginBottom:"28px",whiteSpace:"pre-line" }}>{t("tagline")}</h1>
        <p style={{ color:"#aaa",fontSize:"18px",letterSpacing:"2px",marginBottom:"52px",lineHeight:1.8,maxWidth:"700px",margin:"0 auto 52px" }}>{t("sub")}</p>
        <button onClick={handleStartCTA} style={{ ...goldBtn, fontSize:"14px", padding:"22px 64px" }} onMouseOver={e => e.currentTarget.style.background="#e6c060"} onMouseOut={e => e.currentTarget.style.background="#C9A84C"}>{t("cta")}</button>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",margin:"80px 0 0" }}>
          {[t("t1"),t("t2"),t("t3")].map((text,i) => (
            <div key={i} style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"44px 32px" }}>
              <div style={{ color:"#C9A84C",fontSize:"24px",marginBottom:"20px" }}>⟡</div>
              <p style={{ color:"#999",fontSize:"12px",letterSpacing:"2px",lineHeight:"2" }}>{text}</p>
            </div>
          ))}
        </div>
        <Disclaimer />
      </div>
    </div>
  );

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
          <p style={{ color:"#666",fontSize:"11px",letterSpacing:"5px",marginBottom:"48px" }}>QUESTION {currentQ+1} OF 5</p>
          <h2 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,36px)",letterSpacing:"3px",fontWeight:300,textAlign:"center",maxWidth:"720px",marginBottom:"56px",lineHeight:1.4 }}>{q.label}</h2>
          {q.type === "yesno" && <div style={{ display:"flex",gap:"16px",marginBottom:"40px" }}>
            {[t("yes"),t("no")].map((opt,i) => (
              <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev,[q.key]:i===0?"yes":"no" }))}
                style={{ background:onboardingAnswers[q.key]===(i===0?"yes":"no")?"#C9A84C":"transparent",border:`1px solid ${onboardingAnswers[q.key]===(i===0?"yes":"no")?"#C9A84C":"#2a2a2a"}`,color:onboardingAnswers[q.key]===(i===0?"yes":"no")?"#000":"#777",padding:"18px 52px",fontSize:"13px",letterSpacing:"4px",cursor:"pointer",fontFamily:"inherit",fontWeight:700 }}>{opt}</button>
            ))}
          </div>}
          {q.type === "choice" && <div style={{ display:"flex",flexDirection:"column",gap:"12px",marginBottom:"40px",width:"100%",maxWidth:"520px" }}>
            {q.opts.map((opt,i) => (
              <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev,[q.key]:opt }))}
                style={{ background:onboardingAnswers[q.key]===opt?"#C9A84C":"transparent",border:`1px solid ${onboardingAnswers[q.key]===opt?"#C9A84C":"#2a2a2a"}`,color:onboardingAnswers[q.key]===opt?"#000":"#777",padding:"18px 32px",fontSize:"14px",letterSpacing:"2px",cursor:"pointer",fontFamily:"inherit",fontWeight:onboardingAnswers[q.key]===opt?700:400,textAlign:"left" }}>{opt}</button>
            ))}
          </div>}
          {q.type === "dropdown" && <select value={onboardingAnswers[q.key]||""} onChange={e => setOnboardingAnswers(prev => ({ ...prev,[q.key]:e.target.value }))}
            style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"16px 20px",fontSize:"15px",marginBottom:"40px",width:"100%",maxWidth:"520px",fontFamily:"inherit",outline:"none",cursor:"pointer" }}>
            <option value="">{t("selectCountry")}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>}
          <button onClick={handleOnboardingNext} style={goldBtn}>{currentQ < 4 ? t("next") : t("finish")}</button>
        </div>
      </div>
    );
  }

  if (page === "paywall") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Nav />
      <div style={{ textAlign:"center",padding:"40px",maxWidth:"640px" }}>
        <div style={{ width:"80px",height:"1px",background:"#C9A84C",margin:"0 auto 40px" }} />
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(22px,4vw,44px)",letterSpacing:"3px",fontWeight:300,marginBottom:"20px",lineHeight:1.3 }}>{t("paywallTitle")}</h1>
        <p style={{ color:"#aaa",fontSize:"18px",letterSpacing:"2px",marginBottom:"52px",lineHeight:1.8 }}>{t("paywallSub")}</p>
        <button onClick={handleUnlock} style={{ ...goldBtn, display:"block", margin:"0 auto 20px", padding:"24px 80px", fontSize:"15px" }} onMouseOver={e => e.currentTarget.style.background="#e6c060"} onMouseOut={e => e.currentTarget.style.background="#C9A84C"}>{t("unlock")}</button>
        <p style={{ color:"#666",fontSize:"12px",letterSpacing:"2px" }}>{t("paywallNote")}</p>
        <Disclaimer />
      </div>
    </div>
  );

  if (page === "dashboard") {
    const completedCount = Object.values(moduleProgress).filter(s => s === "COMPLETE").length;
    const allComplete = completedCount === 4;
    const pct = (completedCount / 4) * 100;

    // Completion screen
    if (allComplete) return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"720px",margin:"0 auto",padding:"80px 40px",textAlign:"center" }}>
          <div style={{ fontSize:"56px",marginBottom:"32px" }}>🎉</div>
          <div style={{ display:"inline-block",border:"1px solid #333",padding:"6px 16px",fontSize:"10px",letterSpacing:"4px",color:"#C9A84C",marginBottom:"32px" }}>PREPARATION COMPLETE</div>
          <h1 style={{ color:"#F5F5F5",fontSize:"clamp(28px,5vw,48px)",fontWeight:300,letterSpacing:"3px",lineHeight:1.2,marginBottom:"24px" }}>You're Ready to Apply for Citizenship</h1>
          <p style={{ color:"#aaa",fontSize:"16px",lineHeight:1.9,marginBottom:"56px",maxWidth:"540px",margin:"0 auto 56px" }}>You've completed all 4 preparation modules. You know your documents, understand your form, know your risks, and have practiced your interview. Here's what to do next.</p>

          <div style={{ display:"flex",flexDirection:"column",gap:"2px",marginBottom:"56px",textAlign:"left" }}>
            <div style={{ background:"#0d0d0d",border:"1px solid #222",borderLeft:"3px solid #C9A84C",padding:"28px 32px",display:"flex",gap:"24px",alignItems:"flex-start" }}>
              <div style={{ background:"#C9A84C",color:"#000",width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"14px",flexShrink:0 }}>1</div>
              <div>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>DOWNLOAD YOUR N-400 FORM</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:"0 0 12px" }}>Get the official N-400 form directly from USCIS. It's free.</p>
                <a href="https://www.uscis.gov/n-400" target="_blank" rel="noopener noreferrer" style={{ color:"#C9A84C",fontSize:"12px",letterSpacing:"2px" }}>USCIS.GOV/N-400 →</a>
              </div>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #222",borderLeft:"3px solid #C9A84C",padding:"28px 32px",display:"flex",gap:"24px",alignItems:"flex-start" }}>
              <div style={{ background:"#C9A84C",color:"#000",width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"14px",flexShrink:0 }}>2</div>
              <div>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>FIND YOUR FILING ADDRESS</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:"0 0 12px" }}>Your filing address depends on your state and how you're submitting. Always check the current address before mailing.</p>
                <a href="https://www.uscis.gov/n-400" target="_blank" rel="noopener noreferrer" style={{ color:"#C9A84C",fontSize:"12px",letterSpacing:"2px" }}>CHECK FILING ADDRESS →</a>
              </div>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #222",borderLeft:"3px solid #C9A84C",padding:"28px 32px",display:"flex",gap:"24px",alignItems:"flex-start" }}>
              <div style={{ background:"#C9A84C",color:"#000",width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"14px",flexShrink:0 }}>3</div>
              <div>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>PAY THE $725 FILING FEE</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:0 }}>The USCIS filing fee is $640 + $85 for biometrics = $725 total. Pay by check or money order made out to "U.S. Department of Homeland Security." Fee waivers available if you qualify.</p>
              </div>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #222",borderLeft:"3px solid #C9A84C",padding:"28px 32px",display:"flex",gap:"24px",alignItems:"flex-start" }}>
              <div style={{ background:"#C9A84C",color:"#000",width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"14px",flexShrink:0 }}>4</div>
              <div>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>MAIL YOUR APPLICATION</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:"0 0 12px" }}>Send your completed N-400, supporting documents, photos, and fee together. Use USPS Priority Mail with tracking. Keep copies of everything.</p>
              </div>
            </div>
          </div>

          <button onClick={goToDashboard} style={{ background:"transparent",border:"1px solid #333",color:"#777",padding:"12px 32px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontFamily:"inherit" }}>REVIEW MY MODULES</button>

          <p style={{ color:"#444",fontSize:"11px",marginTop:"48px",lineHeight:1.8 }}>LEGALIAI is a preparation tool only. This is not legal advice. For complex situations, consult a licensed immigration attorney.</p>
        </div>
      </div>
    );

    return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"1000px",margin:"0 auto",padding:"60px 40px" }}>
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,34px)",letterSpacing:"6px",fontWeight:300,marginBottom:"32px",textAlign:"center" }}>{t("dashTitle")}</h1>

        {/* Progress Bar */}
        <div style={{ background:"#0d0d0d",border:"1px solid #1a1a1a",padding:"28px 32px",marginBottom:"40px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px" }}>
            <span style={{ color:"#aaa",fontSize:"11px",letterSpacing:"3px" }}>{completedCount} OF 4 MODULES COMPLETE</span>
            <span style={{ color:"#C9A84C",fontSize:"14px",letterSpacing:"3px",fontWeight:700 }}>{Math.round(pct)}%</span>
          </div>
          <div style={{ height:"6px",background:"#111",width:"100%",borderRadius:"3px" }}>
            <div style={{ height:"6px",background:"#C9A84C",width:`${pct}%`,transition:"width 0.6s ease",borderRadius:"3px" }}></div>
          </div>
          {pct < 100 && <p style={{ margin:"12px 0 0",color:"#555",fontSize:"11px",letterSpacing:"2px" }}>COMPLETE ALL 4 MODULES TO FINISH YOUR PREPARATION</p>}
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px" }}>
          {t("modules").map((mod,i) => (
            <div key={i} style={{ background:"#0d0d0d",border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#1a3a1a":moduleProgress[i]==="IN PROGRESS"?"#3a3010":"#1a1a1a"}`,padding:"40px",display:"flex",flexDirection:"column",gap:"16px" }}>
              <div style={{ fontSize:"28px" }}>{["📋","📝","⚠️","🎤"][i]}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"4px",fontWeight:300,margin:0 }}>{mod}</h3>
              <p style={{ color:"#aaa",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{t("modDesc")[i]}</p>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"20px",borderTop:"1px solid #111" }}>
                <span style={{ color:getProgressColor(i),fontSize:"10px",letterSpacing:"2px",fontWeight:600 }}>{getProgressLabel(i)}</span>
                <button onClick={() => handleModuleOpen(i)} style={{ background:moduleProgress[i]==="COMPLETE"?"transparent":"#C9A84C",border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#4ade80":"#C9A84C"}`,color:moduleProgress[i]==="COMPLETE"?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>{getBtnLabel(i)}</button>
              </div>
            </div>
          ))}
        </div>
        <Disclaimer />
      </div>
    </div>
  );}

  if (page === "dashboard_modules") {
    // Same as dashboard but allComplete won't trigger completion screen
    const completedCount = Object.values(moduleProgress).filter(s => s === "COMPLETE").length;
    const pct = (completedCount / 4) * 100;
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"1000px",margin:"0 auto",padding:"60px 40px" }}>
          <h1 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,34px)",letterSpacing:"6px",fontWeight:300,marginBottom:"32px",textAlign:"center" }}>{t("dashTitle")}</h1>
          <div style={{ marginBottom:"56px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px" }}>
              <span style={{ color:"#777",fontSize:"11px",letterSpacing:"3px" }}>{completedCount} OF 4 MODULES COMPLETE</span>
              <span style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"3px",fontWeight:600 }}>{Math.round(pct)}%</span>
            </div>
            <div style={{ height:"3px",background:"#111",width:"100%" }}>
              <div style={{ height:"3px",background:"#C9A84C",width:`${pct}%`,transition:"width 0.6s ease" }}></div>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px" }}>
            {t("modules").map((mod,i) => (
              <div key={i} style={{ background:"#0d0d0d",border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#1a3a1a":moduleProgress[i]==="IN PROGRESS"?"#3a3010":"#1a1a1a"}`,padding:"40px",display:"flex",flexDirection:"column",gap:"16px" }}>
                <div style={{ fontSize:"28px" }}>{["📋","📝","⚠️","🎤"][i]}</div>
                <h3 style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"4px",fontWeight:300,margin:0 }}>{mod}</h3>
                <p style={{ color:"#aaa",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{t("modDesc")[i]}</p>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"20px",borderTop:"1px solid #111" }}>
                  <span style={{ color:getProgressColor(i),fontSize:"10px",letterSpacing:"2px",fontWeight:600 }}>{getProgressLabel(i)}</span>
                  <button onClick={() => handleModuleOpen(i)} style={{ background:moduleProgress[i]==="COMPLETE"?"transparent":"#C9A84C",border:`1px solid ${moduleProgress[i]==="COMPLETE"?"#4ade80":"#C9A84C"}`,color:moduleProgress[i]==="COMPLETE"?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>{getBtnLabel(i)}</button>
                </div>
              </div>
            ))}
          </div>
          <Disclaimer />
        </div>
      </div>
    );
  }

  if (page === "documents") {
    const allChecked = aiContent.documents?.length > 0 && aiContent.documents.every((_, i) => docChecks[i]);
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
          <button onClick={goToDashboard} style={backBtn}>{t("back")}</button>
          <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"8px" }}>{t("docTitle")}</h1>
          {aiContent.documents && <p style={{ color:"#777",fontSize:"12px",letterSpacing:"2px",marginBottom:"40px" }}>{Object.values(docChecks).filter(Boolean).length} / {aiContent.documents.length} gathered</p>}
          {loadingAI && <div style={{ padding:"60px",textAlign:"center" }}><p style={{ color:"#C9A84C",letterSpacing:"2px",fontSize:"13px" }}>{t("generating")}</p></div>}
          {allChecked && <div style={{ background:"#0a1a0a",border:"1px solid #4ade80",padding:"20px 24px",marginBottom:"24px",textAlign:"center" }}><p style={{ color:"#4ade80",fontSize:"13px",letterSpacing:"2px",margin:0 }}>✓ {t("docsComplete")}</p></div>}
          {aiContent.documents && aiContent.documents.map((doc,i) => (
            <div key={i} style={{ ...card, display:"flex", gap:"20px", alignItems:"flex-start", borderLeft:docChecks[i]?"3px solid #4ade80":"3px solid transparent" }}>
              <input type="checkbox" checked={!!docChecks[i]} onChange={e => setDocChecks(prev => ({ ...prev,[i]:e.target.checked }))} style={{ marginTop:"4px",accentColor:"#C9A84C",width:"20px",height:"20px",cursor:"pointer",flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <h3 style={{ color:docChecks[i]?"#444":"#F5F5F5",fontSize:"15px",letterSpacing:"2px",margin:"0 0 10px",textDecoration:docChecks[i]?"line-through":"none" }}>{doc.name}</h3>
                <p style={{ color:"#999",fontSize:"12px",letterSpacing:"1px",margin:"0 0 6px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px" }}>{t("where")}</span> {doc.source}</p>
                <p style={{ color:"#888",fontSize:"12px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px" }}>{t("why")}</span> {doc.reason}</p>
              </div>
            </div>
          ))}
          <p style={{ color:"#444",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
        </div>
      </div>
    );
  }

  if (page === "form") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
        <button onClick={goToDashboard} style={backBtn}>{t("back")}</button>
        <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"40px" }}>{t("formTitle")}</h1>
        {N400_SECTIONS.map((section,si) => (
          <div key={si} style={{ marginBottom:"40px" }}>
            <h2 style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"5px",marginBottom:"16px",fontWeight:400,paddingBottom:"12px",borderBottom:"1px solid #222" }}>{section.section}</h2>
            {section.questions.map((q) => (
              <div key={q.id} style={card}>
                <h3 style={{ color:"#F5F5F5",fontSize:"15px",letterSpacing:"1px",margin:"0 0 16px",fontWeight:400 }}>{q.q}</h3>
                <div style={{ background:"#0a0a0a",border:"1px solid #222",padding:"16px",marginBottom:"16px" }}>
                  <p style={{ color:"#999",fontSize:"12px",margin:"0 0 8px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px" }}>{t("means")}</span> {q.explain}</p>
                  <p style={{ color:"#888",fontSize:"12px",margin:"0 0 8px",lineHeight:1.8 }}><span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px" }}>{t("example")}</span> {q.example}</p>
                  <p style={{ color:"#888",fontSize:"12px",margin:0,lineHeight:1.8 }}><span style={{ color:"#e05555",fontSize:"10px",letterSpacing:"3px" }}>{t("mistake")}</span> {q.mistake}</p>
                </div>
                <textarea value={formAnswers[q.id]||""} onChange={e => setFormAnswers(prev => ({ ...prev,[q.id]:e.target.value }))}
                  onBlur={() => handleFormFeedback(q.id, q.q, formAnswers[q.id])}
                  placeholder={t("yourAnswer")}
                  style={{ width:"100%",background:"#0d0d0d",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"14px",fontSize:"14px",fontFamily:"inherit",resize:"vertical",minHeight:"90px",boxSizing:"border-box",outline:"none",lineHeight:1.8 }} />
                {loadingFeedback[q.id] && <p style={{ color:"#888",fontSize:"11px",letterSpacing:"2px",marginTop:"8px" }}>{t("thinking")}</p>}
                {formFeedback[q.id] && <div style={{ marginTop:"12px",borderLeft:"2px solid #C9A84C",paddingLeft:"14px" }}>
                  <p style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px",margin:"0 0 6px" }}>{t("aiFeedback")}</p>
                  <p style={{ color:"#bbb",fontSize:"13px",margin:0,lineHeight:1.8 }}>{formFeedback[q.id]}</p>
                </div>}
              </div>
            ))}
          </div>
        ))}
        {moduleProgress[1] !== "COMPLETE" && (
          <div style={{ textAlign:"center",marginTop:"40px" }}>
            <button onClick={async () => {
              setModuleProgress(prev => ({ ...prev, 1: "COMPLETE" }));
              if (user) {
                await supabase.from("progress").upsert({ user_id: user.id, module: "form", status: "COMPLETE", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
                await supabase.from("progress").update({ status: "COMPLETE", updated_at: new Date().toISOString() }).eq("user_id", user.id).eq("module", "form");
              }
              goToDashboard();
            }} style={{ background:"#C9A84C",border:"none",color:"#000",padding:"16px 48px",fontSize:"12px",letterSpacing:"4px",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>✓ MARK AS REVIEWED — COMPLETE</button>
          </div>
        )}
        {moduleProgress[1] === "COMPLETE" && <p style={{ color:"#4ade80",fontSize:"11px",letterSpacing:"3px",textAlign:"center",marginTop:"32px" }}>✓ FORM WALKTHROUGH COMPLETE</p>}
        <p style={{ color:"#444",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  if (page === "risk") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
        <button onClick={goToDashboard} style={backBtn}>{t("back")}</button>
        <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"40px" }}>{t("riskTitle")}</h1>
        {loadingAI && <div style={{ padding:"60px",textAlign:"center" }}><p style={{ color:"#C9A84C",letterSpacing:"2px",fontSize:"13px" }}>{t("generating")}</p></div>}
        {aiContent.risk && aiContent.risk.map((risk,i) => (
          <div key={i} style={{ ...card, borderLeft:"3px solid #C9A84C",marginBottom:"12px" }}>
            <h3 style={{ color:"#C9A84C",fontSize:"12px",letterSpacing:"4px",margin:"0 0 14px",fontWeight:400 }}>⚠ {risk.title}</h3>
            <p style={{ color:"#bbb",fontSize:"14px",margin:"0 0 16px",lineHeight:"1.9" }}>{risk.explanation}</p>
            <div style={{ background:"#0a0a0a",border:"1px solid #222",padding:"14px" }}>
              <p style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px",margin:"0 0 6px" }}>{t("action")}</p>
              <p style={{ color:"#F5F5F5",fontSize:"13px",margin:0,lineHeight:"1.8" }}>{risk.action}</p>
            </div>
          </div>
        ))}
        {aiContent.risk && aiContent.risk.length > 0 && moduleProgress[2] !== "COMPLETE" && (
          <div style={{ textAlign:"center",marginTop:"40px" }}>
            <button onClick={async () => {
              setModuleProgress(prev => ({ ...prev, 2: "COMPLETE" }));
              if (user) {
                await supabase.from("progress").upsert({ user_id: user.id, module: "risk", status: "COMPLETE", updated_at: new Date().toISOString() }, { onConflict: "user_id,module" });
                await supabase.from("progress").update({ status: "COMPLETE", updated_at: new Date().toISOString() }).eq("user_id", user.id).eq("module", "risk");
              }
              goToDashboard();
            }} style={{ background:"#C9A84C",border:"none",color:"#000",padding:"16px 48px",fontSize:"12px",letterSpacing:"4px",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>✓ MARK AS REVIEWED — COMPLETE</button>
          </div>
        )}
        {moduleProgress[2] === "COMPLETE" && (
          <div style={{ textAlign:"center",marginTop:"40px" }}>
            <p style={{ color:"#4ade80",fontSize:"11px",letterSpacing:"3px" }}>✓ RISK ASSESSMENT COMPLETE</p>
          </div>
        )}
        <p style={{ color:"#444",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  if (page === "interview_complete") return (
    <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
      <Nav />
      <div style={{ maxWidth:"680px",margin:"0 auto",padding:"80px 40px",textAlign:"center" }}>
        <div style={{ fontSize:"64px",marginBottom:"32px" }}>🎤</div>
        <div style={{ display:"inline-block",border:"1px solid #1a3a1a",padding:"6px 20px",fontSize:"10px",letterSpacing:"4px",color:"#4ade80",marginBottom:"32px" }}>✓ MODULE COMPLETE</div>
        <h1 style={{ color:"#F5F5F5",fontSize:"clamp(28px,4vw,42px)",fontWeight:300,letterSpacing:"3px",lineHeight:1.2,marginBottom:"24px" }}>Interview Prep Complete</h1>
        <p style={{ color:"#aaa",fontSize:"16px",lineHeight:1.9,marginBottom:"48px",maxWidth:"480px",margin:"0 auto 48px" }}>You've practiced all 20 USCIS civics questions with AI feedback. You know what to expect and how to answer confidently.</p>
        <div style={{ background:"#0a1a0a",border:"1px solid #1a3a1a",borderLeft:"3px solid #4ade80",padding:"24px 32px",marginBottom:"48px",textAlign:"left" }}>
          <p style={{ color:"#4ade80",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px" }}>WHAT TO DO BEFORE YOUR INTERVIEW</p>
          <p style={{ color:"#9be9a8",fontSize:"14px",lineHeight:1.8,margin:0 }}>Review the questions you found most difficult one more time the day before your interview. Know your state-specific answers — Governor, Senators, state capital. Arrive 15 minutes early.</p>
        </div>
        <button onClick={goToDashboard} style={{ background:"#C9A84C",border:"none",color:"#000",padding:"18px 56px",fontSize:"13px",letterSpacing:"4px",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>BACK TO DASHBOARD</button>
      </div>
    </div>
  );

  if (page === "interview") {
    const practicedCount = Object.keys(practiced).length;
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ maxWidth:"800px",margin:"0 auto",padding:"60px 40px" }}>
          <button onClick={goToDashboard} style={backBtn}>{t("back")}</button>
          <h1 style={{ color:"#F5F5F5",fontSize:"30px",letterSpacing:"6px",fontWeight:300,marginBottom:"8px" }}>{t("interviewTitle")}</h1>
          <p style={{ color:"#777",fontSize:"12px",letterSpacing:"2px",marginBottom:"16px" }}>{practicedCount} {t("progressOf")} {INTERVIEW_QUESTIONS.length} {t("questionsCompleted")}</p>
          <div style={{ height:"4px",background:"#0d0d0d",marginBottom:"16px",borderRadius:"2px" }}>
            <div style={{ height:"100%",background:"#C9A84C",width:`${(practicedCount/INTERVIEW_QUESTIONS.length)*100}%`,transition:"width 0.5s ease",borderRadius:"2px" }} />
          </div>
          <p style={{ color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"40px",lineHeight:1.8 }}>{t("interviewNote")}</p>
          {INTERVIEW_QUESTIONS.map((q,i) => (
            <div key={i} style={{ ...card, borderLeft:practiced[i]?"3px solid #4ade80":"3px solid transparent" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px" }}>
                <h3 style={{ color:practiced[i]?"#555":"#F5F5F5",fontSize:"14px",margin:0,fontWeight:400,flex:1,paddingRight:"16px",lineHeight:1.6 }}>{i+1}. {q}</h3>
                {practiced[i] && <span style={{ color:"#4ade80",fontSize:"10px",letterSpacing:"2px",whiteSpace:"nowrap",fontWeight:600 }}>{t("practiced")}</span>}
              </div>
              <textarea value={interviewAnswers[i]||""} onChange={e => setInterviewAnswers(prev => ({ ...prev,[i]:e.target.value }))}
                placeholder={t("yourAnswer")}
                style={{ width:"100%",background:"#0d0d0d",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"14px",fontSize:"14px",fontFamily:"inherit",resize:"vertical",minHeight:"80px",boxSizing:"border-box",outline:"none",marginBottom:"14px",lineHeight:1.8 }} />
              <button onClick={() => handleInterviewSubmit(i, q, interviewAnswers[i])}
                disabled={loadingFeedback[`interview_${i}`]}
                style={{ background:practiced[i]?"transparent":"#C9A84C",border:`1px solid ${practiced[i]?"#4ade80":"#C9A84C"}`,color:practiced[i]?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit",opacity:loadingFeedback[`interview_${i}`]?0.5:1 }}>
                {loadingFeedback[`interview_${i}`] ? t("thinking") : practiced[i] ? t("practiced") : t("practice")}
              </button>
              {interviewFeedback[i] && <div style={{ marginTop:"14px",borderLeft:"2px solid #C9A84C",paddingLeft:"14px" }}>
                <p style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px",margin:"0 0 6px" }}>{t("aiFeedback")}</p>
                <p style={{ color:"#bbb",fontSize:"13px",margin:0,lineHeight:1.8 }}>{interviewFeedback[i]}</p>
              </div>}
            </div>
          ))}
          <p style={{ color:"#444",fontSize:"11px",letterSpacing:"1px",marginTop:"40px",textAlign:"center",lineHeight:1.8 }}>{t("aiDisclaimer")}</p>
        </div>
      </div>
    );
  }

  return null;
}
