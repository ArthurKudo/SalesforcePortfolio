import type { Localized } from "@/i18n";
import { mockup } from "@/data/mockups";
import type { MockupKind } from "@/data/mockups";

export interface ProjectMedia {
  type: "youtube" | "loom" | "vimeo" | "file";
  src: string;
}

export interface ProjectSlides {
  type: "google" | "pdf" | "embed";
  src: string;
}

export interface Project {
  id: string;
  title: Localized;
  clouds: string[];
  summary: Localized;
  cover?: string;
  tags?: string[];
  facts?: { label: Localized; value: Localized }[];
  challenge?: Localized;
  solution?: Localized;
  highlights?: Localized[];
  video?: ProjectMedia | null;
  slides?: ProjectSlides | null;
  gallery?: { src: string; caption?: Localized }[];
  links?: { label: Localized; url: string }[];
  sample?: boolean;
}

export const showExampleProjects = true;

export const projects: Project[] = [];

const FACT = {
  role: { en: "Role", pt: "Papel" },
  industry: { en: "Industry", pt: "Setor" },
  duration: { en: "Duration", pt: "Duração" },
  team: { en: "Team", pt: "Equipe" },
};

const BANKING = { en: "Banking", pt: "Bancário" };
const AUTOMOTIVE = { en: "Automotive", pt: "Automotivo" };

interface ExampleSeed {
  id: string;
  title: Localized;
  cloud: string;
  kind: MockupKind;
  screens: [MockupKind, Localized][];
  app: string;
  tabs: string[];
  accent: string;
  from: string;
  to: string;
  industry: Localized;
  months: number;
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  highlights: Localized[];
  tags: string[];
}

