import { signOut } from "../transitions/signOut";

export function attachSignOutButtonEvent(): void {
    // Captures signOutButton.
    const signOutButton = document.querySelector<HTMLButtonElement>(".memberContainer__btn--signOut");

    // Handles error event.
    if (!signOutButton) {
        throw new Error("signOutButton did not render.");
    }

    // Attaches click event listener to signOutButton.
    signOutButton.addEventListener("click", signOut);
}
