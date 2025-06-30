import { renderNewContainer } from "../containers/newContainer";
import { attachNewContainerSubmitEvent } from "../events/newContainerEvents";

export function initNewContainer(): void {

    renderNewContainer();

    attachNewContainerSubmitEvent();
}
