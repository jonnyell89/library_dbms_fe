import type { ReservedBookRequestDTO } from "../types/ReservedBookRequestDTO";
import type { ReservedBookResponseDTO } from "../types/ReservedBookResponseDTO";

export async function postReservedBook(reservedBook: ReservedBookRequestDTO): Promise<ReservedBookResponseDTO> {

    const url = "http://localhost:8080/api/reserved-books";

    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservedBook),
    });

    if (!response.ok) {
        throw new Error("Attempted Spring Boot API '/api/reserved-books' POST request encountered an error.");
    }

    return await response.json();
}
