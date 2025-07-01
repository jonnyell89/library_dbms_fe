export function toggleReservationContainer(): void {

    const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");

    if (!reservationContainer) {
        throw new Error("reservationContainer did not render.");
    }

    const ishidden = reservationContainer.style.display === "none";

    reservationContainer.style.display = ishidden ? "block" : "none";
}
