import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export async function getOldMember(name: string, email: string): Promise<MemberResponseDTO> {
    // Attaches member field values to Spring Boot API URL.
    const url = `http://localhost:8080/api/members/search?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    // Attempts to GET member field values from API endpoint.
    const response = await fetch(url);

    // Handles error event.
    if (!response.ok) {
        throw new Error("Attempted Spring Boot API '/api/members/search' GET request encountered an error.");
    }

    return await response.json();
}
