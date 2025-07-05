export function selectDocumentElement<T extends HTMLElement>(elementSelector: string): T {

  const element = document.querySelector<T>(elementSelector); // Select

  if (!element) {
    throw new Error(`${elementSelector} did not render.`); // Throw
  }

  return element; // Action
}
