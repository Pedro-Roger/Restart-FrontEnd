import type { ComponentProps } from "react";
import type { Feather } from "@expo/vector-icons";

export type IconName = ComponentProps<typeof Feather>["name"];
export type MissionStatus = "concluída" | "em andamento" | "bloqueada";

export const screens = [
  "Splash",
  "Onboarding 1",
  "Onboarding 2",
  "Onboarding 3",
  "Login",
  "Cadastro",
  "Conexão com Banco",
  "Início",
  "Jornada",
  "Pagamentos",
  "Educação",
  "Evolução",
  "Perfil"
];

export const splash = {
  logo: "Restart",
  phrase: "Sua nova jornada financeira começa aqui"
};

export const bottomTabs: Array<{ key: string; label: string; icon: IconName }> = [
  { key: "home", label: "Início", icon: "home" },
  { key: "journey", label: "Jornada", icon: "map" },
  { key: "payments", label: "Pagamentos", icon: "credit-card" },
  { key: "education", label: "Educação", icon: "book-open" },
  { key: "profile", label: "Perfil", icon: "user" }
];

export const onboarding = [
  {
    title: "Reconstrua sua confiança financeira",
    text: "Entenda o que é o Restart, como melhorar seu RA e quais hábitos aceleram sua evolução.",
    icon: "trending-up" as IconName
  },
  {
    title: "Conecte sua vida financeira",
    text: "Com sua autorização, usamos seus dados financeiros com segurança para acompanhar sua evolução.",
    icon: "shield" as IconName
  },
  {
    title: "Complete missões e evolua",
    text: "Veja o passo a passo inicial da jornada, conecte seu banco parceiro e avance missão por missão.",
    icon: "award" as IconName
  }
];

export const authContent = {
  validation: "Validar por e-mail ou telefone",
  recovery: "Recuperar senha",
  termsUse: "Aceito os Termos de Uso",
  privacyPolicy: "Aceito a Política de Privacidade"
};

export const user = {
  name: "Mariana",
  fullName: "Mariana Alves",
  cpf: "***.***.***-42",
  email: "mariana@email.com",
  phone: "(11) 99999-2040",
  bank: "Banco do Brasil",
  rating: 68,
  status: "Em evolução"
};

export const dashboard = {
  ratingCardTitle: "RA Restart • Visão Open Finance",
  guidance: "Dados importados do banco conectado para acompanhar saldo, crédito e compromissos do CPF.",
  nextMission: "Manter pagamentos sem atraso por 30 dias",
  lastPayment: "Fatura BB vence em 5 dias",
  tip: "Ative lembretes para não perder vencimentos",
  themeLabel: "Modo escuro"
};

export const openFinanceSnapshot = {
  bank: "Banco do Brasil",
  accountLabel: "Conta conectada por Open Finance",
  accountType: "Conta corrente • Ag 0001 • Final 4587",
  balance: "R$ 4.327,18",
  availableCredit: "R$ 2.950,00",
  creditCardLimit: "R$ 6.500,00",
  usedLimit: "R$ 1.840,22",
  lastSync: "Atualizado hoje às 17h26",
  products: [
    "Conta corrente",
    "Cartão Ourocard",
    "Limite pré-aprovado"
  ]
};

