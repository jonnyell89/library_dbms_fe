import type { BookResponseDTO } from "../types/BookResponseDTO";

export async function getAllBooks(): Promise<BookResponseDTO[]> {

    const url = "http://localhost:8080/api/books";
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API GET request encountered an error at: ${url}`);
    }
    
    return await response.json();
}
