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

        // Spring Boot API endpoint.
        const url = `http://localhost:8080/api/books/${book.bookId}`;

        try {
            // Attempts to DELETE Book object from API endpoint.
            const response = await fetch(url, {
                method: "DELETE",
            });

            // Handles error event.
            if (!response.ok) {
                throw new Error("Attempted Spring Boot API '/api/books' DELETE request encountered an error.");
            }
            
            console.log(`${book.title} successfully deleted from bookRespository.`)

            // Removes bookCard from reservationContainerFeed.
            bookCard.remove();

            // Removes BookResponseDTO from selectedBooks list held in state.
            removeSelectedBook(book);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles confirmButton state.
            toggleConfirmButton();

        } catch (error) {
            console.error("Failed to connect to the Spring Boot API: ", error)
        }
    });
}

export function toggleConfirmButton(): void {
    // Captures confirmButton.
    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    // Handles error event.
    if (!confirmButton) {
        throw new Error("confirmButton did not render.");
    }

    // Toggles confirmButton display.
    confirmButton.style.display = selectedBooks.length > 0 ? "block" : "none";
}

export function attachConfirmButtonEvent(): void {
    // Captures confirmButton.
    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    // Handles error event.
    if (!confirmButton) {
        throw new Error("confirmButton did not render.");
    }

    // Attaches click event listener to confirmButton.
    confirmButton.addEventListener("click", async () => {
        
        // Maps Date and currentMember data to ReservationRequestDTO.
        const reservation: ReservationRequestDTO = mapReservationRequestDTO();

        // Spring Boot API endpoint.
        const url = "http://localhost:8080/api/reservations";
        
        try {
            // Attempts to POST ReservationRequestDTO to API endpoint.
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            })

            if (!response.ok) {
                throw new Error("Attempted Spring Boot API '/api/reservations' POST request encountered an error.");
            }

            // Maps response from API endpoint to ReservationResponseDTO.
            const savedReservation: ReservationResponseDTO = await response.json();
            console.log("Reservation saved to reservationRepository: ", savedReservation);

            // Sets currentReservation to state.
            setCurrentReservation(savedReservation);

            // To add attachReservedBooksToReservation asynchronously.
            await attachReservedBooksToReservation();

        } catch (error) {
            console.error("Failed to connect to the Spring Boot API: ", error);
        }
    });
}

export async function attachReservedBooksToReservation(): Promise<void> {
    
    // Gets selectedBooks list of BookResponseDTOs held in state.
    const selectedBooks: BookResponseDTO[] = getSelectedBooks();

    // Spring Boot API endpoint.
    const url = "http://localhost:8080/api/reserved-books";
    
    // forEach cannot work asynchronously, use for...of Loop instead.
    for (const selectedBook of selectedBooks) {
        try {
            // Maps data to ReservedBookRequestDTO.
            const reservedBook: ReservedBookRequestDTO = mapReservedBookRequestDTO(selectedBook.bookId);

            // Attempts to POST ReservedBookRequestDTO to API endpoint.
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservedBook),
            })

            if (!response.ok) {
                throw new Error("Attempted Spring Boot API '/api/reserved-books' POST request encountered an error.");
            }

            // Maps response from API endpoint to ReservedBookResponseDTO.
            const savedReservedBook: ReservedBookResponseDTO = await response.json();
            console.log("ReservedBook saved to reservedBookRepository: ", savedReservedBook);            

        } catch (error) {
            console.error("Failed to connect to the Spring Boot API: ", error);
        }
    };
}
