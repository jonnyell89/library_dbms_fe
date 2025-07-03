import { renderSearchContainer } from "../containers/searchContainer";
import { handleSearchContainerFormEvent } from "../events/searchContainerEvents";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initSearchContainer(): void {

    const searchContainer: HTMLElement = renderSearchContainer(); // Render

    const searchContainerForm: HTMLFormElement = selectContainerElement(searchContainer, ".searchContainer__form"); // Select

    searchContainerForm.addEventListener("submit", async (event: SubmitEvent) => handleSearchContainerFormEvent(event)) // Attach -> Handle
}
