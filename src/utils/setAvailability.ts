import { getPersistedBooks } from "../services/getPersistedBooks";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";

export async function setAvailability(books: BookRequestDTO[]): Promise<void> {

    try {
        const persistedBooks: BookResponseDTO[] = await getPersistedBooks();

        // Applies availability to BookRequestDTO.
        for (const book of books) {
            if (isPersisted(persistedBooks, book)) {
                book.availability = "UNAVAILABLE";
            } else {
                book.availability = "AVAILABLE";
            }
        }

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
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
