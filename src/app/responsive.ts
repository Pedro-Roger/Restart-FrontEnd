export function getResponsiveContentStyle(width: number) {
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;
  const maxWidth = isDesktop ? 980 : isTablet ? 760 : undefined;
  const horizontalPadding = isDesktop ? 28 : isTablet ? 24 : 18;

  return {
    width: "100%" as const,
    alignSelf: "center" as const,
    maxWidth,
    paddingHorizontal: horizontalPadding
  };
}
