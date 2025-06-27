import { renderMemberContainer } from "../containers/memberContainer";
import { attachSignOutButtonEvent } from "../events/memberContainerEvents";

export function initMember(): void {
    renderMemberContainer();
    attachSignOutButtonEvent();
}
