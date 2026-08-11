export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  kicker?: string;
  theme?: "artistico" | "english" | "bolos" | "luigi";
  screenTitle?: string;
  screenCaption?: string;
  image?: string;
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
    title: "Portfólio Luigi",
    description:
      "Portfólio fotográfico artístico com exposições, ambientes independentes e atmosfera de fotografia em baixa luz.",
    tags: ["Fotografia", "Exposição", "Artístico"],
    href: "https://portfolio-luigi-iota.vercel.app",
    kicker: "fotografia / exposições",
    theme: "luigi",
    screenTitle: "long exposure",
    screenCaption: "luz vermelha · azul violeta · ambientes expositivos",
    image: "/projects/portfolio-luigi.png"
  }
];

export const dataProjects: Project[] = [
  {
    title: "SIRG",
    description: "Registros acadêmicos, frequência, justificativas, relatórios e indicadores.",
    tags: ["Python", "Flask", "SQLAlchemy"],
    href: "https://github.com/gguisandim/SIRG",
    kicker: "data / management"
  },
  {
    title: "Processamento de Imagens",
    description: "Aplicação modular com plugins, manipulação de imagens e algoritmos em Python.",
    tags: ["Python", "Image Processing", "Plugins"],
    href: "https://github.com/gguisandim/Processamento-de-Imagens-2026v2",
    kicker: "image / analysis"
  }
];

export const systemProjects: Project[] = [
  {
    title: "Wedding BF",
    description: "Plataforma de convites e painel administrativo com autenticação e banco de dados.",
    tags: ["Next.js", "Supabase", "Database"],
    href: "https://github.com/gguisandim/wedding-bf",
    kicker: "platform / full stack"
  },
  {
    title: "Sistema Distribuído",
    description: "Comunicação entre processos, filas, estados e serviços distribuídos.",
    tags: ["Python", "Sockets", "Threads"],
    href: "https://github.com/gguisandim/semfuro-sd-novo",
    kicker: "distributed / network"
  },
  {
    title: "Infra & Suporte",
    description: "Linux, troubleshooting, monitoramento e manutenção de ambientes e serviços.",
    tags: ["Linux", "Infra", "Support"],
    kicker: "ops / reliability"
  }
];
