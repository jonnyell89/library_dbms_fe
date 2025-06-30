import type { OLResponse } from "../types/OpenLibraryResponse";
import { formatOpenLibraryURL } from "../utils/formatOpenLibraryURL";

export async function getSearchResults(author?: string, title?: string): Promise<OLResponse> {

    const url = formatOpenLibraryURL(author, title);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Attempted Open Library Search API GET request encountered an error at: ${url}`);
    }

    return await response.json();
}
