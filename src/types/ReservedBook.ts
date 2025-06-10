import type { Reservation } from "./Reservation";
import type { Book } from "./Book";

export type ReservedBook = {
  reservedBookId: number;
  reservation: Reservation;
  book: Book;
};
