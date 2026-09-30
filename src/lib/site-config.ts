/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ESTE É O ÚNICO FICHEIRO QUE PRECISA DE SER EDITADO POR CLIENTE.   │
 * │  Todos os outros ficheiros consomem daqui. Alterar nome, cédula,   │
 * │  áreas, morada, etc. faz-se aqui — nada mais.                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Depois de editar, ler o SCAFFOLD.md para os passos de deploy.
 *
 * SITE DEMO — Andreia Martins, Advogada. Proposta preparada pela
 * Praevo Technologies. Áreas, públicos, textos e valores são uma PROPOSTA
 * a validar com a cliente; tudo o que está entre [parênteses rectos] é
 * placeholder a confirmar. O site inteiro está em noindex/nofollow (ver
 * `demo` abaixo).
 */

import {
  Users,
  Briefcase,
  KeyRound,
  FilePen,
  Shield,
  UserRound,
  IdCard,
  Store,
  type LucideIcon,
} from "lucide-react";

// --------------------------------------------------------------------------
// Tipos
// --------------------------------------------------------------------------

export type PracticeArea = {
  slug: string; // URL slug (kebab-case, sem acentos)
  title: string; // Ex.: "Direito Civil"
  short: string; // 1 frase para listas na homepage e áreas index
  long: string; // 2-4 frases para a página própria da área
  topics: string[]; // Matérias acompanhadas (lista na página da área)
  audiences: string[]; // A quem se dirige (títulos de `perfil.audiences`)
  faq?: string; // `id` de uma pergunta em `perfil.faqs`
  icon: LucideIcon;
};

export type Advogado = {
  name: string;
  displayName: string; // Nome como a advogada prefere ser tratada (sem título)
  firm: string | null;
  cedula: string;
  nif: string;
  street: string;
  postalCode: string;
  locality: string;
  district: string;
  phoneE164: string;
  phoneDisplay: string;
  phoneAltE164: string | null; // Linha fixa (opcional)
  phoneAltDisplay: string | null;
  email: string;
  hours: string;
  bio: string;
};

export type Faq = {
  id: string;
  question: string;
  intro: string;
  steps: string[];
  note: string;
};

export type Brand = {
  /**
   * Paleta em tokens hex. O resto do CSS deriva destes valores; para
   * mudar a identidade visual, editar apenas este bloco.
   */
  colors: {
    dark: string; // Cor mais escura — hero, footer, botões primários
    darkAlt: string; // Variação — hover, sidebar dark
    accent: string; // Cor de destaque — ícones, links, CTAs (em fundo escuro)
    accentSoft: string; // Versão clara — badges, bordas subtis
    accentInk: string; // Accent para texto/ícones em fundo claro (AA)
    background: string; // Near-white do body
    ink: string; // Cor do texto corrido e dos títulos em fundo claro
  };
  /**
   * Logo em ficheiro (/public/). Neste demo fica a null: o logótipo é o
   * componente `<Logo>` (src/components/site/Logo.tsx), em SVG inline.
   */
  logo: {
    src: string;
    alt: string;
    height?: number;
  } | null;
};

// --------------------------------------------------------------------------
// Configuração do site — EDITAR
// --------------------------------------------------------------------------

