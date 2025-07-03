import { initSearchContainerBookCard } from "../init/initSearchContainerBookCard";
import type { BookRequestDTO } from "../types/BookRequestDTO";  
import { getBookRequestDTOFromOpenLibraryAPI } from "../utils/getBookRequestDTOFromOpenLibraryAPI";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export async function handleSearchContainerFormEvent(event: SubmitEvent): Promise<void> {

    event.preventDefault(); // Prevents web browser from reloading after searchForm submission.

    try {
        const books: BookRequestDTO[] = await getBookRequestDTOFromOpenLibraryAPI();

        handleSearchContainerFeedEvent(books);

    } catch (error) {
        console.error("Failed to connect to the Open Library Search API: ", error);
    }
}

function handleSearchContainerFeedEvent(books: BookRequestDTO[]): void {

    const searchContainerFeed = selectDocumentElement(".searchContainer__feed");

    searchContainerFeed.innerHTML = ""; // Clears searchContainerFeed.

    books.forEach(book => {

        const bookCard: HTMLDivElement = initSearchContainerBookCard(book);

        searchContainerFeed.appendChild(bookCard);
    });
}
