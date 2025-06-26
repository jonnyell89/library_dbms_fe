import { removeSelectedBook } from "../state";
import { mapReservationRequestDTO } from "../mappers/mapReservationRequestDTO";
import { mapReservedBookRequestDTO } from "../mappers/mapReservedBookRequestDTO";
import { getSelectedBooks, selectedBooks, setCurrentReservation } from "../state";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";
import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import type { ReservedBookResponseDTO } from "../types/ReservedBookResponseDTO";

// attachRemoveButtonEvent -> removeSelectedBook, toggleConfirmButton -> attachConfirmButtonEvent -> mapReservationRequestDTO, setCurrentReservation, attachReservedBooksToReservation -> getSelectedBooks, mapReservedBookRequestDTO.

export function attachRemoveButtonEvent(removeButton: HTMLButtonElement, bookCard: HTMLElement, book: BookResponseDTO): void {
    // Attaches click event listener to removeButton.
    removeButton.addEventListener("click", async () => {

        try {
            // Attempts to DELETE Book object from API endpoint.
            const response = await fetch(`http://localhost:8080/api/books/${book.bookId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`${book.title} deleted from bookRespository.`)
            } else {
                throw new Error(`Failed to delete ${book.title} from bookrepository.`);
            }

            // Removes bookCard from reservationContainerFeed.
            bookCard.remove();

            // Removes BookResponseDTO from selectedBooks list held in state.
            removeSelectedBook(book);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles confirmButton state.
            toggleConfirmButton();
        } catch (error) {
            console.error(`Failed to remove ${book.title} from reservationContainerFeed: `, error)
        }
    });
}

export function toggleConfirmButton(): void {
    // Captures confirmButton.
    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    // Handles error event.
    if (!confirmButton) {
        throw new Error("Confirm Button did not render.");
    }

    // Toggles confirmButton display.
    confirmButton.style.display = selectedBooks.length > 0 ? "block" : "none";
}

export function attachConfirmButtonEvent(): void {
    // Captures confirmButton.
    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    // Handles error event.
    if (!confirmButton) {
        throw new Error("Confirm Button did not render.");
    }

    // Attaches click event listener to confirmButton.
    confirmButton.addEventListener("click", async () => {
        
        // Maps data to ReservationRequestDTO.
        const reservation: ReservationRequestDTO = mapReservationRequestDTO();
        
        try {
            // Attempts to POST ReservationRequestDTO to API endpoint.
            const response = await fetch("http://localhost:8080/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            })

            if (response.ok) {
                // Maps response from API endpoint to ReservationResponseDTO.
                const savedReservation: ReservationResponseDTO = await response.json();
                console.log("Reservation saved to reservationRepository: ", savedReservation);

                // Sets currentReservation to state.
                setCurrentReservation(savedReservation);

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
    
    // Gets selectedBooks list of BookResponseDTOs held in state.
    const selectedBooks: BookResponseDTO[] = getSelectedBooks();
    
    // forEach cannot work asynchronously, use for...of Loop instead.
    for (const selectedBook of selectedBooks) {
        try {
            // Maps data to ReservedBookRequestDTO.
            const reservedBook: ReservedBookRequestDTO = mapReservedBookRequestDTO(selectedBook.bookId);

            // Attempts to POST ReservedBookRequestDTO to API endpoint.
            const response = await fetch("http://localhost:8080/api/reserved-books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservedBook),
            })

            if (response.ok) {
                // Maps response from API endpoint to ReservedBookResponseDTO.
                const savedReservedBook: ReservedBookResponseDTO = await response.json();
                console.log("ReservedBook saved to reservedBook repository: ", savedReservedBook);
            } else {
                console.error("Failed to save reservedBook to reservedBookRepository.");
            }
        } catch (error) {
            console.error("Failed to reserve book:", error);
        }
    }
};
