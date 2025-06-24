import { signOut } from "../transitions/signOut";

export function attachSignOutButtonEvent(): void {
    // Captures signOutButton.
    const signOutButton = document.querySelector<HTMLButtonElement>(".memberContainer__btn--signOut");

    // Handles error event.
    if (!signOutButton) {
        throw new Error("Sign Out Button did not render.")
    }

    // Attaches click event listener to signOutButton.
    signOutButton.addEventListener("click", async () => {
        try {
            signOut();
        } catch (error) {
            console.error("Failed to sign out: ", error);
        }
    }) 
}
