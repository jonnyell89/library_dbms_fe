import { extractReservationsButtonAndSignOutButton, renderMemberContainer } from "../containers/memberContainer";
import { signOut } from "../transitions/signOut";
import { toggleReservationContainer } from "../transitions/toggleReservationContainer";

export function initMemberContainer(): void {

    const { memberContainer } = renderMemberContainer(); // Render

    const { reservationsButton, signOutButton } = extractReservationsButtonAndSignOutButton(memberContainer); // Extract

    reservationsButton.addEventListener("click", toggleReservationContainer); // Attach

    signOutButton.addEventListener("click", signOut) // Attach
}
