export type RouteKey = "home" | "about" | "work" | "skills" | "education" | "contact";

export interface Route {
  key: RouteKey;
  /** Path relative to the site base, with trailing slash ("" for home). */
  path: string;
  file: string;
  /** Language shown in the status bar. */
  lang: string;
  icon: string;
  color: "pink" | "blue" | "purple" | "green" | "yellow";
  /** Short label for the mobile bottom nav. */
  label: string;
}

export const routes: Route[] = [
  { key: "home", path: "", file: "home.tsx", lang: "TSX", icon: "home", color: "pink", label: "home" },
  { key: "about", path: "about/", file: "about_me.md", lang: "MD", icon: "user", color: "blue", label: "about" },
  { key: "work", path: "work/", file: "work_history.json", lang: "JSON", icon: "briefcase", color: "purple", label: "work" },
  { key: "skills", path: "skills/", file: "skills.ts", lang: "TS", icon: "zap", color: "green", label: "skills" },
  { key: "education", path: "education/", file: "education.json", lang: "JSON", icon: "cap", color: "yellow", label: "edu" },
  { key: "contact", path: "contact/", file: "contact.md", lang: "MD", icon: "mail", color: "pink", label: "contact" },
];

export const url = (path: string) => import.meta.env.BASE_URL + path;
