import type { Reservation } from "./Reservation";
import type { Book } from "./Book";

export interface ReservedBook {
  reservation: Reservation;
  book: Book;
};
