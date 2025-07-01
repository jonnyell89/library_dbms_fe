import { renderMemberContainer } from "../containers/memberContainer";
import { signOut } from "../transitions/signOut";
import { toggleReservationContainer } from "../transitions/toggleReservationContainer";

export function initMemberContainer(): void {

    const { reservationsButton, signOutButton } = renderMemberContainer();

    reservationsButton.addEventListener("click", toggleReservationContainer);

    signOutButton.addEventListener("click", signOut)
}
