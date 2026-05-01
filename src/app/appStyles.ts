import { StyleSheet } from "react-native";
import type { PaymentRadarStatus } from "../components/finance/PaymentRadarRow";
import type { IconName, MissionStatus } from "../restartContent";
import { darkTheme, fontFamily, lightTheme } from "../theme/theme";
import { colors } from "./appAssets";

export function themeModeTrack(theme: typeof lightTheme) {
  return theme.bg === darkTheme.bg ? "#1E2D42" : "#E8EDF4";
}

export function statusIcon(status: MissionStatus): IconName {
  if (status === "concluída") return "check";
  if (status === "em andamento") return "clock";
  return "lock";
}

export function statusDotStyle(status: MissionStatus) {
  if (status === "concluída") return { backgroundColor: colors.green };
  if (status === "em andamento") return { backgroundColor: colors.gold };
  return { backgroundColor: colors.muted };
}

export function badgeStyle(tone: "success" | "progress" | "warning" | "locked") {
  const map = {
    success: { backgroundColor: colors.greenSoft, color: colors.green },
    progress: { backgroundColor: "#EAF0FF", color: colors.navySoft },
    warning: { backgroundColor: "#FFF6DA", color: colors.gold },
    locked: { backgroundColor: "#EEF1F5", color: colors.muted }
  };
  return map[tone];
}

export function radarStatusStyle(status: PaymentRadarStatus) {
  if (status === "urgente") return { backgroundColor: "#E46A6A" };
  if (status === "atenção") return { backgroundColor: colors.gold };
  return { backgroundColor: colors.green };
}

export const styles = StyleSheet.create({
  screenTransition: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  loginHero: { flex: 1, backgroundColor: "#07130F" },
  loginOverlay: { flex: 1 },
  loginSafeArea: { flex: 1, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 18 },
  loginHeader: { alignItems: "center" },
  loginLogo: { width: 220, height: 72 },
  loginContent: { flex: 1, justifyContent: "space-between", paddingTop: 20 },
  loginCopy: { marginTop: "auto", gap: 14, paddingLeft: 25 },
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
    backgroundColor: "#101B31",
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
    backgroundColor: "#14233D",
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 12
  },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontFamily: fontFamily.heading },
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
  appContent: { paddingTop: 18, paddingBottom: 132 },
  screenBackdrop: {
    flex: 1,
    backgroundColor: colors.bg,
    overflow: "hidden"
  },
  screenGlowPrimary: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "rgba(58, 130, 255, 0.20)",
    top: -88,
    right: -118
  },
  screenGlowSecondary: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(111, 167, 255, 0.14)",
    top: 260,
    left: -132
  },
  screenGlowTertiary: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(79, 113, 255, 0.12)",
    bottom: -110,
    right: -120
  },
  homeScreen: {
    position: "relative",
    gap: 0
  },
  header: { marginTop: 10, marginBottom: 18 },
  headerTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 14 },
  headerCopy: { flex: 1 },
  headerTitle: { color: colors.text, fontSize: 28, fontFamily: fontFamily.heading },
  headerSubtitle: { color: colors.muted, fontSize: 15, marginTop: 5, fontFamily: fontFamily.body },
  card: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.32,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
    overflow: "hidden"
  },
  cardHighlight: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.22)"
  },
  cardGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(91, 141, 255, 0.14)",
    top: -84,
    right: -72
  },
  cardTint: {
    position: "absolute",
    inset: 0
  },
  cardContent: {
    position: "relative",
    zIndex: 1
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
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6
  },
  bankChipBadge: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)"
  },
  bankChipBadgeText: { color: "#FFFFFF", fontSize: 12, fontFamily: fontFamily.heading },
  bankChipText: { fontSize: 15, fontFamily: fontFamily.heading },
  heroFinanceCard: {
    borderRadius: 28,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12
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
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
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
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)"
  },
  accountPrimaryActionText: { color: "#F8FBFF", fontSize: 16, fontFamily: fontFamily.heading },
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
    backgroundColor: "rgba(101, 145, 255, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)"
  },
  rowText: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: 15, fontFamily: fontFamily.heading },
  rowSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3, fontFamily: fontFamily.body },
  grid: { flexDirection: "row", gap: 12, marginBottom: 14 },
  miniCard: {
    flex: 1,
    minHeight: 116,
    borderRadius: 22,
    padding: 15,
    backgroundColor: "rgba(17, 29, 51, 0.68)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8
  },
  miniCardTint: {
    position: "absolute",
    inset: 0
  },
  miniCardHighlight: {
    position: "absolute",
    top: 0,
    left: 14,
    right: 14,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.20)"
  },
  miniCardContent: {
    position: "relative",
    zIndex: 1
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
  paymentSuccessBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#193851"
  },
  paymentSuccessBadgeText: {
    color: "#9CD0FF",
    fontSize: 13,
    textTransform: "uppercase",
    fontFamily: fontFamily.heading
  },
  paymentSuccessRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 },
  paymentSuccessIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7BFF"
  },
  paymentSuccessText: { color: colors.text, fontSize: 14, lineHeight: 20, fontFamily: fontFamily.heading },
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
  openFinanceBackLower: {
    marginTop: 16,
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.82)"
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
    borderRadius: 18,
    backgroundColor: "#162744",
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
    bottom: 14,
    height: 72,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#111B31",
    borderWidth: 1,
    borderColor: "#2A3A5B",
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10
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
    gap: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6
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
