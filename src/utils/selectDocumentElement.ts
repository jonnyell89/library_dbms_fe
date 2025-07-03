export function selectDocumentElement<T extends HTMLElement>(elementSelector: string): T {

  const containerElement = document.querySelector<T>(elementSelector); // Select

  if (!containerElement) {
    throw new Error(`${elementSelector} did not render.`); // Throw
  }

  return containerElement; // Action
}
