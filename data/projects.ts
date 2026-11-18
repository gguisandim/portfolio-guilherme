export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  kicker?: string;
  theme?: "artistico" | "english" | "bolos" | "prilei" | "luigi";
  screenTitle?: string;
  screenCaption?: string;
  image?: string;
  status?: string;
};

export const webProjects: Project[] = [
  {
    title: "Portfólio Artístico",
    description:
      "Pintura e desenho em um portfólio com navegação autoral, foco em obras, galeria e presença visual forte.",
    tags: ["Arte", "Pintura", "Desenho"],
    href: "https://portfolio-artistico-five.vercel.app",
    kicker: "arte / pintura / desenho",
    theme: "artistico",
    screenTitle: "autorretrato",
    screenCaption: "cores vivas · giz pastel · obras e galeria",
    image: "/projects/portfolio-artistico.png"
  },
  {
    title: "English / Your Way",
    description:
      "Site para aulas de inglês com tom pessoal, criativo e comunicativo, misturando linguagem, cultura e conexão.",
    tags: ["Aulas", "Inglês", "Cultura"],
    href: "https://english-your-way-site.vercel.app",
    kicker: "english / culture / connection",
    theme: "english",
    screenTitle: "learn your way",
    screenCaption: "conversation · classes · language · culture",
    image: "/projects/english-your-way.png"
  },
  {
    title: "Bolos da Tamires",
    description:
      "Confeitaria artesanal com bolos personalizados, docinhos e tortas em uma apresentação doce, delicada e comercial.",
    tags: ["Bolos", "Doces", "Confeitaria"],
    href: "https://bolosdatamires.netlify.app",
    kicker: "bolos / docinhos / tortas",
    theme: "bolos",
    screenTitle: "sweet menu",
    screenCaption: "rosa · confeitaria artesanal · sob encomenda",
    image: "/projects/bolos-tamires.png"
  },
  {
    title: "PRILEI / UFPA",
    description:
      "Site institucional para apresentação do programa, cursos, editais, equipe e informações acadêmicas.",
    tags: ["HTML", "CSS", "Institucional"],
    href: "https://prilei.ufpa.br",
    kicker: "institucional / ufpa",
    theme: "prilei",
    screenTitle: "site institucional",
    screenCaption: "HTML · CSS · estrutura institucional",
    image: "/projects/prilei.png"
  },
  {
    title: "Portfólio Luigi",
    description:
      "Portfólio fotográfico artístico com exposições, ambientes independentes e atmosfera de fotografia em baixa luz.",
    tags: ["Fotografia", "Exposição", "Artístico"],
    href: "https://portfolio-luigi-iota.vercel.app",
    kicker: "fotografia / exposições",
    theme: "luigi",
    screenTitle: "long exposure",
    screenCaption: "luz vermelha · azul violeta · ambientes expositivos",
    image: "/projects/portfolio-luigi.png",
    status: "EM CONSTRUÇÃO"
  }
];

/** Product narratives live here; previews below are deliberately illustrative, not screenshots. */
export type AppProject = Project & {
  id: "sirg" | "wedding" | "pipinho" | "electionops";
  category: string;
  focus: string;
  features: [string, string, string];
  flow: [string, string, string];
};

export const appsProjects: AppProject[] = [
  {
    id: "sirg",
    title: "SIRG",
    category: "Gestão acadêmica",
    focus: "Organização de registros e acompanhamento",
    description:
      "Uma aplicação para centralizar registros acadêmicos, frequência, justificativas e relatórios em um só fluxo de trabalho.",
    features: ["Registros acadêmicos", "Controle de frequência", "Relatórios e consultas"],
    flow: ["Interface", "Flask", "SQLAlchemy"],
    tags: ["Python", "Flask", "SQLAlchemy"],
    href: "https://github.com/gguisandim/SIRG"
  },
  {
    id: "wedding",
    title: "Wedding BF",
    category: "Plataforma full-stack",
    focus: "Convites, convidados e administração",
    description:
      "Sistema de convites com organização de convidados, respostas e um painel administrativo, apoiado por autenticação e banco de dados.",
    features: ["Convites digitais", "Gestão de convidados", "Painel administrativo"],
    flow: ["Next.js", "Supabase", "Banco de dados"],
    tags: ["Next.js", "Supabase", "Full-stack"],
    href: "https://github.com/gguisandim/wedding-bf"
  },
  {
    id: "pipinho",
    title: "Pipinho Finance",
    category: "Finanças pessoais",
    focus: "Controle financeiro com Telegram e inteligência artificial",
    description:
      "Aplicação de finanças pessoais com registro de lançamentos por mensagens, interpretação assistida por IA e organização do histórico financeiro.",
    features: ["Registro via Telegram", "Interpretação de mensagens com IA", "Histórico e organização financeira"],
    flow: ["Telegram", "Node.js", "PostgreSQL"],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Redis", "Telegram", "IA"]
    // Repositório direto não confirmado: a página oferece uma busca no perfil.
  },
  {
    id: "electionops",
    title: "Election Ops",
    category: "Operações eleitorais",
    focus: "Plataforma para coordenação e acompanhamento operacional",
    description:
      "Sistema para apoiar operações eleitorais com gestão de fluxos, monitoramento de etapas e organização de dados em uma arquitetura full-stack.",
    features: ["Gestão de operações", "Fluxos e acompanhamento", "Arquitetura full-stack"],
    flow: ["Next.js", "NestJS", "Prisma"],
    tags: ["TypeScript", "Next.js", "NestJS", "Prisma", "PostgreSQL", "Monorepo", "Testes"],
    href: "https://github.com/gguisandim/dasi-ap1-election-ops-plataform"
  }
];

export type EngineeringProject = Project & {
  id: "images" | "umbra" | "distributed" | "graphics";
  discipline: string;
  observation: string;
};

export const engineeringProjects: EngineeringProject[] = [
  {
    id: "images",
    title: "Processamento de Imagens",
    discipline: "Visão computacional",
    observation: "Transformações visuais, filtros e operações sobre imagens.",
    description:
      "Aplicação modular em Python dedicada a operações e algoritmos de processamento de imagens.",
    tags: ["Python", "OpenCV", "Plugins"],
    href: "https://github.com/gguisandim/Processamento-de-Imagens-2026v2"
  },
  {
    id: "umbra",
    title: "Umbra Trail",
    discipline: "Game engineering",
    observation: "Mapas, sistemas de fases e narrativa ramificada.",
    description:
      "Jogo com exploração, fases interligadas e ferramentas para construção e validação de ambientes.",
    tags: ["TypeScript", "Phaser", "World Lab"],
    href: "https://github.com/gguisandim/dsai-ap1-2Drogue"
  },
  {
    id: "distributed",
    title: "Sistema Distribuído",
    discipline: "Sistemas e comunicação",
    observation: "Processos independentes e troca de mensagens.",
    description:
      "Projeto acadêmico voltado à comunicação entre processos e coordenação de serviços distribuídos.",
    tags: ["Python", "Sockets", "Threads"],
    href: "https://github.com/gguisandim/semfuro-sd-novo"
  },
  {
    id: "graphics",
    title: "Computação Gráfica",
    discipline: "Geometria e renderização",
    observation: "Geometrias, projeções e transformações espaciais.",
    description:
      "Experimentos acadêmicos de computação gráfica e representação geométrica.",
    tags: ["JavaScript", "Geometria", "Gráficos"],
    href: "https://github.com/gguisandim/trabalho-computacao-grafica"
  }
];
