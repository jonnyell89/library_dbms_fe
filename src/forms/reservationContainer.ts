export function renderReservationContainer(): void {
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");

  if (!reservationContainer) {
    throw new Error("Reservation Container did not render.");
  }

  reservationContainer.innerHTML = `
    <h1>Reservation</h1>
    <div id="reservationContainer__cards"></div>
  `;
}
