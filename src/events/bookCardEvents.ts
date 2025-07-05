import { deleteBookById } from "../services/deleteBookById";
import { createBook } from "../services/createBook";
import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import { toggleReservationContainerConfirm } from "../transitions/toggleReservationContainerConfirm";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { selectDocumentElement } from "../utils/selectDocumentElement";
import { initBookCard } from "../init/initBookCard";

export async function handleBookCardReserveEvent(bookCard: HTMLDivElement, book: BookRequestDTO): Promise<void> {
    try {
        const createdBook: BookResponseDTO = await createBook(book);

        console.log("Spring Boot API confirmation: ", createdBook);

        addSelectedBook(createdBook);

        console.log(`${createdBook.title} added to selectedBooks list: `, selectedBooks);

        bookCard.style.display = "none"; // Hides searchContainerFeed.bookCard

        handleBookCardReservation(createdBook);

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

function handleBookCardReservation(createdBook: BookResponseDTO): void {

    const reservationContainerFeed: HTMLDivElement = selectDocumentElement(".reservationContainer__feed");

    createdBook.availability = "RESERVED"; // Sets book.availability

    const bookCard: HTMLDivElement = initBookCard(createdBook, () => handleBookCardRemoveEvent);

    reservationContainerFeed.appendChild(bookCard);

    toggleReservationContainerConfirm();
}

export async function handleBookCardRemoveEvent(bookCard: HTMLDivElement, createdBook: BookResponseDTO): Promise<void> {
    try {
        const deletedBook: string = await deleteBookById(createdBook);

        console.log(`Spring Boot API confirmation: ${deletedBook}`);

        removeSelectedBook(createdBook);

        console.log(`${createdBook.title} removed from selectedBooks list: `, selectedBooks);

        bookCard.remove(); // Removes bookCard from reservationContainer.

        toggleReservationContainerConfirm();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
