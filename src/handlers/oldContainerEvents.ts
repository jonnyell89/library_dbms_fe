import { signIn } from "../transitions/signIn";
import { currentMember, setCurrentMember } from "../state";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { formatInput } from "../utils/formatInput";

export function attachOldMemberFormEvent(): void {
  const oldMemberForm = document.querySelector<HTMLFormElement>(".oldContainer__form");

  if (!oldMemberForm) {
    throw new Error("Old Member Form did not render.");
  }

  // Attaches submit event listener to oldMemberForm.
  oldMemberForm.addEventListener("submit", async function (event) {
    
    // Prevents web browser from reloading after oldMemberForm submission.
    event.preventDefault();

    const name = (document.getElementById("oldName") as HTMLInputElement).value;
    const email = (document.getElementById("oldEmail") as HTMLInputElement).value;

    // Attaches member field values to Spring Boot API URL.
    const url = `http://localhost:8080/api/members/search?name=${formatInput(name)}&email=${formatInput(email)}`;

    try {
      // Attempts to GET member field values from API endpoint.
      const response = await fetch(url);

      console.log({ name, email });

      if (response.ok) {
        // Maps response from API endpoint to MemberResponseDTO.
        const oldMember: MemberResponseDTO = await response.json();
        console.log("Old member found: " + oldMember.name + " (ID: " + oldMember.memberId + ")");

        // Sets currentMember to state.
        setCurrentMember(oldMember);
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
