export function renderBookResultContainer(): void {
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!resultContainer) {
    throw new Error("Search Result Container did not render.");
  }

  resultContainer.innerHTML = `
    <h1>Library Results</h1>
    <div id="resultContainer__cards"></div>
  `;
}
