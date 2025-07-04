import { clearState, currentMember } from "../state";
import { initApplication } from "../main";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export function signOut(): void {

  const oldContainer: HTMLElement = selectDocumentElement(".oldContainer");
  const newContainer: HTMLElement = selectDocumentElement(".newContainer");
  const memberContainer: HTMLElement = selectDocumentElement(".memberContainer");
  const reservationContainer: HTMLElement = selectDocumentElement(".reservationContainer");
  const searchContainer: HTMLElement = selectDocumentElement(".searchContainer");

  if (!currentMember) {
    throw new Error("No currentMember set to state.");
  }

  console.log("currentMember signed out: " + currentMember.name + " (ID: " + currentMember.memberId + ")");

  clearState();
  initApplication();

  oldContainer.style.display = "block";
  newContainer.style.display = "block";
  memberContainer.style.display = "none";
  reservationContainer.style.display = "none";
  searchContainer.style.display = "none";
}
