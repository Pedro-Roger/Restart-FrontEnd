import { SpaceGrotesk_400Regular } from "@expo-google-fonts/space-grotesk/400Regular";
import { SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk/700Bold";
import { useFonts } from "@expo-google-fonts/space-grotesk/useFonts";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle
} from "react-native";
import {
  authContent,
  bankConnection,
  bottomTabs,
  dashboard,
  educationCards,
  evolution,
  gamification,
  missions,
  onboarding,
  openFinanceBanks,
  openFinanceManagement,
  openFinanceSnapshot,
  payments,
  splash,
  user,
  type IconName,
  type MissionStatus
} from "./src/restartContent";

type Flow = "onboarding" | "login" | "signin" | "recovery" | "signup" | "bank" | "app";
type TabKey = (typeof bottomTabs)[number]["key"];
type AppView = "tabs" | "openFinance";
type ThemeMode = "light" | "dark";
const logoAsset = require("./assets/logo.png");
const profilePhotoAsset = require("./assets/exemplo.png");

const fontFamily = {
  body: "SpaceGrotesk_400Regular",
  heading: "SpaceGrotesk_700Bold"
} as const;

const lightTheme = {
  navy: "#111B3D",
  navySoft: "#6554D9",
  green: "#29D6A2",
  greenSoft: "#EAF8F4",
  purple: "#6D5BE8",
  purpleSoft: "#EFEAFF",
  gold: "#DDAA34",
  bg: "#F4F7FB",
  card: "#FFFFFF",
  text: "#202A38",
  muted: "#687386",
  line: "#E3E8F0",
  danger: "#D95B5B",
  elevated: "#FFFFFF",
  tab: "#FFFFFF"
};

const darkTheme = {
  navy: "#07111F",
  navySoft: "#7668F4",
  green: "#35D987",
  greenSoft: "#123B2A",
  purple: "#7567F2",
  purpleSoft: "#1D1B3C",
  gold: "#F2C15B",
  bg: "#09111E",
  card: "#101B2D",
  text: "#FFFFFF",
  muted: "#D7DEE8",
  line: "#24324A",
  danger: "#FF7E7E",
  elevated: "#132033",
  tab: "#0F1A2B"
};

const colors = lightTheme;
const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: "light" as ThemeMode,
  toggleTheme: (): void => undefined
});

