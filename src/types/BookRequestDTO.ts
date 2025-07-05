export interface BookRequestDTO {
  author: string;
  title: string;
  authorKey: string;
  titleKey: string;
  firstPublishYear?: number;
  cover?: number;
  coverEditionKey?: string;
  availability?: "AVAILABLE" | "RESERVED" | "UNAVAILABLE"; // Front-end enrichment only, currently.
};
