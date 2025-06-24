import { initMember } from "../init/initMember";
import { initReservation } from "../init/initReservation";
import { initSearchResult } from "../init/initSearchResult";

export function signIn(): void {
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

  // Containers must be intialised after currentMember has been set to state.
  initMember();
  initReservation();
  initSearchResult();

  oldContainer.style.display = "none";
  newContainer.style.display = "none";
  memberContainer.style.display = "block";
  reservationContainer.style.display = "block";
  searchContainer.style.display = "block";
  resultContainer.style.display = "block";
}
