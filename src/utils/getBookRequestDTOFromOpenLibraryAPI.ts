import { mapSearchResultsToBookRequestDTO } from "../mappers/mapSearchResultsToBookRequestDTO";
import { queryOpenLibraryAPI } from "../services/queryOpenLibraryAPI";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { OLResponse } from "../types/OpenLibraryResponse";
import { getSearchContainerFormValues } from "./getSearchContainerFormValues";

export async function getBookRequestDTOFromOpenLibraryAPI(searchContainerForm: HTMLFormElement): Promise<BookRequestDTO[]> {

    const { author, title } = getSearchContainerFormValues(searchContainerForm);

    const searchResults: OLResponse = await queryOpenLibraryAPI(author, title);
    
    console.log("Open Library Search API response: ", searchResults);

    const books: BookRequestDTO[] = mapSearchResultsToBookRequestDTO(searchResults.docs.slice(0, 10));

    return books;
}
