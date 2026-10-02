/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ESTE É O ÚNICO FICHEIRO QUE PRECISA DE SER EDITADO POR CLIENTE.   │
 * │  Todos os outros ficheiros consomem daqui. Alterar nome, cédula,   │
 * │  áreas, morada, etc. faz-se aqui — nada mais.                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Depois de editar, ler o SCAFFOLD.md para os passos de deploy.
 *
 * Andreia Martins, Advogada (Maia). Dados do formulário preenchido pela
 * cliente em 1 de outubro de 2026.
 *
 * Indexação: o site só é indexável quando `domain` estiver preenchido
 * (ver `isIndexable()`). Até lá, meta robots + X-Robots-Tag + robots.txt
 * bloqueiam a indexação do URL provisório *.workers.dev.
 */

import {
  Users,
  ScrollText,
  Globe,
  Coins,
  KeyRound,
  Building2,
  FilePen,
  Scale,
  UserRound,
  IdCard,
  type LucideIcon,
} from "lucide-react";

// --------------------------------------------------------------------------
// Tipos
// --------------------------------------------------------------------------

export type PracticeArea = {
  slug: string; // URL slug (kebab-case, sem acentos)
  title: string; // Ex.: "Direito Civil"
  short: string; // 1 frase para listas na homepage e áreas index
  long: string[]; // Parágrafos da página própria da área
  topics: string[]; // Matérias acompanhadas (lista na página da área)
  audiences: string[]; // A quem se dirige (títulos de `perfil.audiences`)
  faq?: string; // `id` de uma pergunta em `perfil.faqs`
  seoTitle: string; // Início do <title> da área; o site acrescenta " | Andreia Martins"
  seoDescription: string; // meta description (≈ 150-160 caracteres)
  icon: LucideIcon;
};

