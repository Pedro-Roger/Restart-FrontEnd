import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { bankConnection, type IconName, user } from "../restartContent";
import { ThemeContext } from "../theme/theme";

type Props = {
  consentActive: boolean;
  onToggleConsent: () => void;
  onLogout: () => void;
  styles: Record<string, any>;
  profilePhotoAsset: number;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
};

export function ProfileScreen({ consentActive, onToggleConsent, onLogout, styles, profilePhotoAsset, Card }: Props) {
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
