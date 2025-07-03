import { attachBookCardImage, attachBookCardReserveButton, createBookCard } from "../components/bookCard";
import { handleBookCardReserveEvent } from "../events/bookCardEvents";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initSearchContainerBookCard(book: BookRequestDTO): HTMLDivElement {

    const bookCard: HTMLDivElement = createBookCard(book); // Render

    const bookCardImage: HTMLImageElement = selectContainerElement(bookCard, ".bookCard__img"); // Select
    const reserveButton: HTMLButtonElement = selectContainerElement(bookCard, ".bookCard__btn"); // Select

    attachBookCardImage(bookCardImage, book); // Attach
    attachBookCardReserveButton(reserveButton); // Attach
    reserveButton.addEventListener("click", async () => handleBookCardReserveEvent(book)); // Attach -> Handle

    return bookCard;
}
