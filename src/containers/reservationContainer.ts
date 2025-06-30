export function renderReservationContainer(): void {
  
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");

  if (!reservationContainer) {
    throw new Error("reservationContainer did not render.");
  }

  reservationContainer.innerHTML = `
    <h1>Reservation</h1>
    <div class="reservationContainer__feed"></div>
    <button class="reservationContainer__btn reservationContainer__btn--confirm" type="button" style="display: none">Confirm</button>
  `;
}
