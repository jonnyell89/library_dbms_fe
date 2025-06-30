import { assignBookCardImage, attachBookCardReserveButton, createBookCard } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { attachBookCardReserveEvent } from "./bookCardEvents";

export function resultContainerFeedEvent(books: BookRequestDTO[]): void {

    const resultContainerFeed = document.querySelector<HTMLDivElement>(".resultContainer__feed");

    if (!resultContainerFeed) {
        throw new Error("resultContainerFeed did not render.");
    }

    resultContainerFeed.innerHTML = ""; // Clears resultContainerFeed.

    books.forEach(book => {

        const bookCard: HTMLDivElement = createBookCard(book);

        assignBookCardImage(bookCard, book);

        attachBookCardReserveButton(bookCard);

        attachBookCardReserveEvent(bookCard, book);

        resultContainerFeed.appendChild(bookCard);
    });
}
