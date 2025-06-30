import { attachBookCardRemoveButton, cloneBookCard } from "../components/bookCard";
import { deleteBook } from "../services/deleteBook";
import { postBook } from "../services/postBook";
import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import { toggleReservationContainerConfirm } from "../transitions/toggleReservationContainerConfirm";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { reservationContainerFeedEvent } from "./reservationContainerEvents";

export function attachBookCardReserveEvent(bookCard: HTMLDivElement, book: BookRequestDTO): void {

    const reserveButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn--reserve");

    if (!reserveButton) {
        throw new Error("reserveButton did not render.");
    }

    reserveButton.addEventListener("click", async () => handleBookCardReserveClick(bookCard, book));
}

async function handleBookCardReserveClick(bookCard: HTMLDivElement, book: BookRequestDTO): Promise<void> {
    try {
        const postedBook: BookResponseDTO = await postBook(book);

        console.log("Spring Boot API confirmation: ", postedBook);

        addSelectedBook(postedBook);

        console.log(`${postedBook.title} added to selectedBooks list: `, selectedBooks);

        const reservedBookCard: HTMLDivElement = cloneBookCard(bookCard);

        attachBookCardRemoveButton(reservedBookCard);

        attachBookCardRemoveEvent(reservedBookCard, postedBook);

        reservationContainerFeedEvent(reservedBookCard); // Appends reservedBookCard to reservationContainer.

        toggleReservationContainerConfirm();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

export function attachBookCardRemoveEvent(bookCard: HTMLDivElement, book: BookResponseDTO): void {

    const removeButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn--remove");

    if (!removeButton) {
        throw new Error("removeButton did not render.");
    }

    removeButton.addEventListener("click", async () => handelBookCardRemoveClick(bookCard, book));
}

async function handelBookCardRemoveClick(bookCard: HTMLDivElement, book: BookResponseDTO): Promise<void> {
    try {
        const deletedBook: string = await deleteBook(book);

        console.log(`Spring Boot API confirmation: ${deletedBook}`);

        removeSelectedBook(book);

        console.log(`${book.title} removed from selectedBooks list: `, selectedBooks);

        bookCard.remove(); // Removes bookCard from reservationContainer.

        toggleReservationContainerConfirm();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
