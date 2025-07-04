import { getMemberByNameAndEmail } from "../services/getMemberByNameAndEmail";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { getOldContainerFormValues } from "../utils/getOldContainerFormValues";

export async function handleOldContainerFormEvent(event: SubmitEvent, oldContainerForm: HTMLFormElement): Promise<void> {
  
  event.preventDefault(); // Prevents web browser from reloading after oldMemberForm submission.

  try {
    const { name, email } = getOldContainerFormValues(oldContainerForm);

    const oldMember: MemberResponseDTO = await getMemberByNameAndEmail(name, email);

    setCurrentMember(oldMember);

    signIn(); // Initialises memberContainer, reservationContainer and searchContainer after currentMember has been set to state.

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
