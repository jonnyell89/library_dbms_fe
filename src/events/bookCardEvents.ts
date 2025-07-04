import { deleteBookById } from "../services/deleteBookById";
import { createBook } from "../services/createBook";
import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import { toggleReservationContainerConfirm } from "../transitions/toggleReservationContainerConfirm";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { initReservationContainerBookCard } from "../init/initReservationContainerBookCard";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export async function handleBookCardReserveEvent(book: BookRequestDTO): Promise<void> {
    try {
        const createdBook: BookResponseDTO = await createBook(book);

        console.log("Spring Boot API confirmation: ", createdBook);

        addSelectedBook(createdBook);

        console.log(`${createdBook.title} added to selectedBooks list: `, selectedBooks);

        handleBookCardReservation(book);

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

function handleBookCardReservation(book: BookRequestDTO): void {

    const reservationContainerFeed: HTMLDivElement = selectDocumentElement(".reservationContainer__feed");

    const bookCard: HTMLDivElement = initReservationContainerBookCard(book);

    reservationContainerFeed.appendChild(bookCard);

    toggleReservationContainerConfirm();
}

export async function handleBookCardRemoveEvent(bookCard: HTMLDivElement, book: BookResponseDTO): Promise<void> {
    try {
        const deletedBook: string = await deleteBookById(book);

        console.log(`Spring Boot API confirmation: ${deletedBook}`);

        removeSelectedBook(book);

        console.log(`${book.title} removed from selectedBooks list: `, selectedBooks);

        bookCard.remove(); // Removes bookCard from reservationContainer.

        toggleReservationContainerConfirm();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