export const openFinanceBanks = [
  {
    id: "bb",
    name: "Banco do Brasil",
    shortName: "BB",
    accountLabel: "Conta conectada por Open Finance",
    accountType: "Conta corrente • Ag 0001 • Final 4587",
    balance: "R$ 4.327,18",
    availableCredit: "R$ 2.950,00",
    creditCardLimit: "R$ 6.500,00",
    usedLimit: "R$ 1.840,22",
    lastSync: "Atualizado hoje às 17h26",
    relationshipScore: 82,
    relationshipLabel: "Relacionamento forte",
    products: ["Conta corrente", "Cartão Ourocard", "Limite pré-aprovado"]
  },
  {
    id: "nubank",
    name: "Nubank",
    shortName: "NU",
    accountLabel: "Disponível para conexão via Open Finance",
    accountType: "Conta digital • Final 1024",
    balance: "R$ 1.248,90",
    availableCredit: "R$ 780,00",
    creditCardLimit: "R$ 2.400,00",
    usedLimit: "R$ 1.120,44",
    lastSync: "Última leitura há 2 dias",
    relationshipScore: 64,
    relationshipLabel: "Relacionamento em evolução",
    products: ["Conta digital", "Cartão de crédito"]
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago",
    shortName: "MP",
    accountLabel: "Disponível para conexão via Open Finance",
    accountType: "Conta de pagamentos • Final 8871",
    balance: "R$ 562,33",
    availableCredit: "R$ 320,00",
    creditCardLimit: "R$ 1.500,00",
    usedLimit: "R$ 430,10",
    lastSync: "Última leitura há 5 dias",
    relationshipScore: 58,
    relationshipLabel: "Relacionamento inicial",
    products: ["Conta de pagamentos", "Cartão Mercado Pago"]
  },
  {
    id: "santander",
    name: "Santander",
    shortName: "SAN",
    accountLabel: "Disponível para conexão via Open Finance",
    accountType: "Conta corrente • Final 6632",
    balance: "R$ 2.118,47",
    availableCredit: "R$ 1.420,00",
    creditCardLimit: "R$ 4.100,00",
    usedLimit: "R$ 2.004,18",
    lastSync: "Última leitura há 1 dia",
    relationshipScore: 71,
    relationshipLabel: "Relacionamento consistente",
    products: ["Conta corrente", "Cartão SX", "Cheque especial"]
  },
  {
    id: "picpay",
    name: "PicPay",
    shortName: "PP",
    accountLabel: "Disponível para conexão via Open Finance",
    accountType: "Conta digital • Final 2354",
    balance: "R$ 398,14",
    availableCredit: "R$ 250,00",
    creditCardLimit: "R$ 1.200,00",
    usedLimit: "R$ 210,64",
    lastSync: "Última leitura há 3 dias",
    relationshipScore: 55,
    relationshipLabel: "Relacionamento inicial",
    products: ["Conta digital", "Carteira PicPay"]
  },
  {
    id: "c6",
    name: "C6 Bank",
    shortName: "C6",
    accountLabel: "Disponível para conexão via Open Finance",
    accountType: "Conta corrente • Final 9041",
    balance: "R$ 1.032,88",
    availableCredit: "R$ 910,00",
    creditCardLimit: "R$ 3.000,00",
    usedLimit: "R$ 1.387,93",
    lastSync: "Última leitura há 4 dias",
    relationshipScore: 62,
    relationshipLabel: "Relacionamento em evolução",
    products: ["Conta corrente", "Cartão C6", "Tag de pedágio"]
  },
  {
    id: "add",
    name: "Adicionar banco",
    shortName: "+",
    accountLabel: "Conecte outra instituição pelo Open Finance",
    accountType: "Novo banco",
    balance: "--",
    availableCredit: "--",
    creditCardLimit: "--",
    usedLimit: "--",
    lastSync: "Sem conexão ativa",
    relationshipScore: 0,
    relationshipLabel: "Nenhum relacionamento carregado",
    products: []
  }
] as const;

export const gamification = {
  level: "Nível 4",
  xp: "2.450 XP",
  achievement: "Conquista: Primeira recorrência",
  streak: "Sequência de 12 dias",
  nextReward: "Faltam 550 XP para liberar nova simulação de crédito"
};

export const missions: Array<{ title: string; status: MissionStatus; description: string }> = [
  {
    title: "Conectar sua conta bancária",
    status: "concluída",
    description: "Open Finance ativo com consentimento seguro."
  },
  {
    title: "Pagar sua mensalidade em dia",
    status: "concluída",
    description: "Pagamento confirmado neste mês."
  },
  {
    title: "Pagar uma conta recorrente",
    status: "em andamento",
    description: "Escolha uma conta para manter recorrência."
  },
  {
    title: "Manter movimentação por 30 dias",
    status: "bloqueada",
    description: "Liberada após primeira recorrência."
  },
  {
    title: "Ler uma dica de educação financeira",
    status: "em andamento",
    description: "Conteúdo rápido ajuda sua evolução."
  }
];

