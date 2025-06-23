import "./style.scss";
import { renderOldMemberFormContainer } from "./forms/oldContainer";
import { renderNewMemberFormContainer } from "./forms/newContainer";
import { renderMemberContainer } from "./forms/memberContainer";
import { renderReservationContainer } from "./forms/reservationContainer";
import { renderBookSearchContainer } from "./forms/searchContainer";
import { renderBookResultContainer } from "./forms/resultContainer";

import { attachOldMemberFormEvent } from "./handlers/oldContainerEvents";
import { attachNewMemberFormEvent } from "./handlers/newContainerEvents";
import { attachSearchFormEvent } from "./handlers/searchContainerEvents";
import { attachConfirmButtonEvent } from "./handlers/reservationContainerEvents";

function initMemberForms() {
  // Render Form Containers
  renderOldMemberFormContainer();
  renderNewMemberFormContainer();

  // Attach Form Event Listeners
  attachOldMemberFormEvent();
  attachNewMemberFormEvent();
}

export function initContainers() {
  // Render Containers
  renderMemberContainer();
  renderReservationContainer();
  renderBookSearchContainer();
  renderBookResultContainer();

  // Attach Event Listeners
  attachSearchFormEvent();

  // Attach Reservation Event Listeners
  attachConfirmButtonEvent();
}

initMemberForms();
