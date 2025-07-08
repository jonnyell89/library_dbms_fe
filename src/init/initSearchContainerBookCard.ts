import { attachBookCardImage, createBookCard, setBookCardKey } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { selectContainerElement } from "../utils/selectContainerElement";
import { attachBookCardButtonByAvailability } from "../utils/setAvailability";

export function initSearchContainerBookCard(book: BookRequestDTO, handleBookCardButtonEvent: (bookCard: HTMLDivElement, book: BookRequestDTO) => void): HTMLDivElement {

    const bookCard: HTMLDivElement = createBookCard(book); // Render

    const bookCardImage: HTMLImageElement = selectContainerElement(bookCard, ".bookCard__img"); // Select
    const bookCardButton: HTMLButtonElement = selectContainerElement(bookCard, ".bookCard__btn"); // Select

    setBookCardKey(bookCard, book); // Attach
    attachBookCardImage(bookCardImage, book); // Attach
    attachBookCardButtonByAvailability(bookCardButton, book); // Attach
    bookCardButton.addEventListener("click", async () => handleBookCardButtonEvent(bookCard, book)); // Attach -> Handle

    return bookCard;
}
