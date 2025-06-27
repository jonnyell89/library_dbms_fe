import { signIn } from "../transitions/signIn";
import { currentMember, setCurrentMember } from "../state";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export function attachNewMemberFormEvent(): void {
  // Captures newMemberForm.
  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");

  // Handles error event.
  if (!newMemberForm) {
    throw new Error("newMemberForm did not render.");
  }

  // Attaches submit event listener to newMemberForm.
  newMemberForm.addEventListener("submit", async function (event) {
    
    // Prevents web browser from reloading after newMemberForm submission.
    event.preventDefault();

    // Maps newMemberForm data to MemberRequestDTO.
    const memberRequestDTO = {
      name: (newMemberForm.querySelector("#newName") as HTMLInputElement).value,
      email: (newMemberForm.querySelector("#newEmail") as HTMLInputElement).value,
      address: {
        line1: (newMemberForm.querySelector("#line1") as HTMLInputElement).value,
        line2: (newMemberForm.querySelector("#line2") as HTMLInputElement).value,
        city: (newMemberForm.querySelector("#city") as HTMLInputElement).value,
        county: (newMemberForm.querySelector("#county") as HTMLInputElement).value,
        postcode: (newMemberForm.querySelector("#postcode") as HTMLInputElement).value,
      },
    };

    // Spring Boot API endpoint.
    const url = "http://localhost:8080/api/members";

    try {
      // Attempts to POST MemberRequestDTO to API endpoint.
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberRequestDTO),
      });

      // Handles error event.
      if (!response.ok) {
        throw new Error("Attempted Spring Boot API '/api/members' POST request encountered an error.");
      }

      // Maps response from API to MemberResponseDTO.
      const newMember: MemberResponseDTO = await response.json();
      console.log("New member created: " + newMember.name + " (ID: " + newMember.memberId + ")");

      // Sets currentMember to state.
      setCurrentMember(newMember);
      console.log("currentMember: ", currentMember);

      // Initialises containers after currentMember has been set to state.
      signIn();

    } catch (error) {
      console.error("Failed to connect to the Spring Boot API: ", error);
    }
  });
}
