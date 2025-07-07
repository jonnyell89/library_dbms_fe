import type { BookResponseDTO } from "../types/BookResponseDTO";

export async function deleteBookById(book: BookResponseDTO): Promise<string> {
    
    const url = `http://localhost:8080/api/books/${book.bookId}`;

    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API DELETE request encountered an error at: ${url}`);
    }

    return await response.text();
}