export default function App() {
  const [fontsLoaded] = useFonts({
    [fontFamily.body]: SpaceGrotesk_400Regular,
    [fontFamily.heading]: SpaceGrotesk_700Bold
  });
  const [flow, setFlow] = useState<Flow>("login");
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [appView, setAppView] = useState<AppView>("tabs");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [consentActive, setConsentActive] = useState(true);
  const [completedEducation, setCompletedEducation] = useState<number[]>([0]);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  function toggleTheme() {
    setThemeMode((current) => (current === "light" ? "dark" : "light"));
  }

  function completeAccess() {
    setFlow("app");
    setActiveTab("home");
    setAppView("tabs");
  }

  function toggleEducationCompletion(index: number) {
    setCompletedEducation((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  }

  function nextOnboarding() {
    if (onboardingIndex < onboarding.length - 1) {
      setOnboardingIndex(onboardingIndex + 1);
      return;
    }
    setFlow("login");
  }

  function renderActiveScreen() {
    if (flow === "onboarding") {
      return (
        <OnboardingScreen
          index={onboardingIndex}
          onNext={nextOnboarding}
          onSkip={() => setFlow("login")}
        />
      );
    }
    if (flow === "login") {
      return <LoginScreen onCreate={() => setFlow("signup")} onEnter={() => setFlow("signin")} />;
    }
    if (flow === "signin") {
      return (
        <SigninScreen
          onBack={() => setFlow("login")}
          onCreate={() => setFlow("signup")}
          onEnter={() => setFlow("bank")}
          onRecovery={() => setFlow("recovery")}
        />
      );
    }
    if (flow === "recovery") {
      return <RecoveryScreen onBack={() => setFlow("signin")} onContinue={() => setFlow("signin")} />;
    }
    if (flow === "signup") {
      return <SignupScreen onBack={() => setFlow("login")} onCreate={() => setFlow("bank")} />;
    }
    if (flow === "bank") {
      return (
        <BankConnectionScreen
          consentActive={consentActive}
          onToggleConsent={() => setConsentActive((current) => !current)}
          onConnect={completeAccess}
        />
      );
    }

    return (
      <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
        {appView === "tabs" && activeTab === "home" && (
          <HomeScreen
            consentActive={consentActive}
            onJourney={() => setActiveTab("journey")}
            onOpenFinance={() => setAppView("openFinance")}
          />
        )}
        {appView === "tabs" && activeTab === "journey" && <JourneyScreen />}
        {appView === "tabs" && activeTab === "payments" && <PaymentsScreen />}
        {appView === "tabs" && activeTab === "education" && (
          <EducationScreen completedEducation={completedEducation} onToggleComplete={toggleEducationCompletion} />
        )}
        {appView === "tabs" && activeTab === "profile" && (
          <ProfileScreen
            consentActive={consentActive}
            onToggleConsent={() => setConsentActive((current) => !current)}
            onLogout={() => setFlow("login")}
          />
        )}
        {appView === "openFinance" && <OpenFinanceManagementScreen onBack={() => setAppView("tabs")} />}
      </AppShell>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
        <StatusBar style={themeMode === "dark" || flow === "login" ? "light" : "dark"} />
        <ScreenTransition transitionKey={`${flow}-${activeTab}-${onboardingIndex}-${themeMode}`}>
          {renderActiveScreen()}
        </ScreenTransition>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

function SplashScreen({ onStart }: { onStart: () => void }) {
  const { theme } = useContext(ThemeContext);
  const pulse = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslate = useRef(new Animated.Value(26)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(logoTranslate, {
        toValue: 0,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [logoOpacity, logoTranslate, pulse]);

  return (
    <LinearGradient colors={[theme.purple, theme.navySoft, theme.navy]} style={styles.splash}>
      <View style={styles.splashBlobOne} />
      <View style={styles.splashBlobTwo} />
      <Animated.Image
        source={logoAsset}
        resizeMode="contain"
        style={[
          styles.splashLogoImage,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslate }, { scale: pulse }]
          }
        ]}
      />
      <Text style={styles.splashText}>{splash.phrase}</Text>
      <FloatingPreviewStack />
      <PrimaryButton label="Começar" onPress={onStart} />
    </LinearGradient>
  );
}

function OnboardingScreen({
  index,
  onNext,
  onSkip
}: {
  index: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const item = onboarding[index];
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.authScreen, { backgroundColor: theme.bg }]}>
      <Pressable onPress={onSkip} style={styles.skipButton}>
        <Text style={[styles.skipText, { color: theme.muted }]}>Pular</Text>
      </Pressable>
      <Illustration icon={item.icon} step={index + 1} />
      <Text style={[styles.authTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.authText, { color: theme.muted }]}>{item.text}</Text>
      <Dots total={onboarding.length} active={index} />
      <PrimaryButton label={index === onboarding.length - 1 ? "Entrar no Restart" : "Continuar"} onPress={onNext} />
    </View>
  );
}

function LoginScreen({ onCreate, onEnter }: { onCreate: () => void; onEnter: () => void }) {
  return (
    <ImageBackground source={require("./assets/exemplo.png")} resizeMode="cover" style={styles.loginHero}>
      <LinearGradient
        colors={["rgba(7, 19, 15, 0.08)", "rgba(7, 19, 15, 0.38)", "rgba(7, 19, 15, 0.92)"]}
        locations={[0, 0.42, 1]}
        style={styles.loginOverlay}
      >
        <SafeAreaView style={styles.loginSafeArea}>
          <View style={styles.loginContent}>
            <View style={styles.loginCopy}>
              <Text style={styles.loginEyebrow}>Restart</Text>
              <Text style={styles.loginHeadline}>Alcance os objetivos que você merece</Text>
              <Text style={styles.loginSubheadline}>
                Construa sua evolução financeira com uma jornada simples, clara e feita para o seu momento.
              </Text>
            </View>
            <View style={styles.loginActions}>
              <Pressable onPress={onCreate} style={styles.loginPrimaryButton}>
                <Text style={styles.loginPrimaryButtonText}>Começar</Text>
              </Pressable>
              <Pressable onPress={onEnter} style={styles.loginSecondaryAction}>
                <Text style={styles.loginSecondaryActionText}>Logar</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

function SigninScreen({
  onBack,
  onCreate,
  onEnter,
  onRecovery
}: {
  onBack: () => void;
  onCreate: () => void;
  onEnter: () => void;
  onRecovery: () => void;
}) {
  return (
    <ScrollView style={styles.authFlowScreen} contentContainerStyle={styles.authFlowContent}>
      <AuthTopPanel />
      <View style={styles.authCardShell}>
        <Text style={styles.authPanelTitle}>Entrar na sua conta</Text>
        <SocialAuthRow />
        <AuthDivider />
        <AuthField label="E-mail" placeholder="Digite seu endereço" />
        <AuthField label="Senha" placeholder="Digite sua senha" secure />
        <Pressable onPress={onRecovery} style={styles.authInlineLinkWrap}>
          <Text style={styles.authInlineLink}>Esqueceu a senha?</Text>
        </Pressable>
        <Pressable onPress={onEnter} style={styles.authPrimaryCta}>
          <Text style={styles.authPrimaryCtaText}>Entrar</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.authSecondaryCta}>
          <Text style={styles.authSecondaryCtaText}>Voltar</Text>
        </Pressable>
        <Pressable onPress={onCreate} style={styles.authFooterRow}>
          <Text style={styles.authFooterText}>Ainda não tem conta?</Text>
          <Text style={styles.authFooterLink}> Criar conta</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function RecoveryScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <ScrollView style={styles.authOtpScreen} contentContainerStyle={styles.authOtpContent}>
      <Pressable onPress={onBack} style={styles.authBackButton}>
        <Feather name="chevron-left" size={18} color="#64748B" />
      </Pressable>
      <Text style={styles.authOtpTitle}>Inserir código</Text>
      <Text style={styles.authOtpText}>
        Enviamos um código de acesso para{" "}
        <Text style={styles.authOtpTextStrong}>mariana@email.com</Text>
      </Text>
      <View style={styles.authOtpDots}>
        {["7", "5", "9", ""].map((item, index) => (
          <View key={`${item}-${index}`} style={styles.authOtpDot}>
            <Text style={styles.authOtpDotText}>{item}</Text>
          </View>
        ))}
      </View>
      <Pressable onPress={onContinue} style={styles.authPrimaryCta}>
        <Text style={styles.authPrimaryCtaText}>Continuar</Text>
      </Pressable>
      <View style={styles.authFooterRow}>
        <Text style={styles.authFooterText}>Não recebeu?</Text>
        <Text style={styles.authFooterLink}> Reenviar código</Text>
      </View>
    </ScrollView>
  );
}

function SignupScreen({ onBack, onCreate }: { onBack: () => void; onCreate: () => void }) {
  return (
    <ScrollView style={styles.authFlowScreen} contentContainerStyle={styles.authFlowContent}>
      <AuthTopPanel />
      <View style={styles.authCardShell}>
        <Text style={styles.authPanelTitle}>Criar sua conta</Text>
        <SocialAuthRow />
        <AuthDivider />
        <AuthField label="Nome" placeholder="Seu nome" />
        <AuthField label="E-mail" placeholder="Digite seu endereço" />
        <AuthField label="Senha" placeholder="Digite sua senha" secure />
        <View style={styles.authTermsRow}>
          <View style={styles.authTermsCheck}>
            <Feather name="check" size={12} color="#FFFFFF" />
          </View>
          <Text style={styles.authTermsText}>Concordo com os Termos de Uso e Política de Privacidade</Text>
        </View>
        <Pressable onPress={onCreate} style={styles.authPrimaryCta}>
          <Text style={styles.authPrimaryCtaText}>Criar conta</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.authSecondaryCta}>
          <Text style={styles.authSecondaryCtaText}>Voltar para login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function BankConnectionScreen({
  consentActive,
  onToggleConsent,
  onConnect
}: {
  consentActive: boolean;
  onToggleConsent: () => void;
  onConnect: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.bg }]} contentContainerStyle={styles.formScreen}>
      <BrandHeader subtitle="Open Finance com transparência" centered />
      <Text style={[styles.pageTitle, { color: theme.text }]}>{bankConnection.title}</Text>
      <Text style={[styles.pageText, { color: theme.muted }]}>{bankConnection.text}</Text>
      <Card accent>
        <Text style={styles.cardTitle}>{bankConnection.consentTitle}</Text>
        {bankConnection.dataPoints.map((item) => (
          <SectionRow key={item} icon="check-circle" title={item} subtitle="Compartilhamento autorizado por você" />
        ))}
      </Card>
      <Card>
        <View style={styles.bankHeader}>
          <View style={styles.bankIcon}>
            <Feather name="briefcase" size={24} color={colors.navy} />
          </View>
          <View>
            <Text style={styles.cardTitle}>{bankConnection.bank}</Text>
            <Text style={styles.cardHint}>Banco parceiro Restart</Text>
          </View>
        </View>
      </Card>
      <InfoStrip
        icon={consentActive ? "check-circle" : "alert-circle"}
        text={consentActive ? bankConnection.connectedLabel : bankConnection.pendingLabel}
      />
      <Text style={styles.privacyText}>{bankConnection.privacy}</Text>
      <PrimaryButton label="Conectar via Open Finance" onPress={onConnect} />
      <SecondaryButton label={bankConnection.revokeLabel} onPress={onToggleConsent} />
    </ScrollView>
  );
}

function AppShell({
  children,
  activeTab,
  onTabChange
}: {
  children: React.ReactNode;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.appShell, { backgroundColor: theme.bg }]}>
      <ScrollView style={[styles.scroll, { backgroundColor: theme.bg }]} contentContainerStyle={styles.appContent}>
        {children}
      </ScrollView>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </View>
  );
}

