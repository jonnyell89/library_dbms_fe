import { selectedBooks } from "../state";

export function toggleReservationContainerConfirm(): void {

    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    if (!confirmButton) {
        throw new Error("confirmButton did not render.");
    }

    confirmButton.style.display = selectedBooks.length > 0 ? "block" : "none";
}
