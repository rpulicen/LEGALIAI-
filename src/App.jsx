import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://farljzeehqerktbihuep.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LANGUAGES = [
  { code: "en", label: "English", name: "English" },
  { code: "es", label: "Español", name: "Spanish" },
  { code: "zh", label: "中文", name: "Chinese" },
  { code: "tl", label: "Tagalog", name: "Tagalog" },
  { code: "vi", label: "Tiếng Việt", name: "Vietnamese" },
  { code: "hi", label: "हिन्दी", name: "Hindi" },
  { code: "pt", label: "Português", name: "Portuguese" },
];

const T = {
  en: {
    tagline: "YOUR U.S. CITIZENSHIP APPLICATION —\nPREPARED, NOT GUESSED.",
    sub: "AI-powered step-by-step preparation for your N-400. No lawyer needed. $49 one-time.",
    cta: "START MY PREPARATION",
    t1: "PLAIN ENGLISH GUIDANCE",
    t2: "PERSONALIZED TO YOUR SITUATION",
    t3: "NOT LEGAL ADVICE — PREPARATION ONLY",
    disclaimer: "LEGALIAI provides preparation guidance only. This is not legal advice. For complex situations, consult a licensed immigration attorney.",
    emailTitle: "ENTER YOUR EMAIL TO START",
    emailSub: "We'll send you a secure login link. No password needed.",
    sendLink: "SEND MAGIC LINK",
    checkEmail: "CHECK YOUR EMAIL",
    checkEmailSub: "Your magic link has been sent. Click the link in your email to continue.",
    q1: "HOW LONG HAVE YOU BEEN A PERMANENT RESIDENT?",
    q2: "ARE YOU MARRIED TO A U.S. CITIZEN?",
    q3: "HAVE YOU TRAVELED OUTSIDE THE U.S. FOR MORE THAN 6 MONTHS AT A TIME?",
    q4: "ANY CRIMINAL HISTORY INCLUDING MINOR OFFENSES?",
    q5: "WHAT COUNTRY WERE YOU BORN IN?",
    yes: "YES", no: "NO", next: "NEXT", finish: "FINISH",
    q1opts: ["Less than 3 years", "3–5 years", "5–10 years", "More than 10 years"],
    paywallTitle: "YOUR PERSONALIZED N-400 PREPARATION IS READY.",
    paywallSub: "Unlock everything for $49 one-time.",
    unlock: "UNLOCK NOW",
    paywallNote: "Secure payment. Instant access. No subscription.",
    dashTitle: "YOUR PREPARATION DASHBOARD",
    modules: ["DOCUMENT CHECKLIST", "FORM WALKTHROUGH", "RISK ASSESSMENT", "INTERVIEW PREP"],
    modDesc: [
      "Know exactly what to gather.",
      "Understand every question.",
      "Know your risks before USCIS does.",
      "Practice until you're confident.",
    ],
    start: "START", continue: "CONTINUE", notStarted: "NOT STARTED", inProgress: "IN PROGRESS", complete: "COMPLETE",
    signOut: "SIGN OUT",
    aiDisclaimer: "This is preparation guidance only, not legal advice. For complex situations, consult a licensed immigration attorney.",
    generating: "Generating your personalized analysis...",
    docTitle: "YOUR DOCUMENT CHECKLIST",
    formTitle: "N-400 FORM WALKTHROUGH",
    riskTitle: "YOUR RISK ASSESSMENT",
    interviewTitle: "INTERVIEW PREP",
    submitAnswer: "SUBMIT ANSWER",
    yourAnswer: "Type your answer here...",
    practiced: "PRACTICED",
    practice: "PRACTICE",
  },
  es: {
    tagline: "TU SOLICITUD DE CIUDADANÍA DE EE.UU. —\nPREPARADA, NO ADIVINADA.",
    sub: "Preparación paso a paso con IA para tu N-400. Sin abogado. $49 único pago.",
    cta: "COMENZAR MI PREPARACIÓN",
    t1: "GUÍA EN ESPAÑOL SENCILLO",
    t2: "PERSONALIZADO A TU SITUACIÓN",
    t3: "NO ES ASESORAMIENTO LEGAL — SOLO PREPARACIÓN",
    disclaimer: "LEGALIAI proporciona orientación de preparación únicamente. Esto no es asesoramiento legal.",
    emailTitle: "INGRESA TU CORREO PARA COMENZAR",
    emailSub: "Te enviaremos un enlace de acceso seguro. Sin contraseña.",
    sendLink: "ENVIAR ENLACE MÁGICO",
    checkEmail: "REVISA TU CORREO",
    checkEmailSub: "Tu enlace mágico ha sido enviado.",
    q1: "¿CUÁNTO TIEMPO HAS SIDO RESIDENTE PERMANENTE?",
    q2: "¿ESTÁS CASADO/A CON UN CIUDADANO/A DE EE.UU.?",
    q3: "¿HAS VIAJADO FUERA DE EE.UU. POR MÁS DE 6 MESES SEGUIDOS?",
    q4: "¿TIENES ANTECEDENTES PENALES INCLUYENDO INFRACCIONES MENORES?",
    q5: "¿EN QUÉ PAÍS NACISTE?",
    yes: "SÍ", no: "NO", next: "SIGUIENTE", finish: "FINALIZAR",
    q1opts: ["Menos de 3 años", "3–5 años", "5–10 años", "Más de 10 años"],
    paywallTitle: "TU PREPARACIÓN PERSONALIZADA N-400 ESTÁ LISTA.",
    paywallSub: "Desbloquea todo por $49 único pago.",
    unlock: "DESBLOQUEAR AHORA",
    paywallNote: "Pago seguro. Acceso inmediato. Sin suscripción.",
    dashTitle: "TU PANEL DE PREPARACIÓN",
    modules: ["LISTA DE DOCUMENTOS", "GUÍA DEL FORMULARIO", "EVALUACIÓN DE RIESGOS", "PREPARACIÓN PARA ENTREVISTA"],
    modDesc: ["Sabe exactamente qué reunir.", "Entiende cada pregunta.", "Conoce tus riesgos antes que USCIS.", "Practica hasta estar seguro/a."],
    start: "COMENZAR", continue: "CONTINUAR", notStarted: "NO INICIADO", inProgress: "EN PROGRESO", complete: "COMPLETO",
    signOut: "CERRAR SESIÓN",
    aiDisclaimer: "Esta es solo orientación de preparación, no asesoramiento legal.",
    generating: "Generando tu análisis personalizado...",
    docTitle: "TU LISTA DE DOCUMENTOS",
    formTitle: "GUÍA DEL FORMULARIO N-400",
    riskTitle: "TU EVALUACIÓN DE RIESGOS",
    interviewTitle: "PREPARACIÓN PARA ENTREVISTA",
    submitAnswer: "ENVIAR RESPUESTA",
    yourAnswer: "Escribe tu respuesta aquí...",
    practiced: "PRACTICADO",
    practice: "PRACTICAR",
  },
};

