import { renderReservationContainer } from "../containers/reservationContainer";
import { attachConfirmButtonEvent } from "../handlers/reservationContainerEvents";

export function initReservation(): void {
    renderReservationContainer();
    attachConfirmButtonEvent();
}
