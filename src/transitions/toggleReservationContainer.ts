import { selectedBooks } from "../state";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export function toggleReservationContainer(): void {

    const reservationContainer: HTMLElement = selectDocumentElement(".reservationContainer");

    reservationContainer.style.display = selectedBooks.length > 0 ? "block" : "none";
}
