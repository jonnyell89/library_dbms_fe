import { selectDocumentElement } from "../utils/selectDocumentElement";

export function renderReservationContainer(): HTMLElement {
  
  const reservationContainer: HTMLElement = selectDocumentElement(".reservationContainer");

  reservationContainer.innerHTML = `
    <h1>Reservation</h1>
    <div class="reservationContainer__feed"></div>
    <button class="reservationContainer__btn reservationContainer__btn--confirm" type="button">Confirm</button>
  `;

  return reservationContainer;
}
