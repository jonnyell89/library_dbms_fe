import type { MemberRequestDTO } from "../types/MemberRequestDTO";
import { formatUserInput } from "./formatUserInput";

export function getNewMemberFormValues(): MemberRequestDTO {

    const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");

    if (!newMemberForm) {
        throw new Error("newMemberForm did not render.");
    }

    const newName = newMemberForm.querySelector("#newName") as HTMLInputElement | null;
    const newEmail = newMemberForm.querySelector("#newEmail") as HTMLInputElement | null;
    const newLine1 = newMemberForm.querySelector("#newLine1") as HTMLInputElement | null;
    const newLine2 = newMemberForm.querySelector("#newLine2") as HTMLInputElement | null;
    const newCity = newMemberForm.querySelector("#newCity") as HTMLInputElement | null;
    const newCounty = newMemberForm.querySelector("#newCounty") as HTMLInputElement | null;
    const newPostcode = newMemberForm.querySelector("#newPostcode") as HTMLInputElement | null;

    if (!newName) {
        throw new Error("newName did not render.");
    }
    
    if (!newEmail) {
        throw new Error("newEmail did not render.");
    }
    
    if (!newLine1) {
        throw new Error("newLine1 did not render.");
    }

    if (!newLine2) {
        throw new Error("newLine2 did not render.");
    }
    
    if (!newCity) {
        throw new Error("newCity did not render.");
    }
    
    if (!newCounty) {
        throw new Error("newCounty did not render.");
    }
    
    if (!newPostcode) {
        throw new Error("newPostcode did not render.");
    }

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
    };
}