export const siteConfig = {
  slug: "praevo-demo-andreia-martins",
  domain: null as string | null,
  themeColor: "#FFFFFF",

  /**
   * Site de demonstração: força `noindex, nofollow` em todas as páginas
   * (meta + header X-Robots-Tag) e mostra a nota discreta no rodapé.
   * Passar a `false` quando o site for entregue à cliente.
   */
  demo: true,

  /**
   * Paleta vermelho-carmim + branco, como no Instagram da advogada.
   * `dark` é o vermelho dos blocos de cor e dos botões; `accent` é o rosa
   * pálido usado sobre esse vermelho. Contrastes (WCAG 2.x): branco sobre
   * dark 7,79:1 · accent sobre dark 5,73:1 · accentInk sobre background
   * 7,79:1 (7,21:1 sobre muted) · ink sobre background 17:1 ·
   * muted-foreground (styles.css) sobre background 6,86:1.
   */
  brand: {
    colors: {
      dark: "#A3142D",
      darkAlt: "#80101F",
      accent: "#F6D5D9",
      accentSoft: "#FBE9EB",
      accentInk: "#A3142D",
      background: "#FFFFFF",
      ink: "#231A1B",
    },
    logo: null,
  } satisfies Brand,

  advogado: {
    name: "Andreia Martins",
    displayName: "Andreia Martins",
    firm: null,
    cedula: "[a confirmar]",
    nif: "[NIF a confirmar]",
    street: "[Morada a confirmar]",
    postalCode: "[Código postal]",
    locality: "[Localidade a confirmar]",
    district: "[Distrito a confirmar]",
    phoneE164: "[+351 a confirmar]",
    phoneDisplay: "[Telemóvel]",
    phoneAltE164: null,
    phoneAltDisplay: null,
    email: "[email a confirmar]",
    hours: "[Horário a confirmar]",
    bio:
      "Andreia Martins é advogada, inscrita na Ordem dos Advogados. Presta serviços jurídicos a " +
      "particulares, a famílias e a pequenas empresas, em questões de família, trabalho, " +
      "arrendamento, contratos e processo penal. Cada assunto começa por uma conversa: ouvir, " +
      "perceber o que está em causa e explicar, com clareza, as opções e os passos seguintes.",
  } satisfies Advogado,

  /** Conteúdo próprio — PROPOSTA a validar com a cliente. */
  perfil: {
    tagline: "Advocacia de proximidade",
    motto: "Cada decisão merece ser tomada com informação clara.",
    audiences: [
      {
        title: "Particulares e famílias",
        text: "Nas questões da vida pessoal e familiar: do divórcio à casa arrendada, de um contrato a um processo em tribunal.",
        icon: UserRound,
      },
      {
        title: "Trabalhadores",
        text: "Na relação com a entidade empregadora, do contrato de trabalho à sua cessação.",
        icon: IdCard,
      },
      {
        title: "Pequenas empresas",
        text: "Empresários em nome individual e pequenas empresas: contratos, relações laborais e cobrança de créditos.",
        icon: Store,
      },
    ] satisfies { title: string; text: string; icon: LucideIcon }[],
    values: [
      {
        title: "Proximidade",
        text: "Cada pessoa é ouvida com tempo e sabe, em cada fase, com quem fala e em que ponto está o seu assunto.",
      },
      {
        title: "Clareza",
        text: "Opções, prazos e custos explicados em linguagem simples, para que cada decisão seja tomada com conhecimento.",
      },
      {
        title: "Rigor",
        text: "Os documentos, a lei aplicável e os prazos são estudados antes de qualquer passo. Sem atalhos.",
      },
    ],
    /**
     * "Tipos de atos que os advogados fazem" — atos próprios dos advogados
     * (Lei n.º 49/2004); o último decorre do Decreto-Lei n.º 76-A/2006.
     */
    acts: [
      "Consulta jurídica e pareceres escritos",
      "Elaboração e revisão de contratos",
      "Mandato forense: representação em tribunal",
      "Negociação tendente à cobrança de créditos",
      "Reclamação e impugnação de atos administrativos e tributários",
      "Reconhecimento de assinaturas, autenticação e certificação de documentos",
    ],
    faqs: [
      {
        id: "divorcio-mutuo-consentimento",
        question: "Como funciona o divórcio por mútuo consentimento?",
        intro:
          "Quando os dois cônjuges estão de acordo quanto ao divórcio e às suas consequências, o processo pode correr numa conservatória do registo civil. Em termos gerais:",
        steps: [
          "O requerimento é apresentado pelos dois cônjuges, ou pelos seus mandatários, numa conservatória do registo civil.",
          "Acompanham-no os acordos exigidos por lei: sobre o exercício das responsabilidades parentais dos filhos menores, se os houver; sobre os alimentos ao cônjuge que deles careça; e sobre o destino da casa de morada de família.",
          "Junta-se a relação especificada dos bens comuns (ou o acordo sobre a sua partilha) e, se existir, a certidão da convenção antenupcial.",
          "Havendo filhos menores, o acordo sobre as responsabilidades parentais é enviado ao Ministério Público, que se pronuncia sobre se acautela os interesses das crianças.",
          "Se faltar algum destes acordos, o divórcio por mútuo consentimento pode ser requerido em tribunal, que decide as questões em falta. Sem acordo quanto ao próprio divórcio, o caminho é o divórcio sem consentimento de um dos cônjuges, também em tribunal.",
        ],
        note: "A solução adequada depende da situação da família, dos filhos e do património comum.",
      },
      {
        id: "comunicacao-despedimento",
        question: "Recebi uma comunicação de despedimento. O que devo fazer?",
        intro: "Em Direito do Trabalho, alguns prazos são curtos. Em termos gerais, convém:",
        steps: [
          "Guardar a comunicação de despedimento e reunir o contrato de trabalho, os recibos de vencimento e a correspondência trocada com a entidade empregadora.",
          "Identificar a modalidade de despedimento invocada — por facto imputável ao trabalhador, coletivo, por extinção do posto de trabalho ou por inadaptação —, porque os requisitos e os prazos variam.",
          "Para contestar um despedimento individual comunicado por escrito, a oposição deve, em regra, dar entrada no tribunal no prazo de 60 dias a contar da receção da comunicação ou da cessação do contrato, se posterior.",
          "Verificar os créditos devidos com a cessação, como férias e subsídios proporcionais e, quando aplicável, a compensação. Estes créditos prescrevem, em regra, um ano após o dia seguinte ao da cessação do contrato.",
          "Pedir à entidade empregadora a declaração de situação de desemprego e, sendo o caso, requerer as prestações de desemprego à Segurança Social no prazo de 90 dias a contar da data do desemprego.",
        ],
        note: "Antes de assinar qualquer acordo com a entidade empregadora, convém analisar o que nele se prevê e aquilo de que se prescinde.",
      },
      {
        id: "contrato-arrendamento",
        question: "Vou arrendar uma casa. O que deve ficar no contrato?",
        intro:
          "O contrato de arrendamento urbano deve ser celebrado por escrito. Antes de assinar, convém confirmar que dele constam, pelo menos:",
        steps: [
          "A identificação das partes e do imóvel, com a referência à licença de utilização (ou ao documento que a dispense) e ao certificado energético.",
          "A finalidade do arrendamento (habitacional ou não habitacional), o prazo e o regime de renovação.",
          "O valor da renda, a forma e o local de pagamento e, se existir, a caução ou as rendas pagas antecipadamente.",
          "A repartição das despesas — condomínio, obras, água, luz e gás — e o estado do imóvel na entrega, de preferência com registo fotográfico anexo.",
          "A comunicação do contrato às Finanças e o pagamento do Imposto do Selo, obrigações que cabem ao senhorio.",
        ],
        note: "As regras aplicáveis dependem do tipo de arrendamento e da data em que o contrato é celebrado.",
      },
    ] satisfies Faq[],
  },

  /** Áreas de prática — PROPOSTA a validar com a cliente. */
  areas: [
    {
      slug: "direito-da-familia",
      title: "Direito da Família e das Crianças",
      short: "Divórcio, responsabilidades parentais, alimentos e partilha do património comum.",
      long:
        "Acompanhamos pessoas e famílias em momentos de mudança. Sempre que é possível e protege " +
        "os interesses de todos, em especial os das crianças, privilegiamos a via do acordo; " +
        "quando não é, acompanhamos o processo em tribunal, com a mesma atenção a cada passo.",
      topics: [
        "Divórcio por mútuo consentimento e sem consentimento de um dos cônjuges",
        "Regulação e alteração do exercício das responsabilidades parentais",
        "Pensão de alimentos: fixação, alteração e incumprimento",
        "União de facto e os seus efeitos",
        "Partilha dos bens comuns",
      ],
      audiences: ["Particulares e famílias"],
      faq: "divorcio-mutuo-consentimento",
      icon: Users,
    },
    {
      slug: "direito-do-trabalho",
      title: "Direito do Trabalho",
      short: "Contratos, despedimentos e créditos laborais, para trabalhadores e empregadores.",
      long:
        "Prestamos serviços a trabalhadores e a pequenas empresas em todas as fases da relação " +
        "laboral: da celebração do contrato à sua cessação. Revemos documentos antes de serem " +
        "assinados e acompanhamos os processos em que os prazos contam.",
      topics: [
        "Contratos de trabalho e acordos de cessação",
        "Impugnação de despedimento",
        "Créditos laborais: retribuições, férias e subsídios",
        "Processos disciplinares",
        "Acidentes de trabalho",
      ],
      audiences: ["Trabalhadores", "Pequenas empresas"],
      faq: "comunicacao-despedimento",
      icon: Briefcase,
    },
    {
      slug: "arrendamento-e-imobiliario",
      title: "Arrendamento e Imobiliário",
      short: "Contratos de arrendamento, rendas em atraso, despejo e compra e venda de imóveis.",
      long:
        "Acompanhamos senhorios e inquilinos na preparação e na execução do contrato de " +
        "arrendamento, e compradores e vendedores num negócio imobiliário. Um contrato claro " +
        "desde o início evita muitos dos diferendos que chegam depois.",
      topics: [
        "Contratos de arrendamento habitacional e não habitacional",
        "Rendas em atraso e cessação do contrato",
        "Procedimento especial de despejo",
        "Contrato-promessa e compra e venda de imóveis",
        "Questões de condomínio",
      ],
      audiences: ["Particulares e famílias", "Pequenas empresas"],
      faq: "contrato-arrendamento",
      icon: KeyRound,
    },
    {
      slug: "contratos-e-direito-civil",
      title: "Contratos e Direito Civil",
      short: "Redação e revisão de contratos, incumprimento e cobrança de créditos.",
      long:
        "Um contrato bem redigido é a primeira forma de prevenção. Revemos e preparamos " +
        "contratos do dia a dia e, quando há incumprimento, acompanhamos a recuperação do " +
        "crédito: primeiro pela via extrajudicial, depois pelos meios judiciais adequados.",
      topics: [
        "Redação e revisão de contratos",
        "Incumprimento contratual",
        "Cobrança de créditos e procedimento de injunção",
        "Responsabilidade civil e acidentes de viação",
        "Direitos do consumidor",
      ],
      audiences: ["Particulares e famílias", "Pequenas empresas"],
      icon: FilePen,
    },
    {
      slug: "direito-penal-e-contraordenacoes",
      title: "Direito Penal e Contraordenações",
      short: "Defesa de arguidos, apoio a vítimas e assistentes, e processos de contraordenação.",
      long:
        "Acompanhamos arguidos, assistentes e vítimas ao longo do processo penal, do inquérito " +
        "ao julgamento e ao recurso. Representamos também particulares e empresas em processos " +
        "de contraordenação, incluindo as rodoviárias.",
      topics: [
        "Defesa de arguidos em todas as fases do processo",
        "Constituição como assistente e pedido de indemnização civil",
        "Apoio a vítimas de crime",
        "Contraordenações rodoviárias e outras",
        "Recursos",
      ],
      audiences: ["Particulares e famílias", "Pequenas empresas"],
      icon: Shield,
    },
  ] as PracticeArea[],
} as const;

