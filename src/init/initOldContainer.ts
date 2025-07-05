import { renderOldContainer } from "../containers/oldContainer";
import { handleOldContainerFormEvent } from "../events/oldContainerEvents";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initOldContainer(): void {

    const oldContainer: HTMLElement = renderOldContainer(); // Render

    const oldContainerForm: HTMLFormElement = selectContainerElement(oldContainer, ".oldContainer__form"); // Select

    oldContainerForm.addEventListener("submit", (event: SubmitEvent) => handleOldContainerFormEvent(event, oldContainerForm)); // Attach -> Handle
}
