import { formatUserInput } from "./formatUserInput";

export function formatOpenLibraryURL(author?: string, title?: string): string {
    // Open Library Search API URL.
    let url = "https://openlibrary.org/search.json?";

    // Attaches search field values to URL.
    if (author && title) {
        url += `author=${encodeURIComponent(formatUserInput(author))}&title=${encodeURIComponent(formatUserInput(title))}`;
    } else if (author) {
        url += `author=${encodeURIComponent(formatUserInput(author))}`;
    } else if (title) {
        url += `title=${encodeURIComponent(formatUserInput(title))}`;
    } else {
        throw new Error("Both search fields are empty.");
    }

    return url;
}
