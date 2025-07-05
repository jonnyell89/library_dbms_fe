import { renderNewContainer } from "../containers/newContainer";
import { handleNewContainerFormEvent } from "../events/newContainerEvents";
import { selectContainerElement } from "../utils/selectContainerElement";

export function initNewContainer(): void {

    const newContainer: HTMLElement = renderNewContainer(); // Render

    const newContainerForm: HTMLFormElement = selectContainerElement(newContainer, ".newContainer__form"); // Select

    newContainerForm.addEventListener("submit", (event: SubmitEvent) => handleNewContainerFormEvent(event, newContainerForm)); // Attach -> Handle
}
