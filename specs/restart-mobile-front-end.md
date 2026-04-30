# Restart Mobile Front End

## Objetivo
Criar uma interface mobile completa em Expo/React Native para o app Restart, cobrindo onboarding, autenticação, conexão bancária e área logada com bottom navigation.

## Contexto
- Projeto Expo em `/home/pedro/Documents/GitHub/restart`.
- Entrada principal atual: `App.tsx`.
- Dependências disponíveis: `expo`, `react`, `react-native`, `@expo/vector-icons`, `expo-status-bar`.
- O app atual mostra screenshots do Stitch. Isso deve ser substituído por interface nativa React Native.
- Assets Stitch e HTMLs originais ficam preservados em `assets/stitch/` e `stitch-code/`, mas não são base da UI final.

## Escopo
- Entra:
  - Splash.
  - Onboarding 1, 2 e 3.
  - Login.
  - Cadastro.
  - Conexão com banco.
  - Home/Dashboard.
  - Jornada.
  - Pagamentos.
  - Educação.
  - Evolução.
  - Perfil.
  - Bottom navigation com 5 itens: Início, Jornada, Pagamentos, Educação, Perfil.
  - Componentes visuais: cards, badges, barra de progresso, indicador circular RA, timeline, gráfico simples, botões.
- Não entra:
  - Backend real.
  - Persistência real.
  - Integração real Open Finance.
  - Validação completa de formulários.

## Requisitos Funcionais
- Usuário vê Splash com logo Restart e frase "Sua nova jornada financeira começa aqui".
- Usuário navega por três telas de onboarding com textos do prompt.
- Usuário acessa login, cadastro e conexão com banco por botões.
- Dashboard mostra saudação, RA Restart, status "Em evolução", próxima missão, último pagamento, banco parceiro e dicas.
- Jornada mostra missões com status concluída, em andamento e bloqueada.
- Pagamentos mostra mensalidade, status, opções Pix, boleto e débito, histórico e incentivo.
- Educação mostra quatro cards de conteúdo e progresso de leitura.
- Evolução mostra gráfico mensal e indicadores solicitados.
- Perfil mostra dados pessoais, banco conectado, consentimento Open Finance, segurança, termos e sair.
- Bottom navigation troca telas principais sem sair da sessão.

## Requisitos Técnicos
- Implementar UI nativa em `App.tsx` e dados estáticos em `src/restartContent.ts`.
- Usar somente componentes React Native e `@expo/vector-icons`.
- Manter design mobile first, limpo e profissional.
- Paleta:
  - Azul escuro para confiança.
  - Verde para progresso.
  - Branco/cinza claro para fundo.
  - Cinza escuro para texto.
  - Dourado discreto para conquistas.
- Garantir botões grandes e áreas tocáveis claras.
- Evitar texto longo em telas.
- Não depender de imagens remotas.

## Plano De Implementacao
1. Criar testes de contrato para verificar telas, navegação, textos principais, missões, conteúdos e componentes.
2. Criar `src/restartContent.ts` com dados estáticos do produto.
3. Substituir `App.tsx` por fluxo Expo/React Native real.
4. Atualizar scripts `test` e `start` no `package.json`.
5. Rodar testes e typecheck.
6. Exportar web para validar bundling.

## Plano De Testes
- Teste deve falhar primeiro verificando:
  - 13 telas nomeadas.
  - 5 itens de bottom navigation.
  - Textos-chave de splash, onboarding, Open Finance, RA Restart.
  - Missões e status.
  - Conteúdos de educação.
  - Presença de componentes funcionais em `App.tsx`.
- Depois implementação deve fazer esses testes passarem.
- Rodar `npm exec -- tsc --noEmit`.
- Rodar `npx expo export --platform web --output-dir dist`.

## Criterios De Aceite
- App Expo abre com interface nativa, não apenas screenshots.
- Todas as telas pedidas existem e são navegáveis.
- Bottom navigation tem 5 itens.
- Testes passam.
- TypeScript passa.
- Export web passa.

## Riscos E Perguntas
- Sem backend, dados são mockados.
- Sem navegação externa, fluxo usa estado local.
- Open Finance é apenas interface demonstrativa.

## Status
- [x] Testes criados.
- [x] Interface implementada.
- [x] Testes passando.
- [x] Typecheck passando.
- [x] Export web passando.
