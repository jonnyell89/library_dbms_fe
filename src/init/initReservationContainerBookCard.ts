import { attachBookCardImage, attachBookCardRemoveButton, createBookCard } from "../components/bookCard";
import { handleBookCardRemoveEvent } from "../events/bookCardEvents";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initReservationContainerBookCard(book: BookRequestDTO): HTMLDivElement {
    
    const bookCard: HTMLDivElement = createBookCard(book); // Render

    const bookCardImage: HTMLImageElement = selectContainerElement(bookCard, ".bookCard__img"); // Select
    const removeButton: HTMLButtonElement = selectContainerElement(bookCard, ".bookCard__btn"); // Select

    attachBookCardImage(bookCardImage, book); // Attach
    attachBookCardRemoveButton(removeButton); // Attach
    removeButton.addEventListener("click", async () => handleBookCardRemoveEvent(bookCard, book)); // Attach -> Handle

    return bookCard;
}
