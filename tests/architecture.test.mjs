import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const packageSource = readFileSync(new URL("../package.json", import.meta.url), "utf8");
const rootLayoutSource = readFileSync(new URL("../src/app/_layout.tsx", import.meta.url), "utf8");
const tabsLayoutSource = readFileSync(new URL("../src/app/(tabs)/_layout.tsx", import.meta.url), "utf8");
const indexRouteSource = readFileSync(new URL("../src/app/index.tsx", import.meta.url), "utf8");
const routeDependenciesSource = readFileSync(new URL("../src/app/useRouteDependencies.tsx", import.meta.url), "utf8");
const appPresentationSource = readFileSync(new URL("../src/app/appPresentation.tsx", import.meta.url), "utf8");
const homeRouteSource = readFileSync(new URL("../src/app/(tabs)/home.tsx", import.meta.url), "utf8");
const educationRouteSource = readFileSync(new URL("../src/app/(tabs)/education.tsx", import.meta.url), "utf8");
const profileRouteSource = readFileSync(new URL("../src/app/(tabs)/profile.tsx", import.meta.url), "utf8");
const tabsLayoutSourceByDomain = readFileSync(new URL("../src/app/(tabs)/_layout.tsx", import.meta.url), "utf8");
const signinRouteSource = readFileSync(new URL("../src/app/signin.tsx", import.meta.url), "utf8");
const bankRouteSource = readFileSync(new URL("../src/app/bank.tsx", import.meta.url), "utf8");
const openFinanceRouteSource = readFileSync(new URL("../src/app/open-finance.tsx", import.meta.url), "utf8");
const evolutionRouteSource = readFileSync(new URL("../src/app/evolution.tsx", import.meta.url), "utf8");

test("uses Expo Router as the app entrypoint", () => {
  assert.match(packageSource, /"main":\s*"expo-router\/entry"/);
});

test("organizes router, providers and route files under src/app", () => {
  const expectedFiles = [
    "../src/app/_layout.tsx",
    "../src/app/appAssets.ts",
    "../src/app/appIntroScreens.tsx",
    "../src/app/appMotion.tsx",
    "../src/app/appStyles.ts",
    "../src/app/index.tsx",
    "../src/app/onboarding.tsx",
    "../src/app/login.tsx",
    "../src/app/signin.tsx",
    "../src/app/recovery.tsx",
    "../src/app/signup.tsx",
    "../src/app/bank.tsx",
    "../src/app/open-finance.tsx",
    "../src/app/evolution.tsx",
    "../src/app/(tabs)/_layout.tsx",
    "../src/app/(tabs)/home.tsx",
    "../src/app/(tabs)/journey.tsx",
    "../src/app/(tabs)/payments.tsx",
    "../src/app/(tabs)/education.tsx",
    "../src/app/(tabs)/profile.tsx",
    "../src/app/useRouteDependencies.tsx",
    "../src/app/createAppDependencies.tsx",
    "../src/state/DomainStateProvider.tsx",
    "../src/state/authState.tsx",
    "../src/state/journeyState.tsx",
    "../src/state/paymentsState.tsx",
    "../src/state/profileState.tsx"
  ];

  for (const relativePath of expectedFiles) {
    const fileUrl = new URL(relativePath, import.meta.url);
    assert.equal(existsSync(fileUrl), true, `${relativePath} should exist`);
  }
});

test("defines real router layouts and route composition", () => {
  assert.match(rootLayoutSource, /\bStack\b/);
  assert.match(rootLayoutSource, /DomainStateProvider/);
  assert.match(tabsLayoutSource, /\bTabs\b/);
  assert.match(indexRouteSource, /\bRedirect\b/);
  assert.match(routeDependenciesSource, /createAppDependencies/);
});

test("keeps appPresentation as a thin aggregator over presentation modules", () => {
  const requiredImports = [
    "./appAssets",
    "./appIntroScreens",
    "./appMotion",
    "./appStyles"
  ];

  for (const token of requiredImports) {
    assert.match(appPresentationSource, new RegExp(token));
  }
});

test("wires route state by domain hooks", () => {
  assert.match(homeRouteSource, /usePaymentsState/);
  assert.match(educationRouteSource, /useJourneyState/);
  assert.match(profileRouteSource, /useAuthState/);
  assert.match(profileRouteSource, /usePaymentsState/);
  assert.match(tabsLayoutSourceByDomain, /useProfileState/);
  assert.match(signinRouteSource, /markAuthenticated/);
});

test("protects private routes with auth guards", () => {
  assert.match(indexRouteSource, /isAuthenticated/);
  assert.match(indexRouteSource, /\/\(tabs\)\/home/);
  assert.match(tabsLayoutSourceByDomain, /Redirect/);
  assert.match(tabsLayoutSourceByDomain, /isAuthenticated/);
  assert.match(bankRouteSource, /Redirect/);
  assert.match(bankRouteSource, /isAuthenticated/);
  assert.match(openFinanceRouteSource, /Redirect/);
  assert.match(openFinanceRouteSource, /isAuthenticated/);
  assert.match(evolutionRouteSource, /Redirect/);
  assert.match(evolutionRouteSource, /isAuthenticated/);
});
