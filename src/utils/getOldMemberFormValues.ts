import { formatUserInput } from "./formatUserInput";

export function getOldMemberFormValues(): { name: string; email: string } {

    const oldMemberForm = document.querySelector<HTMLFormElement>(".oldContainer__form");

    if (!oldMemberForm) {
        throw new Error("oldMemberForm did not render.");
    }
    
    const oldName = oldMemberForm.querySelector("#oldName") as HTMLInputElement | null;
    const oldEmail = oldMemberForm.querySelector("#oldEmail") as HTMLInputElement | null;

    if (!oldName) {
        throw new Error("oldName did not render.");
    }
    
    if (!oldEmail) {
        throw new Error("oldEmail did not render.");
    }

    return {
        name: formatUserInput(oldName.value),
        email: formatUserInput(oldEmail.value),
    };
}
