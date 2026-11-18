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
      "Portfólio de Bruno Castelo que reúne retratos em giz pastel, a HQ autobiográfica Ainda Sou Eu e ilustrações digitais em galerias animadas.",
    tags: ["Next.js", "Arte visual", "Motion"],
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
      "Landing page de Heloisa para aulas de inglês a distância, com material personalizado e foco em conversação, vocabulário e cultura pop.",
    tags: ["Next.js", "Aulas online", "Motion"],
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
      "Vitrine interativa de confeitaria com catálogo, visualização de bolos por tamanho e um assistente que monta o pedido para envio pelo WhatsApp.",
    tags: ["Next.js", "Catálogo", "WhatsApp"],
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
      "Portfólio de Luigi Ramos organizado como cinco exposições independentes, cada uma com ritmo, textura e interação próprios para acompanhar as obras.",
    tags: ["Next.js", "Fotografia", "Exposições"],
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
  longDescription: string[];
};

export const appsProjects: AppProject[] = [
  {
    id: "sirg",
    title: "SIRG",
    category: "Gestão de colegiado",
    focus: "Reuniões, frequência e documentos acadêmicos",
    description:
      "Sistema web para a rotina de colegiados: organiza membros, reuniões, frequências, justificativas, bancas e ofícios, com acesso por perfis e relatórios em PDF.",
    longDescription: [
      "O SIRG nasceu para concentrar uma rotina acadêmica que costuma ficar espalhada entre planilhas, documentos e registros manuais. Seu núcleo é o acompanhamento de reuniões de colegiado e da frequência de seus membros, preservando um histórico consultável para secretaria, coordenação e administração.",
      "A implementação vai além do cadastro básico. O sistema modela membros — professores, discentes e técnicos —, reuniões, presenças, ausências justificadas, anexos, bancas e ofícios. Há fluxos separados para registrar frequência, enviar justificativas, acompanhar convites de banca e controlar documentos internos sem misturar essas responsabilidades em uma única tela.",
      "Relatórios consolidam frequências, reuniões, bancas e documentos, com geração de PDF por meio do WeasyPrint. O código também inclui serviços assistidos por IA para preparar pautas, atas e textos de ofícios: os prompts partem de modelos definidos no projeto e são enviados à Groq por uma interface compatível com a API da OpenAI.",
      "A aplicação usa Flask com factory de inicialização, Blueprints por domínio, templates Jinja e formulários Flask-WTF. Os dados são representados por modelos SQLAlchemy e evoluídos com migrações do Alembic; a configuração aceita uma URL de banco externa e mantém SQLite como opção local. Autenticação, perfis de acesso e login com Google completam a camada administrativa.",
      "O repositório registra essa evolução em scripts de seed, migrações, serviços e templates específicos. O README ainda descreve principalmente o MVP de frequência, enquanto a árvore atual já incorpora documentos, bancas, relatórios e assistência de texto — uma diferença que ajuda a ler o projeto como um sistema em expansão, não como uma especificação encerrada."
    ],
    features: ["Reuniões e frequência", "Bancas, ofícios e justificativas", "Pautas e atas assistidas por IA"],
    flow: ["Jinja", "Flask", "SQLAlchemy"],
    tags: ["Python", "Flask", "SQLAlchemy", "WeasyPrint", "Groq"],
    href: "https://github.com/gguisandim/SIRG"
  },
  {
    id: "wedding",
    title: "Wedding BF",
    category: "Gestão de casamentos",
    focus: "Planejamento, convidados e RSVP",
    description:
      "Plataforma para planejar o casamento de ponta a ponta, reunindo convidados, cerimônia, finanças e uma área privada para organizar o vestido da noiva.",
    longDescription: [
      "Wedding BF organiza o casamento como um conjunto de operações conectadas. Em vez de limitar o produto a um convite digital, o projeto reúne em um painel as decisões e pendências que atravessam planejamento, convidados, cerimônia e orçamento.",
      "O fluxo de convidados trabalha com grupos de convite e respostas individuais. A área pública permite localizar o convite e registrar confirmação, recusa, nome preferido e restrições alimentares; no painel, os convidados podem ser relacionados, agrupados e associados a mesas, com tratamento específico para o convidado principal de cada grupo.",
      "A parte de planejamento inclui checklist por etapas, cronograma, blocos e tarefas da cerimônia, fornecedores, orçamento, parcelas, presentes, fotos e distribuição de mesas. Há ainda uma área privada para opções e compromissos ligados ao vestido da noiva, separada dos módulos compartilhados do casamento.",
      "A aplicação foi construída com Next.js e TypeScript sobre o App Router. O Supabase fornece autenticação e o banco PostgreSQL; migrations versionam a fundação do casamento, permissões, convidados, mesas, orçamento, calendário, checklist e cerimônia. As consultas server-side usam tipos derivados do schema, e entradas importantes passam por validações Zod.",
      "O desenvolvimento está documentado por guias de instalação de cada módulo e por uma sequência de migrations que torna visível a ampliação do escopo. Políticas de Row Level Security vinculam os registros ao casamento e aos membros autorizados, de modo que a estrutura de acesso faz parte do modelo de dados, e não apenas da interface."
    ],
    features: ["Convites, convidados e RSVP", "Cronograma, checklist e cerimônia", "Orçamento, fornecedores e mesas"],
    flow: ["Next.js", "Supabase", "PostgreSQL"],
    tags: ["TypeScript", "Next.js", "Supabase", "PostgreSQL", "Zod"],
    href: "https://github.com/gguisandim/wedding-bf"
  },
  {
    id: "pipinho",
    title: "Pipinho Finance",
    category: "Inteligência financeira",
    focus: "Dados bancários, métricas e assistência com IA",
    description:
      "Plataforma pessoal que transforma dados bancários da Pluggy em métricas de gastos, dashboards e respostas de um assistente com IA ancorado em evidências.",
    longDescription: [
      "Pipinho Finance é uma aplicação pessoal de leitura financeira construída sobre dados bancários reais obtidos pela Pluggy. A proposta não é registrar lançamentos manualmente, mas normalizar contas e transações para produzir uma visão coerente de gastos, entradas, liquidez e período disponível.",
      "Um motor determinístico calcula séries mensais, despesas por categoria e instituição, maiores gastos e indicadores de fluxo de caixa. O mesmo motor registra sinais de qualidade, como histórico truncado, renda insuficientemente classificada e concentração de despesas sem categoria; quando a evidência não sustenta uma métrica, a API a mantém indisponível em vez de preencher a lacuna por aproximação.",
      "A camada de IA interpreta esses resultados por meio de ferramentas financeiras tipadas. O assistente usa Groq, mas suas chamadas passam por validações de argumentos e por verificações de causalidade, qualidade, proveniência e evidência. Transações brutas não são enviadas ao modelo, e datas inferidas sem apoio na pergunta podem ser rejeitadas antes da execução.",
      "A arquitetura separa uma API Fastify do frontend Next.js. O navegador fala com um BFF server-side, que protege o token da API; o Supabase cuida da autenticação e da memória de conversas com RLS. Uma integração opcional lê o Google Calendar, salva um recorte mínimo da agenda e oferece esse contexto ao assistente sem permitir que o navegador injete eventos arbitrários.",
      "O repositório mantém testes Vitest para serviços, rotas, ferramentas e regras de grounding, além de auditorias e execuções de soak para o agente. O build de produção da API parte de um único entrypoint e o empacotamento usa uma lista explícita de arquivos, mantendo testes e histórico do laboratório fora do artefato final."
    ],
    features: ["Dashboard e análise de gastos", "Assistente com IA e memória", "Pluggy e rotina com Google Calendar"],
    flow: ["Next.js", "Fastify", "Pluggy"],
    tags: ["TypeScript", "Next.js", "Fastify", "Supabase", "Pluggy", "Groq", "Vitest"],
    href: "https://github.com/gguisandim/pipinho-financial"
  },
  {
    id: "electionops",
    title: "Election Ops",
    category: "Coordenação eleitoral",
    focus: "Logística, monitoramento e resposta operacional",
    description:
      "Plataforma modular para coordenar pleitos, zonas, locais e seções, conectando logística, equipes, ativos, incidentes, transmissão, auditoria e simulações.",
    longDescription: [
      "Election Ops representa o domínio operacional de uma eleição, não o processo de votação em si. A base do sistema organiza pleitos, zonas, locais e seções eleitorais para que recursos, equipes e ocorrências possam ser acompanhados dentro de uma mesma hierarquia territorial.",
      "Sobre essa base, módulos cobrem inventário de ativos, rotas e entregas, equipes de campo, escalas, checklists, tarefas, comunicações, riscos e evidências. O monitoramento reúne mapa operacional, incidentes, transmissão e central de comando; relatórios cruzam zonas, locais, ativos, SLA, rotas e equipes, enquanto o simulador permite exercitar cenários operacionais.",
      "A arquitetura é um monorepo de workspaces. O frontend usa React, Vite e React Router; a API usa NestJS; Prisma e PostgreSQL sustentam o modelo relacional. Cada plugin tende a manter manifesto, páginas, serviços, backend e testes próximos, enquanto pacotes compartilhados concentram cliente HTTP, contratos, componentes, segurança e acesso ao banco.",
      "Autenticação e RBAC são validados no backend por guards e permissões específicas de domínio. Um barramento de eventos tipado conecta mudanças em incidentes, ativos, usuários, riscos e pleitos a consumidores como auditoria e notificações, evitando que essas integrações dependam diretamente da implementação interna de outro plugin.",
      "O desenvolvimento inclui verificações de fronteiras entre workspaces, validação do schema Prisma, lint, typecheck, testes Vitest e fluxos Playwright. O próprio README registra que alguns cenários E2E longos apresentaram instabilidade contra banco remoto; essa limitação é mantida como parte do estado do projeto, em vez de ser apresentada como validação concluída."
    ],
    features: ["Mapa, rotas e ativos", "Incidentes, transmissão e comando", "RBAC, auditoria e simulação"],
    flow: ["React + Vite", "NestJS", "Prisma"],
    tags: ["TypeScript", "React", "NestJS", "Prisma", "PostgreSQL", "Monorepo", "Playwright"],
    href: "https://github.com/gguisandim/dasi-ap1-election-ops-plataform"
  }
];

