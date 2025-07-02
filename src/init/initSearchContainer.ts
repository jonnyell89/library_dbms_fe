import { extractSearchContainerFeed, extractSearchContainerForm, renderSearchContainer } from "../containers/searchContainer";
import { handleSearchContainerFormEvent } from "../events/searchContainerEvents";

export function initSearchContainer(): void {

    const { searchContainer } = renderSearchContainer(); // Render

    const { searchContainerForm } = extractSearchContainerForm(searchContainer); // Extract

    const { searchContainerFeed } = extractSearchContainerFeed(searchContainer); // Extract

    searchContainerForm.addEventListener("submit", async (event: SubmitEvent) => handleSearchContainerFormEvent(event, searchContainerFeed)) // Attach
}
