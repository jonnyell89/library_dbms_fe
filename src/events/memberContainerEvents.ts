import { signOut } from "../transitions/signOut";

export function attachMemberContainerSignOutEvent(): void {

    const signOutButton = document.querySelector<HTMLButtonElement>(".memberContainer__btn--signOut");

    if (!signOutButton) {
        throw new Error("signOutButton did not render.");
    }

    signOutButton.addEventListener("click", signOut);
}
