import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export async function getOldMember(name: string, email: string): Promise<MemberResponseDTO> {

    const url = `http://localhost:8080/api/members/search?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Attempted Spring Boot API GET request encountered an error at: ${url}`);
    }

    return await response.json();
}