function HomeScreen({
  consentActive,
  onJourney,
  onOpenFinance
}: {
  consentActive: boolean;
  onJourney: () => void;
  onOpenFinance: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const [selectedBankId, setSelectedBankId] = useState(openFinanceBanks[0].id);
  const selectedBank = openFinanceBanks.find((bank) => bank.id === selectedBankId) ?? openFinanceBanks[0];
  return (
    <View>
      <Header title={`Olá, ${user.name}`} subtitle={`Dados sincronizados do ${selectedBank.name}`} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bankSwitcherRow}
        style={styles.bankSwitcherScroll}
      >
        {openFinanceBanks.map((bank) => {
          const active = bank.id === selectedBankId && bank.id !== "add";
          return (
            <Pressable
              key={bank.id}
              onPress={() => {
                if (bank.id !== "add") {
                  setSelectedBankId(bank.id);
                }
                onOpenFinance();
              }}
              style={[
                styles.bankChip,
                {
                  backgroundColor: active ? theme.card : theme.greenSoft,
                  borderColor: active ? theme.gold : "transparent"
                }
              ]}
            >
              <View style={[styles.bankChipBadge, { backgroundColor: active ? theme.gold : theme.navySoft }]}>
                <Text style={styles.bankChipBadgeText}>{bank.shortName}</Text>
              </View>
              <Text style={[styles.bankChipText, { color: theme.text }]}>{bank.id === "add" ? "+" : bank.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <LinearGradient
        colors={[theme.gold, "#F6E27A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroFinanceCard}
      >
        <View style={[styles.heroWave, styles.heroWarmWave]} />
        <View style={styles.accountHeroHeader}>
          <View>
            <Text style={styles.accountEyebrow}>Conta</Text>
            <Text style={styles.cardTitle}>{selectedBank.name}</Text>
          </View>
          <Feather name="chevron-right" size={22} color={theme.navy} />
        </View>
        <Text style={styles.accountBalanceLabel}>Saldo em conta</Text>
        <Text style={styles.accountBalanceValue}>{selectedBank.balance}</Text>
        <Text style={styles.accountConnectionText}>{selectedBank.accountLabel}</Text>
        <View style={styles.accountMetricsRow}>
          <View style={styles.accountMetricPill}>
            <Text style={styles.accountMetricLabel}>Crédito disponível</Text>
            <Text style={styles.accountMetricValue}>{selectedBank.availableCredit}</Text>
          </View>
          <View style={styles.accountMetricPill}>
            <Text style={styles.accountMetricLabel}>Limite do cartão</Text>
            <Text style={styles.accountMetricValue}>{selectedBank.creditCardLimit}</Text>
          </View>
        </View>
        <Pressable onPress={onOpenFinance} style={styles.accountPrimaryAction}>
          <Text style={styles.accountPrimaryActionText}>Ver dados de outro banco</Text>
        </Pressable>
      </LinearGradient>
      <Card accent>
        <View style={styles.relationshipScoreHeader}>
          <View>
            <Text style={styles.cardTitle}>Score de relacionamento</Text>
            <Text style={styles.cardHint}>{selectedBank.name}</Text>
          </View>
          <Text style={styles.relationshipScoreValue}>{selectedBank.relationshipScore}</Text>
        </View>
        <ProgressBar value={selectedBank.relationshipScore} />
        <Text style={styles.relationshipScoreText}>{selectedBank.relationshipLabel}</Text>
      </Card>
      <Card>
        <SectionRow icon="briefcase" title={selectedBank.accountType} subtitle={selectedBank.lastSync} />
        {selectedBank.products.map((product) => (
          <SectionRow key={product} icon="check-circle" title={product} subtitle="Produto importado com seu consentimento" />
        ))}
      </Card>
      <Card accent>
        <View style={styles.progressHeader}>
          <Text style={styles.cardTitle}>Radar de contas a pagar</Text>
          <Badge label={`${payments.radar.length} alertas`} tone="warning" />
        </View>
        {payments.radar.slice(0, 3).map((item) => (
          <PaymentRadarRow
            key={item.title}
            title={item.title}
            subtitle={item.dueIn}
            amount={item.amount}
            status={item.status as PaymentRadarStatus}
          />
        ))}
      </Card>
      <Card>
        <SectionRow icon="target" title="Próxima missão" subtitle={dashboard.nextMission} />
        <PrimaryButton label="Ver jornada" onPress={onJourney} compact />
      </Card>
      <Card>
        <SectionRow icon="bar-chart-2" title={dashboard.ratingCardTitle} subtitle={dashboard.guidance} />
        <Pressable onPress={onOpenFinance}>
          <SectionRow
            icon={consentActive ? "shield" : "alert-triangle"}
            title="Open Finance"
            subtitle={consentActive ? bankConnection.connectedLabel : bankConnection.pendingLabel}
          />
        </Pressable>
      </Card>
      <View style={styles.grid}>
        <MiniCard title="RA Restart" value={`${user.rating}`} icon="activity" />
        <MiniCard title="Limite usado" value={selectedBank.usedLimit} icon="credit-card" />
      </View>
      <Card accent>
        <SectionRow icon="star" title="Conquista" subtitle={gamification.achievement} />
        <SectionRow icon="activity" title="Sequência" subtitle={gamification.streak} />
        <Text style={styles.rewardText}>{gamification.nextReward}</Text>
      </Card>
      <View style={styles.grid}>
        <MiniCard title="Último pagamento" value={dashboard.lastPayment} icon="check-circle" />
        <MiniCard title="Banco parceiro" value={user.bank} icon="briefcase" />
      </View>
      <Card>
        <SectionRow icon="book-open" title="Dicas para evoluir" subtitle={dashboard.tip} />
      </Card>
    </View>
  );
}

function JourneyScreen() {
  const { theme } = useContext(ThemeContext);
  const completed = missions.filter((mission) => mission.status === "concluída").length;
  return (
    <View>
      <Header title="Jornada Financeira" subtitle="Complete missões e avance passo a passo" />
      <Card>
        <View style={styles.progressHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Progresso geral</Text>
          <Text style={styles.progressValue}>{completed}/{missions.length}</Text>
        </View>
        <ProgressBar value={(completed / missions.length) * 100} />
      </Card>
      <MissionTimeline />
    </View>
  );
}

function PaymentsScreen() {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      <Header title="Pagamentos" subtitle="Radar do CPF para evitar atrasos e esquecer vencimentos" />
      <Card accent>
        <View style={styles.paymentTop}>
          <View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Mensalidade Restart</Text>
            <Text style={[styles.bigValue, { color: theme.text }]}>{payments.monthlyFee}</Text>
          </View>
          <View style={styles.paymentSuccessBadge}>
            <Feather name="check-circle" size={16} color="#16A34A" />
            <Text style={styles.paymentSuccessBadgeText}>paga</Text>
          </View>
        </View>
        <View style={styles.paymentSuccessRow}>
          <View style={styles.paymentSuccessIconWrap}>
            <Feather name="check" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.paymentSuccessText}>Mensalidade paga com sucesso</Text>
        </View>
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Pagar com</Text>
        <View style={styles.paymentMethodBar}>
          <PaymentMethodAction icon="file-text" label="Boleto" />
          <PaymentMethodAction icon="zap" label="PIX" />
          <PaymentMethodAction icon="maximize" label="QR Code" />
        </View>
      </Card>
      <Card>
        <View style={styles.paymentRadarHeader}>
          <View style={styles.paymentRadarCopy}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Radar de contas a pagar</Text>
            <Text style={[styles.paymentRadarUpdated, { color: theme.green }]}>{openFinanceSnapshot.lastSync}</Text>
          </View>
          <Feather name="refresh-cw" size={18} color={theme.green} />
        </View>
        {payments.radar.map((item) => (
          <PaymentRadarRow
            key={item.title}
            title={item.title}
            subtitle={item.dueIn}
            amount={item.amount}
            status={item.status as PaymentRadarStatus}
          />
        ))}
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Histórico</Text>
        {payments.history.map((item) => (
          <View key={item.month} style={styles.historyRow}>
            <Text style={styles.historyMonth}>{item.month}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>
            <Badge label={item.status} tone="success" />
          </View>
        ))}
      </Card>
      <InfoStrip icon="trending-up" text={payments.message} />
    </View>
  );
}

function PaymentMethodAction({ icon, label }: { icon: IconName; label: string }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable style={[styles.paymentMethodAction, { backgroundColor: theme.elevated, borderColor: theme.line }]}>
      <View style={[styles.paymentMethodIcon, { backgroundColor: theme.greenSoft }]}>
        <Feather name={icon} size={18} color={theme.green} />
      </View>
      <Text style={[styles.paymentMethodText, { color: theme.text }]}>{label}</Text>
    </Pressable>
  );
}

function OpenFinanceManagementScreen({ onBack }: { onBack: () => void }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      <View style={[styles.openFinanceHero, { backgroundColor: theme.card }]}>
        <Pressable onPress={onBack} style={styles.openFinanceBack}>
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.openFinanceTitle, { color: theme.text }]}>{openFinanceManagement.title}</Text>
        <Pressable style={styles.openFinanceConnectButton}>
          <Feather name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.openFinanceConnectText}>{openFinanceManagement.connectLabel}</Text>
        </Pressable>
      </View>
      <Card accent>
        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 18 }]}>{openFinanceManagement.benefitsTitle}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.openFinanceBenefitsRow}>
          {openFinanceManagement.benefits.map((benefit) => (
            <View key={benefit.title} style={styles.openFinanceBenefitCard}>
              <Text style={styles.openFinanceBenefitTitle}>{benefit.title}</Text>
              <View style={styles.openFinanceBenefitIconWrap}>
                <Feather name={benefit.icon} size={42} color="#8EE6D4" />
              </View>
              <Text style={styles.openFinanceBenefitText}>{benefit.text}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 12 }]}>{openFinanceManagement.sectionsTitle}</Text>
        {openFinanceManagement.items.map((item) => (
          <View key={item.title} style={styles.openFinanceManageRow}>
            <View style={styles.openFinanceManageIcon}>
              <Feather name={item.icon} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.openFinanceManageCopy}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{item.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.muted} />
          </View>
        ))}
      </Card>
    </View>
  );
}

