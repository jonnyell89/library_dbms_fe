import type { OLResponse } from "../types/OpenLibraryResponse";
import { formatOpenLibraryURL } from "../utils/formatOpenLibraryURL";

export async function getSearchResults(author?: string, title?: string): Promise<OLResponse> {
    // Open Library Search API URL.
    const url = formatOpenLibraryURL(author, title);

    // Attempts to GET search field values from API endpoint.
    const response = await fetch(url);

    // Handles error event.
    if (!response.ok) {
        throw new Error(`Attempted Open Library Search API GET request encountered an error at: ${url}`);
    }

    return await response.json();
}
