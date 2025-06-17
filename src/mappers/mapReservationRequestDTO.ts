import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import { currentMemberId } from "../state";

export function mapReservationRequestDTO(): ReservationRequestDTO {
    const start = new Date();
    const startDate = start.toISOString().split("T")[0];

    const end = new Date();
    end.setDate(start.getDate() + 7);
    const endDate = end.toISOString().split("T")[0];

    if (currentMemberId === null) {
        throw new Error("No currentMemberId set to state.");
    }

    return {
        memberId: currentMemberId,
        startDate,
        endDate
    };
}