function EducationScreen({
  completedEducation,
  onToggleComplete
}: {
  completedEducation: number[];
  onToggleComplete: (index: number) => void;
}) {
  const { theme } = useContext(ThemeContext);
  const averageProgress = Math.round(
    educationCards.reduce((sum, card, index) => {
      const progress = completedEducation.includes(index) ? 100 : card.progress;
      return sum + progress;
    }, 0) / educationCards.length
  );
  return (
    <View>
      <Header title="Educação Financeira" subtitle="Conteúdos curtos, simples e úteis" />
      <Card>
        <View style={styles.progressHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Progresso de leitura</Text>
          <Text style={styles.progressValue}>{averageProgress}%</Text>
        </View>
        <ProgressBar value={averageProgress} />
      </Card>
      {educationCards.map((card, index) => (
        <Card key={card.title}>
          <View style={styles.educationHeader}>
            <Feather name="file-text" size={22} color={colors.green} />
            <Text style={[styles.timeText, { color: theme.muted }]}>{card.time}</Text>
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{card.title}</Text>
          <Text style={[styles.cardText, { color: theme.muted }]}>{card.text}</Text>
          <ProgressBar value={completedEducation.includes(index) ? 100 : card.progress} />
          <Pressable onPress={() => onToggleComplete(index)} style={styles.educationAction}>
            <Text style={styles.educationActionText}>
              {completedEducation.includes(index) ? "Concluído" : card.cta}
            </Text>
          </Pressable>
        </Card>
      ))}
    </View>
  );
}

function EvolutionScreen() {
  return (
    <View>
      <Header title="Evolução" subtitle="Seu avanço fica claro mês a mês" />
      <Card>
        <Text style={styles.cardTitle}>RA mensal</Text>
        <SimpleChart />
      </Card>
      <View style={styles.grid}>
        {evolution.indicators.map((indicator) => (
          <MiniCard key={indicator.label} title={indicator.label} value={indicator.value} icon="activity" />
        ))}
      </View>
      <InfoStrip icon="eye" text={evolution.message} />
    </View>
  );
}

function ProfileScreen({
  consentActive,
  onToggleConsent,
  onLogout
}: {
  consentActive: boolean;
  onToggleConsent: () => void;
  onLogout: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const options: Array<{ title: string; subtitle: string; icon: IconName }> = [
    { title: "Minha conta", subtitle: `${user.fullName} • ${user.cpf}`, icon: "user" },
    { title: "Central de segurança", subtitle: "Senha, acesso e proteção da conta", icon: "shield" },
    { title: "Meus serviços", subtitle: `${user.bank} e recursos ativos no Restart`, icon: "tool" },
    { title: "Privacidade", subtitle: consentActive ? "Consentimento Open Finance ativo" : "Consentimento revogado", icon: "lock" },
    { title: "Central de ajuda", subtitle: "Atendimento, dúvidas e suporte", icon: "help-circle" },
    { title: "Indique e ganhe", subtitle: "Convide amigos e acompanhe benefícios", icon: "user-plus" }
  ];

  return (
    <View>
      <View style={styles.profileHero}>
        <View style={styles.profileHeroTop}>
          <View style={styles.profileHeroPhotoWrap}>
            <Image source={profilePhotoAsset} resizeMode="cover" style={styles.profileHeroPhoto} />
          </View>
          <View style={styles.profileHeroCopy}>
            <Text style={[styles.profileHeroName, { color: theme.text }]}>{user.name}</Text>
            <Text style={[styles.profileHeroHandle, { color: theme.muted }]}>@pedro.nisashi</Text>
          </View>
        </View>
      </View>
      <Card>
        <Text style={[styles.profileSectionTitle, { color: theme.text }]}>Perfil e ajustes</Text>
        {options.map((item) => (
          <View key={item.title} style={[styles.profileMenuRow, { borderTopColor: theme.line }]}>
            <View style={styles.profileMenuIconWrap}>
              <Feather name={item.icon} size={22} color={theme.text} />
            </View>
            <View style={styles.profileMenuCopy}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{item.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.muted} />
          </View>
        ))}
      </Card>
      <Card>
        <View style={[styles.profileMenuRow, styles.profileActionRow, { borderTopColor: "transparent" }]}>
          <View style={styles.profileMenuIconWrap}>
            <Feather name="slash" size={22} color={theme.danger} />
          </View>
          <View style={styles.profileMenuCopy}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>{bankConnection.revokeLabel}</Text>
            <Text style={[styles.rowSubtitle, { color: theme.muted }]}>
              {consentActive ? "Desconecta o compartilhamento com os bancos autorizados" : "Consentimento já está desativado"}
            </Text>
          </View>
          <Pressable onPress={onToggleConsent}>
            <Feather name="chevron-right" size={22} color={theme.muted} />
          </Pressable>
        </View>
      </Card>
      <Card>
        <Pressable onPress={onLogout} style={[styles.profileMenuRow, styles.profileActionRow, { borderTopColor: "transparent" }]}>
          <View style={styles.profileMenuIconWrap}>
            <Feather name="log-out" size={22} color={theme.danger} />
          </View>
          <View style={styles.profileMenuCopy}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Sair do aplicativo</Text>
            <Text style={[styles.rowSubtitle, { color: theme.muted }]}>Encerrar sessão neste dispositivo</Text>
          </View>
          <Feather name="chevron-right" size={22} color={theme.muted} />
        </Pressable>
      </Card>
    </View>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerCopy}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.headerSubtitle, { color: theme.muted }]}>{subtitle}</Text>
        </View>
        <ThemeToggle />
      </View>
    </View>
  );
}

function BrandHeader({ subtitle, centered }: { subtitle: string; centered?: boolean }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.brandHeader}>
      <View style={[styles.brandTop, centered && styles.brandTopCentered]}>
        <View style={centered && styles.brandCopyCentered}>
          <Image source={logoAsset} resizeMode="contain" style={styles.brandLogoImage} />
          <Text style={[styles.brandSubtitle, { color: theme.muted }]}>{subtitle}</Text>
        </View>
        <View style={centered ? styles.brandToggleCentered : undefined}>
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}

function AuthTopPanel() {
  return (
    <View style={styles.authTopPanel}>
      <View style={styles.authTopGlowPrimary} />
      <View style={styles.authTopGlowSecondary} />
      <Image source={logoAsset} resizeMode="contain" style={styles.authTopLogo} />
    </View>
  );
}