export type Advogado = {
  name: string; // Nome de marca (como no logótipo)
  legalName: string; // Nome completo, para identificação legal
  displayName: string; // Nome como a advogada prefere ser tratada (sem título)
  firm: string | null;
  cedula: string;
  nif: string;
  street: string;
  postalCode: string;
  locality: string;
  localityIn: string; // Locução com preposição: "na Maia", "no Porto", "em Braga"
  district: string;
  mapsQuery: string; // Pesquisa para o mapa (sem andar/sala, que confundem o geocoder)
  phoneE164: string;
  phoneDisplay: string;
  phoneAltE164: string | null; // Linha fixa (opcional)
  phoneAltDisplay: string | null;
  email: string;
  hours: string;
  /** Horário em formato schema.org (JSON-LD). */
  openingHours: { days: string[]; opens: string; closes: string };
  bio: string; // Resumo na 3.ª pessoa (homepage, metas, JSON-LD)
  bioLong: string[]; // Texto da própria advogada (página Sobre)
  instagram: string | null;
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
    dark: string; // Cor mais escura: blocos de cor, rodapé, botões primários
    darkAlt: string; // Variação: hover, bloco de contacto
    accent: string; // Cor de destaque sobre `dark`
    accentSoft: string; // Versão clara: hovers subtis
    accentInk: string; // Accent para texto/ícones em fundo claro (AA)
    background: string; // Fundo do body
    ink: string; // Cor do texto corrido e dos títulos em fundo claro
  };
  /**
   * Logo em ficheiro (/public/). Fica a null: o logótipo (monograma A/M,
   * vetorizado do ficheiro original da cliente) é o componente `<Logo>`
   * (src/components/site/Logo.tsx), em SVG inline.
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
  /** Nome do Cloudflare Worker (não mudar: é o Worker já publicado). */
  slug: "praevo-demo-andreia-martins",
  /**
   * Domínio final (ex.: "andreiamartins.pt"). Enquanto for null, o site não
   * é indexado. Preencher ativa a indexação, o URL canónico, o sitemap e o
   * robots.txt com esse domínio.
   */
  domain: null as string | null,
  themeColor: "#F4F1EA",

  /** Modo demonstração (nota no rodapé + noindex). Site final: false. */
  demo: false,

  /**
   * Paleta "Bordeaux" (formulário), como no Instagram da advogada: creme,
   * bordeaux escuro e rosa-bege. Contrastes (WCAG 2.x): creme sobre dark
   * 12,54:1 · accent sobre dark 7,02:1 · accentInk sobre background
   * 12,54:1 · ink sobre background 14,35:1 · muted-foreground (styles.css)
   * sobre background 5,8:1.
   */
  brand: {
    colors: {
      dark: "#521616",
      darkAlt: "#3D0F0F",
      accent: "#CCB1A8",
      accentSoft: "#E4D3CC",
      accentInk: "#521616",
      background: "#F4F1EA",
      ink: "#2E1C1A",
    },
    logo: null,
  } satisfies Brand,

  advogado: {
    name: "Andreia Martins",
    legalName: "Andreia G. Martins",
    displayName: "Andreia Martins",
    // Exerce em regime de responsabilidade limitada (R.L.): denominação
    // usada no título das páginas, no rodapé e no Aviso Legal.
    firm: "Andreia G. Martins Advogada R.L.",
    cedula: "68433P",
    nif: "251231909",
    street: "Rua Eng. Duarte Pacheco, n.º 120, 2.º andar, sala 11",
    postalCode: "4470-174",
    locality: "Maia",
    localityIn: "na Maia",
    district: "Porto",
    mapsQuery: "Rua Engenheiro Duarte Pacheco 120, 4470-174 Maia, Portugal",
    phoneE164: "+351913947076",
    phoneDisplay: "913 947 076",
    phoneAltE164: null,
    phoneAltDisplay: null,
    email: "andreiagmartins-68433P@adv.oa.pt",
    hours: "Segunda a sexta, das 9h30 às 18h30",
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "18:30",
    },
    bio:
      "Andreia Martins é advogada, inscrita na Ordem dos Advogados, com escritório na Maia. " +
      "Presta serviços jurídicos a particulares, famílias, cidadãos estrangeiros, empresas e " +
      "condomínios em Direito da Família e Menores, Inventário e Sucessões, Imigração e " +
      "Nacionalidade, Insolvências, Arrendamento, Condomínios, Contratos e Direito Civil.",
    bioLong: [
      "Nem sempre sonhei em ser advogada. Na verdade, foi o Direito que, aos poucos, me foi conquistando, e hoje já não me imagino a fazer outra coisa.",
      "Apaixonei-me por esta profissão e pela possibilidade de, através dela, fazer a diferença na vida de alguém. Gosto de ouvir, de perceber os problemas para lá daquilo que está escrito nos documentos e, sobretudo, de encontrar soluções.",
      "Sou exigente com o meu trabalho, mas acredito que ser advogada não tem de significar ser distante. Gosto de uma relação próxima, transparente e humana com quem me procura, e acredito que explicar o Direito de forma simples é também uma forma de melhor o defender.",
      "É assim que exerço a advocacia: com rigor, mas sem perder a leveza; com profissionalismo, mas sem deixar de ser eu.",
      "E talvez seja precisamente isso que mais gosto nesta profissão: todos os dias há uma história diferente, uma pessoa diferente e um novo desafio para resolver.",
    ],
    instagram: "https://www.instagram.com/andreiamartinsadvogada/",
  } satisfies Advogado,

  /** Conteúdo próprio (texto da advogada e apresentação das áreas). */
  perfil: {
    tagline: "Advocacia próxima, transparente e humana",
    motto: "Com rigor, mas sem perder a leveza; com profissionalismo, mas sem deixar de ser eu.",
    audiences: [
      {
        title: "Particulares e famílias",
        text: "Nas questões da vida pessoal e familiar: um divórcio, uma herança, a casa arrendada, um contrato ou uma dívida.",
        icon: UserRound,
      },
      {
        title: "Cidadãos estrangeiros",
        text: "Que querem viver e trabalhar em Portugal, reunir a família ou obter a nacionalidade portuguesa.",
        icon: IdCard,
      },
      {
        title: "Empresas e condomínios",
        text: "Contratos, cobrança de créditos, insolvência e a gestão jurídica corrente do condomínio.",
        icon: Building2,
      },
    ] satisfies { title: string; text: string; icon: LucideIcon }[],
    values: [
      {
        title: "Proximidade",
        text: "Ser advogada não tem de significar ser distante. Cada pessoa encontra uma relação próxima, transparente e humana.",
      },
      {
        title: "Clareza",
        text: "Explicar o Direito de forma simples é também uma forma de melhor o defender: opções, prazos e custos ditos com clareza.",
      },
      {
        title: "Rigor",
        text: "Exigência com cada assunto: os documentos, a lei aplicável e os prazos são estudados antes de qualquer passo.",
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
        id: "falecimento-familiar",
        question: "Faleceu um familiar. Que passos tenho de dar?",
        intro:
          "Depois do falecimento de um familiar, há passos com prazos próprios. Em termos gerais:",
        steps: [
          "O óbito é registado na conservatória do registo civil; habitualmente, a agência funerária trata deste passo.",
          "A habilitação de herdeiros identifica quem são os herdeiros e pode ser feita num cartório notarial ou numa conservatória (por exemplo, no Balcão das Heranças).",
          "O cabeça-de-casal participa o óbito às Finanças e apresenta a relação de bens, em regra até ao final do terceiro mês seguinte ao do falecimento.",
          "Bancos, seguradoras e Segurança Social devem ser informados; podem existir prestações a requerer, como o subsídio por morte ou pensões de sobrevivência.",
          "Os bens são partilhados por acordo entre os herdeiros ou, na falta de acordo, através de processo de inventário, num cartório notarial ou no tribunal.",
        ],
        note: "Os passos e os prazos dependem da existência de testamento e dos bens deixados.",
      },
      {
        id: "insolvencia-exoneracao",
        question: "O que é a exoneração do passivo restante?",
        intro:
          "Na insolvência de uma pessoa singular, a lei permite que, verificados certos requisitos, as dívidas que não forem pagas no processo venham a ser perdoadas. Em termos gerais:",
        steps: [
          "O pedido de exoneração do passivo restante é feito pelo devedor no próprio processo de insolvência.",
          "Se for admitido, segue-se um período de cessão (em regra, de três anos), durante o qual o rendimento disponível, acima do necessário a um sustento digno, é entregue a um fiduciário para pagamento aos credores.",
          "Durante esse período, o devedor tem deveres a cumprir, como informar alterações de rendimentos e de morada e procurar exercer uma atividade remunerada.",
          "Terminado o período de cessão e cumpridos os deveres, o tribunal decide sobre a exoneração das dívidas que restem.",
          "Algumas dívidas não são abrangidas, como os créditos por alimentos, as multas e coimas e as dívidas fiscais e à Segurança Social.",
        ],
        note: "A viabilidade do pedido depende da situação concreta do devedor e do seu comportamento nos anos anteriores.",
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
          "A repartição das despesas (condomínio, obras, água, luz e gás) e o estado do imóvel na entrega, de preferência com registo fotográfico anexo.",
          "A comunicação do contrato às Finanças e o pagamento do Imposto do Selo, obrigações que cabem ao senhorio.",
        ],
        note: "As regras aplicáveis dependem do tipo de arrendamento e da data em que o contrato é celebrado.",
      },
      {
        id: "quotas-condominio",
        question: "Um condómino não paga as quotas. O que pode o condomínio fazer?",
        intro:
          "O regime da propriedade horizontal dá ao condomínio meios próprios para cobrar as contribuições em dívida. Em termos gerais:",
        steps: [
          "Confirmar que o valor das contribuições e o prazo de pagamento foram aprovados em assembleia de condóminos e constam da respetiva ata.",
          "Interpelar o condómino por escrito, indicando os valores em dívida e um prazo para pagamento.",
          "A ata da assembleia que deliberou o montante das contribuições e o prazo de pagamento constitui título executivo contra o condómino que não pague a sua parte.",
          "Com base nessa ata, pode ser instaurada uma ação executiva para cobrança das quantias em dívida.",
          "Antes ou durante o processo, pode ser negociado um plano de pagamento com o condómino.",
        ],
        note: "O caminho adequado depende do montante em dívida e da documentação do condomínio.",
      },
    ] satisfies Faq[],
  },

  areas: [
    {
      slug: "direito-da-familia-e-menores",
      title: "Direito da Família e Menores",
      short:
        "Divórcio, regulação das responsabilidades parentais, pensão de alimentos e partilha de bens.",
      long: [
        "As questões de família tocam no que cada pessoa tem de mais importante. Acompanho divórcios, separações e a regulação das responsabilidades parentais com proximidade e discrição, privilegiando a via do acordo sempre que ela protege os interesses de todos, em especial os das crianças.",
        "Quando o acordo não é possível, acompanho o processo em tribunal e explico cada passo de forma simples: o que vai acontecer, quanto tempo pode demorar e que decisões há a tomar.",
      ],
      topics: [
        "Divórcio por mútuo consentimento e sem consentimento de um dos cônjuges",
        "Regulação, alteração e incumprimento das responsabilidades parentais",
        "Pensão de alimentos a filhos e entre ex-cônjuges",
        "União de facto e os seus efeitos",
        "Partilha dos bens do casal",
        "Processos de promoção e proteção de crianças e jovens",
      ],
      audiences: ["Particulares e famílias"],
      faq: "divorcio-mutuo-consentimento",
      seoTitle: "Advogada de Família na Maia",
      seoDescription:
        "Advogada de Direito da Família e Menores na Maia: divórcio, regulação das responsabilidades parentais, pensão de alimentos e partilha de bens. Marque uma reunião.",
      icon: Users,
    },
    {
      slug: "inventario-e-sucessoes",
      title: "Inventário e Sucessões",
      short: "Habilitação de herdeiros, partilhas, processos de inventário e testamentos.",
      long: [
        "Depois do falecimento de um familiar, há passos e prazos que não podem ficar esquecidos, e decisões que convém tomar com informação. Acompanho herdeiros e cabeças-de-casal desde a habilitação de herdeiros até à partilha, por acordo ou através de processo de inventário, no cartório notarial ou no tribunal.",
        "Acompanho também quem quer planear a sua sucessão com antecedência, através de testamento ou de outros instrumentos previstos na lei, para evitar dúvidas e conflitos no futuro.",
      ],
      topics: [
        "Habilitação de herdeiros",
        "Participação às Finanças e relação de bens",
        "Partilha de heranças por acordo",
        "Processo de inventário, no notário ou em tribunal",
        "Testamentos e planeamento sucessório",
        "Direitos dos herdeiros legitimários",
      ],
      audiences: ["Particulares e famílias"],
      faq: "falecimento-familiar",
      seoTitle: "Advogada de Heranças e Inventário na Maia",
      seoDescription:
        "Advogada na Maia para heranças e sucessões: habilitação de herdeiros, partilhas, processos de inventário e testamentos. Acompanhamento próximo e explicado com clareza.",
      icon: ScrollText,
    },
    {
      slug: "imigracao-e-nacionalidade",
      title: "Imigração e Nacionalidade",
      short:
        "Vistos, autorizações de residência, reagrupamento familiar e nacionalidade portuguesa.",
      long: [
        "Mudar de país traz consigo um conjunto de procedimentos que nem sempre são simples. Acompanho cidadãos estrangeiros e as suas famílias nos pedidos de vistos e de autorização de residência junto da AIMA (Agência para a Integração, Migrações e Asilo), nas renovações e no reagrupamento familiar.",
        "Acompanho também pedidos de nacionalidade portuguesa junto do Instituto dos Registos e do Notariado, por atribuição ou por aquisição, e reviso a documentação antes de cada submissão. Como a legislação nesta área tem sido alterada com frequência, cada caso é analisado à luz das regras em vigor à data do pedido.",
      ],
      topics: [
        "Vistos e autorizações de residência",
        "Renovação de autorizações de residência",
        "Reagrupamento familiar",
        "Nacionalidade portuguesa: atribuição e aquisição",
        "Transcrição de casamentos e de nascimentos ocorridos no estrangeiro",
        "Acompanhamento de processos junto da AIMA e do IRN",
      ],
      audiences: ["Cidadãos estrangeiros"],
      seoTitle: "Advogada de Imigração e Nacionalidade na Maia",
      seoDescription:
        "Advogada na Maia para imigração e nacionalidade portuguesa: vistos, autorização de residência (AIMA), reagrupamento familiar e pedidos de nacionalidade.",
      icon: Globe,
    },
    {
      slug: "insolvencias",
      title: "Insolvências",
      short: "Insolvência de particulares e empresas, exoneração do passivo restante, PER e PEAP.",
      long: [
        "Uma situação de sobre-endividamento pesa no dia a dia de quem a vive. Acompanho particulares e empresas na análise da sua situação financeira e na escolha do caminho adequado: um acordo com os credores, um processo especial de revitalização (PER) ou para acordo de pagamento (PEAP), ou a apresentação à insolvência.",
        "Nos processos de insolvência de pessoas singulares, acompanho o pedido de exoneração do passivo restante e o período de cessão. Represento também credores na reclamação e na verificação dos seus créditos.",
      ],
      topics: [
        "Apresentação à insolvência de particulares e de empresas",
        "Exoneração do passivo restante",
        "Plano de pagamentos aos credores",
        "Processo especial de revitalização (PER) e para acordo de pagamento (PEAP)",
        "Reclamação e impugnação de créditos",
        "Acompanhamento junto do administrador da insolvência",
      ],
      audiences: ["Particulares e famílias", "Empresas e condomínios"],
      faq: "insolvencia-exoneracao",
      seoTitle: "Advogada de Insolvência na Maia",
      seoDescription:
        "Advogada na Maia para insolvência de particulares e empresas: exoneração do passivo restante, PEAP, PER e reclamação de créditos. Marque uma reunião.",
      icon: Coins,
    },
    {
      slug: "arrendamento",
      title: "Arrendamento",
      short: "Contratos de arrendamento, rendas em atraso, cessação do contrato e despejo.",
      long: [
        "O arrendamento é uma relação que se prolonga no tempo e que convém começar bem. Acompanho senhorios e inquilinos na preparação e na revisão do contrato, na atualização de rendas e na resolução de diferendos durante a sua execução.",
        "Quando há rendas em atraso ou o contrato chega ao fim, acompanho a cessação (por acordo, denúncia, oposição à renovação ou resolução) e, se necessário, o procedimento especial de despejo.",
      ],
      topics: [
        "Contratos de arrendamento habitacional e não habitacional",
        "Atualização de rendas e obras no locado",
        "Rendas em atraso",
        "Denúncia, oposição à renovação e resolução do contrato",
        "Procedimento especial de despejo",
        "Defesa de inquilinos",
      ],
      audiences: ["Particulares e famílias", "Empresas e condomínios"],
      faq: "contrato-arrendamento",
      seoTitle: "Advogada de Arrendamento na Maia",
      seoDescription:
        "Advogada de arrendamento na Maia para senhorios e inquilinos: contratos, rendas em atraso, cessação do contrato e procedimento especial de despejo.",
      icon: KeyRound,
    },
    {
      slug: "condominios",
      title: "Condomínios",
      short:
        "Assembleias e atas, cobrança de quotas em dívida, obras e conflitos entre condóminos.",
      long: [
        "A vida em condomínio levanta questões práticas: quem decide, como se aprovam obras, como se cobram quotas em atraso. Acompanho administrações de condomínio e condóminos na preparação de assembleias, na redação de atas e regulamentos e na cobrança de contribuições em dívida.",
        "Acompanho também os conflitos entre condóminos e com a administração, desde a impugnação de deliberações até às questões sobre partes comuns e obras.",
      ],
      topics: [
        "Convocatórias, assembleias de condóminos e atas",
        "Regulamento do condomínio",
        "Cobrança de quotas em dívida",
        "Obras e partes comuns",
        "Impugnação de deliberações da assembleia",
        "Conflitos entre condóminos",
      ],
      audiences: ["Empresas e condomínios", "Particulares e famílias"],
      faq: "quotas-condominio",
      seoTitle: "Advogada de Condomínios na Maia",
      seoDescription:
        "Advogada para condomínios na Maia: cobrança de quotas em dívida, assembleias e atas, obras, regulamentos e conflitos entre condóminos.",
      icon: Building2,
    },
    {
      slug: "contratos",
      title: "Contratos",
      short: "Redação, revisão e negociação de contratos para particulares e empresas.",
      long: [
        "Um contrato bem redigido é a primeira forma de prevenir um litígio. Redijo e reviso contratos do dia a dia, como compra e venda, contratos-promessa, prestação de serviços, empreitada ou mútuo, e explico, antes da assinatura, o que cada cláusula significa.",
        "Quando surge um incumprimento, acompanho a negociação com a outra parte e, se necessário, os meios judiciais adequados.",
      ],
      topics: [
        "Redação e revisão de contratos",
        "Contratos-promessa e compra e venda",
        "Prestação de serviços e empreitada",
        "Negociação de cláusulas",
        "Incumprimento e resolução de contratos",
        "Reconhecimento de assinaturas e autenticação de documentos",
      ],
      audiences: ["Particulares e famílias", "Empresas e condomínios"],
      seoTitle: "Advogada de Contratos na Maia",
      seoDescription:
        "Advogada na Maia para redação, revisão e negociação de contratos: compra e venda, contratos-promessa, prestação de serviços, empreitada e incumprimento.",
      icon: FilePen,
    },
    {
      slug: "direito-civil",
      title: "Direito Civil",
      short:
        "Responsabilidade civil, cobrança de dívidas, relações de vizinhança e direitos do consumidor.",
      long: [
        "O Direito Civil regula grande parte das relações do quotidiano: entre vizinhos, entre credores e devedores, entre consumidores e empresas. Acompanho estas questões desde a primeira análise da documentação até à via judicial, quando é necessária.",
        "Na cobrança de dívidas, começo pela via extrajudicial e, sem pagamento, recorro aos meios adequados ao valor e à prova disponível, como o procedimento de injunção ou a ação judicial.",
      ],
      topics: [
        "Responsabilidade civil e indemnizações",
        "Cobrança de dívidas e procedimento de injunção",
        "Acidentes de viação",
        "Propriedade, servidões e relações de vizinhança",
        "Direitos do consumidor",
        "Ações judiciais e execuções",
      ],
      audiences: ["Particulares e famílias", "Empresas e condomínios"],
      seoTitle: "Advogada de Direito Civil na Maia",
      seoDescription:
        "Advogada de Direito Civil na Maia: cobrança de dívidas e injunções, responsabilidade civil e indemnizações, acidentes de viação e direitos do consumidor.",
      icon: Scale,
    },
  ] as PracticeArea[],
} as const;

