import type { ReactNode } from "react";
import type { IconName, MissionStatus } from "../restartContent";
import type { PaymentRadarStatus } from "../components/finance/PaymentRadarRow";
import { AuthDivider as AuthDividerBlock } from "../components/auth/AuthDivider";
import { AuthField as AuthFieldBlock } from "../components/auth/AuthField";
import { AuthTopPanel as AuthTopPanelBlock } from "../components/auth/AuthTopPanel";
import { SocialAuthRow as SocialAuthRowBlock } from "../components/auth/SocialAuthRow";
import { BrandHeader as BrandingHeader } from "../components/branding/BrandHeader";
import { PaymentMethodAction as FinancePaymentMethodAction } from "../components/finance/PaymentMethodAction";
import { PaymentRadarRow as FinancePaymentRadarRow } from "../components/finance/PaymentRadarRow";
import { Dots as NavigationDots } from "../components/navigation/Dots";
import { Badge as SharedBadge } from "../components/shared/Badge";
import { InfoStrip as SharedInfoStrip } from "../components/shared/InfoStrip";
import { MiniCard as SharedMiniCard } from "../components/shared/MiniCard";
import { SectionRow as SharedSectionRow } from "../components/shared/SectionRow";
import { Card as UICard } from "../components/ui/Card";
import { FloatingPreviewStack as UIFloatingPreviewStack } from "../components/ui/FloatingPreviewStack";
import { Header as UIHeader } from "../components/ui/Header";
import { PrimaryButton as UIPrimaryButton } from "../components/ui/PrimaryButton";
import { SecondaryButton as UISecondaryButton } from "../components/ui/SecondaryButton";
import { ThemeToggle as UIThemeToggle } from "../components/ui/ThemeToggle";
import { CircularProgress as VizCircularProgress } from "../components/visualizations/CircularProgress";
import { Illustration as VizIllustration } from "../components/visualizations/Illustration";
import { MissionTimeline as VizMissionTimeline } from "../components/visualizations/MissionTimeline";
import { ProgressBar as VizProgressBar } from "../components/visualizations/ProgressBar";
import { SimpleChart as VizSimpleChart } from "../components/visualizations/SimpleChart";

type CreateDepsParams = {
  styles: Record<string, any>;
  colors: { [key: string]: string };
  logoAsset: number;
  AnimatedCard: (props: { children: ReactNode; style?: any }) => ReactNode;
  badgeStyle: (tone: "success" | "progress" | "warning" | "locked") => any;
  radarStatusStyle: (status: PaymentRadarStatus) => any;
  themeModeTrack: (theme: any) => string;
  statusDotStyle: (status: MissionStatus) => any;
  statusIcon: (status: MissionStatus) => any;
};

export function createAppDependencies({
  styles,
  colors,
  logoAsset,
  AnimatedCard,
  badgeStyle,
  radarStatusStyle,
  themeModeTrack,
  statusDotStyle,
  statusIcon
}: CreateDepsParams) {
  function ThemeToggle() {
    return <UIThemeToggle styles={styles} />;
  }

  function Header(props: { title: string; subtitle: string }) {
    return <UIHeader {...props} styles={styles} renderThemeToggle={() => <ThemeToggle />} />;
  }

  function Card(props: { children: ReactNode; accent?: boolean }) {
    return <UICard {...props} styles={styles} AnimatedCard={AnimatedCard} />;
  }

  function CircularProgress(props: { value: number }) {
    return <VizCircularProgress {...props} styles={styles} />;
  }

  function ProgressBar(props: { value: number }) {
    return <VizProgressBar {...props} styles={styles} themeModeTrack={themeModeTrack} />;
  }

  function Badge(props: { label: string; tone: "success" | "progress" | "warning" | "locked" }) {
    return <SharedBadge {...props} styles={styles} badgeStyle={badgeStyle} />;
  }

  function SectionRow(props: { icon: IconName; title: string; subtitle: string }) {
    return <SharedSectionRow {...props} styles={styles} />;
  }

  function InfoStrip(props: { icon: IconName; text: string }) {
    return <SharedInfoStrip {...props} styles={styles} />;
  }

  function MiniCard(props: { title: string; value: string; icon: IconName }) {
    return <SharedMiniCard {...props} styles={styles} AnimatedCard={AnimatedCard} />;
  }

  function PaymentRadarRow(props: { title: string; subtitle: string; amount: string; status: PaymentRadarStatus }) {
    return <FinancePaymentRadarRow {...props} styles={styles} radarStatusStyle={radarStatusStyle} />;
  }

  function PaymentMethodAction(props: { icon: IconName; label: string }) {
    return <FinancePaymentMethodAction {...props} styles={styles} />;
  }

  function MissionTimeline() {
    return <VizMissionTimeline styles={styles} statusDotStyle={statusDotStyle} statusIcon={statusIcon} Badge={Badge} Card={Card} />;
  }

  function SimpleChart() {
    return <VizSimpleChart styles={styles} />;
  }

  function PrimaryButton(props: { label: string; onPress: () => void; compact?: boolean }) {
    return <UIPrimaryButton {...props} styles={styles} />;
  }

  function SecondaryButton(props: { label: string; onPress: () => void; danger?: boolean }) {
    return <UISecondaryButton {...props} styles={styles} />;
  }

  function AuthTopPanel() {
    return <AuthTopPanelBlock styles={styles} logoAsset={logoAsset} />;
  }

  function SocialAuthRow() {
    return <SocialAuthRowBlock styles={styles} />;
  }

  function AuthDivider() {
    return <AuthDividerBlock styles={styles} />;
  }

  function AuthField(props: { label: string; placeholder: string; secure?: boolean }) {
    return <AuthFieldBlock {...props} styles={styles} />;
  }

  function BrandHeader(props: { subtitle: string; centered?: boolean }) {
    return <BrandingHeader {...props} styles={styles} logoAsset={logoAsset} renderThemeToggle={() => <ThemeToggle />} />;
  }

  function Dots(props: { total: number; active: number }) {
    return <NavigationDots {...props} styles={styles} />;
  }

  function FloatingPreviewStack() {
    return <UIFloatingPreviewStack styles={styles} />;
  }

  function Illustration(props: { icon: IconName; step: number }) {
    return <VizIllustration {...props} styles={styles} />;
  }

  return {
    colors,
    Header,
    Card,
    CircularProgress,
    ProgressBar,
    Badge,
    SectionRow,
    InfoStrip,
    MiniCard,
    PaymentRadarRow,
    PaymentMethodAction,
    MissionTimeline,
    SimpleChart,
    ThemeToggle,
    PrimaryButton,
    SecondaryButton,
    AuthTopPanel,
    SocialAuthRow,
    AuthDivider,
    AuthField,
    BrandHeader,
    Dots,
    FloatingPreviewStack,
    Illustration
  };
}
