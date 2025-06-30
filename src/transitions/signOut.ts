import { clearCurrentMember, clearCurrentReservation, clearSelectedBooks, currentMember } from "../state";
import { initApplication } from "../main";

export function signOut(): void {
  const oldMemberForm = document.querySelector<HTMLFormElement>(".oldContainer__form");
  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");
  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");
  const newContainer = document.querySelector<HTMLElement>(".newContainer");
  const memberContainer = document.querySelector<HTMLElement>(".memberContainer");
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!oldMemberForm) {
    throw new Error("oldMemberForm did not render.");
  }

  if (!newMemberForm) {
    throw new Error("newMemberForm did not render.");
  }

  if (!oldContainer) {
    throw new Error("oldContainer did not render.");
  }

  if (!newContainer) {
    throw new Error("newContainer did not render.");
  }

  if (!memberContainer) {
    throw new Error("memberContainer did not render.");
  }

  if (!reservationContainer) {
    throw new Error("reservationContainer did not render.");
  }

  if (!searchContainer) {
    throw new Error("searchContainer did not render.");
  }

  if (!resultContainer) {
    throw new Error("resultContainer did not render.");
  }

  if (!currentMember) {
    throw new Error("No currentMember set to state.");
  }

  console.log("currentMember signed out: " + currentMember.name + " (ID: " + currentMember.memberId + ")");

  clearCurrentMember();
  clearCurrentReservation();
  clearSelectedBooks();

  initApplication(); // Resets the application.

  oldContainer.style.display = "block";
  newContainer.style.display = "block";
  memberContainer.style.display = "none";
  reservationContainer.style.display = "none";
  searchContainer.style.display = "none";
  resultContainer.style.display = "none";
}
