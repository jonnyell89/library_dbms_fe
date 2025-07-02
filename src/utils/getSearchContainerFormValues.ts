import { formatUserInput } from "./formatUserInput";

export function getSearchContainerFormValues(): { author: string; title: string; } {

    const searchContainerForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    if (!searchContainerForm) {
        throw new Error("searchContainerForm did not render.");
    }

    const searchAuthor = searchContainerForm.querySelector("#searchAuthor") as HTMLInputElement | null;
    const searchTitle = searchContainerForm.querySelector("#searchTitle") as HTMLInputElement | null;

    if (!searchAuthor) {
        throw new Error("searchAuthor did not render.");
    }

    if (!searchTitle) {
        throw new Error("searchTitle did not render.");
    }

    return {
        author: formatUserInput(searchAuthor.value),
        title: formatUserInput(searchTitle.value),
    }
}
