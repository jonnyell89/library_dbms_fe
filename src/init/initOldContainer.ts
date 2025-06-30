import { renderOldContainer } from "../containers/oldContainer";
import { attachOldContainerSubmitEvent } from "../events/oldContainerEvents";

export function initOldContainer(): void {

    renderOldContainer();

    attachOldContainerSubmitEvent();
}
