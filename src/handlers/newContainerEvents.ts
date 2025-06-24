import { signIn } from "../transitions/signIn";
import { currentMember, setCurrentMember } from "../state";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export function attachNewMemberFormEvent(): void {
  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");

  if (!newMemberForm) {
    throw new Error("New Member Form did not render.");
  }

  // Attaches submit event listener to newMemberForm.
  newMemberForm.addEventListener("submit", async function (event) {
    
    // Prevents web browser from reloading after newMemberForm submission.
    event.preventDefault();

    // Maps newMemberForm data to MemberRequestDTO.
    const data = {
      name: (document.getElementById("newName") as HTMLInputElement).value,
      email: (document.getElementById("newEmail") as HTMLInputElement).value,
      address: {
        line1: (document.getElementById("line1") as HTMLInputElement).value,
        line2: (document.getElementById("line2") as HTMLInputElement).value,
        city: (document.getElementById("city") as HTMLInputElement).value,
        county: (document.getElementById("county") as HTMLInputElement).value,
        postcode: (document.getElementById("postcode") as HTMLInputElement).value,
      },
    };

    try {
      // Attempts to POST MemberRequestDTO to API endpoint.
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Maps response from API to MemberResponseDTO.
        const newMember: MemberResponseDTO = await response.json();
        console.log("New member created: " + newMember.name + " (ID: " + newMember.memberId + ")");

        // Sets currentMember to state.
        setCurrentMember(newMember);
        console.log("currentMember: ", currentMember);

        // Initialises containers after currentMember has been set to state.
        signIn();

      } else {
        const error = await response.text();
        console.log("Error: " + error);
      }
    } catch (e) {
      console.log("Failed to connect to the Spring Boot API.");
    }
  });
}
