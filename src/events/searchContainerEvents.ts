import { initSearchContainerBookCard } from "../init/initSearchContainerBookCard";
import { getAllBooks } from "../services/getAllBooks";
import type { BookRequestDTO } from "../types/BookRequestDTO";  
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { getBookRequestDTOFromOpenLibraryAPI } from "../utils/getBookRequestDTOFromOpenLibraryAPI";
import { isAvailable } from "../utils/setAvailability";
import { handleBookCardReserveEvent } from "./bookCardEvents";

export async function handleSearchContainerFormEvent(event: SubmitEvent, searchContainerForm: HTMLFormElement, searchContainerFeed: HTMLDivElement): Promise<void> {

    event.preventDefault(); // Prevents web browser from reloading after searchForm submission.

    try {
        const books: BookRequestDTO[] = await getBookRequestDTOFromOpenLibraryAPI(searchContainerForm);

        handleSearchContainerFeedEvent(searchContainerFeed, books);

    } catch (error) {
        console.error("Failed to connect to the Open Library Search API: ", error);
    }
}

async function handleSearchContainerFeedEvent(searchContainerFeed: HTMLDivElement, books: BookRequestDTO[]): Promise<void> {

    searchContainerFeed.innerHTML = ""; // Clears searchContainerFeed.

    try {
        const persistedBooks: BookResponseDTO[] = await getAllBooks();

        books.forEach(book => {

            isAvailable(persistedBooks, book);

            const bookCard: HTMLDivElement = initSearchContainerBookCard(book, handleBookCardReserveEvent);

            searchContainerFeed.appendChild(bookCard);
        });

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}
