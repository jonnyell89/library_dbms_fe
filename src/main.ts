import "./style.scss";
import { renderOldMemberFormContainer } from "./forms/oldContainer";
import { renderNewMemberFormContainer } from "./forms/newContainer";
// import { renderBookSearchContainer } from "./forms/searchContainer";
// import { renderBookResultContainer } from "./forms/resultContainer";

import { attachOldMemberFormEventListeners } from "./handlers/oldContainerEvents";
import { attachNewMemberFormEventListeners } from "./handlers/newContainerEvents";
import { renderBookSearchContainer } from "./forms/searchContainer";
import { renderBookResultContainer } from "./forms/resultContainer";

import { oldDevEventListeners } from "./handlers/oldDevEvent";
import { newDevEventListeners } from "./handlers/newDevEvent";

import { attachSearchFormEventListeners } from "./handlers/searchContainerEvents";

function initMemberForms() {
  // Render Form Containers
  renderOldMemberFormContainer();
  renderNewMemberFormContainer();

  // Attach Form Event Listeners
  // attachOldMemberFormEventListeners();
  // attachNewMemberFormEventListeners();
  oldDevEventListeners();
  newDevEventListeners();
}

initMemberForms();

renderBookSearchContainer();
renderBookResultContainer();

attachSearchFormEventListeners();
