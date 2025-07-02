export function renderNewContainer(): { newContainer: HTMLElement } {
  
  const newContainer = document.querySelector<HTMLElement>(".newContainer");

  if (!newContainer) {
    throw new Error("newContainer did not render.");
  }

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

  return { newContainer };
}

export function extractNewContainerForm(newContainer: HTMLElement): { newContainerForm: HTMLFormElement } {

  const newContainerForm = newContainer.querySelector<HTMLFormElement>(".newContainer__form");

  if (!newContainerForm) {
    throw new Error("newContainerForm did not render.");
  }

  return { newContainerForm };
}
