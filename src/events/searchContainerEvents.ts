import { mapOLResponseToBookRequestDTO } from "../mappers/mapOLResponseToBookRequestDTO";
import { queryOpenLibraryAPI } from "../services/queryOpenLibraryAPI";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { OLResponse } from "../types/OpenLibraryResponse";
import { getSearchFormValues } from "../utils/getSearchFormValues";
import { setAvailability } from "../utils/setAvailability";
import { resultContainerFeedEvent } from "./resultContainerEvents";

export function attachSearchContainerSubmitEvent(): void {

    const searchForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    if (!searchForm) {
        throw new Error("searchForm did not render.");
    }

    searchForm.addEventListener("submit", handleSearchContainerSubmit);
}    

async function handleSearchContainerSubmit(event: Event): Promise<void> {

    event.preventDefault(); // Prevents web browser from reloading after searchForm submission.

    try {
        const { author, title } = getSearchFormValues();

        const searchResults: OLResponse = await queryOpenLibraryAPI(author, title);
        
        console.log("Open Library Search API response: ", searchResults);

        const books: BookRequestDTO[] = mapOLResponseToBookRequestDTO(searchResults.docs.slice(0, 10));

        await setAvailability(books);
        
        resultContainerFeedEvent(books); // Triggers resultContainerEvents workflow.
    
    } catch (error) {
        console.error("Failed to connect to the Open Library Search API: ", error);
    }
}
