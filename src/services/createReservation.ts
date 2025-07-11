import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";

export async function createReservation(reservation: ReservationRequestDTO): Promise<ReservationResponseDTO> {

    const url = "http://localhost:8080/api/reservations";

    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(reservation),
    });

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API POST request encountered an error at: ${url}`);
    }

    return await response.json();
}
