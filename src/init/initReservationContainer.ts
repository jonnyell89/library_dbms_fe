import { renderReservationContainer } from "../containers/reservationContainer";
import { attachReservationContainerConfirmEvent } from "../events/reservationContainerEvents";


export function initReservationContainer(): void {

    renderReservationContainer();

    attachReservationContainerConfirmEvent();
}
