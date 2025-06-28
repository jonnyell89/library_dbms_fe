import { formatUserInput } from "./formatUserInput";

export function getOldMemberFormValues(): { name: string; email: string } {
    
    const oldName = document.getElementById("oldName") as HTMLInputElement | null;
    const oldEmail = document.getElementById("oldEmail") as HTMLInputElement | null;

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
