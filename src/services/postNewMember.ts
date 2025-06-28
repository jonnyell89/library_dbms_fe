import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export async function postNewMember(newMember: MemberRequestDTO): Promise<MemberResponseDTO> {
    // Spring Boot API endpoint.
    const url = "http://localhost:8080/api/members";

    // Attempts to POST MemberRequestDTO to API endpoint.
    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newMember),
    });

    // Handles error event.
    if (!response.ok) {
        throw new Error("Attempted Spring Boot API '/api/members' POST request encountered an error.");
    }

    return await response.json();
}
