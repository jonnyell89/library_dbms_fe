import { isSelectedBook } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";

export function toggleSearchContainerBookCard(book: BookRequestDTO): void {

    const bookCard = document.getElementById(`searchContainer__${book.titleKey}`)

    if (!bookCard) {
        throw new Error("bookCard did not render.");
    }

    bookCard.style.display = isSelectedBook(book) ? "none" : "block";
}
