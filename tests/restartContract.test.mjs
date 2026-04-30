import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
const contentSource = readFileSync(new URL("../src/restartContent.ts", import.meta.url), "utf8");

test("defines the requested Restart mobile screens and bottom navigation", () => {
  const requiredScreens = [
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

  for (const screen of requiredScreens) {
    assert.match(contentSource, new RegExp(screen));
  }

  const bottomItems = ["Início", "Jornada", "Pagamentos", "Educação", "Perfil"];
  for (const item of bottomItems) {
    assert.match(contentSource, new RegExp(item));
  }
});

test("contains product copy, missions, payment options and education cards", () => {
  const requiredCopy = [
    "Sua nova jornada financeira começa aqui",
    "Reconstrua sua confiança financeira",
    "Conecte sua vida financeira",
    "Complete missões e evolua",
    "RA Restart",
    "Em evolução",
    "Open Finance",
    "LGPD",
    "Pix",
    "boleto",
    "débito",
    "O que é rating financeiro?",
    "Como melhorar sua relação com o banco?",
    "Por que pagar em dia importa?",
    "O que é Open Finance?",
    "Validar por e-mail ou telefone",
    "Aceito os Termos de Uso",
    "Aceito a Política de Privacidade",
    "Solicitação de consentimento",
    "Revogar consentimento",
    "Conta conectada",
    "Marcar como concluído",
    "Recuperar senha"
  ];

  for (const text of requiredCopy) {
    assert.match(contentSource, new RegExp(text));
  }

  const missions = [
    "Conectar sua conta bancária",
    "Pagar sua mensalidade em dia",
    "Pagar uma conta recorrente",
    "Manter movimentação por 30 dias",
    "Ler uma dica de educação financeira"
  ];

  for (const mission of missions) {
    assert.match(contentSource, new RegExp(mission));
  }

  for (const status of ["concluída", "em andamento", "bloqueada"]) {
    assert.match(contentSource, new RegExp(status));
  }
});

test("implements native Expo UI components instead of Stitch screenshot viewer", () => {
  const requiredImplementation = [
    "CircularProgress",
    "ProgressBar",
    "MissionTimeline",
    "SimpleChart",
    "BottomNavigation",
    "renderActiveScreen",
    "Restart",
    "RecoveryScreen",
    "\"signin\"",
    "\"recovery\""
  ];

  for (const token of requiredImplementation) {
    assert.match(appSource, new RegExp(token));
  }

  assert.doesNotMatch(appSource, /stitchScreens/);
});

test("adds animations, gamification polish and dark mode support", () => {
  const requiredAppTokens = [
    "Animated",
    "ScreenTransition",
    "useAnimatedEntrance",
    "AnimatedProgressBar",
    "LinearGradient",
    "logoAsset",
    "Animated.Image",
    "FloatingPreviewStack",
    "ThemeToggle",
    "themeMode",
    "darkTheme",
    "lightTheme",
    "Conquista",
    "Sequência"
  ];

  for (const token of requiredAppTokens) {
    assert.match(appSource, new RegExp(token));
  }

  const requiredContentTokens = ["Conquista", "Sequência", "XP", "Nível", "Modo escuro"];
  for (const token of requiredContentTokens) {
    assert.match(contentSource, new RegExp(token));
  }
});
