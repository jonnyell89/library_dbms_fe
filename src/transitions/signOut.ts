import { initOldNew } from "../main";
import { clearCurrentMember, clearCurrentReservation, clearSelectedBooks } from "../state";

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
    throw new Error("Old Member Form did not render.");
  }

  if (!newMemberForm) {
    throw new Error("New Member Form did not render.");
  }

  if (!oldContainer) {
    throw new Error("Old Member Container did not render.");
  }

  if (!newContainer) {
    throw new Error("New Member Container did not render.");
  }

  if (!memberContainer) {
    throw new Error("Member Container did not render.");
  }

  if (!reservationContainer) {
    throw new Error("Reservation Container did not render.");
  }

  if (!searchContainer) {
    throw new Error("Search Container did not render.");
  }

  if (!resultContainer) {
    throw new Error("Result Container did not render.");
  }

  // Clears all values set in state.
  clearCurrentMember();
  clearCurrentReservation();
  clearSelectedBooks();

  // Resets the application.
  initOldNew();

  oldContainer.style.display = "block";
  newContainer.style.display = "block";
  memberContainer.style.display = "none";
  reservationContainer.style.display = "none";
  searchContainer.style.display = "none";
  resultContainer.style.display = "none";
}
