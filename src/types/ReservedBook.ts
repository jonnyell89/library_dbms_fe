import type { Reservation } from "./ReservationRequestDTO";
import type { BookRequestDTO } from "./BookRequestDTO";

export interface ReservedBook {
  reservation: Reservation;
  book: BookRequestDTO;
};
