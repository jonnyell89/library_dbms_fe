import { selectDocumentElement } from "../utils/selectDocumentElement";

export function renderSearchContainer(): HTMLElement {

  const searchContainer: HTMLElement = selectDocumentElement(".searchContainer");

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

  return searchContainer;
}
