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
        <button class="memberContainer__btn memberContainer__btn--signOut" type="button">Sign Out</button>
    `;
}
