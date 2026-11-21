export interface Entry {
  title: string;
  url?: string;
  meta?: string;
  body: string;
  /** Short outcome lines, shown as a checklist under the body. */
  points?: string[];
  /** Small labels, shown as pixel chips. */
  tags?: string[];
}

export interface Section {
  id: string;
  title: string;
  intro?: string;
  /** "garden" is the plant-bed list; "cards" is a grid of case-study cards. */
  layout?: "garden" | "cards";
  /** Leave out of the top menu to keep it short; the section still renders. */
  inMenu?: boolean;
  entries: Entry[];
}

export interface Link {
  label: string;
  url: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  /** Proper-cased name for titles, metadata and search results. */
  fullName: string;
  role: string;
  greeting: string;
  tagline: string;
  /** One line under the greeting that says what the person does, for someone skimming. */
  headline: string;
  intro: string[];
  /** What the person is open to; shown as a status pill in the hero and near the contact. */
  availability?: string;
  actions: { primary: Link; secondary: Link[] };
  stats: Stat[];
  facts: string[];
  place: string;
  timeZone: string;
  sections: Section[];
  contact: { title: string; body: string; action: Link };
  links: Link[];
  closingNote: string;
}
