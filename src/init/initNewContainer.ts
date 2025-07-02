import { extractNewContainerForm, renderNewContainer } from "../containers/newContainer";
import { handleNewContainerFormEvent } from "../events/newContainerEvents";

export function initNewContainer(): void {

    const { newContainer } = renderNewContainer(); // Render

    const { newContainerForm } = extractNewContainerForm(newContainer); // Extract

    newContainerForm.addEventListener("submit", handleNewContainerFormEvent); // Attach
}
