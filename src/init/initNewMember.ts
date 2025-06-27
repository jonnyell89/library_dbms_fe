import { renderNewContainer } from "../containers/newContainer";
import { attachNewMemberFormEvent } from "../events/newContainerEvents";

export function initNewMember(): void {
    renderNewContainer();
    attachNewMemberFormEvent();
}