function SocialAuthRow() {
  return (
    <View style={styles.authSocialRow}>
      <Pressable style={styles.authSocialButton}>
        <Feather name="facebook" size={16} color="#1877F2" />
        <Text style={styles.authSocialButtonText}>Facebook</Text>
      </Pressable>
      <Pressable style={styles.authSocialButton}>
        <Feather name="chrome" size={16} color="#EA4335" />
        <Text style={styles.authSocialButtonText}>Google</Text>
      </Pressable>
    </View>
  );
}

function AuthDivider() {
  return (
    <View style={styles.authDividerRow}>
      <View style={styles.authDividerLine} />
      <Text style={styles.authDividerText}>Ou</Text>
      <View style={styles.authDividerLine} />
    </View>
  );
}

function AuthField({
  label,
  placeholder,
  secure
}: {
  label: string;
  placeholder: string;
  secure?: boolean;
}) {
  return (
    <View style={styles.authFieldWrap}>
      <Text style={styles.authFieldLabel}>{label}</Text>
      <View style={styles.authFieldBox}>
        <TextInput placeholder={placeholder} placeholderTextColor="#9AA4B2" secureTextEntry={secure} style={styles.authFieldInput} />
        {secure ? <Feather name="eye-off" size={16} color="#94A3B8" /> : null}
      </View>
    </View>
  );
}

function Illustration({ icon, step }: { icon: IconName; step: number }) {
  const { theme } = useContext(ThemeContext);
  return (
    <LinearGradient
      colors={[theme.purple, theme.navySoft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.illustration, { borderColor: theme.line }]}
    >
      <View style={styles.illustrationWave} />
      <View style={[styles.stepBadge, { backgroundColor: theme.greenSoft }]}>
        <Text style={[styles.stepText, { color: theme.green }]}>0{step}</Text>
      </View>
      <Feather name={icon} size={70} color="#FFFFFF" />
      <View style={styles.fakeChart}>
        {[30, 48, 66, 84].map((height, index) => (
          <View key={height} style={[styles.fakeBar, { height, backgroundColor: index === 3 ? theme.gold : "#FFFFFF" }]} />
        ))}
      </View>
    </LinearGradient>
  );
}

function Input({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.inputWrap}>
      <Text style={[styles.inputLabel, { color: theme.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.muted}
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.line, color: theme.text }]}
        {...props}
      />
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  compact
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, { backgroundColor: theme.green }, compact && styles.compactButton]}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({
  label,
  onPress,
  danger
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={onPress} style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: danger ? "#F0CDCD" : theme.line }, danger && styles.dangerButton]}>
      <Text style={[styles.secondaryButtonText, { color: danger ? theme.danger : theme.navySoft }, danger && styles.dangerText]}>{label}</Text>
    </Pressable>
  );
}

function Card({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatedCard>
      <View style={[styles.card, { backgroundColor: accent ? theme.elevated : theme.card, borderColor: accent ? theme.greenSoft : theme.line }]}>
        {children}
      </View>
    </AnimatedCard>
  );
}

function CircularProgress({ value }: { value: number }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.circularOuter, { borderColor: theme.green, backgroundColor: theme.card }]}>
      <View style={styles.circularInner}>
        <Text style={[styles.circularValue, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.circularLabel, { color: theme.muted }]}>RA</Text>
      </View>
    </View>
  );
}

function ProgressBar({ value }: { value: number }) {
  return <AnimatedProgressBar value={value} />;
}

function AnimatedProgressBar({ value }: { value: number }) {
  const { theme } = useContext(ThemeContext);
  const progress = useRef(new Animated.Value(0)).current;
  const width = `${Math.max(6, Math.min(value, 100))}%` as `${number}%`;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 720,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [progress, value]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["6%", width]
  });

  return (
    <View style={[styles.progressTrack, { backgroundColor: themeModeTrack(theme) }]}>
      <Animated.View style={[styles.progressFill, { width: animatedWidth, backgroundColor: theme.green }]} />
    </View>
  );
}

function MissionTimeline() {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      {missions.map((mission, index) => (
        <Card key={mission.title}>
          <View style={styles.missionRow}>
            <View style={styles.timelineRail}>
              <View style={[styles.timelineDot, statusDotStyle(mission.status)]}>
                <Feather name={statusIcon(mission.status)} size={14} color="#FFFFFF" />
              </View>
              {index < missions.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.missionBody}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{mission.title}</Text>
              <Text style={[styles.cardText, { color: theme.muted }]}>{mission.description}</Text>
              <Badge label={mission.status} tone={mission.status === "concluída" ? "success" : mission.status === "em andamento" ? "progress" : "locked"} />
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}

function SimpleChart() {
  const { theme } = useContext(ThemeContext);
  const max = useMemo(() => Math.max(...evolution.months.map((month) => month.value)), []);
  return (
    <View style={styles.chart}>
      {evolution.months.map((month) => (
        <View key={month.label} style={styles.chartColumn}>
          <View style={[styles.chartBarWrap, { backgroundColor: theme.greenSoft }]}>
            <View style={[styles.chartBar, { height: `${(month.value / max) * 100}%`, backgroundColor: theme.green }]} />
          </View>
          <Text style={[styles.chartValue, { color: theme.text }]}>{month.value}</Text>
          <Text style={[styles.chartLabel, { color: theme.muted }]}>{month.label}</Text>
        </View>
      ))}
    </View>
  );
}

function BottomNavigation({
  activeTab,
  onTabChange
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.bottomNavigation, { backgroundColor: theme.tab, borderColor: theme.line }]}>
      {bottomTabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable key={tab.key} onPress={() => onTabChange(tab.key)} style={styles.tabButton}>
            <Feather name={tab.icon} size={21} color={active ? theme.green : theme.muted} />
            <Text style={[styles.tabLabel, { color: active ? theme.green : theme.muted }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Badge({ label, tone }: { label: string; tone: "success" | "progress" | "warning" | "locked" }) {
  return <Text style={[styles.badge, badgeStyle(tone)]}>{label}</Text>;
}

type PaymentRadarStatus = "urgente" | "atenção" | "monitorar";

function PaymentRadarRow({
  title,
  subtitle,
  amount,
  status
}: {
  title: string;
  subtitle: string;
  amount: string;
  status: PaymentRadarStatus;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.radarRow}>
      <View style={[styles.radarIcon, radarStatusStyle(status)]}>
        <Feather name={status === "urgente" ? "alert-circle" : status === "atenção" ? "clock" : "bell"} size={18} color="#FFFFFF" />
      </View>
      <View style={styles.radarCopy}>
        <Text style={[styles.rowTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.radarAmount, { color: theme.text }]}>{amount}</Text>
    </View>
  );
}

function MiniCard({ title, value, icon }: { title: string; value: string; icon: IconName }) {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatedCard style={styles.miniCard}>
      <Feather name={icon} size={21} color={theme.green} />
      <Text style={[styles.miniTitle, { color: theme.muted }]}>{title}</Text>
      <Text style={[styles.miniValue, { color: theme.text }]}>{value}</Text>
    </AnimatedCard>
  );
}

function SectionRow({ icon, title, subtitle }: { icon: IconName; title: string; subtitle: string }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.sectionRow}>
      <View style={[styles.rowIcon, { backgroundColor: theme.greenSoft }]}>
        <Feather name={icon} size={18} color={theme.green} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

function InfoStrip({ icon, text }: { icon: IconName; text: string }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.infoStrip, { backgroundColor: theme.gold === darkTheme.gold ? "#2D2817" : "#FFF6DA" }]}>
      <Feather name={icon} size={18} color={theme.gold} />
      <Text style={[styles.infoText, { color: theme.text }]}>{text}</Text>
    </View>
  );
}

function Dots({ total, active }: { total: number; active: number }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, index) => (
        <View key={index} style={[styles.dot, { backgroundColor: theme.line }, active === index && { ...styles.dotActive, backgroundColor: theme.green }]} />
      ))}
    </View>
  );
}

