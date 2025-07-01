import { currentMember } from "../state";

export function renderMemberContainer(): {reservationsButton: HTMLButtonElement, signOutButton: HTMLButtonElement} {
    
    const memberContainer = document.querySelector<HTMLElement>(".memberContainer");

    if (!memberContainer) {
        throw new Error("memberContainer did not render.");
    }

    if (!currentMember) {
        throw new Error("No currentMember set to state.");
    }

    memberContainer.innerHTML = `
        <h1>Member</h1>
        <div class="memberContainer__information">
            <p>Member ID: ${currentMember.memberId}</p>
            <p>Member: ${currentMember.name}</p>
            <p>Email: ${currentMember.email}</p>
            <p>Address: </p>
            <p>${currentMember.address.line1}, </p>
            <p>${currentMember.address.line2}, </p>
            <p>${currentMember.address.city}, </p>
            <p>${currentMember.address.county}, </p>
            <p>${currentMember.address.postcode}. </p>
        </div>
        <button class="memberContainer__btn memberContainer__btn--reservations" type="button">Reservations</button>
        <button class="memberContainer__btn memberContainer__btn--signOut" type="button">Sign Out</button>
    `;

    const reservationsButton = memberContainer.querySelector<HTMLButtonElement>(".memberContainer__btn--reservations");
    
    const signOutButton = memberContainer.querySelector<HTMLButtonElement>(".memberContainer__btn--signOut");

    if (!reservationsButton) {
        throw new Error("reservationsButton did not render.");
    }

    if (!signOutButton) {
        throw new Error("signOutButton did not render.");
    }

    return { reservationsButton, signOutButton };
}
