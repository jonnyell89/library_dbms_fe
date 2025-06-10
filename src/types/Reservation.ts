import type { Member } from "./Member";
import enum {Status} from "../enums"

export type Reservation = {
  reservationId: number;
  member: Member;
  status: Status;
  startDate: Date;
  endDate: Date;
};
