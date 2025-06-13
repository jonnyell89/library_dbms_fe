export function renderBookSearchContainer(): void {
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");

  if (!searchContainer) {
    throw new Error("Book Search Form did not render.");
  }

  searchContainer.innerHTML = `
    <h1>Library Book Search</h1>
    <form id="searchContainer__form">
      <p>
        <label for="author">Author</label><br>
        <input type="text" id="author" />
      </p>
      <p>
        <label for="title">Title</label><br>
        <input type="text" id="title" />
      </p>
      <p class="button">
        <button type="submit">Submit</button>
      </p>
    </form>
  `;
}
