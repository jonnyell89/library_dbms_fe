import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";

export async function postBook(book: BookRequestDTO): Promise<BookResponseDTO> {

    const url = "http://localhost:8080/api/books";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API POST request encountered an error at: ${url}`);
    }

    return await response.json();
}
