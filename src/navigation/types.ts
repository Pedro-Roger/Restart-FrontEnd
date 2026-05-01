import { bottomTabs } from "../restartContent";

export type Flow = "onboarding" | "login" | "signin" | "recovery" | "signup" | "bank" | "app";
export type TabKey = (typeof bottomTabs)[number]["key"];
export type AppView = "tabs" | "openFinance";