export const payments = {
  monthlyFee: "R$ 29,90",
  status: "pendente",
  options: ["Pix", "boleto", "débito via banco conectado"],
  history: [
    { month: "Abril", status: "pago", amount: "R$ 29,90" },
    { month: "Março", status: "pago", amount: "R$ 29,90" },
    { month: "Fevereiro", status: "pago", amount: "R$ 29,90" }
  ],
  message: "Pagamentos em dia ajudam sua evolução",
  radar: [
    {
      title: "Fatura Ourocard",
      amount: "R$ 1.840,22",
      dueIn: "vence em 5 dias",
      status: "urgente"
    },
    {
      title: "Conta de luz",
      amount: "R$ 148,30",
      dueIn: "vence amanhã",
      status: "urgente"
    },
    {
      title: "Internet residencial",
      amount: "R$ 99,90",
      dueIn: "vence em 3 dias",
      status: "atenção"
    },
    {
      title: "Mensalidade Restart",
      amount: "R$ 29,90",
      dueIn: "vence em 7 dias",
      status: "monitorar"
    }
  ]
};

export const educationCards = [
  {
    title: "O que é rating financeiro?",
    icon: "bar-chart-2" as IconName,
    progress: 80,
    time: "3 min",
    text: "Entenda como bancos avaliam confiança financeira.",
    cta: "Marcar como concluído"
  },
  {
    title: "Como melhorar sua relação com o banco?",
    icon: "briefcase" as IconName,
    progress: 45,
    time: "4 min",
    text: "Pequenos hábitos mostram estabilidade.",
    cta: "Marcar como concluído"
  },
  {
    title: "Por que pagar em dia importa?",
    icon: "clock" as IconName,
    progress: 25,
    time: "2 min",
    text: "Recorrência e pontualidade fortalecem seu perfil.",
    cta: "Marcar como concluído"
  },
  {
    title: "O que é Open Finance?",
    icon: "shield" as IconName,
    progress: 10,
    time: "3 min",
    text: "Você escolhe quais dados compartilhar e pode cancelar.",
    cta: "Marcar como concluído"
  }
];

export const evolution = {
  months: [
    { label: "Jan", value: 38 },
    { label: "Fev", value: 44 },
    { label: "Mar", value: 53 },
    { label: "Abr", value: 61 },
    { label: "Mai", value: 68 }
  ],
  indicators: [
    { label: "Pagamentos em dia", value: "3", icon: "check-circle" as IconName },
    { label: "Missões concluídas", value: "2", icon: "target" as IconName },
    { label: "Meses ativos", value: "5", icon: "calendar" as IconName },
    { label: "Contas conectadas", value: "1", icon: "link" as IconName }
  ],
  message: "Sua evolução fica visível para o banco parceiro"
};

export const bankConnection = {
  title: "Conecte sua conta com segurança",
  text: "Você autoriza quais dados deseja compartilhar. Pode cancelar quando quiser.",
  bank: "Banco do Brasil",
  seal: "Segurança LGPD",
  privacy: "Seus dados são usados apenas para acompanhar sua evolução no Restart.",
  consentTitle: "Solicitação de consentimento",
  connectedLabel: "Conta conectada",
  revokeLabel: "Revogar consentimento",
  pendingLabel: "Consentimento pendente",
  dataPoints: [
    "Histórico de pagamentos e recorrências",
    "Dados necessários para evolução do RA",
    "Uso limitado ao acompanhamento da jornada"
  ]
};

export const openFinanceManagement = {
  title: "Gestão Open Finance",
  connectLabel: "Conectar conta",
  benefitsTitle: "Quais os benefícios?",
  benefits: [
    {
      title: "Melhore sua oferta de empréstimo",
      text: "Tenha mais chances de conseguir um valor maior ou juros menores.",
      icon: "trending-up" as IconName
    },
    {
      title: "Ganhe tempo com suas finanças",
      text: "Visualize saldo, cartão e pagamentos de outros bancos em um só lugar.",
      icon: "clock" as IconName
    }
  ],
  sectionsTitle: "Gerenciar conexões",
  items: [
    {
      title: "Dados enviados e recebidos",
      subtitle: "Saldo, limite, histórico e contas compartilhadas pelo banco conectado.",
      icon: "inbox" as IconName
    },
    {
      title: "Bancos autorizados para movimentar saldo",
      subtitle: "Gerencie consentimentos ativos e permissões por instituição.",
      icon: "link" as IconName
    }
  ]
};
