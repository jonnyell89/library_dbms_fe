import { assignBookCardImage, attachBookCardReserveButton, createBookCard } from "../components/bookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";  
import { getBookRequestDTOFromOpenLibraryAPI } from "../utils/getBookRequestDTOFromOpenLibraryAPI";
import { attachBookCardReserveEvent } from "./bookCardEvents";

export async function handleSearchContainerFormEvent(event: Event, searchContainerFeed: HTMLDivElement): Promise<void> {

    event.preventDefault(); // Prevents web browser from reloading after searchForm submission.

    try {
        const books: BookRequestDTO[] = await getBookRequestDTOFromOpenLibraryAPI();

        handleSearchContainerFeedEvent(searchContainerFeed, books);

    } catch (error) {
        console.error("Failed to connect to the Open Library Search API: ", error);
    }
}

function handleSearchContainerFeedEvent(searchContainerFeed: HTMLDivElement, books: BookRequestDTO[]): void {

    searchContainerFeed.innerHTML = ""; // Clears searchContainerFeed.

    books.forEach(book => {

        const bookCard: HTMLDivElement = createBookCard(book);

        assignBookCardImage(bookCard, book);

        attachBookCardReserveButton(bookCard);

        attachBookCardReserveEvent(bookCard, book);

        searchContainerFeed.appendChild(bookCard);
    });
}
