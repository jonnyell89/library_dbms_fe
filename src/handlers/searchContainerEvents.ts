import type { OLResponse, OLDetails } from "../types/OpenLibraryResponse";
import { formatInput } from "../utils/formatInput";

export function attachSearchFormEventListeners(): void {
    const bookSearchForm = document.getElementById("searchContainer__form") as HTMLFormElement | null;

    if (!bookSearchForm) {
        throw new Error("Book Search Form did not render.")
    }

    bookSearchForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // const author = (document.getElementById("author") as HTMLInputElement).value;
        // const title = (document.getElementById("title") as HTMLInputElement).value;

        // const authorFormat = formatInput(author);
        // const titleFormat = formatInput(title);

        // const url = `https://openlibrary.org/search.json?title=${titleFormat}`;
        const testURL = `https://openlibrary.org/search.json?title=the+lord+of+the+rings`

        try {
            const response = await fetch(testURL);

            if (response.ok) {
                const data: OLResponse = await response.json();
                console.log("Open Library Response: ", data);
                // Book display to the DOM
            } else {
                const error = await response.text();
                console.log("Error: " + error);
            }
        } catch (e) {
            console.log("Failed to connect to the Open Library API.")
        }
    });
}
