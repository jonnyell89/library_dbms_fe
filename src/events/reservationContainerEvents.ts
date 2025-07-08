import { mapReservationRequestDTO } from "../mappers/mapReservationRequestDTO";
import { mapReservedBookRequestDTO } from "../mappers/mapReservedBookRequestDTO";
import { createReservation } from "../services/createReservation";
import { createReservedBook } from "../services/createReservedBook";
import { clearSelectedBooks, getSelectedBooks, setCurrentReservation } from "../state";
import { toggleReservationContainer } from "../transitions/toggleReservationContainer";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";
import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import type { ReservedBookResponseDTO } from "../types/ReservedBookResponseDTO";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export async function handleReservationContainerFeedEvent(): Promise<void> {

    try {
        const reservation: ReservationRequestDTO = mapReservationRequestDTO();

        const createdReservation: ReservationResponseDTO = await createReservation(reservation);

        console.log("Reservation saved to reservationRepository: ", createdReservation);

        setCurrentReservation(createdReservation);

        await attachSelectedBooksToReservation();

        const reservationContainerFeed: HTMLDivElement = selectDocumentElement(".reservationContainer__feed");

        reservationContainerFeed.innerHTML = ""; // Clears reservationContainerFeed.

        clearSelectedBooks();

        toggleReservationContainer();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

async function attachSelectedBooksToReservation(): Promise<void> {

    const selectedBooks: BookResponseDTO[] = getSelectedBooks();

    for (const selectedBook of selectedBooks) {

        try {
            const reservedBook: ReservedBookRequestDTO = mapReservedBookRequestDTO(selectedBook.bookId);
            
            const createdReservedBook: ReservedBookResponseDTO = await createReservedBook(reservedBook);

            console.log("ReservedBook saved to reservedBookRepository: ", createdReservedBook);

        } catch (error) {
            console.error("Failed to connect to the Spring Boot API: ", error);
        }
    }
}
