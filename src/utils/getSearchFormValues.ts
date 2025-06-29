import { formatUserInput } from "./formatUserInput";

export function getSearchFormValues(): { author: string; title: string; } {

    const searchForm = document.querySelector<HTMLFormElement>(".searchContainer__form");

    if (!searchForm) {
        throw new Error("searchForm did not render.");
    }

    const searchAuthor = searchForm.querySelector("#searchAuthor") as HTMLInputElement | null;
    const searchTitle = searchForm.querySelector("#searchTitle") as HTMLInputElement | null;

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
