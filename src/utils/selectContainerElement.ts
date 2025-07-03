export function selectContainerElement<T extends HTMLElement>(container: HTMLElement, elementSelector: string): T {

  const containerElement = container.querySelector<T>(elementSelector); // Select

  if (!containerElement) {
    throw new Error(`${elementSelector} did not render.`); // Throw
  }

  return containerElement; // Action
}
