import { initMemberContainer } from "../init/initMemberContainer";
import { initReservationContainer } from "../init/initReservationContainer";
import { initSearchContainer } from "../init/initSearchContainer";
import { currentMember } from "../state";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export function signIn(): void {
  
  const oldContainer: HTMLElement = selectDocumentElement(".oldContainer");
  const newContainer: HTMLElement = selectDocumentElement(".newContainer");
  const memberContainer: HTMLElement = selectDocumentElement(".memberContainer");
  const reservationContainer: HTMLElement = selectDocumentElement(".reservationContainer");
  const searchContainer: HTMLElement = selectDocumentElement(".searchContainer");

  if (!currentMember) {
    throw new Error("No currentMember set to state.");
  }

  console.log("currentMember signed in: " + currentMember.name + " (ID: " + currentMember.memberId + ")");

  initMemberContainer();
  initReservationContainer();
  initSearchContainer();

  oldContainer.style.display = "none";
  newContainer.style.display = "none";
  memberContainer.style.display = "block";
  reservationContainer.style.display = "block";
  searchContainer.style.display = "block";
}
