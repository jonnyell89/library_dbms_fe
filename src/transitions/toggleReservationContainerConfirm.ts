import { selectedBooks } from "../state";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export function toggleReservationContainerConfirm(): void {

    const confirmButton: HTMLButtonElement = selectDocumentElement(".reservationContainer__btn--confirm");

    confirmButton.style.display = selectedBooks.length > 0 ? "block" : "none";
}
