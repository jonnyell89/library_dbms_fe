import type { OLResponse } from "../types/OpenLibraryResponse";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import { mapOLResponseToBookRequestDTO } from "../mappers/mapOLResponseToBookRequestDTO";
import { displaySearchBooks } from "./resultContainerEvents";
import { formatInput } from "../utils/formatInput";

export function attachSearchFormEvent(): void {
    const bookSearchForm = document.getElementById("searchContainer__form") as HTMLFormElement | null;

    if (!bookSearchForm) {
        throw new Error("Book Search Form did not render.")
    }

    bookSearchForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const author = (document.getElementById("author") as HTMLInputElement).value;
        const title = (document.getElementById("title") as HTMLInputElement).value;

        let url = "https://openlibrary.org/search.json?";

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
            const response = await fetch(url);

            if (response.ok) {
                const data: OLResponse = await response.json();
                console.log("Open Library Response: ", data);
                
                const books: BookRequestDTO[] = mapOLResponseToBookRequestDTO(data.docs.slice(0, 10));
                displaySearchBooks(books);
            } else {
                const error = await response.text();
                console.log("Error: " + error);
            }
        } catch (e) {
            console.log("Failed to connect to the Open Library API.")
        }
    });
}
