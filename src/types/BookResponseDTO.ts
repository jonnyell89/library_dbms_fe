export interface BookResponseDTO {
  bookId: number;
  author: string;
  title: string;
  authorKey: string;
  titleKey: string;
  firstPublishYear?: number;
  cover?: number;
  coverEditionKey?: string;
};
