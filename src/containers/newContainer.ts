import { selectDocumentElement } from "../utils/selectDocumentElement";

export function renderNewContainer(): HTMLElement {

  const newContainer: HTMLElement = selectDocumentElement(".newContainer");

  newContainer.innerHTML = `
    <h1>Become a Member</h1>
    <form class="newContainer__form">
      <p>
        <label for="name">Name</label><br>
        <input type="text" id="newName" />
      </p>
      <p>
        <label for="email">Email</label><br>
        <input type="email" id="newEmail" />
      </p>
      <p>
        <label for="line1">Line 1</label><br>
        <input type="text" id="newLine1" />
      </p>
      <p>
        <label for="line2">Line 2</label><br>
        <input type="text" id="newLine2" />
      </p>
      <p>
        <label for="city">City</label><br>
        <input type="text" id="newCity" />
      </p>
      <p>
        <label for="county">County</label><br>
        <input type="text" id="newCounty" />
      </p>
      <p>
        <label for="postcode">Postcode</label><br>
        <input type="text" id="newPostcode" />
      </p>
      <button class="newContainer__btn newContainer__btn--submit" type="submit">Submit</button>
    </form>
  `;

  return newContainer;
}
