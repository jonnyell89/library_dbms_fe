import { renderReservationContainer } from "../containers/reservationContainer";
import { attachConfirmButtonEvent } from "../events/reservationContainerEvents";

export function initReservation(): void {
    renderReservationContainer();
    attachConfirmButtonEvent();
}
