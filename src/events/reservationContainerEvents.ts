import { mapReservationRequestDTO } from "../mappers/mapReservationRequestDTO";
import { mapReservedBookRequestDTO } from "../mappers/mapReservedBookRequestDTO";
import { createReservation } from "../services/createReservation";
import { createReservedBook } from "../services/createReservedBook";
import { getSelectedBooks, setCurrentReservation } from "../state";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import type { ReservationRequestDTO } from "../types/ReservationRequestDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";
import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import type { ReservedBookResponseDTO } from "../types/ReservedBookResponseDTO";

export function reservationContainerFeedEvent(bookCard: HTMLDivElement): void {

    const reservationContainerFeed = document.querySelector<HTMLDivElement>(".reservationContainer__feed");

    if (!reservationContainerFeed) {
        throw new Error("reservationContainerFeed did not render.");
    }

    reservationContainerFeed.appendChild(bookCard);
}

export function attachReservationContainerConfirmEvent(): void {

    const confirmButton = document.querySelector<HTMLButtonElement>(".reservationContainer__btn--confirm");

    if (!confirmButton) {
        throw new Error("confirmButton did not render.");
    }

    confirmButton.addEventListener("click", handleReservationContainerConfirmClick);
}

async function handleReservationContainerConfirmClick(): Promise<void> {
    try {
        const reservation: ReservationRequestDTO = mapReservationRequestDTO();

        const postedReservation: ReservationResponseDTO = await createReservation(reservation);

        console.log("Reservation saved to reservationRepository: ", postedReservation);

        setCurrentReservation(postedReservation);

        await attachSelectedBooksToReservation();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

export async function attachSelectedBooksToReservation(): Promise<void> {

    const selectedBooks: BookResponseDTO[] = getSelectedBooks();

    for (const selectedBook of selectedBooks) {

        try {
            const reservedBook: ReservedBookRequestDTO = mapReservedBookRequestDTO(selectedBook.bookId);
            
            const postedReservedBook: ReservedBookResponseDTO = await createReservedBook(reservedBook);

            console.log("ReservedBook saved to reservedBookRepository: ", postedReservedBook);

        } catch (error) {
            console.error("Failed to connect to the Spring Boot API: ", error);
        }
    }
}
