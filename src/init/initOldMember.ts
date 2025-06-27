import { renderOldContainer } from "../containers/oldContainer";
import { attachOldMemberFormEvent } from "../handlers/oldContainerEvents";

export function initOldMember(): void {
    renderOldContainer();
    attachOldMemberFormEvent();
}
