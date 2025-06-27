import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import { currentReservation } from "../state";

// Maps data to ReservedBookRequestDTO.
export function mapReservedBookRequestDTO(currentBookId: number): ReservedBookRequestDTO {

    if (!currentReservation || !currentReservation.reservationId) {
        throw new Error("No currentReservation set to state.");
    }

    return {
        reservationId: currentReservation.reservationId,
        bookId: currentBookId
    };
}
