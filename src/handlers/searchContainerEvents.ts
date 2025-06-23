import type { OLResponse } from "../types/OpenLibraryResponse";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { mapOLResponseToBookRequestDTO } from "../mappers/mapOLResponseToBookRequestDTO";
import { displayResults } from "./resultContainerEvents";
import { formatInput } from "../utils/formatInput";

export function attachSearchFormEvent(): void {
    // Caputes bookSearchForm.
    const bookSearchForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    // Handles error event.
    if (!bookSearchForm) {
        throw new Error("Book Search Form did not render.")
    }

    // Attaches submit event listener to bookSearchForm.
    bookSearchForm.addEventListener("submit", async function (event) {

        // Prevents web browser from reloading after bookSearchForm submission.
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
            url += `title=${formatInput(title)};`
        } else {
            throw new Error("Both search fields are empty.")
        }

        try {
            // Attempts to GET search field value from API endpoint.
            const response = await fetch(url);

            if (response.ok) {
                // Maps response from API endpoint to OLResponse interface.
                const data: OLResponse = await response.json();
                console.log("Open Library Response: ", data);
                
                // Maps OLResponse interface to BookRequestDTO.
                const books: BookRequestDTO[] = mapOLResponseToBookRequestDTO(data.docs.slice(0, 10));
                
                // Triggers resultContainerEvents workflow.
                displayResults(books);
            } else {
                const error = await response.text();
                console.log("Error: " + error);
            }
        } catch (e) {
            console.log("Failed to connect to the Open Library Search API.")
        }
    });
}