function ScreenTransition({
  children,
  transitionKey
}: {
  children: React.ReactNode;
  transitionKey: string;
}) {
  const animatedStyle = useAnimatedEntrance(transitionKey, 12);
  return <Animated.View style={[styles.screenTransition, animatedStyle]}>{children}</Animated.View>;
}

function useAnimatedEntrance(animationKey: string, distance = 8) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(distance);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [animationKey, distance, opacity, translateY]);

  return {
    opacity,
    transform: [{ translateY }]
  };
}

function AnimatedCard({
  children,
  style
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { theme } = useContext(ThemeContext);
  const animatedStyle = useAnimatedEntrance("card", 6);
  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: theme.card,
          borderColor: theme.line
        },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
}

function ThemeToggle() {
  const { theme, themeMode, toggleTheme } = useContext(ThemeContext);
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: themeMode === "dark" }}
      onPress={toggleTheme}
      style={[styles.themeToggle, { backgroundColor: theme.card, borderColor: theme.line }]}
    >
      <Feather name={themeMode === "dark" ? "moon" : "sun"} size={17} color={theme.green} />
    </Pressable>
  );
}

function FloatingPreviewStack() {
  const { theme } = useContext(ThemeContext);
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [float]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  return (
    <Animated.View style={[styles.previewStack, { transform: [{ translateY }] }]}>
      <View style={[styles.previewPhone, styles.previewPhoneLarge, { backgroundColor: theme.card }]}>
        <View style={[styles.previewLogoTile, { backgroundColor: theme.purpleSoft }]}>
          <Feather name="trending-up" size={26} color={theme.purple} />
        </View>
        <View style={[styles.previewButton, { backgroundColor: theme.purple }]} />
        <View style={[styles.previewLine, { backgroundColor: theme.line }]} />
      </View>
      <View style={[styles.previewPhone, styles.previewPhoneSmall, { backgroundColor: theme.card }]}>
        <View style={[styles.previewTinyBar, { backgroundColor: theme.green }]} />
        <View style={[styles.previewTinyBar, { backgroundColor: theme.purple }]} />
        <View style={[styles.previewTinyBar, { backgroundColor: theme.gold }]} />
      </View>
    </Animated.View>
  );
}

function themeModeTrack(theme: typeof lightTheme) {
  return theme.bg === darkTheme.bg ? "#1E2D42" : "#E8EDF4";
}

function statusIcon(status: MissionStatus): IconName {
  if (status === "concluída") return "check";
  if (status === "em andamento") return "clock";
  return "lock";
}

function statusDotStyle(status: MissionStatus) {
  if (status === "concluída") return { backgroundColor: colors.green };
  if (status === "em andamento") return { backgroundColor: colors.gold };
  return { backgroundColor: colors.muted };
}

function badgeStyle(tone: "success" | "progress" | "warning" | "locked") {
  const map = {
    success: { backgroundColor: colors.greenSoft, color: colors.green },
    progress: { backgroundColor: "#EAF0FF", color: colors.navySoft },
    warning: { backgroundColor: "#FFF6DA", color: colors.gold },
    locked: { backgroundColor: "#EEF1F5", color: colors.muted }
  };
  return map[tone];
}

function radarStatusStyle(status: PaymentRadarStatus) {
  if (status === "urgente") return { backgroundColor: "#E46A6A" };
  if (status === "atenção") return { backgroundColor: colors.gold };
  return { backgroundColor: colors.green };
}

