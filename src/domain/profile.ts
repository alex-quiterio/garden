export interface Entry {
  title: string;
  url?: string;
  meta?: string;
  body: string;
}

export interface Section {
  id: string;
  title: string;
  intro?: string;
  entries: Entry[];
}

export interface Profile {
  name: string;
  greeting: string;
  tagline: string;
  intro: string[];
  facts: string[];
  place: string;
  timeZone: string;
  sections: Section[];
  links: { label: string; url: string }[];
  closingNote: string;
}
