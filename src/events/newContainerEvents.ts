import { createMember } from "../services/createMember";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";
import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { getNewMemberFormValues } from "../utils/getNewMemberFormValues";

export function attachNewContainerSubmitEvent(): void {

  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");

  if (!newMemberForm) {
    throw new Error("newMemberForm did not render.");
  }

  newMemberForm.addEventListener("submit", handleNewContainerSubmit);
}

async function handleNewContainerSubmit(event: Event): Promise<void> {

  event.preventDefault(); // Prevents web browser from reloading after newMemberForm submission.

  try {
    const memberRequestDTO: MemberRequestDTO = getNewMemberFormValues();

    const newMember: MemberResponseDTO = await createMember(memberRequestDTO);

    setCurrentMember(newMember);

    signIn(); // Initialises memberContainer, reservationContainer, searchContainer and resultContainer after currentMember has been set to state.

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
