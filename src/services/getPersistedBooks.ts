import type { BookResponseDTO } from "../types/BookResponseDTO";

export async function getPersistedBooks(): Promise<BookResponseDTO[]> {
    // Spring Boot API endpoint.
    const url = "http://localhost:8080/api/books";
    
    // Attempts to GET List<BookResponseDTO> from API endpoint.
    const response = await fetch(url);

    // Handles error event.
    if (!response.ok) {
        throw new Error("Attempted Spring Boot API '/api/books' GET request encountered an error.");
    }
    
    return await response.json();
}
