import { renderResultContainer } from "../containers/resultContainer";
import { renderSearchContainer } from "../containers/searchContainer";
import { attachSearchFormEvent } from "../events/searchContainerEvents";

export function initSearchResult(): void {
    renderSearchContainer();
    renderResultContainer();

    // Calls displayResults, triggering resultContainerEvents workflow.
    attachSearchFormEvent();
}
