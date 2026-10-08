import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import type { Localized } from "@/i18n";

export const profile = {
  name: "Arthur Kudo",
  role: { en: "Salesforce Tech Lead & Senior Salesforce Administrator", pt: "Tech Lead & Administrador Salesforce Sênior" } as Localized,
  summary: {
    en: "I lead Sales Cloud, Service Cloud and Marketing Cloud implementations for enterprise banking and automotive clients, owning solution design, org governance and the delivery team.",
    pt: "Lidero implementações de Sales Cloud, Service Cloud e Marketing Cloud para clientes enterprise dos setores bancário e automotivo, respondendo pelo solution design, pela governança da org e pelo time de delivery.",
  } as Localized,
  location: { en: "Balneário Camboriú, Brazil", pt: "Balneário Camboriú, Brasil" } as Localized,
  availability: { en: "Open to Salesforce Tech Lead roles", pt: "Aberto a vagas de Tech Lead Salesforce" } as Localized,
  workModel: { en: "Remote · Hybrid", pt: "Remoto · Híbrido" } as Localized,
  currentCompany: "Codeart",
  email: "yukioarthur@gmail.com",
  linkedin: "https://www.linkedin.com/in/arthur-kudo-ab362419a/",
  trailblazer: "https://trailblazer.me/id/ayukio",
};

export const highlights: { value: Localized; label: Localized }[] = [
  { value: "6+", label: { en: "years on Salesforce", pt: "anos de Salesforce" } },
  { value: "10x", label: { en: "Salesforce certified", pt: "certificado Salesforce" } },
  { value: "3", label: { en: "clouds delivered", pt: "clouds entregues" } },
  { value: "EN · PT", label: { en: "advanced English, native Portuguese", pt: "inglês avançado, português nativo" } },
];

export const toolbox: Localized[] = [
  "Sales Cloud",
  "Service Cloud",
  "Marketing Cloud Engagement",
  "Flow Builder",
  "Record-Triggered Flows",
  "Approval Processes",
  "Lightning App Builder",
  { en: "Data Modeling", pt: "Modelagem de dados" },
  "Permission Sets & Sharing Rules",
  "Validation Rules",
  "Reports & Dashboards",
  "Journey Builder",
  "Automation Studio",
  "Email Studio",
  "Data Extensions",
  "AMPscript",
  "Einstein Prediction Builder",
  "Solution Design",
  "User Stories",
  "Scrum",
  "Git · Bitbucket",
];

export interface Role {
  title: Localized;
  period: Localized;
  bullets: Localized[];
}

