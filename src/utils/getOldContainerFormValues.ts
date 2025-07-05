import { formatUserInput } from "./formatUserInput";
import { selectContainerElement } from "./selectContainerElement";

export function getOldContainerFormValues(oldContainerForm: HTMLFormElement): { name: string; email: string } {
    
    const oldName = selectContainerElement(oldContainerForm, "#oldName") as HTMLInputElement;
    const oldEmail = selectContainerElement(oldContainerForm, "#oldEmail") as HTMLInputElement;

    return {
        name: formatUserInput(oldName.value),
        email: formatUserInput(oldEmail.value),
    }
}
