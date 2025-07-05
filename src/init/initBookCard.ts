import { attachBookCardImage, createBookCard } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { selectContainerElement } from "../utils/selectContainerElement";
import { attachBookCardButtonByAvailability } from "../utils/setAvailability";

export function initBookCard(book: BookRequestDTO, handleBookCardButtonEvent: (bookCard: HTMLDivElement, book: BookRequestDTO | BookResponseDTO) => void): HTMLDivElement {

    const bookCard: HTMLDivElement = createBookCard(book); // Render

    const bookCardImage: HTMLImageElement = selectContainerElement(bookCard, ".bookCard__img"); // Select
    const bookCardButton: HTMLButtonElement = selectContainerElement(bookCard, ".bookCard__btn"); // Select

    attachBookCardImage(bookCardImage, book); // Attach
    attachBookCardButtonByAvailability(bookCardButton, book); // Attach
    bookCardButton.addEventListener("click", async () => handleBookCardButtonEvent(bookCard, book)); // Attach -> Handle

    return bookCard;
}
