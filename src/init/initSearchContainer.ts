import { renderResultContainer } from "../containers/resultContainer";
import { renderSearchContainer } from "../containers/searchContainer";
import { attachSearchContainerSubmitEvent } from "../events/searchContainerEvents";

export function initSearchContainer(): void {

    renderSearchContainer();

    renderResultContainer();

    attachSearchContainerSubmitEvent(); // Triggers resultContainerEvents workflow.
}
