import { renderMemberContainer } from "../containers/memberContainer";
import { attachSignOutButtonEvent } from "../handlers/memberContainerEvents";

export function initMember(): void {
    renderMemberContainer();
    attachSignOutButtonEvent();
}
