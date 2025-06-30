import { selectedBooks } from "../state";

export function toggleConfirmButton(): void {
    // Captures confirmButton.
    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    // Handles error event.
    if (!confirmButton) {
        throw new Error("confirmButton did not render.");
    }

    // Toggles confirmButton display.
    confirmButton.style.display = selectedBooks.length > 0 ? "block" : "none";
}
