import { renderOldMemberFormContainer } from "../containers/oldContainer";
import { attachOldMemberFormEvent } from "../handlers/oldContainerEvents";

export function initOldMember(): void {
    renderOldMemberFormContainer();
    attachOldMemberFormEvent();
}