const SEEDS: ExampleSeed[] = [
  {
    id: "service-console",
    title: { en: "Lightning Service Console Revamp", pt: "Reestruturação do Lightning Service Console" },
    cloud: "Service Cloud",
    kind: "console",
    screens: [
      ["flow", { en: "Record-Triggered Flow for case routing", pt: "Record-Triggered Flow de roteamento de casos" }],
      ["dashboard", { en: "Service supervisor dashboard", pt: "Dashboard do supervisor de atendimento" }],
    ],
    app: "Service Console",
    tabs: ["Cases", "Accounts", "Knowledge", "Reports"],
    accent: "#0176d3",
    from: "#0b5cab",
    to: "#032d60",
    industry: BANKING,
    months: 5,
    summary: {
      en: "A single Lightning Service Console with guided Case handling, Omni-Channel routing and SLA-based escalation.",
      pt: "Um único Lightning Service Console com tratamento guiado de Cases, roteamento via Omni-Channel e escalonamento por SLA.",
    },
    challenge: {
      en: "Agents switched between four tabs per Case and escalations relied on manual follow-up, with no SLA visibility.",
      pt: "Os agentes alternavam entre quatro abas por Case e os escalonamentos dependiam de acompanhamento manual, sem visibilidade de SLA.",
    },
    solution: {
      en: "Rebuilt the console with Dynamic Forms, Path and Record-Triggered Flows, and modeled Entitlements & Milestones to drive SLA escalation.",
      pt: "Reconstruí o console com Dynamic Forms, Path e Record-Triggered Flows, e modelei Entitlements & Milestones para conduzir o escalonamento por SLA.",
    },
    highlights: [
      { en: "One Lightning console for the whole Case lifecycle", pt: "Um console Lightning para todo o ciclo do Case" },
      { en: "Milestone-driven escalation by SLA and priority", pt: "Escalonamento por Milestones, conforme SLA e prioridade" },
      { en: "Real-time supervisor dashboard with Reports & Dashboards", pt: "Dashboard de supervisão em tempo real com Reports & Dashboards" },
    ],
    tags: ["Service Console", "Omni-Channel", "Entitlements & Milestones", "Dynamic Forms"],
  },
  {
    id: "pipeline-command",
    title: { en: "Opportunity Pipeline & Forecasting", pt: "Pipeline de Opportunities e Forecast" },
    cloud: "Sales Cloud",
    kind: "dashboard",
    screens: [
      ["approval", { en: "Discount approval on Opportunity", pt: "Aprovação de desconto na Opportunity" }],
      ["schema", { en: "Opportunity data model", pt: "Modelo de dados de Opportunity" }],
    ],
    app: "Sales",
    tabs: ["Home", "Opportunities", "Forecasts", "Dashboards"],
    accent: "#1b96ff",
    from: "#1b96ff",
    to: "#014486",
    industry: AUTOMOTIVE,
    months: 4,
    summary: {
      en: "Standardized Opportunity stages and Collaborative Forecasts for regional sales leaders across the dealer network.",
      pt: "Estágios de Opportunity padronizados e Collaborative Forecasts para líderes comerciais regionais da rede de concessionárias.",
    },
    challenge: {
      en: "Forecasts lived in spreadsheets and each region used its own Opportunity stages and close criteria.",
      pt: "As previsões viviam em planilhas e cada regional usava seus próprios estágios e critérios de fechamento de Opportunity.",
    },
    solution: {
      en: "Unified Sales Processes and stages with Path guidance and Validation Rules, then enabled Collaborative Forecasts and role-based Lightning Dashboards.",
      pt: "Unifiquei Sales Processes e estágios com orientação no Path e Validation Rules, depois habilitei Collaborative Forecasts e Lightning Dashboards por role.",
    },
    highlights: [
      { en: "One Sales Process and stage definition for every region", pt: "Um único Sales Process e definição de estágios para todas as regionais" },
      { en: "Forecast calls moved from spreadsheets to Collaborative Forecasts", pt: "Reuniões de forecast saíram das planilhas para o Collaborative Forecasts" },
    ],
    tags: ["Sales Cloud", "Path", "Collaborative Forecasts", "Validation Rules"],
  },
  {
    id: "onboarding-journey",
    title: { en: "Customer Onboarding Journey", pt: "Jornada de Onboarding de Clientes" },
    cloud: "Marketing Cloud",
    kind: "journey",
    screens: [
      ["dashboard", { en: "Journey analytics", pt: "Analytics da jornada" }],
      ["portal", { en: "Personalized landing page", pt: "Landing page personalizada" }],
    ],
    app: "Journey Builder",
    tabs: ["Journeys", "Content", "Audiences", "Analytics"],
    accent: "#dd7a01",
    from: "#f29e3d",
    to: "#8c4b02",
    industry: BANKING,
    months: 3,
    summary: {
      en: "A Marketing Cloud Engagement onboarding journey personalized with AMPscript and Engagement Splits.",
      pt: "Uma jornada de onboarding no Marketing Cloud Engagement personalizada com AMPscript e Engagement Splits.",
    },
    challenge: {
      en: "New customers received the same generic emails regardless of product or engagement.",
      pt: "Novos clientes recebiam os mesmos e-mails genéricos, independente do produto contratado ou do engajamento.",
    },
    solution: {
      en: "Modeled sendable Data Extensions per product, built Decision and Engagement Splits in Journey Builder and AMPscript dynamic content, with Automation Studio refreshing audiences daily.",
      pt: "Modelei sendable Data Extensions por produto, criei Decision e Engagement Splits no Journey Builder e conteúdo dinâmico em AMPscript, com o Automation Studio atualizando as audiências diariamente.",
    },
    highlights: [
      { en: "Content adapts to product and engagement", pt: "Conteúdo se adapta ao produto e ao engajamento" },
      { en: "Audiences refreshed daily by Automation Studio", pt: "Audiências atualizadas diariamente pelo Automation Studio" },
    ],
    tags: ["Journey Builder", "Data Extensions", "AMPscript", "Automation Studio"],
  },
  {
    id: "approval-hub",
    title: { en: "Discount Approval Process", pt: "Approval Process de Descontos" },
    cloud: "Sales Cloud",
    kind: "approval",
    screens: [
      ["flow", { en: "Record-Triggered Flow notifications", pt: "Notificações via Record-Triggered Flow" }],
      ["schema", { en: "Quote and approval data model", pt: "Modelo de dados de cotação e aprovação" }],
    ],
    app: "Deal Desk",
    tabs: ["Approvals", "Quotes", "Opportunities", "Reports"],
    accent: "#0b827c",
    from: "#14a097",
    to: "#03413e",
    industry: AUTOMOTIVE,
    months: 3,
    summary: {
      en: "Multi-step discount approvals with a full Approval History and SLA reporting for the deal desk.",
      pt: "Aprovações de desconto em múltiplas etapas com Approval History completo e relatórios de SLA para o deal desk.",
    },
    challenge: {
      en: "Discount approvals happened over email, with no audit trail or response-time control.",
      pt: "As aprovações de desconto aconteciam por e-mail, sem trilha de auditoria nem controle de prazo de resposta.",
    },
    solution: {
      en: "Designed multi-step Approval Processes by discount tier on a custom object, with Record-Triggered Flow notifications and Approval History reports.",
      pt: "Desenhei Approval Processes de múltiplas etapas por faixa de desconto em um custom object, com notificações via Record-Triggered Flow e relatórios de Approval History.",
    },
    highlights: [
      { en: "Every approval traceable in Approval History", pt: "Toda aprovação rastreável no Approval History" },
      { en: "SLA visibility for the deal desk", pt: "Visibilidade de SLA para o deal desk" },
    ],
    tags: ["Approval Processes", "Record-Triggered Flow", "Custom Objects", "Reports & Dashboards"],
  },
  {
    id: "lead-scoring",
    title: { en: "Lead Scoring with Einstein Prediction Builder", pt: "Lead Scoring com Einstein Prediction Builder" },
    cloud: "Einstein & AI",
    kind: "scoring",
    screens: [["dashboard", { en: "Lead conversion analytics", pt: "Analytics de conversão de Leads" }]],
    app: "Sales",
    tabs: ["Leads", "Campaigns", "Insights", "Reports"],
    accent: "#9050e9",
    from: "#9050e9",
    to: "#3a0c7a",
    industry: AUTOMOTIVE,
    months: 2,
    summary: {
      en: "Predictive Lead prioritization so sales reps work the most likely conversions first.",
      pt: "Priorização preditiva de Leads para os vendedores trabalharem primeiro as conversões mais prováveis.",
    },
    challenge: {
      en: "Sales reps worked Leads in arrival order, regardless of fit or conversion likelihood.",
      pt: "Os vendedores trabalhavam os Leads por ordem de chegada, sem considerar perfil ou probabilidade de conversão.",
    },
    solution: {
      en: "Built an Einstein Prediction Builder model on historical Lead conversion and surfaced the score and top predictors on list views and the Lightning record page.",
      pt: "Construí um modelo no Einstein Prediction Builder com o histórico de conversão de Leads e exibi o score e os principais preditores nas list views e na Lightning record page.",
    },
    highlights: [
      { en: "Score and top predictors on every Lead", pt: "Score e principais preditores em cada Lead" },
      { en: "Prioritized list views for each rep", pt: "List views priorizadas para cada vendedor" },
    ],
    tags: ["Einstein Prediction Builder", "List Views", "Lightning Record Pages"],
  },
  {
    id: "dealer-portal",
    title: { en: "Dealer Experience Cloud Portal", pt: "Portal Experience Cloud para Concessionárias" },
    cloud: "Experience Cloud",
    kind: "portal",
    screens: [["console", { en: "Dealer Cases in the Service Console", pt: "Cases das concessionárias no Service Console" }]],
    app: "Dealer Portal",
    tabs: ["Home", "Orders", "Support", "Resources"],
    accent: "#06a59a",
    from: "#06a59a",
    to: "#024d48",
    industry: AUTOMOTIVE,
    months: 4,
    summary: {
      en: "A partner Experience Cloud site where dealers track orders, warranty claims and support Cases.",
      pt: "Um site Experience Cloud para parceiros, onde as concessionárias acompanham pedidos, garantias e Cases de suporte.",
    },
    challenge: {
      en: "Dealers called the contact center for status updates that already existed in Salesforce.",
      pt: "As concessionárias ligavam para a central pedindo status que já existiam no Salesforce.",
    },
    solution: {
      en: "Exposed orders, warranty claims and Cases to partner users through an Experience Cloud site secured with partner roles and sharing rules.",
      pt: "Expus pedidos, garantias e Cases para partner users em um site Experience Cloud protegido por partner roles e sharing rules.",
    },
    highlights: [
      { en: "Dealers self-serve order and warranty status", pt: "Concessionárias consultam pedidos e garantia por conta própria" },
      { en: "Fewer status calls to the contact center", pt: "Menos ligações de status para a central" },
    ],
    tags: ["Experience Cloud", "Partner Users", "Sharing Rules", "Service Cloud"],
  },
  {
    id: "case-routing",
    title: { en: "Omni-Channel Case Routing", pt: "Roteamento de Cases com Omni-Channel" },
    cloud: "Flow & Automation",
    kind: "flow",
    screens: [["console", { en: "Routed Case in the Service Console", pt: "Case roteado no Service Console" }]],
    app: "Flow Builder",
    tabs: ["Flows", "Versions", "Debug", "Settings"],
    accent: "#3a49da",
    from: "#4c5bea",
    to: "#18216b",
    industry: BANKING,
    months: 2,
    summary: {
      en: "Record-Triggered Flows that classify new Cases and route them through Omni-Channel instantly.",
      pt: "Record-Triggered Flows que classificam novos Cases e os roteiam pelo Omni-Channel na hora.",
    },
    challenge: {
      en: "A supervisor triaged every new Case by hand before it reached a queue.",
      pt: "Um supervisor triava manualmente cada novo Case antes de ele chegar a uma fila.",
    },
    solution: {
      en: "Replaced manual triage with Record-Triggered Flows driven by Custom Metadata Types and Omni-Channel skills-based routing.",
      pt: "Substituí a triagem manual por Record-Triggered Flows parametrizados com Custom Metadata Types e roteamento por skills no Omni-Channel.",
    },
    highlights: [
      { en: "Manual triage removed from the process", pt: "Triagem manual eliminada do processo" },
      { en: "Routing rules maintained by admins, without code", pt: "Regras de roteamento mantidas pelos admins, sem código" },
    ],
    tags: ["Flow Builder", "Omni-Channel", "Custom Metadata Types"],
  },
  {
    id: "data-model",
    title: { en: "Order-to-Cash Data Model & Governance", pt: "Modelo de Dados e Governança Order-to-Cash" },
    cloud: "Platform",
    kind: "schema",
    screens: [["approval", { en: "Quote approval on the new data model", pt: "Aprovação de cotação no novo modelo de dados" }]],
    app: "Schema Builder",
    tabs: ["Objects", "Fields", "Relationships", "Security"],
    accent: "#0176d3",
    from: "#2a4a7f",
    to: "#0b1b33",
    industry: AUTOMOTIVE,
    months: 3,
    summary: {
      en: "A governed data model connecting Quotes, Orders and approvals, with a clean security model.",
      pt: "Um modelo de dados governado conectando Quotes, Orders e aprovações, com um modelo de segurança limpo.",
    },
    challenge: {
      en: "Years of ad-hoc custom fields made reports unreliable and automation fragile.",
      pt: "Anos de custom fields criados sem padrão deixaram os relatórios pouco confiáveis e as automações frágeis.",
    },
    solution: {
      en: "Redesigned objects with master-detail and lookup relationships, defined naming conventions and a field governance process, and moved access to Permission Set Groups.",
      pt: "Redesenhei os objetos com relacionamentos master-detail e lookup, defini convenções de nomenclatura e um processo de governança de campos, e migrei os acessos para Permission Set Groups.",
    },
    highlights: [
      { en: "Naming and field governance standards adopted by the team", pt: "Padrões de nomenclatura e governança de campos adotados pelo time" },
      { en: "Access managed through Permission Set Groups", pt: "Acessos gerenciados por Permission Set Groups" },
    ],
    tags: ["Schema Builder", "Data Modeling", "Permission Set Groups", "Governance"],
  },
];

export const projectExamples: Project[] = SEEDS.map((seed) => {
  const base = { app: seed.app, tabs: seed.tabs, accent: seed.accent, from: seed.from, to: seed.to };
  return {
    id: `example-${seed.id}`,
    title: seed.title,
    clouds: [seed.cloud],
    summary: seed.summary,
    cover: mockup({ kind: seed.kind, ...base }),
    tags: seed.tags,
    facts: [
      { label: FACT.role, value: "Tech Lead" },
      { label: FACT.industry, value: seed.industry },
      { label: FACT.duration, value: { en: `${seed.months} months`, pt: `${seed.months} meses` } },
      { label: FACT.team, value: { en: "5 people", pt: "5 pessoas" } },
    ],
    challenge: seed.challenge,
    solution: seed.solution,
    highlights: seed.highlights,
    gallery: seed.screens.map(([kind, caption]) => ({ src: mockup({ kind, ...base }), caption })),
    sample: true,
  };
});
