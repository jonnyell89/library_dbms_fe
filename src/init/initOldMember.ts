import { renderOldContainer } from "../containers/oldContainer";
import { attachOldMemberFormEvent } from "../events/oldContainerEvents";

export function initOldMember(): void {
    renderOldContainer();
    attachOldMemberFormEvent();
}
