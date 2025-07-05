import { createMember } from "../services/createMember";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";
import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { getNewContainerFormValues } from "../utils/getNewMemberFormValues";

export async function handleNewContainerFormEvent(event: SubmitEvent, newContainerForm: HTMLFormElement): Promise<void> {

  event.preventDefault(); // Prevents web browser from reloading after newMemberForm submission.

  try {
    const memberRequestDTO: MemberRequestDTO = getNewContainerFormValues(newContainerForm);

    const newMember: MemberResponseDTO = await createMember(memberRequestDTO);

    setCurrentMember(newMember);

    signIn(); // Initialises memberContainer, reservationContainer and searchContainer after currentMember has been set to state.

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