export interface Experience {
  company: Localized;
  span: Localized;
  meta: Localized;
  stack: string[];
  current?: boolean;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    company: "Codeart",
    span: { en: "Dec 2024 — Now", pt: "Dez 2024 — Atual" },
    meta: { en: "Salesforce consulting partner · Hybrid", pt: "Consultoria parceira Salesforce · Híbrido" },
    stack: ["Sales Cloud", "Service Cloud", "Marketing Cloud Engagement", "Flow Builder", "Approval Processes"],
    current: true,
    roles: [
      {
        title: { en: "Salesforce Tech Lead", pt: "Tech Lead Salesforce" },
        period: { en: "May 2025 – Present", pt: "Mai 2025 – Atual" },
        bullets: [
          {
            en: "Technical lead for enterprise Sales Cloud, Service Cloud and Marketing Cloud implementations at banking and automotive clients, from discovery and solution design to release.",
            pt: "Líder técnico de implementações enterprise de Sales Cloud, Service Cloud e Marketing Cloud em clientes bancários e automotivos, do discovery e solution design ao release.",
          },
          {
            en: "Define architecture standards and org governance: data model, automation patterns and technical reviews for performance and scalability.",
            pt: "Defino padrões de arquitetura e a governança da org: modelo de dados, padrões de automação e revisões técnicas com foco em performance e escalabilidade.",
          },
          {
            en: "Design complex automation with Flows, Approval Processes and integrations, and mentor junior and mid-level Salesforce professionals.",
            pt: "Desenho automações complexas com Flows, Approval Processes e integrações, e faço mentoria de profissionais Salesforce júnior e pleno.",
          },
        ],
      },
      {
        title: { en: "Senior Marketing Cloud Administrator", pt: "Administrador Marketing Cloud Sênior" },
        period: { en: "Dec 2024 – Apr 2025", pt: "Dez 2024 – Abr 2025" },
        bullets: [
          {
            en: "Administered Marketing Cloud Engagement: multi-channel journeys in Journey Builder, Automation Studio data flows and Data Extension models for segmentation.",
            pt: "Administrei o Marketing Cloud Engagement: jornadas multicanal no Journey Builder, fluxos de dados no Automation Studio e modelos de Data Extensions para segmentação.",
          },
          {
            en: "Built dynamic, personalized email templates with AMPscript, HTML and CSS, and supported data sync between Marketing Cloud and Sales/Service Cloud.",
            pt: "Criei templates de e-mail dinâmicos e personalizados com AMPscript, HTML e CSS, e apoiei a sincronização de dados entre Marketing Cloud e Sales/Service Cloud.",
          },
        ],
      },
    ],
  },
  {
    company: "Ceres",
    span: "2024",
    meta: { en: "Salesforce partner · Remote", pt: "Parceiro Salesforce · Remoto" },
    stack: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Solution Design"],
    roles: [
      {
        title: { en: "Salesforce Technical Lead", pt: "Líder Técnico Salesforce" },
        period: { en: "Apr 2024 – Dec 2024", pt: "Abr 2024 – Dez 2024" },
        bullets: [
          {
            en: "Led end-to-end solution design for SMB clients across Sales, Service and Marketing Cloud, turning business requirements into user stories and declarative configuration.",
            pt: "Liderei o solution design ponta a ponta para clientes de pequeno e médio porte em Sales, Service e Marketing Cloud, transformando requisitos de negócio em user stories e configuração declarativa.",
          },
          {
            en: "Technical reference for the delivery team through design and configuration reviews, platform best practices and mentoring.",
            pt: "Referência técnica do time de delivery por meio de revisões de design e configuração, boas práticas da plataforma e mentoria.",
          },
        ],
      },
    ],
  },
  {
    company: "NTT DATA",
    span: "2021 — 2024",
    meta: { en: "Europe & LATAM · São Paulo", pt: "Europa & LATAM · São Paulo" },
    stack: ["Sales Cloud", "Flow Builder", "Process Builder", "Approval Processes", "Git"],
    roles: [
      {
        title: { en: "Salesforce Software Engineer", pt: "Engenheiro de Software Salesforce" },
        period: { en: "Dec 2021 – Apr 2024", pt: "Dez 2021 – Abr 2024" },
        bullets: [
          {
            en: "Delivered fixed- and open-scope Salesforce implementations in Scrum teams, from user story refinement to release.",
            pt: "Entreguei implementações Salesforce de escopo fechado e aberto em times Scrum, do refinamento de user stories ao release.",
          },
          {
            en: "Built declarative automation with Flow Builder, Process Builder and Approval Processes, versioned with Git, GitHub and Bitbucket.",
            pt: "Construí automações declarativas com Flow Builder, Process Builder e Approval Processes, versionadas com Git, GitHub e Bitbucket.",
          },
        ],
      },
    ],
  },
  {
    company: { en: "Early career", pt: "Início de carreira" },
    span: "2019 — 2021",
    meta: "Grupo Level · Univali",
    stack: ["Sales Cloud", "Service Cloud", "Reports & Dashboards"],
    roles: [
      {
        title: { en: "Salesforce Assistant · Marketing Intern (CRM & BI)", pt: "Assistente Salesforce · Estagiário de Marketing (CRM & BI)" },
        period: { en: "Jul 2020 – Nov 2021", pt: "Jul 2020 – Nov 2021" },
        bullets: [
          {
            en: "CRM operations at Grupo Level: data quality, segmentation and Reports & Dashboards on Sales Cloud and Service Cloud.",
            pt: "Operação de CRM no Grupo Level: qualidade de dados, segmentação e Reports & Dashboards em Sales Cloud e Service Cloud.",
          },
        ],
      },
      {
        title: { en: "Intern · Univali", pt: "Estagiário · Univali" },
        period: { en: "Aug 2019 – Dec 2019", pt: "Ago 2019 – Dez 2019" },
        bullets: [{ en: "First hands-on experience with Sales Cloud.", pt: "Primeira experiência prática com Sales Cloud." }],
      },
    ],
  },
];

