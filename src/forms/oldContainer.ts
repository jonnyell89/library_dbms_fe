export function renderOldMemberFormContainer(): void {
  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");

  if (!oldContainer) {
    throw new Error("Old Member Form Container did not render.");
  }

  oldContainer.innerHTML = `
    <h1>Already a Member?</h1>
    <form id="oldContainer__form">
      <p>
        <label for="name">Name</label><br>
        <input type="text" id="oldName" />
      </p>
      <p>
        <label for="email">Email</label><br>
        <input type="email" id="oldEmail" />
      </p>
      <p class="button">
        <button type="submit">Submit</button>
      </p>
    </form>
  `;
}
