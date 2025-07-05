import { selectDocumentElement } from "../utils/selectDocumentElement";

export function renderOldContainer(): HTMLElement {
  
  const oldContainer: HTMLElement = selectDocumentElement(".oldContainer");

  oldContainer.innerHTML = `
    <h1>Already a Member?</h1>
    <form class="oldContainer__form">
      <p>
        <label for="name">Name</label><br>
        <input type="text" id="oldName" />
      </p>
      <p>
        <label for="email">Email</label><br>
        <input type="email" id="oldEmail" />
      </p>
      <button class="oldContainer__btn oldContainer__btn--submit" type="submit">Submit</button>
    </form>
  `;

  return oldContainer;
}