export const education = {
  degree: { en: "B.Eng. Production Engineering", pt: "Engenharia de Produção" } as Localized,
  school: "Univali",
  period: "2019 – 2023",
};

export interface Certification {
  name: string;
  earnedAs?: string;
  date: Localized;
  badge: string;
}

export const certifications: Certification[] = [
  { name: "Platform Administrator", earnedAs: "Administrator", date: { en: "Jun 2022", pt: "Jun 2022" }, badge: "assets/certs/administrator.webp" },
  { name: "Platform App Builder", date: { en: "Aug 2022", pt: "Ago 2022" }, badge: "assets/certs/platform-app-builder.webp" },
  { name: "Business Analyst", date: { en: "Dec 2022", pt: "Dez 2022" }, badge: "assets/certs/business-analyst.webp" },
  { name: "Agentforce Service Consultant", earnedAs: "Service Cloud Consultant", date: { en: "Jan 2023", pt: "Jan 2023" }, badge: "assets/certs/service-cloud-consultant.webp" },
  { name: "Platform Foundations", earnedAs: "Salesforce Associate", date: { en: "Apr 2023", pt: "Abr 2023" }, badge: "assets/certs/associate.webp" },
  { name: "Platform Administrator II", earnedAs: "Advanced Administrator", date: { en: "Aug 2023", pt: "Ago 2023" }, badge: "assets/certs/advanced-administrator.webp" },
  { name: "Einstein Prediction Builder", earnedAs: "Accredited Professional", date: { en: "Sep 2023", pt: "Set 2023" }, badge: "assets/certs/accredited-professional.webp" },
  { name: "AI Associate", date: { en: "Oct 2023", pt: "Out 2023" }, badge: "assets/certs/ai-associate.webp" },
  { name: "Marketing Cloud Engagement Foundations", earnedAs: "Marketing Associate", date: { en: "Sep 2024", pt: "Set 2024" }, badge: "assets/certs/marketing-associate.webp" },
  { name: "Marketing Cloud Engagement Specialist", earnedAs: "Marketing Cloud Email Specialist", date: { en: "Nov 2024", pt: "Nov 2024" }, badge: "assets/certs/mc-email-specialist.webp" },
];

type SkillNode = Omit<TimelineItem, "title" | "date" | "category" | "content"> & {
  title: Localized;
  date: Localized;
  category: Localized;
  content: Localized;
};

