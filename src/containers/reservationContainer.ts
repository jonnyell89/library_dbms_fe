export function renderReservationContainer(): void {
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");

  if (!reservationContainer) {
    throw new Error("Reservation Container did not render.");
  }

  reservationContainer.innerHTML = `
    <h1>Reservation</h1>
    <div class="reservationContainer__cards"></div>
    <button class="reservationContainer__btn reservationContainer__btn--confirm" type="button" style="display: none">Confirm</button>
  `;
}