const styles = StyleSheet.create({
  screenTransition: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  loginHero: { flex: 1, backgroundColor: "#07130F" },
  loginOverlay: { flex: 1 },
  loginSafeArea: { flex: 1, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 18 },
  loginHeader: { alignItems: "center" },
  loginLogo: { width: 220, height: 72 },
  loginContent: { flex: 1, justifyContent: "space-between", paddingTop: 20 },
  loginCopy: { marginTop: "auto", gap: 14 },
  loginEyebrow: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: fontFamily.heading,
    letterSpacing: 2.4,
    textTransform: "uppercase",
    opacity: 0.78
  },
  loginHeadline: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 44,
    fontFamily: fontFamily.heading,
    letterSpacing: -1.2,
    maxWidth: 320
  },
  loginSubheadline: {
    color: "rgba(255,255,255,0.82)",
    fontFamily: fontFamily.body,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320
  },
  loginActions: { gap: 16, paddingTop: 28, paddingBottom: 12 },
  loginPrimaryButton: {
    minHeight: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  loginPrimaryButtonText: { color: "#111B3D", fontSize: 17, fontFamily: fontFamily.heading },
  loginSecondaryAction: { alignItems: "center", justifyContent: "center", paddingVertical: 8 },
  loginSecondaryActionText: { color: "#FFFFFF", fontSize: 16, fontFamily: fontFamily.heading },
  splash: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
    backgroundColor: colors.navy,
    overflow: "hidden"
  },
  splashBlobOne: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(255,255,255,0.18)",
    top: -120,
    left: -80
  },
  splashBlobTwo: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "rgba(255,255,255,0.12)",
    bottom: -190,
    right: -160
  },
  splashLogoImage: {
    width: "82%",
    height: 96,
    alignSelf: "center",
    marginBottom: 14
  },
  logoMark: {
    width: 78,
    height: 78,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    marginBottom: 20
  },
  logo: { color: "#FFFFFF", fontSize: 42, fontWeight: "900" },
  splashText: { color: "#D9E4F5", fontSize: 19, lineHeight: 27, marginTop: 10, marginBottom: 34, fontFamily: fontFamily.body },
  authScreen: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: colors.bg },
  skipButton: { position: "absolute", right: 22, top: 54, padding: 10 },
  skipText: { color: colors.muted, fontFamily: fontFamily.heading },
  illustration: {
    minHeight: 250,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navySoft,
    marginBottom: 32,
    overflow: "hidden",
    borderWidth: 1
  },
  illustrationWave: {
    position: "absolute",
    width: 360,
    height: 160,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.20)",
    bottom: -84,
    left: -60,
    transform: [{ rotate: "-9deg" }]
  },
  stepBadge: {
    position: "absolute",
    top: 18,
    left: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.greenSoft
  },
  stepText: { color: colors.green, fontFamily: fontFamily.heading },
  fakeChart: { flexDirection: "row", alignItems: "flex-end", gap: 10, marginTop: 24, height: 92 },
  fakeBar: { width: 26, borderRadius: 8 },
  authTitle: { color: colors.text, fontSize: 30, lineHeight: 36, fontFamily: fontFamily.heading, marginBottom: 12 },
  authText: { color: colors.muted, fontSize: 17, lineHeight: 25, marginBottom: 24, fontFamily: fontFamily.body },
  authFlowScreen: { flex: 1, backgroundColor: "#E5E7EB" },
  authFlowContent: { flexGrow: 1 },
  authTopPanel: {
    height: 210,
    backgroundColor: "#051B3C",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  authTopGlowPrimary: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "rgba(34,126,255,0.22)",
    top: -20,
    right: -60
  },
  authTopGlowSecondary: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(34,126,255,0.16)",
    bottom: -90,
    left: -40
  },
  authTopLogo: { width: 110, height: 110, alignSelf: "center" },
  authCardShell: {
    flex: 1,
    marginTop: -34,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 32
  },
  authPanelTitle: { color: "#101828", fontSize: 28, lineHeight: 32, fontFamily: fontFamily.heading, marginBottom: 18 },
  authSocialRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  authSocialButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 999,
    backgroundColor: "#F3F6FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  authSocialButtonText: { color: "#475467", fontSize: 13, fontFamily: fontFamily.body },
  authDividerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 18 },
  authDividerLine: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  authDividerText: { color: "#98A2B3", fontSize: 12, fontFamily: fontFamily.body },
  authFieldWrap: { marginBottom: 14 },
  authFieldLabel: { color: "#101828", fontSize: 13, fontFamily: fontFamily.heading, marginBottom: 8 },
  authFieldBox: {
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: "#F3F6FA",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  authFieldInput: { flex: 1, color: "#101828", fontSize: 15, fontFamily: fontFamily.body },
  authInlineLinkWrap: { alignSelf: "flex-end", marginBottom: 14 },
  authInlineLink: { color: "#1F7AE0", fontSize: 12, fontFamily: fontFamily.heading },
  authPrimaryCta: {
    minHeight: 54,
    borderRadius: 999,
    backgroundColor: "#1F7AE0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6
  },
  authPrimaryCtaText: { color: "#FFFFFF", fontSize: 16, fontFamily: fontFamily.heading },
  authSecondaryCta: { alignItems: "center", justifyContent: "center", paddingVertical: 14, marginTop: 6 },
  authSecondaryCtaText: { color: "#64748B", fontSize: 14, fontFamily: fontFamily.heading },
  authFooterRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 },
  authFooterText: { color: "#667085", fontSize: 13, fontFamily: fontFamily.body },
  authFooterLink: { color: "#1F7AE0", fontSize: 13, fontFamily: fontFamily.heading },
  authTermsRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginVertical: 8 },
  authTermsCheck: {
    width: 16,
    height: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16A34A",
    marginTop: 2
  },
  authTermsText: { flex: 1, color: "#667085", fontSize: 12, lineHeight: 17, fontFamily: fontFamily.body },
  authOtpScreen: { flex: 1, backgroundColor: "#FFFFFF" },
  authOtpContent: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 58, paddingBottom: 32, alignItems: "center" },
  authBackButton: {
    alignSelf: "flex-start",
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    marginBottom: 48
  },
  authOtpTitle: { color: "#101828", fontSize: 26, fontFamily: fontFamily.heading, marginBottom: 12 },
  authOtpText: { color: "#667085", fontSize: 14, lineHeight: 21, fontFamily: fontFamily.body, textAlign: "center", marginBottom: 26 },
  authOtpTextStrong: { color: "#1F7AE0", fontFamily: fontFamily.heading },
  authOtpDots: { flexDirection: "row", gap: 12, marginBottom: 28 },
  authOtpDot: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center"
  },
  authOtpDotText: { color: "#101828", fontSize: 16, fontFamily: fontFamily.heading },
  dots: { flexDirection: "row", gap: 8, marginBottom: 24 },
  dot: { width: 9, height: 9, borderRadius: 999, backgroundColor: "#CCD4E0" },
  dotActive: { width: 26, backgroundColor: colors.green },
  formScreen: { padding: 22, paddingBottom: 42 },
  brandHeader: { marginTop: 18, marginBottom: 26 },
  brandTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 14 },
  brandTopCentered: { justifyContent: "center" },
  brandCopyCentered: { alignItems: "center" },
  brandToggleCentered: { position: "absolute", right: 0, top: 0 },
  brandLogoImage: { width: 190, height: 64 },
  smallLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    marginBottom: 12
  },
  brandName: { color: colors.navy, fontSize: 34, fontFamily: fontFamily.heading },
  brandSubtitle: { color: colors.muted, fontSize: 16, marginTop: 4, fontFamily: fontFamily.body, textAlign: "center" },
  formHint: { color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 14, fontFamily: fontFamily.body },
  inputWrap: { marginBottom: 14 },
  inputLabel: { color: colors.text, fontSize: 14, fontFamily: fontFamily.heading, marginBottom: 8 },
  input: {
    minHeight: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: colors.text,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line,
    fontSize: 16,
    fontFamily: fontFamily.body
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    marginTop: 8
  },
  compactButton: { minHeight: 48 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontFamily: fontFamily.heading },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 12
  },
  secondaryButtonText: { color: colors.navy, fontSize: 16, fontFamily: fontFamily.heading },
  dangerButton: { borderColor: "#F0CDCD" },
  dangerText: { color: colors.danger },
  centerButton: { alignItems: "center", paddingVertical: 16 },
  linkText: { color: colors.navySoft, fontFamily: fontFamily.heading },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 8 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green
  },
  termsText: { flex: 1, color: colors.muted, fontSize: 13, lineHeight: 18, fontFamily: fontFamily.body },
  pageTitle: { color: colors.text, fontSize: 28, lineHeight: 34, fontFamily: fontFamily.heading, marginBottom: 10 },
  pageText: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 18, fontFamily: fontFamily.body },
  bankHeader: { flexDirection: "row", alignItems: "center", gap: 14 },
  bankIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0FF"
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.greenSoft,
    marginTop: 6,
    marginBottom: 12
  },
  securityText: { color: colors.green, fontFamily: fontFamily.heading },
  privacyText: { color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 12, fontFamily: fontFamily.body },
  appShell: { flex: 1, backgroundColor: colors.bg },
  appContent: { padding: 18, paddingBottom: 108 },
  header: { marginTop: 10, marginBottom: 18 },
  headerTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 14 },
  headerCopy: { flex: 1 },
  headerTitle: { color: colors.text, fontSize: 28, fontFamily: fontFamily.heading },
  headerSubtitle: { color: colors.muted, fontSize: 15, marginTop: 5, fontFamily: fontFamily.body },
  card: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14
  },
  bankSwitcherScroll: { marginBottom: 14 },
  bankSwitcherRow: { gap: 10, paddingRight: 10 },
  bankChip: {
    minWidth: 150,
    minHeight: 58,
    borderRadius: 999,
    paddingHorizontal: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  bankChipBadge: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  bankChipBadgeText: { color: "#FFFFFF", fontSize: 12, fontFamily: fontFamily.heading },
  bankChipText: { fontSize: 15, fontFamily: fontFamily.heading },
  heroFinanceCard: {
    borderRadius: 28,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden"
  },
  heroWave: {
    position: "absolute",
    width: 320,
    height: 140,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.18)",
    bottom: -70,
    right: -92,
    transform: [{ rotate: "-10deg" }]
  },
  heroWarmWave: { backgroundColor: "rgba(255,255,255,0.22)" },
  heroTitle: { color: "#FFFFFF", fontSize: 17, fontFamily: fontFamily.heading, marginBottom: 6 },
  heroText: { color: "#ECEBFF", fontSize: 14, lineHeight: 20, marginTop: 8, fontFamily: fontFamily.body },
  accountHeroHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 },
  accountEyebrow: { color: "#3F3A13", fontSize: 14, fontFamily: fontFamily.heading, marginBottom: 4 },
  accountBalanceLabel: { color: "#3F3A13", fontSize: 16, fontFamily: fontFamily.body, marginTop: 8 },
  accountBalanceValue: { color: colors.navy, fontSize: 38, lineHeight: 42, fontFamily: fontFamily.heading, marginTop: 8 },
  accountConnectionText: { color: "#3F3A13", fontSize: 15, lineHeight: 22, fontFamily: fontFamily.body, marginTop: 10 },
  accountMetricsRow: { flexDirection: "row", gap: 10, marginTop: 18, marginBottom: 18 },
  accountMetricPill: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.68)",
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  accountMetricLabel: { color: "#5F5720", fontSize: 12, fontFamily: fontFamily.heading, marginBottom: 6 },
  accountMetricValue: { color: colors.navy, fontSize: 16, fontFamily: fontFamily.heading },
  accountPrimaryAction: {
    minHeight: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  accountPrimaryActionText: { color: colors.navy, fontSize: 16, fontFamily: fontFamily.heading },
  relationshipScoreHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  relationshipScoreValue: { color: colors.navy, fontSize: 34, fontFamily: fontFamily.heading },
  relationshipScoreText: { color: colors.muted, fontSize: 14, lineHeight: 20, fontFamily: fontFamily.body, marginTop: 12 },
  accentCard: { borderColor: "#CFEFDB", backgroundColor: "#FBFFFD" },
  raCard: { flexDirection: "row", alignItems: "center", gap: 16 },
  raCopy: { flex: 1 },
  cardTitle: { color: colors.text, fontSize: 16, fontFamily: fontFamily.heading, marginBottom: 6 },
  cardText: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 8, fontFamily: fontFamily.body },
  cardHint: { color: colors.muted, fontSize: 13, marginTop: 2, fontFamily: fontFamily.body },
  rewardText: { color: colors.gold, fontSize: 13, fontFamily: fontFamily.heading, lineHeight: 18, marginTop: 8 },
  circularOuter: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 12,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  circularInner: { alignItems: "center", justifyContent: "center" },
  circularValue: { color: colors.navy, fontSize: 30, fontFamily: fontFamily.heading },
  circularLabel: { color: colors.muted, fontSize: 12, fontFamily: fontFamily.heading },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
    fontSize: 12,
    fontFamily: fontFamily.heading
  },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8 },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.greenSoft
  },
  rowText: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: 15, fontFamily: fontFamily.heading },
  rowSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3, fontFamily: fontFamily.body },
  grid: { flexDirection: "row", gap: 12, marginBottom: 14 },
  miniCard: {
    flex: 1,
    minHeight: 116,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line
  },
  miniTitle: { color: colors.muted, fontSize: 12, fontFamily: fontFamily.heading, marginTop: 10 },
  miniValue: { color: colors.text, fontSize: 18, fontFamily: fontFamily.heading, marginTop: 4 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  progressValue: { color: colors.green, fontSize: 15, fontFamily: fontFamily.heading },
  progressTrack: { height: 10, borderRadius: 999, backgroundColor: "#E8EDF4", overflow: "hidden", marginTop: 10 },
  progressFill: { height: "100%", borderRadius: 999, backgroundColor: colors.green },
  missionRow: { flexDirection: "row", gap: 14 },
  timelineRail: { alignItems: "center" },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  timelineLine: { width: 2, flex: 1, minHeight: 50, backgroundColor: colors.line, marginTop: 8 },
  missionBody: { flex: 1 },
  paymentTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 },
  bigValue: { color: colors.navy, fontSize: 32, fontFamily: fontFamily.heading, marginTop: 4 },
  paymentRadarHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 },
  paymentRadarCopy: { flex: 1 },
  paymentRadarUpdated: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.heading, marginTop: 2 },
  paymentMethodBar: { flexDirection: "row", gap: 10, marginTop: 10 },
  paymentMethodAction: {
    flex: 1,
    minHeight: 110,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    gap: 10
  },
  paymentMethodIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  paymentMethodText: { fontSize: 15, fontFamily: fontFamily.heading, textAlign: "center" },
  openFinanceHero: {
    marginHorizontal: -18,
    marginTop: -18,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 28
  },
  openFinanceBack: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48
  },
  openFinanceTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fontFamily.heading,
    marginBottom: 28
  },
  openFinanceConnectButton: {
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: "#0F766E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  openFinanceConnectText: { color: "#FFFFFF", fontSize: 18, fontFamily: fontFamily.heading },
  openFinanceBenefitsRow: { gap: 14, paddingRight: 12 },
  openFinanceBenefitCard: {
    width: 292,
    minHeight: 290,
    borderRadius: 26,
    backgroundColor: "#113A4A",
    borderWidth: 1,
    borderColor: "#1D7087",
    padding: 22,
    justifyContent: "space-between"
  },
  openFinanceBenefitTitle: {
    color: "#8EE6D4",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.heading,
    textAlign: "center"
  },
  openFinanceBenefitIconWrap: {
    width: 118,
    height: 118,
    borderRadius: 999,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  openFinanceBenefitText: {
    color: "#D6F6EF",
    fontSize: 16,
    lineHeight: 23,
    fontFamily: fontFamily.body,
    textAlign: "center"
  },
  openFinanceManageRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: colors.line
  },
  openFinanceManageIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navy
  },
  openFinanceManageCopy: { flex: 1, paddingVertical: 14 },
  historyRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line
  },
  historyMonth: { flex: 1, color: colors.text, fontFamily: fontFamily.heading },
  historyAmount: { color: colors.muted, fontFamily: fontFamily.heading },
  radarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line
  },
  radarIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  radarCopy: { flex: 1 },
  radarAmount: { fontSize: 15, fontFamily: fontFamily.heading },
  infoStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#FFF6DA",
    marginBottom: 14
  },
  infoText: { flex: 1, color: colors.navy, fontSize: 14, fontFamily: fontFamily.heading, lineHeight: 20 },
  educationHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  educationAction: {
    marginTop: 14,
    minHeight: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.greenSoft
  },
  educationActionText: { color: colors.green, fontSize: 14, fontFamily: fontFamily.heading },
  timeText: { color: colors.muted, fontSize: 12, fontFamily: fontFamily.heading },
  chart: { height: 230, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 20 },
  chartColumn: { flex: 1, alignItems: "center", gap: 6 },
  chartBarWrap: { width: 32, height: 142, borderRadius: 12, justifyContent: "flex-end", backgroundColor: "#EAF0FF", overflow: "hidden" },
  chartBar: { width: "100%", borderRadius: 12, backgroundColor: colors.green },
  chartValue: { color: colors.text, fontFamily: fontFamily.heading, fontSize: 13 },
  chartLabel: { color: colors.muted, fontSize: 12, fontFamily: fontFamily.heading },
  profileHero: { marginBottom: 14 },
  profileHeroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingVertical: 14
  },
  profileHeroPhotoWrap: {
    width: 96,
    height: 96,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#D9E2EC"
  },
  profileHeroPhoto: { width: "100%", height: "100%" },
  profileHeroCopy: { flex: 1 },
  profileHeroName: { fontSize: 28, lineHeight: 32, fontFamily: fontFamily.heading, marginBottom: 6 },
  profileHeroHandle: { fontSize: 16, fontFamily: fontFamily.body },
  profileSectionTitle: { fontSize: 18, fontFamily: fontFamily.heading, marginBottom: 4 },
  profileMenuRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderTopWidth: 1
  },
  profileMenuIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  profileMenuCopy: { flex: 1, paddingVertical: 16 },
  profileActionRow: { minHeight: 84 },
  profileTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navy
  },
  avatarText: { color: "#FFFFFF", fontSize: 20, fontFamily: fontFamily.heading },
  bottomNavigation: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    height: 72,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line
  },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4, minHeight: 62 },
  tabLabel: { color: colors.muted, fontSize: 11, fontFamily: fontFamily.heading },
  tabLabelActive: { color: colors.green },
  themeToggle: {
    minHeight: 38,
    width: 38,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0
  },
  previewStack: {
    height: 220,
    marginBottom: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  previewPhone: {
    position: "absolute",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8
  },
  previewPhoneLarge: {
    width: 150,
    height: 208,
    left: 26,
    top: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  previewPhoneSmall: {
    width: 104,
    height: 154,
    right: 28,
    top: 34,
    justifyContent: "flex-end",
    gap: 10
  },
  previewLogoTile: {
    width: 68,
    height: 68,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26
  },
  previewButton: { width: 92, height: 24, borderRadius: 8, marginBottom: 18 },
  previewLine: { width: 68, height: 8, borderRadius: 999 },
  previewTinyBar: { height: 18, borderRadius: 6 }
});
