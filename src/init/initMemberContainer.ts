import { renderMemberContainer } from "../containers/memberContainer";
import { signOut } from "../transitions/signOut";
import { toggleElement } from "../transitions/toggleElement";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initMemberContainer(): void {

    const memberContainer: HTMLElement = renderMemberContainer(); // Render

    const reservationsButton: HTMLButtonElement = selectContainerElement(memberContainer, ".memberContainer__btn--reservations"); // Select
    const signOutButton: HTMLButtonElement = selectContainerElement(memberContainer, ".memberContainer__btn--signOut"); // Select

    reservationsButton.addEventListener("click", () => toggleElement(".reservationContainer")); // Attach -> Handle
    signOutButton.addEventListener("click", signOut) // Attach -> Handle
}
