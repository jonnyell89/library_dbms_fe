export function renderSearchContainer(): { searchContainer: HTMLElement } {
  
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");

  if (!searchContainer) {
    throw new Error("searchContainer did not render.");
  }

  searchContainer.innerHTML = `
    <h1>Library Search</h1>
    <form class="searchContainer__form">
      <p>
        <label for="author">Author</label><br>
        <input type="text" id="searchAuthor" />
      </p>
      <p>
        <label for="title">Title</label><br>
        <input type="text" id="searchTitle" />
      </p>
      <button class="searchContainer__btn searchContainer__btn--submit" type="submit">Submit</button>
    </form>
    <div class="searchContainer__feed"></div>
  `;

  return { searchContainer };
}

export function extractSearchContainerForm(searchContainer: HTMLElement): { searchContainerForm: HTMLFormElement } {

  const searchContainerForm = searchContainer.querySelector<HTMLFormElement>(".searchContainer__form");

  if (!searchContainerForm) {
    throw new Error("searhcContainerForm did not render.");
  }

  return { searchContainerForm };
}

export function extractSearchContainerFeed(searchContainer: HTMLElement): { searchContainerFeed: HTMLDivElement } {

  const searchContainerFeed = searchContainer.querySelector<HTMLDivElement>(".searchContainer__feed");

  if (!searchContainerFeed) {
    throw new Error("searchContainerFeed did not render.");
  }

  return { searchContainerFeed };
}
