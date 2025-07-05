import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import { formatUserInput } from "./formatUserInput";
import { selectContainerElement } from "./selectContainerElement";

export function getNewContainerFormValues(newContainerForm: HTMLFormElement): MemberRequestDTO {

    const newName = selectContainerElement(newContainerForm, "#newName") as HTMLInputElement;
    const newEmail = selectContainerElement(newContainerForm, "#newEmail") as HTMLInputElement;
    const newLine1 = selectContainerElement(newContainerForm, "#newLine1") as HTMLInputElement;
    const newLine2 = selectContainerElement(newContainerForm, "#newLine2") as HTMLInputElement;
    const newCity = selectContainerElement(newContainerForm, "#newCity") as HTMLInputElement;
    const newCounty = selectContainerElement(newContainerForm, "#newCounty") as HTMLInputElement;
    const newPostcode = selectContainerElement(newContainerForm, "#newPostcode") as HTMLInputElement;

    return {
        name: formatUserInput(newName.value),
        email: formatUserInput(newEmail.value),
        address: {
            line1: formatUserInput(newLine1.value),
            line2: formatUserInput(newLine2.value),
            city: formatUserInput(newCity.value),
            county: formatUserInput(newCounty.value),
            postcode: formatUserInput(newPostcode.value),
        }
    }
}
