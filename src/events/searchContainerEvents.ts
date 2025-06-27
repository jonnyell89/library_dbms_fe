import type { OLResponse } from "../types/OpenLibraryResponse";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { mapOLResponseToBookRequestDTO } from "../mappers/mapOLResponseToBookRequestDTO";
import { displayResults } from "./resultContainerEvents";
import { formatInput } from "../utils/formatInput";
import type { BookResponseDTO } from "../types/BookResponseDTO";

// attachSearchFormEvent -> mapOLResponseToBookRequestDTO, displayResults.

export function attachSearchFormEvent(): void {
    // Caputes searchForm.
    const searchForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    // Handles error event.
    if (!searchForm) {
        throw new Error("searchForm did not render.");
    }

    // Attaches submit event listener to searchForm.
    searchForm.addEventListener("submit", async function (event) {

        // Prevents web browser from reloading after searchForm submission.
        event.preventDefault();

        const author = (document.getElementById("author") as HTMLInputElement).value;
        const title = (document.getElementById("title") as HTMLInputElement).value;

        // Open Library Search API URL.
        let url = "https://openlibrary.org/search.json?";

        // Attaches search field values to URL.
        if (author && title) {
            url += `author=${formatInput(author)}&title=${formatInput(title)}`;
        } else if (author) {
            url += `author=${formatInput(author)}`;
        } else if (title) {
            url += `title=${formatInput(title)}`;
        } else {
            throw new Error("Both search fields are empty.");
        }

        try {
            // Attempts to GET search field value from API endpoint.
            const response = await fetch(url);

            // Handles error event.
            if (!response.ok) {
                throw new Error("Attempted Open Library Search API GET request encountered an error.");
            }

            // Maps response from API endpoint to OLResponse interface.
            const json: OLResponse = await response.json();
            console.log("Open Library Response: ", json);
            
            // Maps OLResponse interface to BookRequestDTO.
            const books: BookRequestDTO[] = mapOLResponseToBookRequestDTO(json.docs.slice(0, 10));

            // Applies availability to BookRequestDTO asynchronously.
            await checkAvailability(books);
            
            // Triggers resultContainerEvents workflow.
            displayResults(books);

        } catch (error) {
            console.error("Failed to connect to the Open Library Search API: ", error);
        }
    });
}

export async function checkAvailability(books: BookRequestDTO[]): Promise<void> {

    // Spring Boot API endpoint.
    const url = "http://localhost:8080/api/books";
    
    try {
        // Attempts to GET List<BookResponseDTO> from API endpoint.
        const response = await fetch(url);

        // Handles error event.
        if (!response.ok) {
            throw new Error("Attempted Spring Boot API '/api/books' GET request encountered an error.");
        }
        
        // Maps response from API endpoint to BookResponseDTO interface.
        const persistedBooks: BookResponseDTO[] = await response.json();

        // Applies availability to BookRequestDTO.
        for (const book of books) {
            if (isAvailable(persistedBooks, book)) {
                book.availability = "AVAILABLE";
            } else {
                book.availability = "UNAVAILABLE";
            }
        }

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}

export function isAvailable(persistedBooks: BookResponseDTO[], book: BookRequestDTO): boolean {
    return !persistedBooks.some(persistedBook => 
        persistedBook.author === book.author &&
        persistedBook.title === book.title &&
        persistedBook.authorKey === book.authorKey &&
        persistedBook.titleKey === book.titleKey &&
        persistedBook.firstPublishYear === book.firstPublishYear &&
        persistedBook.cover === book.cover &&
        persistedBook.coverEditionKey === book.coverEditionKey
    );
}
