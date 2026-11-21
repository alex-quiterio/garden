import type { Entry, Profile } from "@domain/profile";

export interface PageSection {
  id: string;
  letter: string;
  title: string;
  intro?: string;
  layout: "garden" | "cards";
  inMenu: boolean;
  entries: Entry[];
}

export interface PageModel {
  documentTitle: string;
  description: string;
  profile: Profile;
  sections: PageSection[];
}

export interface ProfileSource {
  load(): Profile;
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** Use case: turn a profile into the page the visitor reads, lettering each section. */
export function composePage(source: ProfileSource): PageModel {
  const profile = source.load();
  return {
    documentTitle: `${profile.name} · ${profile.role}`,
    description: profile.headline,
    profile,
    sections: profile.sections.map((section, i) => ({
      ...section,
      layout: section.layout ?? "garden",
      inMenu: section.inMenu ?? true,
      letter: LETTERS[i] ?? String(i + 1),
    })),
  };
}
