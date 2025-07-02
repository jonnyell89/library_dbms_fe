import { formatUserInput } from "./formatUserInput";

export function getOldContainerFormValues(): { name: string; email: string } {

    const oldContainerForm = document.querySelector<HTMLFormElement>(".oldContainer__form");

    if (!oldContainerForm) {
        throw new Error("oldContainerForm did not render.");
    }
    
    const oldName = oldContainerForm.querySelector("#oldName") as HTMLInputElement | null;
    const oldEmail = oldContainerForm.querySelector("#oldEmail") as HTMLInputElement | null;

    if (!oldName) {
        throw new Error("oldName did not render.");
    }
    
    if (!oldEmail) {
        throw new Error("oldEmail did not render.");
    }

    return {
        name: formatUserInput(oldName.value),
        email: formatUserInput(oldEmail.value),
    }
}
