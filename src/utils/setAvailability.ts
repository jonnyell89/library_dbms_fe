import { attachBookCardRemoveButton, attachBookCardReserveButton, attachBookCardUnavailableButton } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";

export function setAvailability(book: BookRequestDTO | BookResponseDTO, availability: "AVAILABLE" | "RESERVED" | "UNAVAILABLE"): void {

    book.availability = availability;
}

export function isAvailable(persistedBooks: BookResponseDTO[], book: BookRequestDTO): void {

    if (isPersisted(persistedBooks, book)) {
        book.availability = "UNAVAILABLE";
    } else {
        book.availability = "AVAILABLE";
    }
}

function isPersisted(persistedBooks: BookResponseDTO[], book: BookRequestDTO): boolean {
    return persistedBooks.some(persistedBook => 
        persistedBook.author === book.author &&
        persistedBook.title === book.title &&
        persistedBook.authorKey === book.authorKey &&
        persistedBook.titleKey === book.titleKey &&
        persistedBook.firstPublishYear === book.firstPublishYear &&
        persistedBook.cover === book.cover &&
        persistedBook.coverEditionKey === book.coverEditionKey
    )
}

export function attachBookCardButtonByAvailability(bookCardButton: HTMLButtonElement, book: BookRequestDTO | BookResponseDTO): void {
    
    switch (book.availability) {
        case "AVAILABLE":
            attachBookCardReserveButton(bookCardButton);
            break;
        case "RESERVED":
            attachBookCardRemoveButton(bookCardButton);
            break;
        case "UNAVAILABLE":
            attachBookCardUnavailableButton(bookCardButton);
            break;
    }
}
