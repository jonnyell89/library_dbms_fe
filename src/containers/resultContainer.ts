export function renderResultContainer(): void {
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!resultContainer) {
    throw new Error("Result Container did not render.");
  }

  resultContainer.innerHTML = `
    <h1>Library Results</h1>
    <div class="resultContainer__feed"></div>
  `;
}
