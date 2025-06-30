import { isSelectedBook } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";

export function toggleResultContainerBookCard(book: BookRequestDTO): void {

    const bookCard = document.getElementById(`resultContainer__${book.titleKey}`)

    if (!bookCard) {
        throw new Error("bookCard did not render.");
    }

    bookCard.style.display = isSelectedBook(book) ? "none" : "block";
}
