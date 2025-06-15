import type { Member } from "./Member";

export interface Reservation {
  reservationId: number;
  member: Member;
  startDate: Date;
  endDate: Date;
};
