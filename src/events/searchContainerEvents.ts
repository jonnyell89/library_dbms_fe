import { mapOLResponseToBookRequestDTO } from "../mappers/mapOLResponseToBookRequestDTO";
import { getSearchResults } from "../services/getSearchResults";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { OLResponse } from "../types/OpenLibraryResponse";
import { getSearchFormValues } from "../utils/getSearchFormValues";
import { setAvailability } from "../utils/setAvailability";
import { resultContainerFeedEvent } from "./resultContainerEvents";

export function attachSearchFormEvent(): void {
    // Caputes searchForm.
    const searchForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    // Handles error event.
    if (!searchForm) {
        throw new Error("searchForm did not render.");
    }

    // Attaches submit event listener to searchForm.
    searchForm.addEventListener("submit", handleSearchFormSubmit);
}    

async function handleSearchFormSubmit(event: Event): Promise<void> {
    // Prevents web browser from reloading after searchForm submission.
    event.preventDefault();

    try {
        const { author, title } = getSearchFormValues();
        const searchResults: OLResponse = await getSearchResults(author, title);
        
        console.log("Open Library Search API response: ", searchResults);

        // Maps OLResponse to BookRequestDTO.
        const books: BookRequestDTO[] = mapOLResponseToBookRequestDTO(searchResults.docs.slice(0, 10));

        // Sets BookRequestDTO[] availability property.
        await setAvailability(books);
        
        // Triggers resultContainerEvents workflow.
        resultContainerFeedEvent(books);
    
    } catch (error) {
        console.error("Failed to connect to the Open Library Search API: ", error);
    }
}
