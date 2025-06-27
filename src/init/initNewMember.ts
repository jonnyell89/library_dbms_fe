import { renderNewContainer } from "../containers/newContainer";
import { attachNewMemberFormEvent } from "../handlers/newContainerEvents";

export function initNewMember(): void {
    renderNewContainer();
    attachNewMemberFormEvent();
}
