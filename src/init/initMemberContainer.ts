import { renderMemberContainer } from "../containers/memberContainer";
import { signOut } from "../transitions/signOut";
import { toggleReservationContainer } from "../transitions/toggleReservationContainer";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initMemberContainer(): void {

    const memberContainer: HTMLElement = renderMemberContainer(); // Render

    const reservationsButton: HTMLButtonElement = selectContainerElement(memberContainer, ".memberContainer__btn--reservations"); // Select
    const signOutButton: HTMLButtonElement = selectContainerElement(memberContainer, ".memberContainer__btn--signOut"); // Select

    reservationsButton.addEventListener("click", toggleReservationContainer); // Attach -> Handle
    signOutButton.addEventListener("click", signOut) // Attach -> Handle
}
