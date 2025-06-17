import { mapReservationRequestDTO } from "../mappers/mapReservationRequestDTO";
import { mapReservedBookRequestDTO } from "../mappers/mapReservedBookRequestDTO";
import { getSelectedBooks, selectedBooks, setCurrentReservationId } from "../state";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";
import type { ReservedBookResponseDTO } from "../types/ReservedBookResponseDTO";

export function toggleConfirmButton(): void {
    const confirmButton = document.querySelector<HTMLButtonElement>(".confirmButton");

    if (!confirmButton) {
        throw new Error("Confirm Button did not render.");
    }

    if (selectedBooks.length > 0) {
        confirmButton.style.display = "block";
    } else {
        confirmButton.style.display = "none";
    }
}

export function attachConfirmButtonEvent(): void {
    const confirmButton = document.querySelector<HTMLButtonElement>(".confirmButton");

    if (!confirmButton) {
        throw new Error("Confirm Button did not render.");
    }

    confirmButton.addEventListener("click", async () => {
        const reservation: ReservationRequestDTO = mapReservationRequestDTO();
        
        try {
            const response = await fetch("http://localhost:8080/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            })

            if (response.ok) {
                const savedReservation: ReservationResponseDTO = await response.json();
                console.log("Reservation saved to reservationRepository: ", savedReservation);

                // Sets currentReservationId globally.
                setCurrentReservationId(savedReservation.reservationId);

                // To add attachReservedBooksToReservation:
                await attachReservedBooksToReservation()
            } else {
                console.error("Failed to save reservation to reservationRepository.");
            }
        } catch (error) {
            console.error("Failed to make reservation: ", error);
        }
    })
}

export async function attachReservedBooksToReservation(): Promise<void> {
    
    const selectedBooks: BookResponseDTO[] = getSelectedBooks();
    
    for (const selectedBook of selectedBooks) {
        try {
            const reservedBook = mapReservedBookRequestDTO(selectedBook.bookId);

            const response = await fetch("http://localhost:8080/api/reserved-books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservedBook),
            })

            if (response.ok) {
                const savedReservedBook: ReservedBookResponseDTO = await response.json();
                console.log("ReservedBook saved to reservedBook repository: ", savedReservedBook);
            } else {
                console.error("Failed to save reservedBook to reservedBookRepository.");
            }
        } catch (error) {
            console.error("Failed to reserveBook:", error);
        }
    }
};