export const skillOrbit: SkillNode[] = [
  {
    id: 1,
    title: "Sales Cloud",
    date: { en: "Since 2019", pt: "Desde 2019" },
    category: "Cloud",
    content: {
      en: "Lead and Opportunity management, Path, Approval Processes and Reports & Dashboards for enterprise sales teams.",
      pt: "Gestão de Leads e Opportunities, Path, Approval Processes e Reports & Dashboards para times comerciais enterprise.",
    },
    image: "assets/skills/sales.svg",
    relatedIds: [3, 4, 8],
    status: "completed",
    energy: 90,
  },
  {
    id: 2,
    title: "Service Cloud",
    date: { en: "Certified 2023", pt: "Certificado em 2023" },
    category: "Cloud",
    content: {
      en: "Case Management, Omni-Channel routing, Entitlements & Milestones and Knowledge. Certified Service Cloud Consultant (now Agentforce Service Consultant).",
      pt: "Case Management, roteamento com Omni-Channel, Entitlements & Milestones e Knowledge. Certificado Service Cloud Consultant (hoje Agentforce Service Consultant).",
    },
    image: "assets/skills/service.svg",
    relatedIds: [3, 4, 7],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: { en: "Flow & Automation", pt: "Flow e Automação" },
    date: { en: "Core skill", pt: "Skill principal" },
    category: { en: "Automation", pt: "Automação" },
    content: {
      en: "Record-Triggered, Screen and Scheduled Flows plus Approval Processes: Flow-first declarative automation that removes manual work.",
      pt: "Flows record-triggered, screen e scheduled, além de Approval Processes: automação declarativa Flow-first que elimina trabalho manual.",
    },
    image: "assets/skills/flow.svg",
    relatedIds: [1, 2, 4, 5, 8],
    status: "completed",
    energy: 95,
  },
  {
    id: 4,
    title: { en: "Data Model & Security", pt: "Modelo de Dados e Segurança" },
    date: "Admin II · App Builder",
    category: { en: "Platform", pt: "Plataforma" },
    content: {
      en: "Custom objects and relationships, Validation Rules, Lightning App Builder and the security model: profiles, permission sets, OWD and sharing rules.",
      pt: "Custom objects e relacionamentos, Validation Rules, Lightning App Builder e o modelo de segurança: profiles, permission sets, OWD e sharing rules.",
    },
    image: "assets/skills/data-model.svg",
    relatedIds: [1, 2, 3, 6, 8],
    status: "completed",
    energy: 95,
  },
  {
    id: 5,
    title: "Marketing Cloud",
    date: { en: "Certified 2024", pt: "Certificado em 2024" },
    category: "Cloud",
    content: {
      en: "Marketing Cloud Engagement: Journey Builder, Automation Studio, Email Studio, Data Extensions, segmentation and AMPscript personalization.",
      pt: "Marketing Cloud Engagement: Journey Builder, Automation Studio, Email Studio, Data Extensions, segmentação e personalização com AMPscript.",
    },
    image: "assets/skills/marketing.svg",
    relatedIds: [3, 6],
    status: "completed",
    energy: 85,
  },
  {
    id: 6,
    title: { en: "Integrations", pt: "Integrações" },
    date: { en: "Cross-cloud", pt: "Entre clouds" },
    category: { en: "Architecture", pt: "Arquitetura" },
    content: {
      en: "Integration design and data sync between Salesforce clouds and external systems for a single customer view.",
      pt: "Desenho de integrações e sincronização de dados entre clouds Salesforce e sistemas externos para uma visão única do cliente.",
    },
    image: "assets/skills/integrations.svg",
    relatedIds: [4, 5],
    status: "completed",
    energy: 75,
  },
  {
    id: 7,
    title: { en: "Einstein & AI", pt: "Einstein e IA" },
    date: "AI Associate",
    category: { en: "AI", pt: "IA" },
    content: {
      en: "Einstein Prediction Builder (Accredited Professional) and AI Associate fundamentals, now growing into Agentforce use cases.",
      pt: "Einstein Prediction Builder (Accredited Professional) e fundamentos de AI Associate, agora evoluindo para casos de uso com Agentforce.",
    },
    image: "assets/skills/ai.svg",
    relatedIds: [2],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 8,
    title: { en: "Tech Leadership", pt: "Liderança Técnica" },
    date: { en: "Since 2024", pt: "Desde 2024" },
    category: { en: "Leadership", pt: "Liderança" },
    content: {
      en: "Solution design, technical reviews, org governance and mentoring, bridging business stakeholders and the delivery team in Scrum.",
      pt: "Solution design, revisões técnicas, governança da org e mentoria, conectando stakeholders de negócio e o time de delivery em Scrum.",
    },
    image: "assets/skills/leadership.svg",
    relatedIds: [1, 3, 4],
    status: "completed",
    energy: 90,
  },
];
