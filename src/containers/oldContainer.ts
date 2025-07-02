export function renderOldContainer(): { oldContainer: HTMLElement } {
  
  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");

  if (!oldContainer) {
    throw new Error("oldContainer did not render.");
  }

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

  return { oldContainer };
}

export function extractOldContainerForm(oldContainer: HTMLElement): { oldContainerForm: HTMLFormElement } {

  const oldContainerForm = oldContainer.querySelector<HTMLFormElement>(".oldContainer__form");

  if (!oldContainerForm) {
    throw new Error("oldContainerForm did not render.");
  }

  return { oldContainerForm };
}
