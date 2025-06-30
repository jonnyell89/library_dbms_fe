import { attachBookCardRemoveButton } from "../components/bookCard";
import { postBook } from "../services/postBook";
import { addSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { appendBookCardToReservationContainer, toggleConfirmButton } from "./reservationContainerEvents";

export function attachBookCardReserveEvent(bookCard: HTMLDivElement, book: BookRequestDTO): void {
    // Captures reserveButton.
    const reserveButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn--reserve");

    // Handles error event.
    if (!reserveButton) {
        throw new Error("reserveButton did not render.");
    }

    reserveButton.addEventListener("click", async () => handleBookCardReserveClick(bookCard, book));
}

async function handleBookCardReserveClick(bookCard: HTMLDivElement, book: BookRequestDTO): Promise<void> {
    try {
        const postedBook: BookResponseDTO = await postBook(book);

        addSelectedBook(postedBook);

        console.log(`${postedBook.title} added to selectedBooks list: `, selectedBooks);

        attachBookCardRemoveButton(bookCard);

        appendBookCardToReservationContainer(bookCard);

        toggleConfirmButton();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
