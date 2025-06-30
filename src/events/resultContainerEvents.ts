import { assignBookCardImage, attachBookCardReserveButton, createBookCard } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { attachBookCardReserveEvent } from "./bookCardEvents";

export function resultContainerFeedEvent(books: BookRequestDTO[]): void {
    // Captures resultContainerFeed.
    const resultContainerFeed = document.querySelector<HTMLDivElement>(".resultContainer__feed");

    // Handles error event.
    if (!resultContainerFeed) {
        throw new Error("resultContainerFeed did not render.");
    }

    // Clears resultContainerFeed.
    resultContainerFeed.innerHTML = "";

    books.forEach(book => {

        const bookCard = createBookCard(book);

        assignBookCardImage(bookCard, book);

        attachBookCardReserveButton(bookCard);

        attachBookCardReserveEvent(bookCard, book);

        resultContainerFeed.appendChild(bookCard);
    });
}
