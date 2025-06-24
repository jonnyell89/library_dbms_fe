import { renderNewMemberFormContainer } from "../containers/newContainer";
import { attachNewMemberFormEvent } from "../handlers/newContainerEvents";

export function initNewMember(): void {
    renderNewMemberFormContainer();
    attachNewMemberFormEvent();
}
