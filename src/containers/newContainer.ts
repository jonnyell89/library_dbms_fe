export function renderNewContainer(): void {
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
        <input type="text" id="line1" />
      </p>
      <p>
        <label for="line2">Line 2</label><br>
        <input type="text" id="line2" />
      </p>
      <p>
        <label for="city">City</label><br>
        <input type="text" id="city" />
      </p>
      <p>
        <label for="county">County</label><br>
        <input type="text" id="county" />
      </p>
      <p>
        <label for="postcode">Postcode</label><br>
        <input type="text" id="postcode" />
      </p>
      <button class="newContainer__btn newContainer__btn--submit" type="submit">Submit</button>
    </form>
  `;
}
