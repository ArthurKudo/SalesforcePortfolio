import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "pt";
export type Localized<T = string> = T | { en: T; pt: T };

const STORAGE_KEY = "portfolio-lang";

const isLocalized = <T,>(value: Localized<T>): value is { en: T; pt: T } =>
  typeof value === "object" && value !== null && "en" in value && "pt" in value;

export function translate<T>(value: Localized<T>, lang: Lang): T {
  return isLocalized(value) ? value[lang] : value;
}

export const ui = {
  en: {
    nav: { experience: "Experience", certifications: "Certifications", skills: "Skills", work: "Work", contact: "Contact" },
    emailMe: "Email me",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    backToTop: "back to top",
    langLabel: "Language",
    skip: "Skip to content",
    hero: { cta: "Get in touch", experience: "See experience", certified: "10x certified", certifiedSub: "Admin · Consultant · AI · Marketing Cloud", certifiedAria: "10 Salesforce certifications, see all", portrait: "Portrait of" },
    experience: {
      label: "Experience",
      title: "From CRM analyst to Tech Lead, all on Salesforce.",
      sub: "Enterprise Sales, Service and Marketing Cloud delivery for banking and automotive, and the teams behind it.",
      current: "Current",
    },
    certifications: {
      label: "Certifications",
      title: "10x Salesforce certified.",
      sub: "Administrator, App Builder, Consultant, AI and Marketing Cloud credentials, kept active through every release's certification maintenance.",
      viewAll: "View all credentials",
      verify: "Verify on Trailblazer",
      dialogTitle: "10x Salesforce Certified",
      naming: "Names reflect Salesforce's current credential naming.",
      earnedAs: "Earned as",
      badgeAlt: "badge",
      close: "Close",
    },
    skills: {
      label: "Skills",
      title: "The platform, end to end.",
      sub: "From the data model and security to Flow, Service, Sales and Marketing Cloud. Tap a skill to see how it connects.",
      toolbox: "Toolbox",
      status: { completed: "CORE SKILL", "in-progress": "GROWING", pending: "NEXT" },
      proficiency: "Proficiency",
      worksWith: "Works with",
    },
    work: {
      label: "Selected work",
      title: "Case studies, told by the screens.",
      sub: "Scroll through each project, then open a case for the problem, the solution, mockups, demo videos and slides.",
      wheelLabel: "Works '26",
      action: "View case",
      open: "Open case study",
      prev: "Previous case",
      next: "Next case",
      goTo: "Go to case",
      close: "Close case",
      sample: "Sample case study",
      video: "Demo video",
      challenge: "The challenge",
      solution: "The solution",
      results: "Results",
      mockups: "Mockups & screens",
      slides: "Presentation",
      stack: "Tech & features",
      screenshot: "Project screenshot",
    },
    contact: {
      label: "Contact",
      title: "Let's build what's next on Salesforce.",
      lead: "Open to Salesforce Tech Lead and Senior Salesforce Administrator roles, remote or hybrid. Advanced English, native Portuguese. I usually reply within a day.",
    },
  },
  pt: {
    nav: { experience: "Experiência", certifications: "Certificações", skills: "Skills", work: "Projetos", contact: "Contato" },
    emailMe: "Enviar e-mail",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    backToTop: "voltar ao topo",
    langLabel: "Idioma",
    skip: "Pular para o conteúdo",
    hero: { cta: "Fale comigo", experience: "Ver experiência", certified: "10x certificado", certifiedSub: "Admin · Consultant · IA · Marketing Cloud", certifiedAria: "10 certificações Salesforce, ver todas", portrait: "Retrato de" },
    experience: {
      label: "Experiência",
      title: "De analista de CRM a Tech Lead, sempre em Salesforce.",
      sub: "Delivery enterprise de Sales, Service e Marketing Cloud para bancos e montadoras, e os times por trás dele.",
      current: "Atual",
    },
    certifications: {
      label: "Certificações",
      title: "10x certificado Salesforce.",
      sub: "Credenciais de Administrator, App Builder, Consultant, IA e Marketing Cloud, mantidas ativas com a certification maintenance de cada release.",
      viewAll: "Ver todas as credenciais",
      verify: "Verificar no Trailblazer",
      dialogTitle: "10x Certificado Salesforce",
      naming: "Os nomes seguem a nomenclatura atual de credenciais da Salesforce.",
      earnedAs: "Conquistada como",
      badgeAlt: "badge",
      close: "Fechar",
    },
    skills: {
      label: "Skills",
      title: "A plataforma, de ponta a ponta.",
      sub: "Do modelo de dados e segurança a Flow, Service, Sales e Marketing Cloud. Toque em uma skill para ver as conexões.",
      toolbox: "Ferramentas",
      status: { completed: "SKILL PRINCIPAL", "in-progress": "EM EVOLUÇÃO", pending: "PRÓXIMA" },
      proficiency: "Proficiência",
      worksWith: "Conecta com",
    },
    work: {
      label: "Projetos",
      title: "Cases contados pelas telas.",
      sub: "Role pelos projetos e abra um case para ver o problema, a solução, mockups, vídeos e apresentações.",
      wheelLabel: "Projetos '26",
      action: "Ver case",
      open: "Abrir case",
      prev: "Case anterior",
      next: "Próximo case",
      goTo: "Ir para o case",
      close: "Fechar case",
      sample: "Case de exemplo",
      video: "Vídeo demo",
      challenge: "O desafio",
      solution: "A solução",
      results: "Resultados",
      mockups: "Mockups e telas",
      slides: "Apresentação",
      stack: "Tecnologias e recursos",
      screenshot: "Tela do projeto",
    },
    contact: {
      label: "Contato",
      title: "Vamos construir o próximo passo em Salesforce.",
      lead: "Aberto a vagas de Tech Lead Salesforce e Administrador Salesforce Sênior, remoto ou híbrido. Inglês avançado, português nativo. Costumo responder em até um dia.",
    },
  },
};

export type UiStrings = (typeof ui)["en"];

const META = {
  en: {
    title: "Arthur Kudo · Salesforce Tech Lead",
    description:
      "Arthur Kudo — Salesforce Tech Lead and Senior Salesforce Administrator, 10x Salesforce Certified. Sales, Service and Marketing Cloud solutions for enterprise clients.",
  },
  pt: {
    title: "Arthur Kudo · Tech Lead Salesforce",
    description:
      "Arthur Kudo — Tech Lead e Administrador Salesforce Sênior, 10x certificado Salesforce. Soluções em Sales, Service e Marketing Cloud para clientes enterprise.",
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UiStrings;
  tx: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function initialLang(): Lang {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "pt" || param === "en") return param;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    return "en";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", META[lang].description);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: ui[lang], tx: <T,>(v: Localized<T>) => translate(v, lang) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
