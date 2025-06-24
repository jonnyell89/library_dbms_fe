import { initNewMember } from "./init/initNewMember";
import { initOldMember } from "./init/initOldMember";
import "./style.scss";

export function initOldNew(): void {
  initOldMember();
  initNewMember();
}

initOldNew();
