export function renderBookSearchContainer(): void {
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");

  if (!searchContainer) {
    throw new Error("Search Container did not render.");
  }

  searchContainer.innerHTML = `
    <h1>Library Search</h1>
    <form class="searchContainer__form">
      <p>
        <label for="author">Author</label><br>
        <input type="text" id="author" />
      </p>
      <p>
        <label for="title">Title</label><br>
        <input type="text" id="title" />
      </p>
      <button class="searchContainer__btn searchContainer__btn--submit" type="submit">Submit</button>
    </form>
  `;
}
