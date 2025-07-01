import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import { currentMember } from "../state";

// Maps data held in state to ReservationRequestDTO.
export function mapReservationRequestDTO(): ReservationRequestDTO {

    const start = new Date();
    const startDate = start.toISOString().split("T")[0];

    const end = new Date();
    end.setDate(start.getDate() + 7);
    const endDate = end.toISOString().split("T")[0];

    if (!currentMember || !currentMember.memberId) {
        throw new Error("No currentMember set to state.");
    }

    return {
        memberId: currentMember.memberId,
        startDate,
        endDate,
    }
}
