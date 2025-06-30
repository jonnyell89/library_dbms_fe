import { renderMemberContainer } from "../containers/memberContainer";
import { attachMemberContainerSignOutEvent } from "../events/memberContainerEvents";

export function initMemberContainer(): void {

    renderMemberContainer();

    attachMemberContainerSignOutEvent();
}
