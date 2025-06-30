import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export async function postNewMember(newMember: MemberRequestDTO): Promise<MemberResponseDTO> {

    const url = "http://localhost:8080/api/members";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
    });

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API POST request encountered an error at: ${url}`);
    }

    return await response.json();
}