// Fallback to English for other languages
const getText = (lang, key) => {
  const t = T[lang] || T["en"];
  return t[key] || T["en"][key] || key;
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
    { id: "3a", q: "Where have you lived in the last 5 years?", explain: "List every address where you lived for more than 3 months in the past 5 years.", example: "123 Main St, Miami FL (2020–present), 456 Oak Ave, Dallas TX (2019–2020)", mistake: "Forgetting a short-term address or leaving gaps in your timeline." },
    { id: "3b", q: "Where have you worked in the last 5 years?", explain: "List every employer including part-time jobs and self-employment.", example: "ABC Corp, Miami FL, Manager (2021–present)", mistake: "Forgetting freelance or gig work." },
  ]},
  { section: "Part 4 — Travel Outside the U.S.", questions: [
    { id: "4a", q: "Have you traveled outside the U.S. in the last 5 years?", explain: "List every trip outside the U.S. even if just for a few days. Include destination, departure date, and return date.", example: "Mexico, June 1–June 10 2023, 9 days", mistake: "Forgetting short weekend trips or trips to Canada." },
    { id: "4b", q: "Have you ever been absent from the U.S. for more than 6 months?", explain: "A single trip over 6 months can break your continuous residence. This is a critical question.", example: "Yes, I was in Brazil from Jan 2019 to Aug 2019 caring for a sick parent.", mistake: "Not disclosing this — USCIS will find it in travel records." },
  ]},
  { section: "Part 5 — Marital History", questions: [
    { id: "5a", q: "What is your current marital status?", explain: "Select your current status: single, married, divorced, widowed, or separated.", example: "Married since March 15, 2015.", mistake: "Selecting married if legally separated." },
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
  "Under the Constitution, some powers belong to the states. Name one power of the states.",
  "Name one war fought by the United States in the 1900s.",
  "Name one American Indian tribe in the United States.",
  "What is the economic system in the United States?",
  "What is the 'rule of law'?",
];

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
  const [progress, setProgress] = useState({});
  const [activeModule, setActiveModule] = useState(null);
  const [aiContent, setAiContent] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [formAnswers, setFormAnswers] = useState({});
  const [formFeedback, setFormFeedback] = useState({});
  const [interviewAnswers, setInterviewAnswers] = useState({});
  const [interviewFeedback, setInterviewFeedback] = useState({});
  const [practiced, setPracticed] = useState({});
  const [docChecks, setDocChecks] = useState({});

  const t = (key) => getText(lang, key);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); setPage("dashboard"); }
    });
    const savedLang = localStorage.getItem("legaliai_lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const handleLangChange = (code) => {
    setLang(code);
    localStorage.setItem("legaliai_lang", code);
    setShowLangMenu(false);
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
  };

  const handleStartCTA = () => {
    if (user) { setPage("onboarding"); }
    else { setShowEmailModal(true); }
  };

  const handleOnboardingNext = () => {
    if (currentQ < 4) setCurrentQ(currentQ + 1);
    else {
      saveOnboardingAnswers();
      setPage("paywall");
    }
  };

  const saveOnboardingAnswers = async () => {
    if (user) {
      await supabase.from("onboarding_answers").upsert({ user_id: user.id, answers: onboardingAnswers });
    }
  };

  const handleUnlock = () => {
    // Stripe integration placeholder — goes to dashboard for now in test mode
    setPage("dashboard");
  };

  const handleModuleOpen = (idx) => {
    setActiveModule(idx);
    const moduleNames = ["documents", "form", "risk", "interview"];
    setPage(moduleNames[idx]);
    if (idx === 0 && !aiContent.documents) generateDocuments();
    if (idx === 2 && !aiContent.risk) generateRisk();
  };

  const callAI = async (prompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const generateDocuments = async () => {
    setLoadingAI(true);
    const langName = LANGUAGES.find(l => l.code === lang)?.name || "English";
    const prompt = `You are an immigration preparation assistant. Based on these answers for an N-400 naturalization application: ${JSON.stringify(onboardingAnswers)}, generate a personalized document checklist. For each document provide: name, where to get it, and why USCIS needs it. Format as JSON array: [{name, source, reason}]. Respond in ${langName}. Keep explanations simple and clear for a non-native English speaker.`;
    try {
      const text = await callAI(prompt);
      const clean = text.replace(/```json|```/g, "").trim();
      const docs = JSON.parse(clean);
      setAiContent(prev => ({ ...prev, documents: docs }));
    } catch {
      setAiContent(prev => ({ ...prev, documents: [
        { name: "Permanent Resident Card (Green Card)", source: "Your physical card", reason: "Proves your immigration status" },
        { name: "Passport from country of birth", source: "Your home country embassy", reason: "Confirms your identity and nationality" },
        { name: "Tax returns (last 5 years)", source: "IRS or your tax preparer", reason: "Proves continuous U.S. residence" },
        { name: "Travel records", source: "Your personal records or passport stamps", reason: "Documents all trips outside the U.S." },
        { name: "Marriage certificate (if applicable)", source: "Vital records office where you married", reason: "Required if married to a U.S. citizen" },
      ]}));
    }
    setLoadingAI(false);
  };

  const generateRisk = async () => {
    setLoadingAI(true);
    const langName = LANGUAGES.find(l => l.code === lang)?.name || "English";
    const prompt = `You are an immigration preparation assistant. Based on these N-400 onboarding answers: ${JSON.stringify(onboardingAnswers)}, identify 3-5 personal risk factors for this application. For each risk provide: title, explanation of why it matters, and a specific recommended action. Format as JSON array: [{title, explanation, action}]. Respond in ${langName}. Be specific, not generic. Write plainly for a non-native English speaker.`;
    try {
      const text = await callAI(prompt);
      const clean = text.replace(/```json|```/g, "").trim();
      const risks = JSON.parse(clean);
      setAiContent(prev => ({ ...prev, risk: risks }));
    } catch {
      setAiContent(prev => ({ ...prev, risk: [
        { title: "Continuous Residence", explanation: "Any trip over 6 months could interrupt your continuous residence requirement.", action: "Gather travel records and be ready to explain any long trips." },
        { title: "Good Moral Character", explanation: "USCIS reviews the past 5 years of your conduct.", action: "Disclose all interactions with law enforcement, even minor ones." },
      ]}));
    }
    setLoadingAI(false);
  };

  const handleFormFeedback = async (qId, question, answer) => {
    const langName = LANGUAGES.find(l => l.code === lang)?.name || "English";
    const prompt = `Review this answer for N-400 question "${question}": "${answer}". Give brief feedback: is it complete, clear, any red flags? Keep it to 2-3 sentences. Respond in ${langName}.`;
    const feedback = await callAI(prompt);
    setFormFeedback(prev => ({ ...prev, [qId]: feedback }));
  };

  const handleInterviewSubmit = async (idx, question, answer) => {
    const langName = LANGUAGES.find(l => l.code === lang)?.name || "English";
    const prompt = `Evaluate this answer to N-400 interview question "${question}": "${answer}". Rate clarity 1-10. Note one strength and one improvement. Be encouraging but honest. Keep it to 3 sentences. Respond in ${langName}.`;
    const feedback = await callAI(prompt);
    setInterviewFeedback(prev => ({ ...prev, [idx]: feedback }));
    setPracticed(prev => ({ ...prev, [idx]: true }));
  };

  // ─── COMPONENTS ───────────────────────────────────────────────

  const Nav = () => (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", background: "rgba(0,0,0,0.95)", borderBottom: "1px solid #1a1a1a" }}>
      <div onClick={() => setPage("landing")} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", letterSpacing: "12px", color: "#C9A84C", cursor: "pointer", fontWeight: 300 }}>LEGALIAI</div>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {user && <span style={{ color: "#666", fontSize: "13px", letterSpacing: "1px" }}>{user.email}</span>}
        {user && <button onClick={handleSignOut} style={{ background: "none", border: "none", color: "#666", fontSize: "11px", letterSpacing: "2px", cursor: "pointer", fontFamily: "inherit" }}>{t("signOut")}</button>}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} style={{ background: "none", border: "1px solid #333", color: "#999", padding: "6px 12px", fontSize: "11px", letterSpacing: "2px", cursor: "pointer", fontFamily: "inherit" }}>
            🌐 {LANGUAGES.find(l => l.code === lang)?.label}
          </button>
          {showLangMenu && (
            <div style={{ position: "absolute", right: 0, top: "100%", background: "#111", border: "1px solid #333", minWidth: "160px", zIndex: 200 }}>
              {LANGUAGES.map(l => (
                <div key={l.code} onClick={() => handleLangChange(l.code)} style={{ padding: "10px 16px", color: lang === l.code ? "#C9A84C" : "#999", cursor: "pointer", fontSize: "13px", borderBottom: "1px solid #1a1a1a", letterSpacing: "1px" }}>{l.label}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const Disclaimer = () => (
    <p style={{ color: "#444", fontSize: "11px", textAlign: "center", letterSpacing: "1px", lineHeight: "1.8", marginTop: "40px", maxWidth: "600px", margin: "40px auto 0" }}>{t("disclaimer")}</p>
  );

  // ─── PAGES ────────────────────────────────────────────────────

  if (page === "landing") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
      <Nav />
      {showEmailModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a0a0a", border: "1px solid #C9A84C", padding: "60px", maxWidth: "480px", width: "90%", textAlign: "center" }}>
            {!magicSent ? <>
              <h2 style={{ color: "#F5F5F5", fontSize: "22px", letterSpacing: "6px", marginBottom: "12px", fontWeight: 300 }}>{t("emailTitle")}</h2>
              <p style={{ color: "#666", fontSize: "13px", letterSpacing: "1px", marginBottom: "32px" }}>{t("emailSub")}</p>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ width: "100%", background: "#111", border: "1px solid #333", color: "#F5F5F5", padding: "14px 20px", fontSize: "15px", marginBottom: "16px", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }} />
              <button onClick={handleSendMagicLink} style={{ width: "100%", background: "#C9A84C", border: "none", color: "#000", padding: "16px", fontSize: "13px", letterSpacing: "3px", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>{t("sendLink")}</button>
              <button onClick={() => setShowEmailModal(false)} style={{ marginTop: "16px", background: "none", border: "none", color: "#555", fontSize: "12px", cursor: "pointer", letterSpacing: "1px", fontFamily: "inherit" }}>Cancel</button>
            </> : <>
              <h2 style={{ color: "#C9A84C", fontSize: "22px", letterSpacing: "6px", marginBottom: "12px", fontWeight: 300 }}>{t("checkEmail")}</h2>
              <p style={{ color: "#999", fontSize: "14px", letterSpacing: "1px", lineHeight: "1.8" }}>{t("checkEmailSub")}</p>
            </>}
          </div>
        </div>
      )}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ color: "#F5F5F5", fontSize: "clamp(32px,5vw,60px)", letterSpacing: "4px", fontWeight: 300, lineHeight: 1.3, marginBottom: "32px", whiteSpace: "pre-line" }}>{t("tagline")}</h1>
          <p style={{ color: "#999", fontSize: "18px", letterSpacing: "2px", marginBottom: "48px", lineHeight: 1.8 }}>{t("sub")}</p>
          <button onClick={handleStartCTA} style={{ background: "#C9A84C", border: "none", color: "#000", padding: "20px 60px", fontSize: "14px", letterSpacing: "4px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s" }}
            onMouseOver={e => e.target.style.background = "#e6c060"}
            onMouseOut={e => e.target.style.background = "#C9A84C"}
          >{t("cta")}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", marginBottom: "80px" }}>
          {[t("t1"), t("t2"), t("t3")].map((text, i) => (
            <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "40px 30px", textAlign: "center" }}>
              <div style={{ color: "#C9A84C", fontSize: "24px", marginBottom: "16px" }}>{"⟡"}</div>
              <p style={{ color: "#999", fontSize: "12px", letterSpacing: "2px", lineHeight: "1.8" }}>{text}</p>
            </div>
          ))}
        </div>
        <Disclaimer />
      </div>
    </div>
  );

  if (page === "onboarding") {
    const questions = [
      { key: "residency", type: "choice", label: t("q1"), opts: t("q1opts") },
      { key: "married_citizen", type: "yesno", label: t("q2") },
      { key: "long_travel", type: "yesno", label: t("q3") },
      { key: "criminal", type: "yesno", label: t("q4") },
      { key: "country", type: "dropdown", label: t("q5"), opts: COUNTRIES },
    ];
    const q = questions[currentQ];
    const progress_pct = ((currentQ) / 5) * 100;
    return (
      <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
        <Nav />
        <div style={{ height: "3px", background: "#111", position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99 }}>
          <div style={{ height: "100%", background: "#C9A84C", width: `${progress_pct}%`, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 80px)", padding: "40px" }}>
          <p style={{ color: "#555", fontSize: "11px", letterSpacing: "4px", marginBottom: "40px" }}>QUESTION {currentQ + 1} OF 5</p>
          <h2 style={{ color: "#F5F5F5", fontSize: "clamp(20px,3vw,36px)", letterSpacing: "3px", fontWeight: 300, textAlign: "center", maxWidth: "700px", marginBottom: "48px", lineHeight: 1.4 }}>{q.label}</h2>
          {q.type === "yesno" && (
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              {[t("yes"), t("no")].map((opt, i) => (
                <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev, [q.key]: i === 0 ? "yes" : "no" }))}
                  style={{ background: onboardingAnswers[q.key] === (i === 0 ? "yes" : "no") ? "#C9A84C" : "transparent", border: `1px solid ${onboardingAnswers[q.key] === (i === 0 ? "yes" : "no") ? "#C9A84C" : "#333"}`, color: onboardingAnswers[q.key] === (i === 0 ? "yes" : "no") ? "#000" : "#999", padding: "16px 48px", fontSize: "13px", letterSpacing: "3px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, transition: "all 0.2s" }}>{opt}</button>
              ))}
            </div>
          )}
          {q.type === "choice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", width: "100%", maxWidth: "500px" }}>
              {q.opts.map((opt, i) => (
                <button key={i} onClick={() => setOnboardingAnswers(prev => ({ ...prev, [q.key]: opt }))}
                  style={{ background: onboardingAnswers[q.key] === opt ? "#C9A84C" : "transparent", border: `1px solid ${onboardingAnswers[q.key] === opt ? "#C9A84C" : "#333"}`, color: onboardingAnswers[q.key] === opt ? "#000" : "#999", padding: "16px 32px", fontSize: "14px", letterSpacing: "2px", cursor: "pointer", fontFamily: "inherit", fontWeight: onboardingAnswers[q.key] === opt ? 600 : 400, transition: "all 0.2s", textAlign: "left" }}>{opt}</button>
              ))}
            </div>
          )}
          {q.type === "dropdown" && (
            <select value={onboardingAnswers[q.key] || ""} onChange={e => setOnboardingAnswers(prev => ({ ...prev, [q.key]: e.target.value }))}
              style={{ background: "#111", border: "1px solid #333", color: "#F5F5F5", padding: "14px 20px", fontSize: "15px", marginBottom: "32px", width: "100%", maxWidth: "500px", fontFamily: "inherit", outline: "none", cursor: "pointer" }}>
              <option value="">Select your country...</option>
              {q.opts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          <button onClick={handleOnboardingNext} style={{ background: "#C9A84C", border: "none", color: "#000", padding: "16px 48px", fontSize: "13px", letterSpacing: "4px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>
            {currentQ < 4 ? t("next") : t("finish")}
          </button>
        </div>
      </div>
    );
  }

  if (page === "paywall") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Nav />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1 style={{ color: "#F5F5F5", fontSize: "clamp(24px,4vw,48px)", letterSpacing: "3px", fontWeight: 300, marginBottom: "20px", lineHeight: 1.3 }}>{t("paywallTitle")}</h1>
        <p style={{ color: "#999", fontSize: "18px", letterSpacing: "2px", marginBottom: "48px" }}>{t("paywallSub")}</p>
        <button onClick={handleUnlock} style={{ background: "#C9A84C", border: "none", color: "#000", padding: "22px 80px", fontSize: "15px", letterSpacing: "4px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit", display: "block", margin: "0 auto 16px" }}
          onMouseOver={e => e.target.style.background = "#e6c060"}
          onMouseOut={e => e.target.style.background = "#C9A84C"}
        >{t("unlock")}</button>
        <p style={{ color: "#555", fontSize: "12px", letterSpacing: "2px" }}>{t("paywallNote")}</p>
        <Disclaimer />
      </div>
    </div>
  );

  if (page === "dashboard") {
    const moduleIcons = ["📋", "📝", "⚠️", "🎤"];
    const statuses = [progress[0] || t("notStarted"), progress[1] || t("notStarted"), progress[2] || t("notStarted"), progress[3] || t("notStarted")];
    return (
      <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
        <Nav />
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 40px" }}>
          <h1 style={{ color: "#F5F5F5", fontSize: "clamp(20px,3vw,36px)", letterSpacing: "6px", fontWeight: 300, marginBottom: "60px", textAlign: "center" }}>{t("dashTitle")}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px" }}>
            {getText(lang, "modules").map((mod, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ fontSize: "32px" }}>{moduleIcons[i]}</div>
                <h3 style={{ color: "#F5F5F5", fontSize: "16px", letterSpacing: "4px", fontWeight: 300, margin: 0 }}>{mod}</h3>
                <p style={{ color: "#666", fontSize: "13px", letterSpacing: "1px", margin: 0 }}>{getText(lang, "modDesc")[i]}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ color: "#C9A84C", fontSize: "10px", letterSpacing: "2px" }}>{statuses[i]}</span>
                  <button onClick={() => handleModuleOpen(i)} style={{ background: "#C9A84C", border: "none", color: "#000", padding: "10px 28px", fontSize: "11px", letterSpacing: "3px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>{t("start")}</button>
                </div>
              </div>
            ))}
          </div>
          <Disclaimer />
        </div>
      </div>
    );
  }

  if (page === "documents") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
      <Nav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit" }}>← BACK</button>
        <h1 style={{ color: "#F5F5F5", fontSize: "32px", letterSpacing: "6px", fontWeight: 300, marginBottom: "40px" }}>{t("docTitle")}</h1>
        {loadingAI && <p style={{ color: "#C9A84C", letterSpacing: "2px", fontSize: "13px" }}>{t("generating")}</p>}
        {aiContent.documents && aiContent.documents.map((doc, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "24px", marginBottom: "2px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
            <input type="checkbox" checked={!!docChecks[i]} onChange={e => setDocChecks(prev => ({ ...prev, [i]: e.target.checked }))} style={{ marginTop: "4px", accentColor: "#C9A84C", width: "18px", height: "18px", cursor: "pointer" }} />
            <div>
              <h3 style={{ color: docChecks[i] ? "#555" : "#F5F5F5", fontSize: "15px", letterSpacing: "2px", margin: "0 0 8px", textDecoration: docChecks[i] ? "line-through" : "none" }}>{doc.name}</h3>
              <p style={{ color: "#777", fontSize: "13px", letterSpacing: "1px", margin: "0 0 4px" }}><span style={{ color: "#C9A84C" }}>WHERE:</span> {doc.source}</p>
              <p style={{ color: "#666", fontSize: "12px", letterSpacing: "1px", margin: 0 }}><span style={{ color: "#C9A84C" }}>WHY:</span> {doc.reason}</p>
            </div>
          </div>
        ))}
        <p style={{ color: "#333", fontSize: "11px", letterSpacing: "1px", marginTop: "32px", textAlign: "center" }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  if (page === "form") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
      <Nav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit" }}>← BACK</button>
        <h1 style={{ color: "#F5F5F5", fontSize: "32px", letterSpacing: "6px", fontWeight: 300, marginBottom: "40px" }}>{t("formTitle")}</h1>
        {N400_SECTIONS.map((section, si) => (
          <div key={si} style={{ marginBottom: "32px" }}>
            <h2 style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "4px", marginBottom: "16px", fontWeight: 400 }}>{section.section}</h2>
            {section.questions.map((q) => (
              <div key={q.id} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "24px", marginBottom: "2px" }}>
                <h3 style={{ color: "#F5F5F5", fontSize: "15px", letterSpacing: "1px", margin: "0 0 12px", fontWeight: 400 }}>{q.q}</h3>
                <p style={{ color: "#777", fontSize: "12px", letterSpacing: "1px", margin: "0 0 8px" }}><span style={{ color: "#C9A84C" }}>WHAT IT MEANS:</span> {q.explain}</p>
                <p style={{ color: "#666", fontSize: "12px", letterSpacing: "1px", margin: "0 0 8px" }}><span style={{ color: "#C9A84C" }}>EXAMPLE:</span> {q.example}</p>
                <p style={{ color: "#666", fontSize: "12px", letterSpacing: "1px", margin: "0 0 16px" }}><span style={{ color: "#e05555" }}>⚠ COMMON MISTAKE:</span> {q.mistake}</p>
                <textarea value={formAnswers[q.id] || ""} onChange={e => setFormAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  onBlur={() => formAnswers[q.id] && handleFormFeedback(q.id, q.q, formAnswers[q.id])}
                  placeholder={t("yourAnswer")}
                  style={{ width: "100%", background: "#111", border: "1px solid #222", color: "#F5F5F5", padding: "12px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", minHeight: "80px", boxSizing: "border-box", outline: "none" }} />
                {formFeedback[q.id] && <p style={{ color: "#C9A84C", fontSize: "12px", letterSpacing: "1px", marginTop: "8px", lineHeight: "1.8", borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>{formFeedback[q.id]}</p>}
              </div>
            ))}
          </div>
        ))}
        <p style={{ color: "#333", fontSize: "11px", letterSpacing: "1px", marginTop: "32px", textAlign: "center" }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  if (page === "risk") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
      <Nav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit" }}>← BACK</button>
        <h1 style={{ color: "#F5F5F5", fontSize: "32px", letterSpacing: "6px", fontWeight: 300, marginBottom: "40px" }}>{t("riskTitle")}</h1>
        {loadingAI && <p style={{ color: "#C9A84C", letterSpacing: "2px", fontSize: "13px" }}>{t("generating")}</p>}
        {aiContent.risk && aiContent.risk.map((risk, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderLeft: "3px solid #C9A84C", padding: "28px", marginBottom: "2px" }}>
            <h3 style={{ color: "#C9A84C", fontSize: "14px", letterSpacing: "3px", margin: "0 0 12px", fontWeight: 400 }}>⚠ {risk.title}</h3>
            <p style={{ color: "#999", fontSize: "14px", letterSpacing: "1px", margin: "0 0 12px", lineHeight: "1.8" }}>{risk.explanation}</p>
            <p style={{ color: "#F5F5F5", fontSize: "13px", letterSpacing: "1px", margin: 0, lineHeight: "1.8" }}><span style={{ color: "#C9A84C" }}>ACTION:</span> {risk.action}</p>
          </div>
        ))}
        <p style={{ color: "#333", fontSize: "11px", letterSpacing: "1px", marginTop: "32px", textAlign: "center" }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  if (page === "interview") return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Cormorant Garamond', serif", paddingTop: "80px" }}>
      <Nav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 40px" }}>
        <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: "#555", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", marginBottom: "40px", fontFamily: "inherit" }}>← BACK</button>
        <h1 style={{ color: "#F5F5F5", fontSize: "32px", letterSpacing: "6px", fontWeight: 300, marginBottom: "12px" }}>{t("interviewTitle")}</h1>
        <p style={{ color: "#666", fontSize: "13px", letterSpacing: "1px", marginBottom: "40px" }}>{Object.keys(practiced).length} / {INTERVIEW_QUESTIONS.length} practiced</p>
        {INTERVIEW_QUESTIONS.map((q, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "24px", marginBottom: "2px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <h3 style={{ color: practiced[i] ? "#555" : "#F5F5F5", fontSize: "14px", letterSpacing: "1px", margin: 0, fontWeight: 400, flex: 1, paddingRight: "16px" }}>{i + 1}. {q}</h3>
              {practiced[i] && <span style={{ color: "#C9A84C", fontSize: "10px", letterSpacing: "2px", whiteSpace: "nowrap" }}>{t("practiced")}</span>}
            </div>
            <textarea value={interviewAnswers[i] || ""} onChange={e => setInterviewAnswers(prev => ({ ...prev, [i]: e.target.value }))}
              placeholder={t("yourAnswer")}
              style={{ width: "100%", background: "#111", border: "1px solid #222", color: "#F5F5F5", padding: "12px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", minHeight: "70px", boxSizing: "border-box", outline: "none", marginBottom: "12px" }} />
            <button onClick={() => handleInterviewSubmit(i, q, interviewAnswers[i])}
              style={{ background: practiced[i] ? "#1a1a1a" : "#C9A84C", border: "none", color: practiced[i] ? "#555" : "#000", padding: "10px 24px", fontSize: "11px", letterSpacing: "3px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>
              {practiced[i] ? t("practiced") : t("practice")}
            </button>
            {interviewFeedback[i] && <p style={{ color: "#C9A84C", fontSize: "12px", letterSpacing: "1px", marginTop: "12px", lineHeight: "1.8", borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>{interviewFeedback[i]}</p>}
          </div>
        ))}
        <p style={{ color: "#333", fontSize: "11px", letterSpacing: "1px", marginTop: "32px", textAlign: "center" }}>{t("aiDisclaimer")}</p>
      </div>
    </div>
  );

  return null;
}