// --------------------------------------------------------------------------
// Utilitários — não editar
// --------------------------------------------------------------------------

export const siteName = () => siteConfig.advogado.firm ?? siteConfig.advogado.name;

/**
 * URL público. Sem domínio, cai no subdomínio workers.dev (só usado em
 * canónicos/sitemap enquanto o site não é indexável).
 */
export const baseUrl = () =>
  siteConfig.domain ? `https://${siteConfig.domain}` : `https://${siteConfig.slug}.workers.dev`;

export const absoluteUrl = (path: string) =>
  `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

/** Só se indexa com domínio final e fora do modo demo. */
export const isIndexable = () => !siteConfig.demo && siteConfig.domain !== null;

/** Valor da meta robots / X-Robots-Tag para páginas indexáveis. */
export const robotsContent = () => (isIndexable() ? "index, follow" : "noindex, nofollow");

export const getArea = (slug: string) => siteConfig.areas.find((a) => a.slug === slug);

export const getFaq = (id: string) => siteConfig.perfil.faqs.find((f) => f.id === id);

/** Placeholder por confirmar com a cliente (texto entre parênteses rectos). */
export const isPlaceholder = (value: string) => value.startsWith("[");

/** "Advogada na Maia" — usado em títulos e metas. */
export const advogadaEm = () =>
  isPlaceholder(siteConfig.advogado.locality)
    ? "Advogada"
    : `Advogada ${siteConfig.advogado.localityIn}`;

/** "advogada na Maia" — a meio de uma frase (só a primeira letra em minúscula). */
export const advogadaEmMinuscula = () => advogadaEm().replace(/^A/, "a");

/** Link de chamada; enquanto o número for placeholder, leva aos contactos. */
export const telHref = (e164: string) => (isPlaceholder(e164) ? "/contactos" : `tel:${e164}`);

/** Link de email; enquanto o endereço for placeholder, leva aos contactos. */
export const mailHref = (email: string) =>
  isPlaceholder(email) ? "/contactos" : `mailto:${email}`;

/** Morada completa numa linha (NAP consistente em todo o site). */
export const fullAddress = () => {
  const a = siteConfig.advogado;
  return `${a.street}, ${a.postalCode} ${a.locality}`;
};
