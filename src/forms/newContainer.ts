export function renderNewMemberFormContainer(): void {
  const newContainer = document.querySelector<HTMLElement>(".newContainer");

  if (!newContainer) {
    throw new Error("New Member Form container did not render.");
  }

  newContainer.innerHTML = `
    <h1>Become a Member</h1>
    <div id="newContainer__form">
      <form id="new-member-form">
        <p>
          <label for="name">Name</label><br>
          <input type="text" id="new-name" required />
        </p>
        <p>
          <label for="email">Email</label><br>
          <input type="email" id="new-email" required />
        </p>
        <p>
          <label for="line1">Line 1</label><br>
          <input type="text" id="line1" required />
        </p>
        <p>
          <label for="line2">Line 2</label><br>
          <input type="text" id="line2" required />
        </p>
        <p>
          <label for="city">City</label><br>
          <input type="text" id="city" required />
        </p>
        <p>
          <label for="county">County</label><br>
          <input type="text" id="county" required />
        </p>
        <p>
          <label for="postcode">Postcode</label><br>
          <input type="text" id="postcode" required />
        </p>
        <p class="button">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  `;
}
