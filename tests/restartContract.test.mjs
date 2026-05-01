import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const rootLayoutSource = readFileSync(new URL("../src/app/_layout.tsx", import.meta.url), "utf8");
const indexRouteSource = readFileSync(new URL("../src/app/index.tsx", import.meta.url), "utf8");
const tabsLayoutSource = readFileSync(new URL("../src/app/(tabs)/_layout.tsx", import.meta.url), "utf8");
const homeRouteSource = readFileSync(new URL("../src/app/(tabs)/home.tsx", import.meta.url), "utf8");
const authSigninRouteSource = readFileSync(new URL("../src/app/signin.tsx", import.meta.url), "utf8");
const authRecoveryRouteSource = readFileSync(new URL("../src/app/recovery.tsx", import.meta.url), "utf8");
const routeDependenciesSource = readFileSync(new URL("../src/app/useRouteDependencies.tsx", import.meta.url), "utf8");
const appDependenciesSource = readFileSync(new URL("../src/app/createAppDependencies.tsx", import.meta.url), "utf8");
const appRootSource = readFileSync(new URL("../src/app/AppRoot.tsx", import.meta.url), "utf8");
const appPresentationSource = readFileSync(new URL("../src/app/appPresentation.tsx", import.meta.url), "utf8");
const appIntroScreensSource = readFileSync(new URL("../src/app/appIntroScreens.tsx", import.meta.url), "utf8");
const appStylesSource = readFileSync(new URL("../src/app/appStyles.ts", import.meta.url), "utf8");
const bottomNavigationSource = readFileSync(new URL("../src/components/navigation/BottomNavigation.tsx", import.meta.url), "utf8");
const screenTransitionSource = readFileSync(new URL("../src/components/layout/ScreenTransition.tsx", import.meta.url), "utf8");
const homeScreenSource = readFileSync(new URL("../src/screens/HomeScreen.tsx", import.meta.url), "utf8");
const openFinanceManagementSource = readFileSync(new URL("../src/screens/OpenFinanceManagementScreen.tsx", import.meta.url), "utf8");
const contentSource = readFileSync(new URL("../src/restartContent.ts", import.meta.url), "utf8");
const themeSource = readFileSync(new URL("../src/theme/theme.ts", import.meta.url), "utf8");

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

test("implements native Expo Router navigation and native UI components", () => {
  const nativeImplementationSource = [
    rootLayoutSource,
    indexRouteSource,
    tabsLayoutSource,
    homeRouteSource,
    authSigninRouteSource,
    authRecoveryRouteSource,
    routeDependenciesSource,
    appDependenciesSource,
    appPresentationSource,
    bottomNavigationSource,
    openFinanceManagementSource
  ].join("\n");

  const requiredImplementation = [
    "Stack",
    "Tabs",
    "useRouter",
    "Redirect",
    "CircularProgress",
    "ProgressBar",
    "MissionTimeline",
    "SimpleChart",
    "BottomNavigation",
    "RecoveryScreen",
    "\"signin\"",
    "\"recovery\""
  ];

  for (const token of requiredImplementation) {
    assert.match(nativeImplementationSource, new RegExp(token));
  }

  assert.doesNotMatch(nativeImplementationSource, /stitchScreens/);
});

test("adds animations, gamification polish and dark mode support", () => {
  const nativeImplementationSource = [
    rootLayoutSource,
    routeDependenciesSource,
    appDependenciesSource,
    appRootSource,
    appPresentationSource,
    appIntroScreensSource,
    appStylesSource,
    screenTransitionSource,
    homeScreenSource,
    themeSource
  ].join("\n");

  const requiredAppTokens = [
    "Animated",
    "ScreenTransition",
    "useAnimatedEntrance",
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
    assert.match(nativeImplementationSource, new RegExp(token));
  }

  const requiredContentTokens = ["Conquista", "Sequência", "XP", "Nível", "Modo escuro"];
  for (const token of requiredContentTokens) {
    assert.match(contentSource, new RegExp(token));
  }
});
