import "./style.scss";
import { renderOldMemberFormContainer } from "./forms/oldContainer";
import { renderNewMemberFormContainer } from "./forms/newContainer";
import { renderReservationContainer } from "./forms/reservationContainer";
import { renderBookSearchContainer } from "./forms/searchContainer";
import { renderBookResultContainer } from "./forms/resultContainer";

import { attachOldMemberFormEventListeners } from "./handlers/oldContainerEvents";
import { attachNewMemberFormEventListeners } from "./handlers/newContainerEvents";
import { attachSearchFormEventListeners } from "./handlers/searchContainerEvents";

function initMemberForms() {
  // Render Form Containers
  renderOldMemberFormContainer();
  renderNewMemberFormContainer();

  // Attach Form Event Listeners
  attachOldMemberFormEventListeners();
  attachNewMemberFormEventListeners();
}

function initSearchContainers() {
  // Render Search Containers
  renderReservationContainer();
  renderBookSearchContainer();
  renderBookResultContainer();

  // Attach Search Event Listeners
  attachSearchFormEventListeners();
}

initMemberForms();

initSearchContainers();