// --------------------------------------------------------------------------
// Utilitários — não editar
// --------------------------------------------------------------------------

export const siteName = () => siteConfig.advogado.firm ?? siteConfig.advogado.name;

export const baseUrl = () =>
  siteConfig.domain ? `https://${siteConfig.domain}` : `https://${siteConfig.slug}.workers.dev`;

export const absoluteUrl = (path: string) =>
  `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export const getArea = (slug: string) => siteConfig.areas.find((a) => a.slug === slug);

export const getFaq = (id: string) => siteConfig.perfil.faqs.find((f) => f.id === id);

/** Placeholder por confirmar com a cliente (texto entre parênteses rectos). */
export const isPlaceholder = (value: string) => value.startsWith("[");

/** "Advogada em <localidade>" — só "Advogada" enquanto a localidade for placeholder. */
export const advogadaEm = () =>
  isPlaceholder(siteConfig.advogado.locality)
    ? "Advogada"
    : `Advogada em ${siteConfig.advogado.locality}`;

/** Link de chamada; enquanto o número for placeholder, leva aos contactos. */
export const telHref = (e164: string) => (isPlaceholder(e164) ? "/contactos" : `tel:${e164}`);

/** Link de email; enquanto o endereço for placeholder, leva aos contactos. */
export const mailHref = (email: string) =>
  isPlaceholder(email) ? "/contactos" : `mailto:${email}`;
