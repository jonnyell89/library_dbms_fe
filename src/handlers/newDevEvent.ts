export function newDevEventListeners() {
  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");
  const oldMemberForm = document.getElementById("oldContainer__form") as HTMLFormElement | null;
  const newContainer = document.querySelector<HTMLElement>(".newContainer");
  const newMemberForm = document.getElementById("newContainer__form") as HTMLFormElement | null;
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!oldContainer) {
    throw new Error("Old Member Form Container did not render.");
  }

  if (!oldMemberForm) {
    throw new Error("Old Member Form did not render.");
  }

  if (!newContainer) {
    throw new Error("New Member Form container did not render.");
  }

  if (!newMemberForm) {
    throw new Error("New Member Form did not render.");
  }

  if (!searchContainer) {
    throw new Error("Book Search Form did not render.");
  }

  if (!resultContainer) {
    throw new Error("Search Result Feed did not render.");
  }

  newMemberForm.addEventListener("submit", function (event) {
    
    event.preventDefault();

    oldContainer.style.display = "none";

    newContainer.style.display = "none";

    searchContainer.style.display = "block";

    resultContainer.style.display = "block";

    console.log("New Member Form submitted - Transition to Search Container successful.")
  });
}
