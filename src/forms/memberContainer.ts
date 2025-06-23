import { currentMember } from "../state";

export function renderMemberContainer(): void {
    const memberContainer = document.querySelector<HTMLElement>(".memberContainer");

    if (!memberContainer) {
        throw new Error("Member Container did not render.");
    }

    if (!currentMember) {
        throw new Error("No Current Member set to state.")
    }

    memberContainer.innerHTML = `
        <h1>Member</h1>
        <p>Member: ${currentMember.name}</p>
        <p>Email: ${currentMember.email}</p>
        <p>Address: ${currentMember.address.line1}, ${currentMember.address.line2}, ${currentMember.address.city}, ${currentMember.address.county}, ${currentMember.address.postcode}</p>
        <button class="memberContainer__btn" memberContainer__btn--signOut type="button">Sign Out</button>
    `;
}
