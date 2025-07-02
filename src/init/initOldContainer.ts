import { extractOldContainerForm, renderOldContainer } from "../containers/oldContainer";
import { handleOldContainerFormEvent } from "../events/oldContainerEvents";

export function initOldContainer(): void {

    const { oldContainer } = renderOldContainer(); // Render

    const { oldContainerForm } = extractOldContainerForm(oldContainer); // Extract

    oldContainerForm.addEventListener("submit", handleOldContainerFormEvent); // Attach
}
