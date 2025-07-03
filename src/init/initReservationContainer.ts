import { renderReservationContainer } from "../containers/reservationContainer";
import { handleReservationContainerConfirmClick } from "../events/reservationContainerEvents";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initReservationContainer(): void {

    const reservationContainer: HTMLElement = renderReservationContainer(); // Render

    // const reservationContainerFeed: HTMLDivElement = selectContainerElement(reservationContainer, ".reservationContainer__feed"); // Select

    const confirmButton: HTMLButtonElement = selectContainerElement(reservationContainer, ".reservationContainer__btn--confirm"); // Select

    confirmButton.addEventListener("click", handleReservationContainerConfirmClick); // Attach -> Handle
}