export type EngineeringProject = Project & {
  id: "images" | "umbra" | "distributed" | "graphics";
  discipline: string;
  observation: string;
  longDescription: string[];
};

export const engineeringProjects: EngineeringProject[] = [
  {
    id: "images",
    title: "Processamento de Imagens",
    discipline: "Visão computacional",
    observation: "Transformações visuais, filtros e operações sobre imagens.",
    description:
      "Studio desktop para editar imagens em abas, com pré-visualização, histórico e plugins dinâmicos para filtros, transformações geométricas e leitura de QR Code.",
    longDescription: [
      "O Studio de Processamento de Imagens é um projeto colaborativo da disciplina de Processamento de Imagens da UFPA. Ele oferece uma aplicação desktop na qual diferentes contribuições de alunos podem conviver sobre a mesma interface, sem exigir alterações no motor principal para cada nova operação.",
      "A janela em PySide6 abre várias imagens em abas, aceita arquivos por seletor ou arrastar e soltar, oferece zoom e mantém um histórico limitado para desfazer alterações. O fluxo de cada ferramenta separa pré-visualização e aplicação definitiva, permitindo ajustar parâmetros antes de substituir a imagem de trabalho.",
      "Os plugins atuais incluem brilho e contraste, escala de cinza, negativo, gama, saturação, binarização, ruído sal e pimenta, filtro de Prewitt e transformações geométricas. Há também um leitor de QR Code implementado em módulos próprios de detecção, geometria, pré-processamento, decodificação e correção Reed–Solomon.",
      "A arquitetura parte de uma classe abstrata PluginBase, um diálogo Qt que recebe a imagem como array NumPy e expõe sinais de preview e aplicação. O carregador percorre recursivamente a pasta de plugins, importa classes válidas e converte subpastas em menus. OpenCV e NumPy executam as operações matriciais, enquanto o padrão Memento guarda cópias dos estados anteriores.",
      "Esse desenho atende ao modo de desenvolvimento da disciplina: uma funcionalidade pode ser adicionada em um arquivo isolado, com sua própria interface e algoritmo. O repositório inclui testes automatizados para parte dos filtros e documentação de contribuição, mas a cobertura varia entre plugins porque o trabalho é construído de forma incremental e coletiva."
    ],
    tags: ["Python", "PySide6", "OpenCV", "NumPy", "Plugins"],
    href: "https://github.com/gguisandim/Processamento-de-Imagens-2026v2"
  },
  {
    id: "umbra",
    title: "Umbra Trail",
    discipline: "Game engineering",
    observation: "Fases procedurais, combate e ferramentas de autoria.",
    description:
      "Roguelike 2D em pixel art com personagens personalizáveis, classes, combate, progressão e bestiário, acompanhado por ferramentas de autoria e validação de fases.",
    longDescription: [
      "Umbra Trail é um RPG de ação 2D top-down em pixel art, executado no navegador. A campanha acompanha uma travessia por florestas, igapós e regiões corrompidas; no estado documentado do repositório, Floresta das Raízes, Igapó das Memórias e Coração Corrompido formam o trecho autoral jogável da rota principal.",
      "O jogador escolhe entre Cavaleiro, Maga, Arqueiro e Ladino, explora mapas contínuos e enfrenta combates em tempo real com ataques, especiais, esquiva e invocações. Ondas de inimigos, loja, itens, progressão, NPCs, diálogos, missões e condições de saída são combinados para que a passagem entre fases dependa do que ocorreu dentro de cada capítulo.",
      "O conteúdo é descrito por manifestos de capítulo e módulos de fase com IDs estáveis. StageRegistry e StageLoader validam e resolvem mapas, encontros, narrativa e variantes visuais antes de entregá-los à cena Phaser. Campanha, saídas físicas e saves versionados ficam em serviços próprios, preservando a separação entre conteúdo declarativo, runtime e apresentação.",
      "Além do jogo, o projeto contém uma Forja de Fases, uma CLI de capítulos e o Umbra World Lab. Essas ferramentas criam templates, inspecionam grafos e mapas, comparam variantes, verificam referências e executam playtests de transitabilidade. A geração procedural usa seeds reproduzíveis; a campanha composta possui cobertura headless, mas o README informa que sua execução completa no Phaser ainda não foi homologada.",
      "A base usa TypeScript, Phaser, Vite e Jest, com gates para fronteiras arquiteturais e rastreabilidade das especificações. O desenvolvimento continua migrando fases legadas para capítulos autorais e substituindo apresentações provisórias; por isso, o repositório distingue explicitamente o que está jogável, o que foi validado e o que permanece parcial."
    ],
    tags: ["TypeScript", "Phaser", "Vite", "Jest", "Geração procedural"],
    href: "https://github.com/gguisandim/dsai-ap1-2Drogue"
  },
  {
    id: "distributed",
    title: "Sistema Distribuído",
    discipline: "Sistemas e comunicação",
    observation: "Repositório público ainda sem implementação documentada.",
    description:
      "Projeto acadêmico de sistemas distribuídos cujo repositório público ainda contém apenas a identificação inicial do trabalho.",
    longDescription: [
      "O repositório público de Sistema Distribuído contém somente um README com o nome do projeto. Não há código-fonte, documentação de requisitos, diagrama, dependências ou histórico suficiente para identificar o problema escolhido e a forma de comunicação entre processos.",
      "Por essa razão, esta leitura não atribui linguagem, protocolo, arquitetura ou funcionalidade ao trabalho. A ficha permanece como registro de um projeto acadêmico em estágio público inicial e poderá ser ampliada quando a implementação ou a documentação forem disponibilizadas."
    ],
    tags: ["Sistemas distribuídos", "Projeto acadêmico", "Em desenvolvimento"],
    href: "https://github.com/gguisandim/semfuro-sd-novo"
  },
  {
    id: "graphics",
    title: "Computação Gráfica",
    discipline: "Geometria e renderização",
    observation: "Geometrias, projeções e transformações espaciais.",
    description:
      "Aplicação em grade cartesiana para rasterização, curvas, preenchimento, recorte, transformações de polígonos e projeções 3D de um cubo.",
    longDescription: [
      "Este trabalho reúne, em uma aplicação web local, os algoritmos pedidos na terceira avaliação de Computação Gráfica. A interface usa uma grade cartesiana inteira de −10 a 10 para tornar cada decisão geométrica visível e permitir a comparação entre as diferentes operações.",
      "A parte de rasterização implementa retas com Bresenham em todos os octantes, círculo e elipse pelo algoritmo do ponto médio. Curvas de Bézier de segundo e terceiro grau são amostradas e rasterizadas, e a ferramenta de polilinha aceita sequências com quatro ou mais vértices.",
      "O conjunto também cobre preenchimento recursivo por semente com vizinhança 4-conexa e preenchimento scanline de polígonos. Para recorte, são usados Cohen–Sutherland em segmentos de reta e Sutherland–Hodgman em polígonos, mantendo cada algoritmo em um módulo próprio.",
      "Translação, rotação com pivô e escala com ponto fixo operam sobre polígonos. Na parte tridimensional, um cubo pode ser projetado de forma ortogonal, oblíqua ou em perspectiva; depois da projeção, suas doze arestas voltam a ser desenhadas na grade com Bresenham.",
      "A engenharia é deliberadamente enxuta: HTML e CSS compõem a interface, enquanto JavaScript puro separa grade, formas, curvas, preenchimento, recorte, projeções e transformações. Não há framework, bundler ou dependência externa; abrir o projeto com um servidor estático é suficiente para executar todos os experimentos."
    ],
    tags: ["JavaScript", "Bresenham", "Recorte", "Projeções 3D"],
    href: "https://github.com/gguisandim/trabalho-computacao-grafica"
  }
];
