import { renderReservationContainer } from "../containers/reservationContainer";
import { handleReservationContainerFeedEvent } from "../events/reservationContainerEvents";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initReservationContainer(): void {

    const reservationContainer: HTMLElement = renderReservationContainer(); // Render

    const confirmButton: HTMLButtonElement = selectContainerElement(reservationContainer, ".reservationContainer__btn--confirm"); // Select

    confirmButton.addEventListener("click", handleReservationContainerFeedEvent); // Attach -> Handle
}
