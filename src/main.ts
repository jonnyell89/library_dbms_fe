import { initNewContainer } from "./init/initNewContainer";
import { initOldContainer } from "./init/initOldContainer";
import "./style.scss";

export function initApplication(): void {

  initOldContainer();
  
  initNewContainer();
}

initApplication();
