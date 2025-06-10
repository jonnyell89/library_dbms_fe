import enum {Availability} from "../enums"

export type Book = {
  bookId: number;
  availability: Availability;
  author: string;
  title: string;
  authorKey: string;
  titleKey: string;
  firstYearPublish: number;
  cover: number;
};
