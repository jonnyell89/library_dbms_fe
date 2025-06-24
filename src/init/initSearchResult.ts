import { renderResultContainer } from "../containers/resultContainer";
import { renderSearchContainer } from "../containers/searchContainer";
import { attachSearchFormEvent } from "../handlers/searchContainerEvents";

export function initSearchResult(): void {
    renderSearchContainer();
    renderResultContainer();

    // Calls displayResults, triggering resultContainerEvents workflow.
    attachSearchFormEvent();
}
