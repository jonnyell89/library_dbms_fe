import { formatUserInput } from "./formatUserInput";
import { selectContainerElement } from "./selectContainerElement";

export function getSearchContainerFormValues(searchContainerForm: HTMLFormElement): { author: string; title: string; } {

    const searchAuthor = selectContainerElement(searchContainerForm, "#searchAuthor") as HTMLInputElement;
    const searchTitle = selectContainerElement(searchContainerForm, "#searchTitle") as HTMLInputElement;

    return {
        author: formatUserInput(searchAuthor.value),
        title: formatUserInput(searchTitle.value),
    }
}
