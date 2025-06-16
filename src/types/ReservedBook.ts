import type { Reservation } from "./Reservation";
import type { BookRequestDTO } from "./BookRequestDTO";

export interface ReservedBook {
  reservation: Reservation;
  book: BookRequestDTO;
};
