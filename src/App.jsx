import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Analytics } from "@vercel/analytics/react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://aut.legaliai.com";
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
  { code: "ko", label: "한국어" },
];

const T = {
  en: {
    tagline: "YOUR U.S. CITIZENSHIP APPLICATION —\nPREPARED, NOT GUESSED.",
    sub: "AI-powered step-by-step preparation for your N-400. No lawyer needed. $9.99 one-time.",
    cta: "START MY PREPARATION",
    t1: "PLAIN ENGLISH GUIDANCE", t2: "PERSONALIZED TO YOUR SITUATION", t3: "NOT LEGAL ADVICE — PREPARATION ONLY",
    insideLabel: "WHAT YOU GET FOR $9.99",
    insideTitle: "Inside LEGALIAI — Built for Your Situation",
    insideSub: "Four modules. AI-personalized to your eligibility path, travel history, and risk profile. Not a static checklist.",
    m1Title: "A Document List That Knows Your Situation",
    m1Desc: "After 9 questions about your eligibility path, travel history, and criminal record, LEGALIAI generates a checklist specific to you — not a generic 20-item list everyone gets.",
    m1Pts: ["Marriage-based vs. 5-year path documents", "Travel-history documents if you triggered them", "Criminal-record documents only if disclosed", "Where to get each document and why USCIS needs it"],
    m2Title: "Every N-400 Question — Explained Before You Answer",
    m2Desc: "All 16 sections of the N-400. Each question shows what USCIS is actually asking, an example answer, the common mistake, and AI feedback on your own answer.",
    m2Pts: ["What the question really means", "Real example answers", "The mistake most applicants make", "AI reviews your draft before you submit"],
    m3Title: "See Your Risks Before USCIS Does",
    m3Desc: "Extended travel. Criminal history. Tax gaps. The things that delay or deny applications. LEGALIAI maps your personal risk before you file — not after USCIS issues an RFE.",
    m3Pts: ["Color-coded severity for every risk flag", "What documents to bring for each", "When you need an attorney instead", "What good moral character actually means"],
    m4Title: "Practice the Interview Until You Can't Get It Wrong",
    m4Desc: "All 128 questions on the updated 2025 civics test. Practice mode with AI feedback on your answers. The interview becomes muscle memory, not anxiety.",
    m4Pts: ["Full 128-question civics test", "AI feedback on every answer", "Practice the N-400 interview itself", "Updated for October 2025 civics changes"],
    readyTitle: "Ready to Stop Guessing?",
    readySub: "9 questions. $9.99 one-time. Your personalized N-400 prep ready in under 5 minutes.",
    mkMod01: "MODULE 01 — DOCUMENTS",
    mkMod02: "MODULE 02 — FORM",
    mkMod03: "MODULE 03 — RISK",
    mkMod04: "MODULE 04 — INTERVIEW",
    mkDocsTitle: "YOUR DOCUMENTS",
    mkDocsCount: "2 / 8 GATHERED",
    mkDoc1Name: "Permanent Resident Card",
    mkDoc1Where: "Front and back copy of your green card",
    mkDoc2Name: "Joint Tax Returns — Last 3 Years",
    mkDoc2Where: "IRS.gov/transcripts — free if you do not have copies",
    mkDoc2Why: "You marked married to a US citizen — required for 3-year path",
    mkDoc3Name: "Certified Court Records — DUI 2019",
    mkDoc3Critical: "You disclosed a 2019 DUI — bring original disposition",
    mkPart9: "PART 9 — TIME OUTSIDE THE U.S.",
    mkPart9Q: "Have you taken any trip of 6 months or more outside the United States in the past 5 years?",
    mkMeansLbl: "WHAT IT MEANS:",
    mkMeansTxt: "Any single trip — not cumulative.",
    mkExampleLbl: "EXAMPLE:",
    mkExampleTxt: "1 trip of 7 months = YES. Two 4-month trips = NO.",
    mkMistakeLbl: "COMMON MISTAKE:",
    mkMistakeTxt: "Not counting return travel days.",
    mkExampleAns: "Yes — visited Brazil from June 2022 to January 2023 to take care of my father",
    mkAIFb: "AI FEEDBACK",
    mkAIFbTxt: "Strong answer. Add specific dates and bring family-caregiver evidence to your interview. This explanation supports continuous residence.",
    mkRiskTitle: "YOUR RISK PROFILE",
    mkRiskCount: "2 ITEMS",
    mkRisk1: "EXTENDED TRAVEL",
    mkLvlHigh: "HIGH",
    mkRisk1Txt: "7-month trip to Brazil 2022 — USCIS will require continuous residence evidence. Prepare employment records, lease, family-caregiver documentation.",
    mkRisk2: "2019 DUI DISCLOSURE",
    mkLvlMed: "MEDIUM",
    mkRisk2Txt: "Disclosed in onboarding. Not automatically disqualifying. Bring certified court disposition documents — not personal summaries.",
    mkRisk3: "TAX COMPLIANCE",
    mkLvlClear: "CLEAR",
    mkRisk3Txt: "All 5 years of joint tax returns confirmed. No red flags expected on good moral character.",
    mkCivicsQ: "CIVICS QUESTION 47 / 128",
    mkCivicsCat: "HISTORY · 1800s",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ CORRECT",
    mkCorrectTxt: "Perfect answer. USCIS accepts: War of 1812, Mexican-American War, Civil War, Spanish-American War.",
    mkPrev: "← PREVIOUS",
    mkNextQ: "NEXT QUESTION →",
    disclaimer: "LEGALIAI provides preparation guidance only. This is not legal advice. For complex situations, consult a licensed immigration attorney.",
    emailTitle: "ENTER YOUR EMAIL TO START", emailSub: "We'll send you a secure login link. No password needed.",
    sendLink: "SEND MAGIC LINK", checkEmail: "CHECK YOUR EMAIL", checkEmailSub: "Your magic link has been sent. Click the link in your email to continue.",
    q1: "HOW LONG HAVE YOU BEEN A PERMANENT RESIDENT?", q2: "ARE YOU MARRIED TO A U.S. CITIZEN?",
    q3: "HAVE YOU TRAVELED OUTSIDE THE U.S. FOR MORE THAN 6 MONTHS AT A TIME?",
    q4: "ANY CRIMINAL HISTORY INCLUDING MINOR OFFENSES?", q5: "WHAT COUNTRY WERE YOU BORN IN?",
    q9: "WHAT IS YOUR RESIDENT SINCE DATE? (from your green card)", q6: "DO YOU HAVE ANY PRIOR MARRIAGES THAT ENDED?", q7: "HAVE YOU EVER HAD A LEGAL NAME CHANGE?", q8: "HAVE YOU SERVED IN THE U.S. MILITARY?",
    yes: "YES", no: "NO", next: "NEXT", finish: "FINISH",
    q1opts: ["Less than 3 years", "3–5 years", "5–10 years", "More than 10 years"],
    paywallTitle: "YOUR PERSONALIZED N-400 PREPARATION IS READY.",
    paywallSub: "Unlock everything for $9.99 one-time.",
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
    sub: "Preparación paso a paso con IA para el N-400. Sin abogado. $9.99 pago único.",
    cta: "INICIAR MI PREPARACIÓN",
    insideLabel: "LO QUE OBTIENES POR $9.99",
    insideTitle: "Dentro de LEGALIAI — Hecho para Tu Situación",
    insideSub: "Cuatro módulos. Personalizados por IA según tu vía de elegibilidad, historial de viajes y perfil de riesgo. No es una lista estática.",
    m1Title: "Una Lista de Documentos Hecha para Ti",
    m1Desc: "Después de 9 preguntas sobre tu vía de elegibilidad, historial de viajes y antecedentes penales, LEGALIAI genera una lista específica para ti — no una lista genérica de 20 ítems.",
    m1Pts: ["Documentos según vía: matrimonio vs. 5 años", "Documentos de historial de viajes si los activaste", "Documentos de antecedentes solo si los declaraste", "Dónde obtener cada documento y por qué USCIS lo necesita"],
    m2Title: "Cada Pregunta del N-400 — Explicada Antes de Responder",
    m2Desc: "Las 16 secciones del N-400. Cada pregunta muestra lo que USCIS realmente pregunta, un ejemplo de respuesta, el error común, y comentarios de IA sobre tu respuesta.",
    m2Pts: ["Lo que realmente significa la pregunta", "Ejemplos reales de respuestas", "El error que cometen la mayoría de los aplicantes", "La IA revisa tu borrador antes de enviar"],
    m3Title: "Conoce Tus Riesgos Antes que USCIS",
    m3Desc: "Viajes prolongados. Antecedentes penales. Brechas fiscales. Las cosas que retrasan o niegan aplicaciones. LEGALIAI mapea tu riesgo personal antes de presentar — no después de un RFE.",
    m3Pts: ["Severidad por código de color para cada riesgo", "Qué documentos llevar para cada uno", "Cuándo necesitas un abogado en su lugar", "Qué significa realmente buen carácter moral"],
    m4Title: "Practica la Entrevista Hasta Dominarla",
    m4Desc: "Las 128 preguntas del examen de civismo actualizado 2025. Modo de práctica con comentarios de IA. La entrevista se vuelve memoria muscular, no ansiedad.",
    m4Pts: ["Examen completo de 128 preguntas de civismo", "Comentarios de IA en cada respuesta", "Practica la entrevista N-400", "Actualizado para los cambios de civismo de Oct 2025"],
    readyTitle: "¿Listo para Dejar de Adivinar?",
    readySub: "9 preguntas. $9.99 pago único. Tu preparación N-400 personalizada lista en menos de 5 minutos.",
    mkMod01: "MÓDULO 01 — DOCUMENTOS",
    mkMod02: "MÓDULO 02 — FORMULARIO",
    mkMod03: "MÓDULO 03 — RIESGO",
    mkMod04: "MÓDULO 04 — ENTREVISTA",
    mkDocsTitle: "TUS DOCUMENTOS",
    mkDocsCount: "2 / 8 RECOLECTADOS",
    mkDoc1Name: "Tarjeta de Residente Permanente (Green Card)",
    mkDoc1Where: "Copia frontal y trasera de tu green card",
    mkDoc2Name: "Declaraciones de Impuestos Conjuntas — Últimos 3 Años",
    mkDoc2Where: "IRS.gov/transcripts — gratis si no tienes copias",
    mkDoc2Why: "Marcaste casado(a) con ciudadano de EE.UU. — requerido para vía de 3 años",
    mkDoc3Name: "Registros Certificados de la Corte — DUI 2019",
    mkDoc3Critical: "Declaraste un DUI de 2019 — trae la disposición original",
    mkPart9: "PARTE 9 — TIEMPO FUERA DE EE.UU.",
    mkPart9Q: "¿Has hecho algún viaje de 6 meses o más fuera de los Estados Unidos en los últimos 5 años?",
    mkMeansLbl: "QUÉ SIGNIFICA:",
    mkMeansTxt: "Cualquier viaje único — no acumulativo.",
    mkExampleLbl: "EJEMPLO:",
    mkExampleTxt: "1 viaje de 7 meses = SÍ. Dos viajes de 4 meses = NO.",
    mkMistakeLbl: "ERROR COMÚN:",
    mkMistakeTxt: "No contar los días de viaje de regreso.",
    mkExampleAns: "Sí — visité México de junio 2022 a enero 2023 para cuidar a mi padre",
    mkAIFb: "COMENTARIOS DE IA",
    mkAIFbTxt: "Respuesta sólida. Agrega fechas específicas y lleva evidencia de cuidador familiar a tu entrevista. Esta explicación apoya residencia continua.",
    mkRiskTitle: "TU PERFIL DE RIESGO",
    mkRiskCount: "2 ÍTEMS",
    mkRisk1: "VIAJE PROLONGADO",
    mkLvlHigh: "ALTO",
    mkRisk1Txt: "Viaje de 7 meses a México 2022 — USCIS requerirá evidencia de residencia continua. Prepara registros de empleo, arrendamiento, documentación de cuidador familiar.",
    mkRisk2: "DIVULGACIÓN DE DUI 2019",
    mkLvlMed: "MEDIO",
    mkRisk2Txt: "Declarado en onboarding. No descalifica automáticamente. Trae documentos certificados de la corte — no resúmenes personales.",
    mkRisk3: "CUMPLIMIENTO FISCAL",
    mkLvlClear: "LIMPIO",
    mkRisk3Txt: "Los 5 años de declaraciones conjuntas confirmados. No se esperan red flags en buen carácter moral.",
    mkCivicsQ: "PREGUNTA DE CIVISMO 47 / 128",
    mkCivicsCat: "HISTORIA · Siglo XIX",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ CORRECTO",
    mkCorrectTxt: "Respuesta perfecta. USCIS acepta: Guerra de 1812, Guerra Mexicano-Estadounidense, Guerra Civil, Guerra Hispano-Estadounidense.",
    mkPrev: "← ANTERIOR",
    mkNextQ: "SIGUIENTE PREGUNTA →",
    t1: "GUÍA EN ESPAÑOL CLARO", t2: "PERSONALIZADO A TU SITUACIÓN", t3: "NO ES ASESORÍA LEGAL — SOLO PREPARACIÓN",
    disclaimer: "LEGALIAI proporciona orientación de preparación únicamente. Esto no es asesoramiento legal. Para situaciones complejas, consulta a un abogado de inmigración.",
    emailTitle: "INGRESA TU CORREO PARA COMENZAR", emailSub: "Te enviaremos un enlace de acceso seguro. Sin contraseña.",
    sendLink: "ENVIAR ENLACE MÁGICO", checkEmail: "REVISA TU CORREO", checkEmailSub: "Tu enlace fue enviado. Haz clic en él para continuar.",
    q1: "¿CUÁNTO TIEMPO LLEVAS SIENDO RESIDENTE PERMANENTE?", q2: "¿ESTÁS CASADO/A CON UN/A CIUDADANO/A AMERICANO/A?",
    q3: "¿HAS VIAJADO FUERA DE EE.UU. POR MÁS DE 6 MESES SEGUIDOS?",
    q4: "¿TIENES ANTECEDENTES PENALES, INCLUSO INFRACCIONES MENORES?", q5: "¿EN QUÉ PAÍS NACISTE?",
    q9: "¿CUÁL ES TU FECHA DE RESIDENCIA? (de tu tarjeta verde)", q6: "¿TIENES MATRIMONIOS ANTERIORES QUE HAYAN TERMINADO?", q7: "¿HAS TENIDO UN CAMBIO LEGAL DE NOMBRE?", q8: "¿HAS SERVIDO EN LAS FUERZAS ARMADAS DE EE.UU.?",
    yes: "SÍ", no: "NO", next: "SIGUIENTE", finish: "FINALIZAR",
    q1opts: ["Menos de 3 años", "3–5 años", "5–10 años", "Más de 10 años"],
    paywallTitle: "TU PREPARACIÓN PERSONALIZADA N-400 ESTÁ LISTA.", paywallSub: "Desbloquea todo por $9.99 pago único.",
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
    sub: "AI驱动的N-400逐步准备指南。无需律师。一次性$9.99。",
    cta: "开始我的准备",
    insideLabel: "$9.99 包含的内容",
    insideTitle: "LEGALIAI 内部 — 为您的情况量身定制",
    insideSub: "四个模块。AI 根据您的资格途径、旅行历史和风险概况个性化定制。不是静态清单。",
    m1Title: "了解您情况的文件清单",
    m1Desc: "在询问 9 个关于您资格途径、旅行历史和犯罪记录的问题后,LEGALIAI 会为您生成一份专属清单 — 而不是每个人都得到的通用 20 项清单。",
    m1Pts: ["基于婚姻 vs. 5年途径的文件", "如果触发则需要旅行历史文件", "仅在披露时需要犯罪记录文件", "在哪里获取每份文件以及 USCIS 为何需要它"],
    m2Title: "N-400 每个问题 — 在您回答之前解释",
    m2Desc: "N-400 的所有 16 个部分。每个问题都展示 USCIS 实际在问什么、答案示例、常见错误,以及对您答案的 AI 反馈。",
    m2Pts: ["问题真正的含义", "真实答案示例", "大多数申请人犯的错误", "AI 在您提交前审查草稿"],
    m3Title: "在 USCIS 之前看到您的风险",
    m3Desc: "延长的旅行。犯罪历史。税务缺口。导致申请延迟或被拒的事情。LEGALIAI 在您提交前 — 而不是在 USCIS 发出 RFE 后 — 映射您的个人风险。",
    m3Pts: ["每个风险标志的颜色编码严重性", "每个风险要带的文件", "什么时候您需要律师", "良好道德品格的真正含义"],
    m4Title: "练习面试直到无懈可击",
    m4Desc: "2025 年更新的公民测试的全部 128 个问题。带有 AI 反馈的练习模式。面试变成肌肉记忆,而不是焦虑。",
    m4Pts: ["完整的 128 题公民测试", "每个答案的 AI 反馈", "练习 N-400 面试本身", "针对 2025 年 10 月公民变化更新"],
    readyTitle: "准备好停止猜测了吗?",
    readySub: "9 个问题。$9.99 一次性付款。您的个性化 N-400 准备工作在 5 分钟内完成。",
    mkMod01: "模块 01 — 文件",
    mkMod02: "模块 02 — 表格",
    mkMod03: "模块 03 — 风险",
    mkMod04: "模块 04 — 面试",
    mkDocsTitle: "您的文件",
    mkDocsCount: "已收集 2 / 8",
    mkDoc1Name: "永久居民卡(绿卡)",
    mkDoc1Where: "您绿卡的正反面副本",
    mkDoc2Name: "联合报税表 — 过去 3 年",
    mkDoc2Where: "IRS.gov/transcripts — 如果没有副本可免费获取",
    mkDoc2Why: "您标记为与美国公民结婚 — 3 年路径要求",
    mkDoc3Name: "法院认证记录 — 2019 年 DUI",
    mkDoc3Critical: "您披露了 2019 年的 DUI — 携带原始判决",
    mkPart9: "第 9 部分 — 离开美国的时间",
    mkPart9Q: "在过去 5 年中,您是否有过任何一次 6 个月或以上离开美国的旅行?",
    mkMeansLbl: "含义:",
    mkMeansTxt: "任何单次旅行 — 不累计。",
    mkExampleLbl: "示例:",
    mkExampleTxt: "1 次 7 个月的旅行 = 是。两次 4 个月的旅行 = 否。",
    mkMistakeLbl: "常见错误:",
    mkMistakeTxt: "没有计算返程旅行天数。",
    mkExampleAns: "是 — 2022 年 6 月至 2023 年 1 月访问中国照顾我的父亲",
    mkAIFb: "AI 反馈",
    mkAIFbTxt: "强势答案。在您的面试中添加具体日期并带上家庭照顾者证据。这一解释支持持续居住。",
    mkRiskTitle: "您的风险概况",
    mkRiskCount: "2 项",
    mkRisk1: "长期旅行",
    mkLvlHigh: "高",
    mkRisk1Txt: "2022 年 7 个月的中国之行 — USCIS 将要求持续居住证据。准备就业记录、租约、家庭照顾者文件。",
    mkRisk2: "2019 年 DUI 披露",
    mkLvlMed: "中",
    mkRisk2Txt: "入门时披露。不会自动取消资格。携带法院认证的处置文件 — 而非个人摘要。",
    mkRisk3: "税务合规",
    mkLvlClear: "清晰",
    mkRisk3Txt: "所有 5 年的联合报税表已确认。良好道德品格预计无红旗。",
    mkCivicsQ: "公民问题 47 / 128",
    mkCivicsCat: "历史 · 1800 年代",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ 正确",
    mkCorrectTxt: "完美答案。USCIS 接受:1812 年战争、美墨战争、内战、美西战争。",
    mkPrev: "← 上一个",
    mkNextQ: "下一个问题 →",
    t1: "简明中文指导", t2: "根据您的情况个性化定制", t3: "非法律建议 — 仅为准备指导",
    disclaimer: "LEGALIAI仅提供准备指导，这不是法律建议。对于复杂情况，请咨询持牌移民律师。",
    emailTitle: "输入您的电子邮件开始", emailSub: "我们将发送安全登录链接，无需密码。",
    sendLink: "发送魔法链接", checkEmail: "查看您的邮件", checkEmailSub: "魔法链接已发送，请点击邮件中的链接继续。",
    q1: "您成为永久居民多久了？", q2: "您是否与美国公民结婚？",
    q3: "您是否曾在美国境外旅行超过6个月？",
    q4: "是否有犯罪记录，包括轻微违规？", q5: "您出生在哪个国家？",
    q9: "您的绿卡上的居民日期是什么？", q6: "您有过以前结束的婚姻吗？", q7: "您是否曾经合法更名？", q8: "您是否在美国军队服役过？",
    yes: "是", no: "否", next: "下一步", finish: "完成",
    q1opts: ["不到3年", "3–5年", "5–10年", "超过10年"],
    paywallTitle: "您的个性化N-400准备已就绪。", paywallSub: "一次性$9.99解锁所有内容。",
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
    sub: "Hakbang-hakbang na paghahanda gamit ang AI para sa N-400. Walang abogado. $9.99 isang beses.",
    cta: "SIMULAN ANG AKING PAGHAHANDA",
    insideLabel: "ANG MAKUKUHA MO SA $9.99",
    insideTitle: "Sa Loob ng LEGALIAI — Ginawa Para sa Iyong Sitwasyon",
    insideSub: "Apat na module. Personalized ng AI batay sa iyong daan ng eligibility, kasaysayan ng paglalakbay, at risk profile. Hindi static checklist.",
    m1Title: "Listahan ng Dokumento na Alam ang Iyong Sitwasyon",
    m1Desc: "Pagkatapos ng 9 na tanong tungkol sa iyong daan ng eligibility, kasaysayan ng paglalakbay, at criminal record, gumagawa ang LEGALIAI ng tiyak na listahan para sa iyo — hindi generic na 20-item na listahan.",
    m1Pts: ["Marriage-based vs. 5-year path documents", "Travel-history documents kung naipasok mo", "Criminal-record documents kung sinabi lang", "Saan kunin ang bawat dokumento at bakit kailangan ng USCIS"],
    m2Title: "Bawat Tanong sa N-400 — Ipinaliwanag Bago Mo Sagutin",
    m2Desc: "Lahat ng 16 na seksyon ng N-400. Ipinapakita ng bawat tanong kung ano talaga ang tinatanong ng USCIS, halimbawang sagot, ang karaniwang pagkakamali, at AI feedback sa iyong sagot.",
    m2Pts: ["Ano talaga ang ibig sabihin ng tanong", "Tunay na halimbawang sagot", "Pagkakamali ng karamihan sa mga aplikante", "AI tinitingnan ang iyong draft bago ipasa"],
    m3Title: "Tingnan ang Iyong Mga Risk Bago ng USCIS",
    m3Desc: "Mahabang paglalakbay. Criminal history. Tax gaps. Ang mga bagay na nagpapatagal o tumatanggi sa aplikasyon. Sinusubaybayan ng LEGALIAI ang iyong personal na risk bago ipasa — hindi pagkatapos ng RFE.",
    m3Pts: ["Color-coded severity para sa bawat risk", "Anong dokumento ang dadalhin para sa bawat isa", "Kailan kailangan mo ng abogado", "Ano talaga ang ibig sabihin ng good moral character"],
    m4Title: "Mag-practice ng Interview Hanggang Hindi Ka Magkakamali",
    m4Desc: "Lahat ng 128 tanong sa updated 2025 civics test. Practice mode na may AI feedback. Ang interview ay nagiging muscle memory, hindi anxiety.",
    m4Pts: ["Buong 128-tanong na civics test", "AI feedback sa bawat sagot", "Practice ng N-400 interview mismo", "Updated para sa Oct 2025 civics changes"],
    readyTitle: "Handa Ka Nang Tumigil sa Paghuhula?",
    readySub: "9 tanong. $9.99 one-time. Ang iyong personalized N-400 prep ay handa sa loob ng 5 minuto.",
    mkMod01: "MODULE 01 — DOCUMENTS",
    mkMod02: "MODULE 02 — FORM",
    mkMod03: "MODULE 03 — RISK",
    mkMod04: "MODULE 04 — INTERVIEW",
    mkDocsTitle: "IYONG MGA DOKUMENTO",
    mkDocsCount: "2 / 8 NAKUHA",
    mkDoc1Name: "Permanent Resident Card (Green Card)",
    mkDoc1Where: "Harap at likod ng iyong green card",
    mkDoc2Name: "Joint Tax Returns — Huling 3 Taon",
    mkDoc2Where: "IRS.gov/transcripts — libre kung wala kang kopya",
    mkDoc2Why: "Tinanda mong kasal sa US citizen — required para sa 3-year path",
    mkDoc3Name: "Sertipikadong Tala ng Korte — DUI 2019",
    mkDoc3Critical: "Inihayag mo ang 2019 DUI — dalhin ang original disposition",
    mkPart9: "BAHAGI 9 — ORAS SA LABAS NG U.S.",
    mkPart9Q: "Mayroon ka bang biyahe na 6 buwan o higit pa sa labas ng Estados Unidos sa loob ng nakaraang 5 taon?",
    mkMeansLbl: "ANO ANG IBIG SABIHIN:",
    mkMeansTxt: "Anumang isang biyahe — hindi cumulative.",
    mkExampleLbl: "HALIMBAWA:",
    mkExampleTxt: "1 biyahe ng 7 buwan = OO. Dalawang biyahe ng 4 buwan = HINDI.",
    mkMistakeLbl: "KARANIWANG PAGKAKAMALI:",
    mkMistakeTxt: "Hindi binibilang ang mga araw ng pagbabalik.",
    mkExampleAns: "Oo — bumisita sa Pilipinas mula Hunyo 2022 hanggang Enero 2023 upang alagaan ang aking ama",
    mkAIFb: "AI FEEDBACK",
    mkAIFbTxt: "Malakas na sagot. Magdagdag ng partikular na petsa at magdala ng family-caregiver evidence sa iyong interview. Sinusuportahan nito ang continuous residence.",
    mkRiskTitle: "IYONG RISK PROFILE",
    mkRiskCount: "2 ITEMS",
    mkRisk1: "MAHABANG BIYAHE",
    mkLvlHigh: "MATAAS",
    mkRisk1Txt: "7 buwang biyahe sa Pilipinas 2022 — Hihingi ang USCIS ng continuous residence evidence. Maghanda ng employment records, lease, family-caregiver dokumentasyon.",
    mkRisk2: "PAGHAYAG NG 2019 DUI",
    mkLvlMed: "KATAMTAMAN",
    mkRisk2Txt: "Inihayag sa onboarding. Hindi automatic na disqualifying. Magdala ng sertipikadong court disposition documents — hindi personal summaries.",
    mkRisk3: "TAX COMPLIANCE",
    mkLvlClear: "MALINIS",
    mkRisk3Txt: "Lahat ng 5 taon ng joint tax returns kumpirmado. Walang red flags na inaasahan sa good moral character.",
    mkCivicsQ: "CIVICS QUESTION 47 / 128",
    mkCivicsCat: "KASAYSAYAN · 1800s",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ TAMA",
    mkCorrectTxt: "Perpektong sagot. Tinatanggap ng USCIS: Digmaan ng 1812, Mexican-American War, Civil War, Spanish-American War.",
    mkPrev: "← NAKARAAN",
    mkNextQ: "SUNOD NA TANONG →",
    t1: "GABAY SA SIMPLENG TAGALOG", t2: "INANGKOP SA IYONG SITWASYON", t3: "HINDI LEGAL NA PAYO — PAGHAHANDA LAMANG",
    disclaimer: "Ang LEGALIAI ay nagbibigay lamang ng gabay sa paghahanda. Hindi ito legal na payo. Para sa mga kumplikadong sitwasyon, kumonsulta sa isang lisensyadong abogado.",
    emailTitle: "ILAGAY ANG IYONG EMAIL PARA MAGSIMULA", emailSub: "Magpapadala kami ng secure na link. Walang password.",
    sendLink: "MAGPADALA NG MAGIC LINK", checkEmail: "SURIIN ANG IYONG EMAIL", checkEmailSub: "Naipadala na ang iyong magic link. I-click ang link sa email mo para magpatuloy.",
    q1: "GAANO KATAGAL KA NANG PERMANENTENG RESIDENTE?", q2: "IKA'Y KASAL BA SA ISANG MAMAMAYANG AMERIKANO?",
    q3: "NAGLAKBAY KA BA SA LABAS NG U.S. NG HIGIT SA 6 NA BUWAN?",
    q4: "MAY KASAYSAYAN BA NG KRIMEN, KASAMA ANG MALILIIT NA PAGKAKASALA?", q5: "SA ANONG BANSA KA IPINANGANAK?",
    q9: "ANO ANG IYONG RESIDENT SINCE DATE? (mula sa iyong green card)", q6: "MAYROON KA BANG MGA NAKARAANG KASAL NA NATAPOS?", q7: "NAKARANAS KA NA BA NG LEGAL NA PAGPAPALIT NG PANGALAN?", q8: "NAGSILBI KA BA SA HUKBO NG U.S.?",
    yes: "OO", no: "HINDI", next: "SUSUNOD", finish: "TAPUSIN",
    q1opts: ["Wala pang 3 taon", "3–5 taon", "5–10 taon", "Higit sa 10 taon"],
    paywallTitle: "HANDA NA ANG IYONG PERSONALISADONG N-400 NA PAGHAHANDA.", paywallSub: "I-unlock ang lahat para sa $9.99 isang beses.",
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
    sub: "Chuẩn bị từng bước với AI cho N-400. Không cần luật sư. $9.99 một lần.",
    cta: "BẮT ĐẦU CHUẨN BỊ CỦA TÔI",
    insideLabel: "BẠN ĐƯỢC GÌ VỚI $9.99",
    insideTitle: "Bên Trong LEGALIAI — Được Xây Dựng Cho Tình Huống Của Bạn",
    insideSub: "Bốn mô-đun. Được AI cá nhân hóa theo đường đủ điều kiện, lịch sử đi lại và hồ sơ rủi ro của bạn. Không phải danh sách tĩnh.",
    m1Title: "Danh Sách Tài Liệu Biết Tình Huống Của Bạn",
    m1Desc: "Sau 9 câu hỏi về đường đủ điều kiện, lịch sử đi lại và hồ sơ tội phạm của bạn, LEGALIAI tạo một danh sách cụ thể cho bạn — không phải danh sách 20 mục chung chung.",
    m1Pts: ["Tài liệu theo đường: hôn nhân vs. 5 năm", "Tài liệu lịch sử đi lại nếu bạn kích hoạt", "Tài liệu tội phạm chỉ khi tiết lộ", "Lấy mỗi tài liệu ở đâu và tại sao USCIS cần"],
    m2Title: "Mỗi Câu Hỏi N-400 — Được Giải Thích Trước Khi Trả Lời",
    m2Desc: "Tất cả 16 phần của N-400. Mỗi câu hỏi cho biết USCIS thực sự đang hỏi gì, câu trả lời mẫu, lỗi phổ biến và phản hồi AI về câu trả lời của bạn.",
    m2Pts: ["Câu hỏi thực sự có nghĩa gì", "Ví dụ câu trả lời thực tế", "Lỗi mà hầu hết người nộp đơn mắc phải", "AI xem xét bản nháp trước khi gửi"],
    m3Title: "Xem Rủi Ro Trước Khi USCIS Thấy",
    m3Desc: "Đi lại kéo dài. Lịch sử tội phạm. Khoảng trống thuế. Những điều làm trì hoãn hoặc từ chối đơn. LEGALIAI ánh xạ rủi ro cá nhân trước khi nộp — không phải sau RFE.",
    m3Pts: ["Mức độ nghiêm trọng có mã màu cho mỗi rủi ro", "Tài liệu nào mang theo cho mỗi loại", "Khi nào bạn cần luật sư thay thế", "Phẩm chất đạo đức tốt thực sự nghĩa là gì"],
    m4Title: "Luyện Phỏng Vấn Đến Khi Không Sai Được",
    m4Desc: "Tất cả 128 câu hỏi trong bài kiểm tra công dân cập nhật 2025. Chế độ luyện tập với phản hồi AI. Cuộc phỏng vấn trở thành trí nhớ cơ bắp, không phải lo lắng.",
    m4Pts: ["Bài kiểm tra công dân 128 câu đầy đủ", "Phản hồi AI cho mọi câu trả lời", "Luyện phỏng vấn N-400 thực tế", "Cập nhật cho thay đổi công dân tháng 10/2025"],
    readyTitle: "Sẵn Sàng Ngừng Đoán?",
    readySub: "9 câu hỏi. $9.99 thanh toán một lần. Chuẩn bị N-400 cá nhân hóa sẵn sàng trong 5 phút.",
    mkMod01: "MÔ-ĐUN 01 — TÀI LIỆU",
    mkMod02: "MÔ-ĐUN 02 — BIỂU MẪU",
    mkMod03: "MÔ-ĐUN 03 — RỦI RO",
    mkMod04: "MÔ-ĐUN 04 — PHỎNG VẤN",
    mkDocsTitle: "TÀI LIỆU CỦA BẠN",
    mkDocsCount: "ĐÃ THU THẬP 2 / 8",
    mkDoc1Name: "Thẻ Thường Trú Nhân (Green Card)",
    mkDoc1Where: "Bản sao mặt trước và mặt sau thẻ xanh của bạn",
    mkDoc2Name: "Khai Thuế Chung — 3 Năm Gần Nhất",
    mkDoc2Where: "IRS.gov/transcripts — miễn phí nếu bạn không có bản sao",
    mkDoc2Why: "Bạn đã đánh dấu kết hôn với công dân Hoa Kỳ — yêu cầu cho đường 3 năm",
    mkDoc3Name: "Hồ Sơ Tòa Án Có Chứng Nhận — DUI 2019",
    mkDoc3Critical: "Bạn đã tiết lộ DUI 2019 — mang theo bản gốc",
    mkPart9: "PHẦN 9 — THỜI GIAN BÊN NGOÀI HOA KỲ",
    mkPart9Q: "Bạn có chuyến đi nào từ 6 tháng trở lên bên ngoài Hoa Kỳ trong 5 năm qua không?",
    mkMeansLbl: "Ý NGHĨA:",
    mkMeansTxt: "Bất kỳ chuyến đi đơn lẻ nào — không tích lũy.",
    mkExampleLbl: "VÍ DỤ:",
    mkExampleTxt: "1 chuyến đi 7 tháng = CÓ. Hai chuyến đi 4 tháng = KHÔNG.",
    mkMistakeLbl: "LỖI THƯỜNG GẶP:",
    mkMistakeTxt: "Không tính ngày di chuyển về.",
    mkExampleAns: "Có — về thăm Việt Nam từ tháng 6/2022 đến tháng 1/2023 để chăm sóc cha tôi",
    mkAIFb: "PHẢN HỒI AI",
    mkAIFbTxt: "Câu trả lời mạnh mẽ. Thêm ngày cụ thể và mang bằng chứng chăm sóc gia đình đến phỏng vấn. Lời giải thích này hỗ trợ cư trú liên tục.",
    mkRiskTitle: "HỒ SƠ RỦI RO CỦA BẠN",
    mkRiskCount: "2 MỤC",
    mkRisk1: "ĐI LẠI KÉO DÀI",
    mkLvlHigh: "CAO",
    mkRisk1Txt: "Chuyến đi 7 tháng đến Việt Nam 2022 — USCIS sẽ yêu cầu bằng chứng cư trú liên tục. Chuẩn bị hồ sơ việc làm, hợp đồng thuê, tài liệu chăm sóc gia đình.",
    mkRisk2: "TIẾT LỘ DUI 2019",
    mkLvlMed: "TRUNG BÌNH",
    mkRisk2Txt: "Tiết lộ trong onboarding. Không tự động bị từ chối. Mang tài liệu tòa án được chứng nhận — không phải tóm tắt cá nhân.",
    mkRisk3: "TUÂN THỦ THUẾ",
    mkLvlClear: "SẠCH",
    mkRisk3Txt: "Tất cả 5 năm khai thuế chung đã được xác nhận. Không có cờ đỏ về phẩm chất đạo đức tốt.",
    mkCivicsQ: "CÂU HỎI CÔNG DÂN 47 / 128",
    mkCivicsCat: "LỊCH SỬ · 1800s",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ ĐÚNG",
    mkCorrectTxt: "Câu trả lời hoàn hảo. USCIS chấp nhận: Chiến tranh 1812, Chiến tranh Mỹ-Mexico, Nội chiến, Chiến tranh Tây Ban Nha-Mỹ.",
    mkPrev: "← TRƯỚC",
    mkNextQ: "CÂU HỎI TIẾP THEO →",
    t1: "HƯỚNG DẪN TIẾNG VIỆT RÕ RÀNG", t2: "CÁ NHÂN HÓA THEO TÌNH HUỐNG CỦA BẠN", t3: "KHÔNG PHẢI TƯ VẤN PHÁP LÝ — CHỈ CHUẨN BỊ",
    disclaimer: "LEGALIAI chỉ cung cấp hướng dẫn chuẩn bị. Đây không phải tư vấn pháp lý. Với các trường hợp phức tạp, hãy tham khảo luật sư di trú có giấy phép.",
    emailTitle: "NHẬP EMAIL ĐỂ BẮT ĐẦU", emailSub: "Chúng tôi sẽ gửi liên kết đăng nhập bảo mật. Không cần mật khẩu.",
    sendLink: "GỬI LIÊN KẾT MAGIC", checkEmail: "KIỂM TRA EMAIL CỦA BẠN", checkEmailSub: "Liên kết magic đã được gửi. Nhấp vào liên kết trong email để tiếp tục.",
    q1: "BẠN LÀ THƯỜNG TRÚ NHÂN ĐƯỢC BAO LÂU RỒI?", q2: "BẠN CÓ KẾT HÔN VỚI CÔNG DÂN MỸ KHÔNG?",
    q3: "BẠN CÓ ĐI DU LỊCH NGOÀI HOA KỲ HƠN 6 THÁNG LIÊN TIẾP KHÔNG?",
    q4: "CÓ TIỀN SỬ HÌNH SỰ NÀO, KỂ CẢ VI PHẠM NHỎ KHÔNG?", q5: "BẠN SINH RA Ở QUỐC GIA NÀO?",
    q9: "NGÀY CƯ TRÚ CỦA BẠN LÀ GÌ? (từ thẻ xanh)", q6: "BẠN CÓ CÁC HÔN NHÂN TRƯỚC ĐÃ KẾT THÚC KHÔNG?", q7: "BẠN CÓ TỪNG THAY ĐỔI TÊN HỢP PHÁP KHÔNG?", q8: "BẠN CÓ TỪNG PHỤC VỤ TRONG QUÂN ĐỘI HOA KỲ KHÔNG?",
    yes: "CÓ", no: "KHÔNG", next: "TIẾP THEO", finish: "HOÀN THÀNH",
    q1opts: ["Dưới 3 năm", "3–5 năm", "5–10 năm", "Hơn 10 năm"],
    paywallTitle: "CHUẨN BỊ N-400 CÁ NHÂN HÓA CỦA BẠN ĐÃ SẴN SÀNG.", paywallSub: "Mở khóa tất cả với $9.99 một lần.",
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
    sub: "आपके N-400 के लिए AI-संचालित चरण-दर-चरण तैयारी। कोई वकील नहीं। एकमुश्त $9.99।",
    cta: "मेरी तैयारी शुरू करें",
    insideLabel: "$9.99 में आपको क्या मिलता है",
    insideTitle: "LEGALIAI के अंदर — आपकी स्थिति के लिए बनाया गया",
    insideSub: "चार मॉड्यूल। आपके पात्रता मार्ग, यात्रा इतिहास और जोखिम प्रोफ़ाइल के लिए AI-व्यक्तिगत। स्थिर चेकलिस्ट नहीं।",
    m1Title: "एक दस्तावेज़ सूची जो आपकी स्थिति जानती है",
    m1Desc: "आपके पात्रता मार्ग, यात्रा इतिहास और आपराधिक रिकॉर्ड के बारे में 9 प्रश्नों के बाद, LEGALIAI आपके लिए विशिष्ट चेकलिस्ट बनाता है — हर किसी के लिए सामान्य 20-आइटम सूची नहीं।",
    m1Pts: ["विवाह-आधारित बनाम 5-वर्ष पथ दस्तावेज़", "यात्रा-इतिहास दस्तावेज़ यदि आपने उन्हें ट्रिगर किया", "आपराधिक-रिकॉर्ड दस्तावेज़ केवल यदि घोषित किए", "प्रत्येक दस्तावेज़ कहाँ से प्राप्त करें और USCIS को क्यों चाहिए"],
    m2Title: "प्रत्येक N-400 प्रश्न — उत्तर देने से पहले समझाया गया",
    m2Desc: "N-400 के सभी 16 खंड। प्रत्येक प्रश्न दिखाता है कि USCIS वास्तव में क्या पूछ रहा है, उदाहरण उत्तर, सामान्य गलती, और आपके उत्तर पर AI प्रतिक्रिया।",
    m2Pts: ["प्रश्न का वास्तव में क्या अर्थ है", "वास्तविक उदाहरण उत्तर", "अधिकांश आवेदक जो गलती करते हैं", "AI जमा करने से पहले आपके मसौदे की समीक्षा करता है"],
    m3Title: "USCIS से पहले अपने जोखिमों को देखें",
    m3Desc: "विस्तारित यात्रा। आपराधिक इतिहास। कर अंतराल। ऐसी चीज़ें जो आवेदनों में देरी या अस्वीकार करती हैं। LEGALIAI दाखिल करने से पहले आपके व्यक्तिगत जोखिम का नक्शा बनाता है — RFE के बाद नहीं।",
    m3Pts: ["प्रत्येक जोखिम के लिए रंग-कोडित गंभीरता", "प्रत्येक के लिए कौन से दस्तावेज़ लाने हैं", "कब आपको वकील की आवश्यकता है", "अच्छे नैतिक चरित्र का वास्तव में क्या अर्थ है"],
    m4Title: "साक्षात्कार का अभ्यास तब तक करें जब तक गलत न हो",
    m4Desc: "अद्यतन 2025 नागरिक परीक्षा के सभी 128 प्रश्न। AI प्रतिक्रिया के साथ अभ्यास मोड। साक्षात्कार मांसपेशी स्मृति बन जाता है, चिंता नहीं।",
    m4Pts: ["पूर्ण 128-प्रश्न नागरिक परीक्षा", "हर उत्तर पर AI प्रतिक्रिया", "N-400 साक्षात्कार का ही अभ्यास करें", "अक्टूबर 2025 नागरिक परिवर्तनों के लिए अद्यतन"],
    readyTitle: "अनुमान लगाना बंद करने के लिए तैयार?",
    readySub: "9 प्रश्न। $9.99 एक बार। आपकी व्यक्तिगत N-400 तैयारी 5 मिनट से कम में तैयार।",
    mkMod01: "मॉड्यूल 01 — दस्तावेज़",
    mkMod02: "मॉड्यूल 02 — फॉर्म",
    mkMod03: "मॉड्यूल 03 — जोखिम",
    mkMod04: "मॉड्यूल 04 — साक्षात्कार",
    mkDocsTitle: "आपके दस्तावेज़",
    mkDocsCount: "2 / 8 एकत्रित",
    mkDoc1Name: "स्थायी निवासी कार्ड (ग्रीन कार्ड)",
    mkDoc1Where: "आपके ग्रीन कार्ड की आगे और पीछे की कॉपी",
    mkDoc2Name: "संयुक्त कर रिटर्न — पिछले 3 साल",
    mkDoc2Where: "IRS.gov/transcripts — अगर आपके पास कॉपी नहीं है तो मुफ्त",
    mkDoc2Why: "आपने अमेरिकी नागरिक से विवाहित चिह्नित किया — 3-वर्ष पथ के लिए आवश्यक",
    mkDoc3Name: "प्रमाणित न्यायालय रिकॉर्ड — DUI 2019",
    mkDoc3Critical: "आपने 2019 DUI का खुलासा किया — मूल disposition लाएं",
    mkPart9: "भाग 9 — अमेरिका के बाहर का समय",
    mkPart9Q: "क्या आपने पिछले 5 वर्षों में संयुक्त राज्य अमेरिका के बाहर 6 महीने या उससे अधिक की कोई यात्रा की है?",
    mkMeansLbl: "इसका क्या मतलब है:",
    mkMeansTxt: "कोई एक यात्रा — संचयी नहीं।",
    mkExampleLbl: "उदाहरण:",
    mkExampleTxt: "7 महीने की 1 यात्रा = हाँ। 4 महीने की दो यात्राएँ = नहीं।",
    mkMistakeLbl: "सामान्य गलती:",
    mkMistakeTxt: "वापसी यात्रा के दिनों को नहीं गिनना।",
    mkExampleAns: "हाँ — अपने पिता की देखभाल के लिए जून 2022 से जनवरी 2023 तक भारत गया",
    mkAIFb: "AI प्रतिक्रिया",
    mkAIFbTxt: "मजबूत उत्तर। विशिष्ट तिथियाँ जोड़ें और अपने साक्षात्कार में पारिवारिक देखभालकर्ता साक्ष्य लाएँ। यह स्पष्टीकरण निरंतर निवास का समर्थन करता है।",
    mkRiskTitle: "आपका जोखिम प्रोफ़ाइल",
    mkRiskCount: "2 आइटम",
    mkRisk1: "विस्तारित यात्रा",
    mkLvlHigh: "उच्च",
    mkRisk1Txt: "2022 में भारत की 7 महीने की यात्रा — USCIS को निरंतर निवास के साक्ष्य की आवश्यकता होगी। रोजगार रिकॉर्ड, पट्टा, पारिवारिक देखभालकर्ता दस्तावेज़ तैयार करें।",
    mkRisk2: "2019 DUI खुलासा",
    mkLvlMed: "मध्यम",
    mkRisk2Txt: "ऑनबोर्डिंग में खुलासा। स्वचालित रूप से अयोग्य नहीं। प्रमाणित अदालत disposition दस्तावेज़ लाएँ — व्यक्तिगत सारांश नहीं।",
    mkRisk3: "कर अनुपालन",
    mkLvlClear: "स्पष्ट",
    mkRisk3Txt: "सभी 5 वर्षों के संयुक्त कर रिटर्न पुष्ट। अच्छे नैतिक चरित्र पर कोई red flags अपेक्षित नहीं।",
    mkCivicsQ: "नागरिक प्रश्न 47 / 128",
    mkCivicsCat: "इतिहास · 1800 का दशक",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ सही",
    mkCorrectTxt: "सही उत्तर। USCIS स्वीकार करता है: 1812 का युद्ध, मैक्सिकन-अमेरिकी युद्ध, गृहयुद्ध, स्पेनिश-अमेरिकी युद्ध।",
    mkPrev: "← पिछला",
    mkNextQ: "अगला प्रश्न →",
    t1: "सरल हिंदी में मार्गदर्शन", t2: "आपकी स्थिति के अनुसार व्यक्तिगत", t3: "कानूनी सलाह नहीं — केवल तैयारी",
    disclaimer: "LEGALIAI केवल तैयारी मार्गदर्शन प्रदान करता है। यह कानूनी सलाह नहीं है। जटिल मामलों के लिए लाइसेंस प्राप्त वकील से परामर्श करें।",
    emailTitle: "शुरू करने के लिए अपना ईमेल दर्ज करें", emailSub: "हम एक सुरक्षित लॉगिन लिंक भेजेंगे। कोई पासवर्ड नहीं।",
    sendLink: "मैजिक लिंक भेजें", checkEmail: "अपना ईमेल जांचें", checkEmailSub: "आपका मैजिक लिंक भेज दिया गया है। जारी रखने के लिए ईमेल में लिंक पर क्लिक करें।",
    q1: "आप कितने समय से स्थायी निवासी हैं?", q2: "क्या आप किसी अमेरिकी नागरिक से विवाहित हैं?",
    q3: "क्या आप एक बार में 6 महीने से अधिक अमेरिका से बाहर गए हैं?",
    q4: "क्या कोई आपराधिक इतिहास है, जिसमें छोटे अपराध भी शामिल हैं?", q5: "आप किस देश में पैदा हुए थे?",
    q9: "आपकी ग्रीन कार्ड पर रेजिडेंट सिंस डेट क्या है?", q6: "क्या आपकी कोई पिछली शादियाँ समाप्त हुई हैं?", q7: "क्या आपने कभी कानूनी नाम परिवर्तन किया है?", q8: "क्या आपने अमेरिकी सेना में सेवा की है?",
    yes: "हाँ", no: "नहीं", next: "अगला", finish: "समाप्त करें",
    q1opts: ["3 साल से कम", "3–5 साल", "5–10 साल", "10 साल से अधिक"],
    paywallTitle: "आपकी व्यक्तिगत N-400 तैयारी तैयार है।", paywallSub: "एकमुश्त $9.99 में सब कुछ अनलॉक करें।",
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
  ko: {
    tagline: "미국 시민권 신청 —\n준비된, 추측이 아닌.",
    sub: "N-400을 위한 AI 기반 단계별 준비. 변호사 불필요. 일회성 $9.99.",
    cta: "준비 시작하기",
    insideLabel: "$9.99로 받는 것",
    insideTitle: "LEGALIAI 내부 — 당신의 상황에 맞춰 제작",
    insideSub: "네 가지 모듈. 자격 경로, 여행 이력, 위험 프로필에 따라 AI로 개인화. 정적 체크리스트가 아닙니다.",
    m1Title: "당신의 상황을 아는 문서 목록",
    m1Desc: "자격 경로, 여행 이력, 범죄 기록에 대한 9개 질문 후, LEGALIAI는 모든 사람에게 주는 일반적인 20개 항목 목록이 아니라 당신만을 위한 체크리스트를 생성합니다.",
    m1Pts: ["결혼 기반 vs. 5년 경로 문서", "트리거 시 여행 이력 문서", "공개한 경우에만 범죄 기록 문서", "각 문서를 어디서 얻는지와 USCIS가 왜 필요한지"],
    m2Title: "모든 N-400 질문 — 답하기 전에 설명",
    m2Desc: "N-400의 16개 섹션 모두. 각 질문은 USCIS가 실제로 묻는 내용, 예시 답변, 일반적인 실수, 그리고 당신의 답변에 대한 AI 피드백을 보여줍니다.",
    m2Pts: ["질문이 실제로 의미하는 것", "실제 답변 예시", "대부분의 신청자가 저지르는 실수", "AI가 제출 전에 초안 검토"],
    m3Title: "USCIS보다 먼저 당신의 위험을 보세요",
    m3Desc: "장기 여행. 범죄 기록. 세금 공백. 신청을 지연시키거나 거부하는 것들. LEGALIAI는 RFE 후가 아니라 신청 전에 당신의 개인 위험을 매핑합니다.",
    m3Pts: ["각 위험에 대한 색상 코드 심각도", "각각 어떤 문서를 가져갈지", "변호사가 필요한 시점", "좋은 도덕적 성격이 실제로 무엇을 의미하는지"],
    m4Title: "틀리지 않을 때까지 인터뷰 연습",
    m4Desc: "2025년 업데이트된 시민권 시험의 128개 질문 모두. AI 피드백이 포함된 연습 모드. 인터뷰는 불안이 아닌 근육 기억이 됩니다.",
    m4Pts: ["완전한 128 질문 시민권 시험", "모든 답변에 대한 AI 피드백", "N-400 인터뷰 자체 연습", "2025년 10월 시민권 변경 사항 업데이트"],
    readyTitle: "추측을 그만둘 준비가 되셨나요?",
    readySub: "9개 질문. $9.99 일회성. 개인화된 N-400 준비가 5분 안에 준비됩니다.",
    mkMod01: "모듈 01 — 문서",
    mkMod02: "모듈 02 — 양식",
    mkMod03: "모듈 03 — 위험",
    mkMod04: "모듈 04 — 인터뷰",
    mkDocsTitle: "귀하의 문서",
    mkDocsCount: "2 / 8 수집됨",
    mkDoc1Name: "영주권 카드 (그린카드)",
    mkDoc1Where: "귀하의 그린카드 앞면과 뒷면 사본",
    mkDoc2Name: "공동 세금 신고서 — 최근 3년",
    mkDoc2Where: "IRS.gov/transcripts — 사본이 없으면 무료",
    mkDoc2Why: "미국 시민과 결혼했다고 표시함 — 3년 경로에 필요",
    mkDoc3Name: "인증된 법원 기록 — DUI 2019",
    mkDoc3Critical: "2019년 DUI를 공개했습니다 — 원본 처분을 가져오세요",
    mkPart9: "파트 9 — 미국 외부에서의 시간",
    mkPart9Q: "지난 5년 동안 미국 외부에서 6개월 이상의 여행을 한 적이 있습니까?",
    mkMeansLbl: "의미:",
    mkMeansTxt: "단일 여행 — 누적 아님.",
    mkExampleLbl: "예시:",
    mkExampleTxt: "7개월 여행 1회 = 예. 4개월 여행 두 번 = 아니오.",
    mkMistakeLbl: "일반적인 실수:",
    mkMistakeTxt: "귀국 여행 일수를 세지 않는 것.",
    mkExampleAns: "예 — 2022년 6월부터 2023년 1월까지 아버지를 돌보기 위해 한국을 방문했습니다",
    mkAIFb: "AI 피드백",
    mkAIFbTxt: "강력한 답변입니다. 구체적인 날짜를 추가하고 인터뷰에 가족 돌봄 증거를 가져오세요. 이 설명은 지속적인 거주를 뒷받침합니다.",
    mkRiskTitle: "귀하의 위험 프로필",
    mkRiskCount: "2 항목",
    mkRisk1: "장기 여행",
    mkLvlHigh: "높음",
    mkRisk1Txt: "2022년 7개월 한국 여행 — USCIS는 지속적인 거주 증거를 요구할 것입니다. 고용 기록, 임대 계약, 가족 돌봄 문서를 준비하세요.",
    mkRisk2: "2019 DUI 공개",
    mkLvlMed: "중간",
    mkRisk2Txt: "온보딩에서 공개됨. 자동으로 자격 박탈되지 않음. 인증된 법원 처분 문서를 가져오세요 — 개인 요약이 아님.",
    mkRisk3: "세금 준수",
    mkLvlClear: "깨끗함",
    mkRisk3Txt: "5년간의 공동 세금 신고서 모두 확인됨. 좋은 도덕적 품성에 대한 red flags 예상되지 않음.",
    mkCivicsQ: "시민권 질문 47 / 128",
    mkCivicsCat: "역사 · 1800년대",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ 정확함",
    mkCorrectTxt: "완벽한 답변. USCIS가 인정함: 1812년 전쟁, 미국-멕시코 전쟁, 남북전쟁, 미국-스페인 전쟁.",
    mkPrev: "← 이전",
    mkNextQ: "다음 질문 →",
    t1: "쉬운 한국어 안내", t2: "내 상황에 맞게 맞춤화", t3: "법률 조언 아님 — 준비만",
    disclaimer: "LEGALIAI는 준비 안내만 제공합니다. 법률 조언이 아닙니다. 복잡한 상황에서는 변호사와 상담하세요.",
    emailTitle: "시작하려면 이메일을 입력하세요", emailSub: "보안 로그인 링크를 보내드립니다. 비밀번호 불필요.",
    sendLink: "매직 링크 보내기", checkEmail: "이메일을 확인하세요", checkEmailSub: "매직 링크가 전송되었습니다. 이메일의 링크를 클릭하여 계속하세요.",
    q1: "영주권자로 얼마나 되셨나요?", q2: "미국 시민권자와 결혼하셨나요?",
    q3: "6개월 이상 미국을 떠난 적이 있나요?",
    q4: "경미한 위반을 포함한 범죄 기록이 있나요?", q5: "어느 나라에서 태어났나요?",
    q9: "영주권 카드의 거주 시작 날짜는 언제입니까?", q6: "종료된 이전 결혼이 있나요?", q7: "법적 이름 변경을 한 적이 있나요?", q8: "미국 군대에서 복무한 적이 있나요?",
    yes: "예", no: "아니오", next: "다음", finish: "완료",
    q1opts: ["3년 미만", "3–5년", "5–10년", "10년 이상"],
    paywallTitle: "맞춤형 N-400 준비가 완료되었습니다.", paywallSub: "일회성 $9.99로 모든 것을 잠금 해제하세요.",
    unlock: "지금 잠금 해제", paywallNote: "안전한 결제. 즉시 접근. 구독 없음.",
    dashTitle: "준비 대시보드",
    modules: ["서류 체크리스트", "양식 안내", "위험 평가", "인터뷰 준비"],
    modDesc: ["무엇을 준비할지 알아보세요.", "양식의 모든 질문을 이해하세요.", "USCIS 전에 위험을 파악하세요.", "완전히 자신감이 생길 때까지 연습하세요."],
    start: "시작", resume: "계속", review: "검토",
    notStarted: "시작 안함", inProgress: "진행 중", complete: "✓ 완료",
    signOut: "로그아웃",
    aiDisclaimer: "이것은 준비 안내일 뿐 법률 조언이 아닙니다. 복잡한 상황에서는 변호사와 상담하세요.",
    generating: "맞춤 분석 생성 중...", thinking: "답변 평가 중...",
    docTitle: "서류 체크리스트", formTitle: "N-400 양식 안내",
    riskTitle: "위험 평가", interviewTitle: "인터뷰 준비",
    yourAnswer: "여기에 답변을 입력하세요...", practiced: "✓ 연습 완료", practice: "연습하기",
    back: "← 뒤로", where: "발급처:", why: "USCIS가 필요한 이유:",
    means: "의미:", example: "예시:", mistake: "⚠ 흔한 실수:",
    action: "할 일:", selectCountry: "국가를 선택하세요...",
    docsComplete: "모든 서류 수집 완료! 체크리스트가 완성되었습니다.",
    progressOf: "중", questionsCompleted: "문제 연습 완료",
    aiFeedback: "AI 피드백",
    interviewNote: "USCIS 인터뷰가 영어로 진행되므로 질문은 영어입니다. AI 피드백은 한국어로 제공됩니다.",
  },
  pt: {
    tagline: "SUA SOLICITAÇÃO DE CIDADANIA AMERICANA —\nPREPARADA, NÃO ADIVINHADA.",
    sub: "Preparação passo a passo com IA para o N-400. Sem advogado. $9.99 pagamento único.",
    cta: "INICIAR MINHA PREPARAÇÃO",
    insideLabel: "O QUE VOCÊ RECEBE POR $9.99",
    insideTitle: "Por Dentro do LEGALIAI — Feito para Sua Situação",
    insideSub: "Quatro módulos. Personalizados por IA conforme sua via de elegibilidade, histórico de viagens e perfil de risco. Não é uma lista estática.",
    m1Title: "Uma Lista de Documentos Feita para Você",
    m1Desc: "Após 9 perguntas sobre sua via de elegibilidade, histórico de viagens e antecedentes criminais, o LEGALIAI gera uma lista específica para você — não uma lista genérica de 20 itens.",
    m1Pts: ["Documentos por via: casamento vs. 5 anos", "Documentos de viagens se você os acionou", "Documentos criminais apenas se declarados", "Onde obter cada documento e por que o USCIS precisa"],
    m2Title: "Cada Pergunta do N-400 — Explicada Antes de Responder",
    m2Desc: "Todas as 16 seções do N-400. Cada pergunta mostra o que o USCIS realmente está perguntando, um exemplo de resposta, o erro comum, e feedback da IA sobre sua resposta.",
    m2Pts: ["O que a pergunta realmente significa", "Exemplos reais de respostas", "O erro que a maioria dos aplicantes comete", "A IA revisa seu rascunho antes de enviar"],
    m3Title: "Veja Seus Riscos Antes do USCIS",
    m3Desc: "Viagens prolongadas. Antecedentes criminais. Lacunas fiscais. As coisas que atrasam ou negam aplicações. O LEGALIAI mapeia seu risco pessoal antes de enviar — não depois de um RFE.",
    m3Pts: ["Severidade colorida para cada risco", "Quais documentos levar para cada um", "Quando você precisa de um advogado", "O que bom caráter moral realmente significa"],
    m4Title: "Pratique a Entrevista Até Dominá-la",
    m4Desc: "As 128 perguntas do teste de civismo atualizado 2025. Modo de prática com feedback de IA. A entrevista vira memória muscular, não ansiedade.",
    m4Pts: ["Teste completo de 128 perguntas de civismo", "Feedback de IA em cada resposta", "Pratique a entrevista N-400", "Atualizado para mudanças de civismo de Out 2025"],
    readyTitle: "Pronto para Parar de Adivinhar?",
    readySub: "9 perguntas. $9.99 pagamento único. Sua preparação N-400 personalizada pronta em menos de 5 minutos.",
    mkMod01: "MÓDULO 01 — DOCUMENTOS",
    mkMod02: "MÓDULO 02 — FORMULÁRIO",
    mkMod03: "MÓDULO 03 — RISCO",
    mkMod04: "MÓDULO 04 — ENTREVISTA",
    mkDocsTitle: "SEUS DOCUMENTOS",
    mkDocsCount: "2 / 8 COLETADOS",
    mkDoc1Name: "Green Card (Cartão de Residente Permanente)",
    mkDoc1Where: "Cópia da frente e verso do seu green card",
    mkDoc2Name: "Declarações de Imposto Conjuntas — Últimos 3 Anos",
    mkDoc2Where: "IRS.gov/transcripts — grátis se você não tiver cópias",
    mkDoc2Why: "Você marcou casado(a) com cidadão dos EUA — exigido para via de 3 anos",
    mkDoc3Name: "Registros Certificados do Tribunal — DUI 2019",
    mkDoc3Critical: "Você divulgou um DUI de 2019 — traga a disposição original",
    mkPart9: "PARTE 9 — TEMPO FORA DOS EUA",
    mkPart9Q: "Você fez alguma viagem de 6 meses ou mais fora dos Estados Unidos nos últimos 5 anos?",
    mkMeansLbl: "O QUE SIGNIFICA:",
    mkMeansTxt: "Qualquer viagem única — não cumulativo.",
    mkExampleLbl: "EXEMPLO:",
    mkExampleTxt: "1 viagem de 7 meses = SIM. Duas viagens de 4 meses = NÃO.",
    mkMistakeLbl: "ERRO COMUM:",
    mkMistakeTxt: "Não contar os dias de viagem de retorno.",
    mkExampleAns: "Sim — visitei o Brasil de junho de 2022 a janeiro de 2023 para cuidar do meu pai",
    mkAIFb: "FEEDBACK DA IA",
    mkAIFbTxt: "Resposta forte. Adicione datas específicas e leve evidências de cuidador familiar para sua entrevista. Esta explicação apoia residência contínua.",
    mkRiskTitle: "SEU PERFIL DE RISCO",
    mkRiskCount: "2 ITENS",
    mkRisk1: "VIAGEM PROLONGADA",
    mkLvlHigh: "ALTO",
    mkRisk1Txt: "Viagem de 7 meses ao Brasil em 2022 — USCIS exigirá evidência de residência contínua. Prepare registros de emprego, contrato de aluguel, documentação de cuidador familiar.",
    mkRisk2: "DIVULGAÇÃO DE DUI 2019",
    mkLvlMed: "MÉDIO",
    mkRisk2Txt: "Divulgado no onboarding. Não desqualifica automaticamente. Traga documentos certificados do tribunal — não resumos pessoais.",
    mkRisk3: "COMPLIANCE FISCAL",
    mkLvlClear: "LIMPO",
    mkRisk3Txt: "Todos os 5 anos de declarações conjuntas confirmados. Nenhuma red flag esperada em bom caráter moral.",
    mkCivicsQ: "QUESTÃO DE CIVISMO 47 / 128",
    mkCivicsCat: "HISTÓRIA · Séc. XIX",
    mkCivicsQTxt: "Name one war fought by the United States in the 1800s.",
    mkCivicsAns: "The Civil War — between the Union and the Confederate states",
    mkCorrect: "✓ CORRETO",
    mkCorrectTxt: "Resposta perfeita. USCIS aceita: Guerra de 1812, Guerra Mexicano-Americana, Guerra Civil, Guerra Hispano-Americana.",
    mkPrev: "← ANTERIOR",
    mkNextQ: "PRÓXIMA QUESTÃO →",
    t1: "ORIENTAÇÃO EM PORTUGUÊS CLARO", t2: "PERSONALIZADO PARA SUA SITUAÇÃO", t3: "NÃO É ASSESSORIA JURÍDICA — APENAS PREPARAÇÃO",
    disclaimer: "LEGALIAI fornece apenas orientação de preparação. Isso não é assessoria jurídica. Para situações complexas, consulte um advogado de imigração licenciado.",
    emailTitle: "INSIRA SEU EMAIL PARA COMEÇAR", emailSub: "Enviaremos um link de acesso seguro. Sem senha.",
    sendLink: "ENVIAR LINK MÁGICO", checkEmail: "VERIFIQUE SEU EMAIL", checkEmailSub: "Seu link mágico foi enviado. Clique no link no seu email para continuar.",
    q1: "HÁ QUANTO TEMPO VOCÊ É RESIDENTE PERMANENTE?", q2: "VOCÊ É CASADO/A COM UM/A CIDADÃO/Ã AMERICANO/A?",
    q3: "VOCÊ VIAJOU PARA FORA DOS EUA POR MAIS DE 6 MESES CONSECUTIVOS?",
    q4: "TEM ALGUM HISTÓRICO CRIMINAL, INCLUINDO INFRAÇÕES MENORES?", q5: "EM QUAL PAÍS VOCÊ NASCEU?",
    q9: "QUAL É SUA DATA DE RESIDENTE? (do seu green card)", q6: "VOCÊ TEM CASAMENTOS ANTERIORES QUE TERMINARAM?", q7: "VOCÊ JÁ TEVE UMA MUDANÇA LEGAL DE NOME?", q8: "VOCÊ JÁ SERVIU NAS FORÇAS ARMADAS DOS EUA?",
    yes: "SIM", no: "NÃO", next: "PRÓXIMO", finish: "FINALIZAR",
    q1opts: ["Menos de 3 anos", "3–5 anos", "5–10 anos", "Mais de 10 anos"],
    paywallTitle: "SUA PREPARAÇÃO PERSONALIZADA N-400 ESTÁ PRONTA.", paywallSub: "Desbloqueie tudo por $9.99 pagamento único.",
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
  ko: [
    { name: "영주권 카드 (그린카드)", source: "실물 카드", reason: "USCIS에 이민 상태를 증명합니다" },
    { name: "출생국 여권", source: "해당국 대사관 또는 개인 파일", reason: "신원 및 국적을 확인합니다" },
    { name: "세금 신고서 (최근 5년)", source: "IRS.gov 또는 세금 대리인", reason: "미국 내 지속적 거주를 증명합니다" },
    { name: "여행 기록", source: "여권 스탬프 또는 개인 일정표", reason: "미국 밖 모든 여행을 기록합니다" },
    { name: "결혼 증명서 (해당하는 경우)", source: "결혼한 지역의 호적 사무소", reason: "미국 시민권자와 결혼한 경우 필요합니다" },
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

function App() {
  const [page, setPage] = useState("landing");
  const [hasPaid, setHasPaid] = useState(false);
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

// SoftwareApplication Schema — injected once on mount for Google AI Overviews
  useEffect(() => {
    const existing = document.getElementById('legaliai-schema');
    if (existing) return;
    const script = document.createElement('script');
    script.id = 'legaliai-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LEGALIAI",
      "url": "https://legaliai.com",
      "description": "AI-powered U.S. citizenship (N-400) preparation. Documents, form walkthrough, risk assessment, and interview prep in 8 languages. No lawyer needed. $9.99 one-time fee.",
      "applicationCategory": "LegalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "49.00",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "49.00",
          "priceCurrency": "USD",
          "name": "One-time preparation fee"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "4",
        "bestRating": "5"
      },
      "featureList": [
        "Personalized document checklist",
        "N-400 form walkthrough with AI guidance",
        "Risk assessment before you file",
        "Interview preparation with 128 civics questions",
        "Available in 8 languages",
        "Not legal advice — preparation only"
      ],
      "inLanguage": ["en", "es", "pt", "zh", "tl", "vi", "hi", "ko"],
      "audience": {
        "@type": "Audience",
        "audienceType": "Lawful permanent residents applying for U.S. citizenship"
      },
      "provider": {
        "@type": "Organization",
        "name": "LEGALIAI",
        "url": "https://legaliai.com"
      }
    });
    document.head.appendChild(script);
  }, []);

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
      // Check payment success redirect — verify via DB only (webhook inserts the real record)
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        window.history.replaceState({}, "", "/");
        // Poll for webhook payment record (up to 6 seconds)
        let verified = false;
        for (let i = 0; i < 3; i++) {
          const { data: pCheck } = await supabase.from("payments").select("id").eq("user_id", u.id).limit(1);
          if (pCheck && pCheck.length > 0) { verified = true; break; }
          await new Promise(r => setTimeout(r, 2000));
        }
        if (verified) {
          setHasPaid(true);
          try {
            const savedLang = localStorage.getItem("legaliai_lang") || "en";
            await fetch("/api/send-welcome", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: u.email, language: savedLang }) });
          } catch (e) { console.error("Welcome email failed:", e); }
          setPage("dashboard");
        } else {
          setPage("paywall");
        }
        return;
      }
      // Check if already paid
      const { data: payments } = await supabase.from("payments").select("id").eq("user_id", u.id).limit(1);
      if (payments && payments.length > 0) { setHasPaid(true); setPage("dashboard"); return; }
      // Check if onboarding done
      const { data: answers } = await supabase.from("onboarding_answers").select("id").eq("user_id", u.id).limit(1);
      if (answers && answers.length > 0) { setPage("dashboard"); return; }
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

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "https://legaliai.com" } });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPage("landing");
    window.location.href = "https://legaliai.com";
  };
  const handleStartCTA = () => { if (user) setPage("onboarding"); else { setIsSignIn(false); setShowEmailModal(true); } };
  const handleSignIn = () => { setIsSignIn(true); setShowEmailModal(true); };
  const handleOnboardingNext = () => { if (currentQ < 4) setCurrentQ(currentQ + 1); else { saveOnboardingAnswers(); setPage("dashboard"); } };
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
    // FREEMIUM CHECK: If user hasn't paid, send them to paywall instead
    if (user && !hasPaid) {
      setPage("paywall");
      return;
    }
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
      const text = await callAI(`You are an expert immigration preparation assistant. Based on these N-400 applicant answers: ${JSON.stringify(onboardingAnswers)}, generate a comprehensive personalized document checklist. Key fields to consider: criminal history (adds court records), prior marriages (adds divorce decrees), name change (adds legal name change docs), military service (adds DD-214). IMPORTANT: Respond ENTIRELY in ${langName}. Translate ALL text including document names into ${langName}. Return ONLY a valid JSON array with no markdown or extra text: [{"name":"...","source":"...","reason":"..."}]`);
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
      const needsAttorney = onboardingAnswers.criminal === "yes";
      const text = await callAI(`You are an expert immigration preparation assistant. Based on these N-400 applicant answers: ${JSON.stringify(onboardingAnswers)}, identify 3-5 personal risk factors that could affect their citizenship application. Consider: travel history over 6 months, criminal record (if criminal=yes, flag that complex criminal history may require an immigration attorney and they should NOT file without legal review), prior marriages requiring divorce decrees, military service pathways, name change documentation gaps, tax compliance, continuous residence. Be specific to their answers. IMPORTANT: Respond ENTIRELY in ${langName}. Return ONLY a valid JSON array with no markdown or extra text: [{"title":"...","explanation":"...","action":"...","needsAttorney":false}]`);
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
      const feedback = await callAI(`Review this N-400 form answer. Question: "${question}" Answer: "${answer}". Give 2-3 sentences of specific feedback. Is it complete? Any red flags? What to improve? IMPORTANT context for Part 12 good moral character questions: (1) DUI is not an automatic bar but must be disclosed with certified court records — flag if relevant. (2) Marijuana use must be disclosed even in states where legal — federal law applies. (3) Selective Service non-registration for men born after 1960 who were in the US between ages 18-26 can be a permanent bar — flag if relevant. (4) Arrests without conviction must still be disclosed. Be specific and direct. IMPORTANT: Respond ENTIRELY in ${langName}.`);
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
          <a href="/contact.html" style={{ color:"#555",fontSize:"11px",letterSpacing:"2px",fontFamily:"'DM Sans',sans-serif" }}>CONTACT</a>
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
              <button onClick={handleGoogleSignIn} style={{ width:"100%",background:"#fff",color:"#1f1f1f",border:"none",padding:"15px",fontSize:"14px",fontWeight:600,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"20px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
                Continue with Google
              </button>
              <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px" }}>
                <div style={{ flex:1,height:"1px",background:"#2a2a2a" }}></div>
                <span style={{ color:"#666",fontSize:"11px",letterSpacing:"2px" }}>OR</span>
                <div style={{ flex:1,height:"1px",background:"#2a2a2a" }}></div>
              </div>
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

        {/* WHAT'S INSIDE SECTION — real product previews */}
        <div style={{ margin:"120px 0 0", textAlign:"left" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <div style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"5px",marginBottom:"16px" }}>{t("insideLabel")}</div>
            <h2 style={{ color:"#F5F5F5",fontSize:"clamp(24px,3vw,38px)",letterSpacing:"4px",fontWeight:300,lineHeight:1.3,marginBottom:"16px" }}>{t("insideTitle")}</h2>
            <p style={{ color:"#888",fontSize:"15px",letterSpacing:"1px",maxWidth:"560px",margin:"0 auto",lineHeight:1.8 }}>{t("insideSub")}</p>
          </div>

          {/* Module 1 — Documents */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"60px",alignItems:"center",marginBottom:"100px",fontFamily:"inherit" }} className="inside-row">
            <div>
              <div style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px",marginBottom:"14px" }}>{t("mkMod01")}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"26px",letterSpacing:"2px",fontWeight:300,marginBottom:"16px",lineHeight:1.3 }}>{t("m1Title")}</h3>
              <p style={{ color:"#999",fontSize:"14px",letterSpacing:"1px",lineHeight:2,marginBottom:"24px" }}>{t("m1Desc")}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                {t("m1Pts").map((pt,i) => (
                  <li key={i} style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",marginBottom:"10px",paddingLeft:"20px",position:"relative",lineHeight:1.7 }}>
                    <span style={{ position:"absolute",left:0,color:"#C9A84C" }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"24px",fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid #1a1a1a" }}>
                <span style={{ color:"#F5F5F5",fontSize:"13px",letterSpacing:"3px" }}>{t("mkDocsTitle")}</span>
                <span style={{ color:"#C9A84C",fontSize:"11px",letterSpacing:"2px" }}>{t("mkDocsCount")}</span>
              </div>
              <div style={{ display:"flex",gap:"14px",padding:"12px 0",borderBottom:"1px solid #111",borderLeft:"3px solid #4ade80",paddingLeft:"14px" }}>
                <span style={{ color:"#4ade80",marginTop:"2px" }}>✓</span>
                <div>
                  <div style={{ color:"#555",fontSize:"13px",textDecoration:"line-through",marginBottom:"4px" }}>{t("mkDoc1Name")}</div>
                  <div style={{ color:"#666",fontSize:"11px",lineHeight:1.6 }}><span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px" }}>WHERE:</span> Front and back copy of your green card</div>
                </div>
              </div>
              <div style={{ display:"flex",gap:"14px",padding:"12px 0",borderBottom:"1px solid #111" }}>
                <span style={{ width:"14px",height:"14px",border:"1px solid #444",display:"inline-block",marginTop:"3px" }}></span>
                <div>
                  <div style={{ color:"#F5F5F5",fontSize:"13px",marginBottom:"4px" }}>{t("mkDoc2Name")}</div>
                  <div style={{ color:"#888",fontSize:"11px",lineHeight:1.6,marginBottom:"4px" }}><span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px" }}>WHERE:</span> IRS.gov/transcripts — free if you do not have copies</div>
                  <div style={{ color:"#888",fontSize:"11px",lineHeight:1.6 }}><span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px" }}>WHY:</span> You marked married to a US citizen — required for 3-year path</div>
                </div>
              </div>
              <div style={{ display:"flex",gap:"14px",padding:"12px 0" }}>
                <span style={{ width:"14px",height:"14px",border:"1px solid #444",display:"inline-block",marginTop:"3px" }}></span>
                <div>
                  <div style={{ color:"#F5F5F5",fontSize:"13px",marginBottom:"4px" }}>{t("mkDoc3Name")}</div>
                  <div style={{ color:"#888",fontSize:"11px",lineHeight:1.6 }}><span style={{ color:"#e05555",fontSize:"9px",letterSpacing:"2px" }}>CRITICAL:</span> You disclosed a 2019 DUI — bring original disposition</div>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2 — Form */}
          <div style={{ display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"60px",alignItems:"center",marginBottom:"100px" }} className="inside-row">
            <div style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"24px",fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px",marginBottom:"12px",paddingBottom:"12px",borderBottom:"1px solid #1a1a1a" }}>{t("mkPart9")}</div>
              <div style={{ color:"#F5F5F5",fontSize:"14px",marginBottom:"14px",lineHeight:1.6 }}>{t("mkPart9Q")}</div>
              <div style={{ background:"#0a0a0a",border:"1px solid #1a1a1a",padding:"12px 14px",marginBottom:"14px" }}>
                <div style={{ marginBottom:"6px" }}><span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px" }}>{t("mkMeansLbl")}</span><span style={{ color:"#aaa",fontSize:"11px",marginLeft:"6px" }}>{t("mkMeansTxt")}</span></div>
                <div style={{ marginBottom:"6px" }}><span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px" }}>{t("mkExampleLbl")}</span><span style={{ color:"#888",fontSize:"11px",marginLeft:"6px" }}>{t("mkExampleTxt")}</span></div>
                <div><span style={{ color:"#e05555",fontSize:"9px",letterSpacing:"2px" }}>{t("mkMistakeLbl")}</span><span style={{ color:"#888",fontSize:"11px",marginLeft:"6px" }}>{t("mkMistakeTxt")}</span></div>
              </div>
              <div style={{ background:"#0a0a0a",border:"1px solid #2a2a2a",padding:"12px",marginBottom:"10px",color:"#bbb",fontSize:"12px",lineHeight:1.6 }}>{t("mkExampleAns")}</div>
              <div style={{ borderLeft:"2px solid #C9A84C",paddingLeft:"12px" }}>
                <div style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"3px",marginBottom:"4px" }}>{t("mkAIFb")}</div>
                <div style={{ color:"#bbb",fontSize:"11px",lineHeight:1.6 }}>{t("mkAIFbTxt")}</div>
              </div>
            </div>
            <div>
              <div style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px",marginBottom:"14px" }}>{t("mkMod02")}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"26px",letterSpacing:"2px",fontWeight:300,marginBottom:"16px",lineHeight:1.3 }}>{t("m2Title")}</h3>
              <p style={{ color:"#999",fontSize:"14px",letterSpacing:"1px",lineHeight:2,marginBottom:"24px" }}>{t("m2Desc")}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                {t("m2Pts").map((pt,i) => (
                  <li key={i} style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",marginBottom:"10px",paddingLeft:"20px",position:"relative",lineHeight:1.7 }}>
                    <span style={{ position:"absolute",left:0,color:"#C9A84C" }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Module 3 — Risk */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"60px",alignItems:"center",marginBottom:"100px" }} className="inside-row">
            <div>
              <div style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px",marginBottom:"14px" }}>{t("mkMod03")}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"26px",letterSpacing:"2px",fontWeight:300,marginBottom:"16px",lineHeight:1.3 }}>{t("m3Title")}</h3>
              <p style={{ color:"#999",fontSize:"14px",letterSpacing:"1px",lineHeight:2,marginBottom:"24px" }}>{t("m3Desc")}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                {t("m3Pts").map((pt,i) => (
                  <li key={i} style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",marginBottom:"10px",paddingLeft:"20px",position:"relative",lineHeight:1.7 }}>
                    <span style={{ position:"absolute",left:0,color:"#C9A84C" }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"24px",fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid #1a1a1a" }}>
                <span style={{ color:"#F5F5F5",fontSize:"13px",letterSpacing:"3px" }}>{t("mkRiskTitle")}</span>
                <span style={{ color:"#e05555",fontSize:"11px",letterSpacing:"2px" }}>{t("mkRiskCount")}</span>
              </div>
              <div style={{ background:"#1a0a0a",border:"1px solid #3a1a1a",borderLeft:"3px solid #e05555",padding:"14px 16px",marginBottom:"10px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"6px" }}>
                  <span style={{ color:"#F5F5F5",fontSize:"12px",letterSpacing:"2px" }}>{t("mkRisk1")}</span>
                  <span style={{ color:"#e05555",fontSize:"9px",letterSpacing:"2px",fontWeight:700 }}>{t("mkLvlHigh")}</span>
                </div>
                <div style={{ color:"#e9a8a8",fontSize:"11px",lineHeight:1.7 }}>{t("mkRisk1Txt")}</div>
              </div>
              <div style={{ background:"#1a1500",border:"1px solid #3a3010",borderLeft:"3px solid #C9A84C",padding:"14px 16px",marginBottom:"10px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"6px" }}>
                  <span style={{ color:"#F5F5F5",fontSize:"12px",letterSpacing:"2px" }}>{t("mkRisk2")}</span>
                  <span style={{ color:"#C9A84C",fontSize:"9px",letterSpacing:"2px",fontWeight:700 }}>{t("mkLvlMed")}</span>
                </div>
                <div style={{ color:"#d4b87a",fontSize:"11px",lineHeight:1.7 }}>{t("mkRisk2Txt")}</div>
              </div>
              <div style={{ background:"#0a1a0a",border:"1px solid #1a3a1a",borderLeft:"3px solid #4ade80",padding:"14px 16px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"6px" }}>
                  <span style={{ color:"#F5F5F5",fontSize:"12px",letterSpacing:"2px" }}>{t("mkRisk3")}</span>
                  <span style={{ color:"#4ade80",fontSize:"9px",letterSpacing:"2px",fontWeight:700 }}>{t("mkLvlClear")}</span>
                </div>
                <div style={{ color:"#9be9a8",fontSize:"11px",lineHeight:1.7 }}>{t("mkRisk3Txt")}</div>
              </div>
            </div>
          </div>

          {/* Module 4 — Interview */}
          <div style={{ display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"60px",alignItems:"center",marginBottom:"60px" }} className="inside-row">
            <div style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"24px",fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"16px",paddingBottom:"12px",borderBottom:"1px solid #1a1a1a" }}>
                <span style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"3px" }}>{t("mkCivicsQ")}</span>
                <span style={{ color:"#777",fontSize:"10px",letterSpacing:"2px" }}>{t("mkCivicsCat")}</span>
              </div>
              <div style={{ color:"#F5F5F5",fontSize:"15px",marginBottom:"14px",lineHeight:1.5 }}>{t("mkCivicsQTxt")}</div>
              <div style={{ background:"#0a0a0a",border:"1px solid #2a2a2a",padding:"12px",marginBottom:"12px",color:"#bbb",fontSize:"12px",lineHeight:1.6 }}>{t("mkCivicsAns")}</div>
              <div style={{ borderLeft:"2px solid #4ade80",paddingLeft:"12px",marginBottom:"14px" }}>
                <div style={{ color:"#4ade80",fontSize:"9px",letterSpacing:"3px",marginBottom:"4px" }}>{t("mkCorrect")}</div>
                <div style={{ color:"#9be9a8",fontSize:"11px",lineHeight:1.7 }}>{t("mkCorrectTxt")}</div>
              </div>
              <div style={{ display:"flex",gap:"8px" }}>
                <button style={{ flex:1,background:"transparent",border:"1px solid #2a2a2a",color:"#777",padding:"10px",fontSize:"10px",letterSpacing:"2px",cursor:"default",fontFamily:"inherit" }}>{t("mkPrev")}</button>
                <button style={{ flex:1,background:"#C9A84C",border:"none",color:"#000",padding:"10px",fontSize:"10px",letterSpacing:"2px",cursor:"default",fontWeight:700,fontFamily:"inherit" }}>{t("mkNextQ")}</button>
              </div>
            </div>
            <div>
              <div style={{ color:"#C9A84C",fontSize:"10px",letterSpacing:"4px",marginBottom:"14px" }}>{t("mkMod04")}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"26px",letterSpacing:"2px",fontWeight:300,marginBottom:"16px",lineHeight:1.3 }}>{t("m4Title")}</h3>
              <p style={{ color:"#999",fontSize:"14px",letterSpacing:"1px",lineHeight:2,marginBottom:"24px" }}>{t("m4Desc")}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                {t("m4Pts").map((pt,i) => (
                  <li key={i} style={{ color:"#888",fontSize:"13px",letterSpacing:"1px",marginBottom:"10px",paddingLeft:"20px",position:"relative",lineHeight:1.7 }}>
                    <span style={{ position:"absolute",left:0,color:"#C9A84C" }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ background:"#0d0d0d",border:"1px solid #C9A84C",padding:"56px 40px",textAlign:"center",margin:"40px 0 0" }}>
            <h3 style={{ color:"#F5F5F5",fontSize:"clamp(20px,3vw,30px)",letterSpacing:"3px",fontWeight:300,marginBottom:"14px" }}>{t("readyTitle")}</h3>
            <p style={{ color:"#999",fontSize:"14px",letterSpacing:"1px",marginBottom:"32px",lineHeight:1.8 }}>{t("readySub")}</p>
            <button onClick={handleStartCTA} style={{ ...goldBtn, fontSize:"14px", padding:"20px 56px" }}>{t("cta")}</button>
          </div>
        </div>

        {/* Original 3 cards — kept as supporting features */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",margin:"80px 0 0" }} className="inside-row">
          {[t("t1"),t("t2"),t("t3")].map((text,i) => (
            <div key={i} style={{ background:"#0d0d0d",border:"1px solid #2a2a2a",padding:"44px 32px" }}>
              <div style={{ color:"#C9A84C",fontSize:"24px",marginBottom:"20px" }}>⟡</div>
              <p style={{ color:"#999",fontSize:"12px",letterSpacing:"2px",lineHeight:"2" }}>{text}</p>
            </div>
          ))}
        </div>

        <style>{`@media(max-width:760px){.inside-row{grid-template-columns:1fr !important;gap:30px !important}}`}</style>

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
      { key:"prior_marriages", type:"yesno", label:t("q6") },
      { key:"name_change", type:"yesno", label:t("q7") },
      { key:"military", type:"yesno", label:t("q8") },
      { key:"resident_since_date", type:"date", label:t("q9") },
    ];
    const q = questions[currentQ];
    return (
      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Cormorant Garamond',serif",paddingTop:"80px" }}>
        <Nav />
        <div style={{ height:"3px",background:"#111",position:"fixed",top:"80px",left:0,right:0,zIndex:99 }}>
          <div style={{ height:"100%",background:"#C9A84C",width:`${(currentQ/9)*100}%`,transition:"width 0.5s ease" }} />
        </div>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 80px)",padding:"40px" }}>
          <p style={{ color:"#666",fontSize:"11px",letterSpacing:"5px",marginBottom:"48px" }}>QUESTION {currentQ+1} OF 9</p>
          <h2 style={{ color:"#F5F5F5",fontSize:"clamp(18px,3vw,36px)",letterSpacing:"3px",fontWeight:300,textAlign:"center",maxWidth:"720px",marginBottom:"56px",lineHeight:1.4 }}>{q.label}</h2>
          {q.type === "date" && <div style={{ marginBottom:"40px",width:"100%",maxWidth:"400px" }}>
            <input type="date" value={onboardingAnswers[q.key]||""} onChange={e => setOnboardingAnswers(prev => ({ ...prev,[q.key]:e.target.value }))}
              style={{ width:"100%",background:"#0a0a0a",border:"1px solid #2a2a2a",color:"#F5F5F5",padding:"18px 24px",fontSize:"16px",fontFamily:"inherit",outline:"none",letterSpacing:"2px" }}
            />
            <p style={{ color:"#444",fontSize:"11px",letterSpacing:"2px",marginTop:"12px" }}>RESIDENT SINCE DATE — front of your green card</p>
          </div>}
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
              <div style={{ flex:1 }}>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>FIND YOUR FILING ADDRESS</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:"0 0 16px" }}>Select your state to get the exact USCIS mailing address.</p>
                <select onChange={(e) => {
                  const state = e.target.value;
                  const elgin = ["CT","DE","DC","FL","GA","ME","MD","MA","NH","NJ","NY","NC","PA","RI","SC","VT","VA","WV"];
                  const dallas = ["AR","LA","OK","TX"];
                  const chicago = ["IL","IN","IA","MI","MO","OH","WI"];
                  let addr = "";
                  if (elgin.includes(state)) addr = "USCIS Elgin Lockbox | USPS: P.O. Box 4060, Carol Stream IL 60197-4060 | FedEx/UPS/DHL: 2500 Westfield Drive, Elgin IL 60124-7836";
                  else if (dallas.includes(state)) addr = "USCIS Dallas Lockbox | USPS: P.O. Box 660060, Dallas TX 75266-0060 | FedEx/UPS/DHL: 2501 S State Hwy 121 Biz Suite 400, Lewisville TX 75067-8003";
                  else if (chicago.includes(state)) addr = "USCIS Chicago Lockbox | USPS: P.O. Box 4380, Chicago IL 60680-4380 | FedEx/UPS/DHL: 131 S. Dearborn 3rd Floor, Chicago IL 60603-5517";
                  else if (state) addr = "USCIS Phoenix Lockbox | USPS: P.O. Box 21251, Phoenix AZ 85036-1251 | FedEx/UPS/DHL: 2108 E. Elliot Rd., Tempe AZ 85284-1806";
                  e.target.nextSibling.style.display = addr ? "block" : "none";
                  e.target.nextSibling.innerText = addr;
                }} style={{ width:"100%",background:"#111",border:"1px solid #333",color:"#F5F5F5",padding:"12px 16px",fontSize:"14px",fontFamily:"inherit",outline:"none",marginBottom:"12px",cursor:"pointer" }}>
                  <option value="">— Select your state —</option>
                  {["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","PR","GU","VI","AS","MP"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <pre style={{ display:"none",background:"#0a0a0a",border:"1px solid #1a3a1a",borderLeft:"3px solid #4ade80",padding:"16px",color:"#9be9a8",fontSize:"12px",lineHeight:1.9,whiteSpace:"pre-wrap",fontFamily:"'DM Sans',sans-serif",margin:0 }}></pre>
              </div>
            </div>
            <div style={{ background:"#0d0d0d",border:"1px solid #222",borderLeft:"3px solid #C9A84C",padding:"28px 32px",display:"flex",gap:"24px",alignItems:"flex-start" }}>
              <div style={{ background:"#C9A84C",color:"#000",width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"14px",flexShrink:0 }}>3</div>
              <div>
                <p style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"2px",fontWeight:600,marginBottom:"8px" }}>PAY THE FILING FEE</p>
                <p style={{ color:"#aaa",fontSize:"14px",lineHeight:1.8,margin:"0 0 10px" }}>The 2026 USCIS filing fee is <strong style={{color:"#F5F5F5"}}>$710 if you file online</strong> or <strong style={{color:"#F5F5F5"}}>$760 if you file by mail</strong>. Pay electronically when filing online, or by money order made out to "U.S. Department of Homeland Security" for paper filing.</p>
                <p style={{ color:"#aaa",fontSize:"13px",lineHeight:1.8,margin:"0 0 10px" }}>Can't afford the fee? You may qualify for a <a href="/n-400-fee-waiver.html" target="_blank" style={{color:"#C9A84C"}}>full fee waiver ($0) or reduced fee ($380)</a> based on income or benefits you receive.</p>
                <div style={{ background:"#0a0800",border:"1px solid #2a2000",borderLeft:"3px solid #C9A84C",padding:"12px 16px",marginTop:"8px" }}>
                  <p style={{ color:"#d4b87a",fontSize:"12px",margin:0,lineHeight:1.8 }}><strong style={{color:"#F5F5F5"}}>2026 processing time after filing:</strong> 6–10 months for 80% of applicants (USCIS April 2026). Times vary significantly by field office — from 5.5 months (Hialeah FL) to 12.5 months (Fort Myers FL). <a href="/n-400-processing-time-by-state.html" target="_blank" style={{color:"#C9A84C"}}>Look up your exact office →</a></p>
                </div>
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

          <button onClick={() => setPage("dashboard_modules")} style={{ background:"transparent",border:"1px solid #333",color:"#777",padding:"12px 32px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontFamily:"inherit" }}>REVIEW MY MODULES</button>

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
              <div style={{ fontSize:"28px" }}>{hasPaid ? ["📋","📝","⚠️","🎤"][i] : "🔒"}</div>
              <h3 style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"4px",fontWeight:300,margin:0 }}>{mod}</h3>
              <p style={{ color:"#aaa",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{t("modDesc")[i]}</p>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"20px",borderTop:"1px solid #111" }}>
                <span style={{ color: !hasPaid ? "#C9A84C" : getProgressColor(i),fontSize:"10px",letterSpacing:"2px",fontWeight:600 }}>{!hasPaid ? "🔒 LOCKED" : getProgressLabel(i)}</span>
                <button onClick={() => handleModuleOpen(i)} style={{ background: !hasPaid ? "#C9A84C" : moduleProgress[i]==="COMPLETE"?"transparent":"#C9A84C",border:`1px solid ${moduleProgress[i]==="COMPLETE"&&hasPaid?"#4ade80":"#C9A84C"}`,color: !hasPaid ? "#000" : moduleProgress[i]==="COMPLETE"?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>{!hasPaid ? "$9.99 UNLOCK" : getBtnLabel(i)}</button>
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
                <div style={{ fontSize:"28px" }}>{hasPaid ? ["📋","📝","⚠️","🎤"][i] : "🔒"}</div>
                <h3 style={{ color:"#F5F5F5",fontSize:"14px",letterSpacing:"4px",fontWeight:300,margin:0 }}>{mod}</h3>
                <p style={{ color:"#aaa",fontSize:"13px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>{t("modDesc")[i]}</p>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"20px",borderTop:"1px solid #111" }}>
                  <span style={{ color: !hasPaid ? "#C9A84C" : getProgressColor(i),fontSize:"10px",letterSpacing:"2px",fontWeight:600 }}>{!hasPaid ? "🔒 LOCKED" : getProgressLabel(i)}</span>
                  <button onClick={() => handleModuleOpen(i)} style={{ background: !hasPaid ? "#C9A84C" : moduleProgress[i]==="COMPLETE"?"transparent":"#C9A84C",border:`1px solid ${moduleProgress[i]==="COMPLETE"&&hasPaid?"#4ade80":"#C9A84C"}`,color: !hasPaid ? "#000" : moduleProgress[i]==="COMPLETE"?"#4ade80":"#000",padding:"10px 28px",fontSize:"11px",letterSpacing:"3px",cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>{!hasPaid ? "$9.99 UNLOCK" : getBtnLabel(i)}</button>
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
        {onboardingAnswers.criminal === "yes" && (
          <div style={{ background:"#1a0a0a",border:"2px solid #e05555",padding:"24px",marginBottom:"16px" }}>
            <h3 style={{ color:"#e05555",fontSize:"11px",letterSpacing:"4px",margin:"0 0 12px",fontWeight:700 }}>⚠ ATTORNEY REVIEW RECOMMENDED</h3>
            <p style={{ color:"#e9a8a8",fontSize:"14px",margin:"0 0 14px",lineHeight:"1.9" }}>You indicated criminal history. Certain convictions are permanent bars to U.S. citizenship. Others create a waiting period. LEGALIAI can guide you through the form — but for criminal history cases, we strongly recommend consulting a licensed immigration attorney before filing.</p>
            <a href="/n400-good-moral-character.html" target="_blank" style={{ color:"#e05555",fontSize:"12px",letterSpacing:"2px" }}>UNDERSTAND YOUR GOOD MORAL CHARACTER RIGHTS →</a>
          </div>
        )}
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
          <p style={{ color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"16px",lineHeight:1.8 }}>{t("interviewNote")}</p>
          <div style={{ background:"#0a0800",border:"1px solid #2a2000",borderLeft:"3px solid #C9A84C",padding:"14px 18px",marginBottom:"32px" }}>
            <p style={{ color:"#d4b87a",fontSize:"12px",letterSpacing:"1px",margin:0,lineHeight:1.8 }}>
              <strong style={{color:"#F5F5F5"}}>Which civics test will you take?</strong><br/>
              Filed N-400 on or after October 20, 2025 &rarr; <strong style={{color:"#F5F5F5"}}>New 2025 test</strong>: 20 questions asked, answer 12 correctly to pass.<br/>
              Filed before October 20, 2025 &rarr; <strong style={{color:"#F5F5F5"}}>Old 2008 test</strong>: 10 questions asked, answer 6 correctly to pass.<br/>
              <span style={{color:"#888",fontSize:"11px"}}>Check your Form I-797C receipt notice for your exact filing date.</span>
            </p>
          </div>
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

export default function Root() {
  return (
    <>
      <App />
      <Analytics />
    </>
  );
}
