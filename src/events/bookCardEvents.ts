import { deleteBookById } from "../services/deleteBookById";
import { createBook } from "../services/createBook";
import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { selectDocumentElement } from "../utils/selectDocumentElement";
import { initReservationContainerBookCard } from "../init/initReservationContainerBookCard";
import { toggleElement } from "../transitions/toggleElement";
import { setAvailability } from "../utils/setAvailability";
import { toggleSearchContainerBookCard } from "../transitions/toggleSearchContainerBookCard";
import { toggleReservationContainer } from "../transitions/toggleReservationContainer";

export async function handleBookCardReserveEvent(bookCard: HTMLDivElement, book: BookRequestDTO): Promise<void> {
    try {
        const createdBook: BookResponseDTO = await createBook(book);

        console.log("Spring Boot API confirmation: ", createdBook);

        addSelectedBook(createdBook);

        console.log(`${createdBook.title} added to selectedBooks list: `, selectedBooks);

        toggleElement(bookCard); // Hides bookCard in searchContainerFeed context.

        handleBookCardReservation(createdBook);

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

function handleBookCardReservation(createdBook: BookResponseDTO): void {

    const reservationContainerFeed: HTMLDivElement = selectDocumentElement(".reservationContainer__feed");

    setAvailability(createdBook, "RESERVED");

    const createdBookCard: HTMLDivElement = initReservationContainerBookCard(createdBook, handleBookCardRemoveEvent);

    reservationContainerFeed.appendChild(createdBookCard);

    toggleReservationContainer();
}

export async function handleBookCardRemoveEvent(createdBookCard: HTMLDivElement, createdBook: BookResponseDTO): Promise<void> {
    try {

        const deletedBook: string = await deleteBookById(createdBook);

        console.log(`Spring Boot API confirmation: ${deletedBook}`);

        removeSelectedBook(createdBook);

        console.log(`${createdBook.title} removed from selectedBooks list: `, selectedBooks);

        toggleSearchContainerBookCard(createdBookCard);

        createdBookCard.remove(); // Removes createdBookCard from reservationContainer context.

        toggleReservationContainer();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
