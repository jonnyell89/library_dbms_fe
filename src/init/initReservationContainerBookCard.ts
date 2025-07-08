import { attachBookCardImage, createBookCard, setBookCardKey } from "../components/bookCard";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { selectContainerElement } from "../utils/selectContainerElement";
import { attachBookCardButtonByAvailability } from "../utils/setAvailability";

export function initReservationContainerBookCard(createdBook: BookResponseDTO, handleBookCardButtonEvent: (createdBookCard: HTMLDivElement, createdBook: BookResponseDTO) => void): HTMLDivElement {

    const createdBookCard: HTMLDivElement = createBookCard(createdBook); // Render

    const createdBookCardImage: HTMLImageElement = selectContainerElement(createdBookCard, ".bookCard__img"); // Select
    const createdBookCardButton: HTMLButtonElement = selectContainerElement(createdBookCard, ".bookCard__btn"); // Select

    setBookCardKey(createdBookCard, createdBook); // Attach
    attachBookCardImage(createdBookCardImage, createdBook); // Attach
    attachBookCardButtonByAvailability(createdBookCardButton, createdBook); // Attach
    createdBookCardButton.addEventListener("click", async () => handleBookCardButtonEvent(createdBookCard, createdBook)); // Attach -> Handle

    return createdBookCard;
}
