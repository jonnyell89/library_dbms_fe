import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import { currentReservationId } from "../state";

export function mapReservedBookRequestDTO(currentBookId: number): ReservedBookRequestDTO {

    if (currentReservationId === null) {
        throw new Error("No currentReservationId set to state.");
    }

    return {
        reservationId: currentReservationId,
        bookId: currentBookId
    };
}
