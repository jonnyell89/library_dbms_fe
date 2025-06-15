export function renderBookResultContainer(): void {
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!resultContainer) {
    throw new Error("Search Result Feed container did not render.");
  }

  resultContainer.innerHTML = `
    <h1>Library Search Results</h1>
    <div id="resultContainer__feed"></div>
  `;
}
