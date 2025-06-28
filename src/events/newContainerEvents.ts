import { getNewMemberFormValues } from "../utils/getNewMemberFormValues";
import { postNewMember } from "../services/postNewMember";
import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";

export function attachNewMemberFormEvent(): void {
  // Captures newMemberForm.
  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");

  // Handles error event.
  if (!newMemberForm) {
    throw new Error("newMemberForm did not render.");
  }

  // Attaches submit event listener to newMemberForm.
  newMemberForm.addEventListener("submit", handleNewMemberFormSubmit);
}

async function handleNewMemberFormSubmit(event: Event): Promise<void> {
  // Prevents web browser from reloading after newMemberForm submission.
  event.preventDefault();

  try {
    const memberRequestDTO: MemberRequestDTO = getNewMemberFormValues();
    const newMember: MemberResponseDTO = await postNewMember(memberRequestDTO);

    // Sets currentMember to state.
    setCurrentMember(newMember);

    // Initialises containers after currentMember has been set to state.
    signIn();

    console.log("newMember signed in: " + newMember.name + " (ID: " + newMember.memberId + ")");

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
