import { getOldMember } from "../services/getOldMember";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import { getOldMemberFormValues } from "../utils/getOldMemberFormValues";

export function attachOldContainerSubmitEvent(): void {

  const oldMemberForm = document.querySelector<HTMLFormElement>(".oldContainer__form");

  if (!oldMemberForm) {
    throw new Error("oldMemberForm did not render.");
  }

  oldMemberForm.addEventListener("submit", handleOldContainerSubmit);
}

async function handleOldContainerSubmit(event: Event): Promise<void> {
  
  event.preventDefault(); // Prevents web browser from reloading after oldMemberForm submission.

  try {
    const { name, email } = getOldMemberFormValues();

    const oldMember: MemberResponseDTO = await getOldMember(name, email);

    setCurrentMember(oldMember);

    signIn(); // Initialises memberContainer, reservationContainer, searchContainer and resultContainer after currentMember has been set to state.

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
