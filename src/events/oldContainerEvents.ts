import { getOldMemberFormValues } from "../utils/getOldMemberFormValues";
import { getOldMember } from "../services/getOldMember";
import { setCurrentMember } from "../state";
import { signIn } from "../transitions/signIn";

export function attachOldMemberFormEvent(): void {
  // Captures oldMemberForm.
  const oldMemberForm = document.querySelector<HTMLFormElement>(".oldContainer__form");

  // Handles error event.
  if (!oldMemberForm) {
    throw new Error("oldMemberForm did not render.");
  }

  // Attaches submit event listener to oldMemberForm.
  oldMemberForm.addEventListener("submit", handleOldMemberFormSubmit);
}

async function handleOldMemberFormSubmit(event: Event): Promise<void> {
  // Prevents web browser from reloading after oldMemberForm submission.
  event.preventDefault();

  try {
    const { name, email } = getOldMemberFormValues();
    const oldMember = await getOldMember(name, email);

    // Sets currentMember to state.
    setCurrentMember(oldMember);

    // Initialises containers after currentMember has been set to state.
    signIn();

    console.log("oldMember signed in: " + oldMember.name + " (ID: " + oldMember.memberId + ")");

  } catch (error) {
    console.error("Failed to connect to the Spring Boot API: ", error);
  }
}
