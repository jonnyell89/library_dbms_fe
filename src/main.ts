import "./style.scss";
import { renderOldMemberFormContainer } from "./forms/oldContainer";
import { renderNewMemberFormContainer } from "./forms/newContainer";
// import { renderBookSearchContainer } from "./forms/searchContainer";
// import { renderBookResultContainer } from "./forms/resultContainer";

// function showBookSearchForm() {
//   const oldContainerForm = document.querySelector<HTMLDivElement>(
//     "#oldContainer__form"
//   );
//   const newContainerForm = document.querySelector<HTMLDivElement>(
//     "#newContainer__form"
//   );
//   const searchContainer =
//     document.querySelector<HTMLElement>(".searchContainer");
//   const searchContainerForm = document.querySelector<HTMLDivElement>(
//     "#searchContainer__form"
//   );

//   if (oldContainerForm) oldContainerForm.style.display = "none";
//   if (newContainerForm) newContainerForm.style.display = "none";
//   if (searchContainer) searchContainer.style.display = "block";
//   if (searchContainerForm) searchContainerForm.style.display = "block";
// }

function attachOldFormEventListeners() {
  const oldForm = document.getElementById(
    "old-member-form"
  ) as HTMLFormElement | null;

  if (!oldForm) {
    throw new Error("Old Member Form did not render.");
  }

  oldForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = (document.getElementById("old-name") as HTMLInputElement)
      .value;
    const email = (document.getElementById("old-email") as HTMLInputElement)
      .value;

    const url = `http://localhost:8080/api/members/search?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}`;

    try {
      const response = await fetch(url);

      console.log({ name, email });

      if (response.ok) {
        const json = await response.json();
        console.log(
          "Old member found: " + json.name + " (ID: " + json.memberId + ")"
        );
        // showBookSearchForm();
      } else {
        const error = await response.text();
        console.log("Error: " + error);
      }
    } catch (e) {
      console.log("Failed to connect to the Spring Boot API.");
    }
  });
}

function attachNewFormEventListeners() {
  const newForm = document.getElementById(
    "new-member-form"
  ) as HTMLFormElement | null;

  if (!newForm) {
    throw new Error("New Member Form did not render.");
  }

  newForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
      name: (document.getElementById("new-name") as HTMLInputElement).value,
      email: (document.getElementById("new-email") as HTMLInputElement).value,
      address: {
        line1: (document.getElementById("line1") as HTMLInputElement).value,
        line2: (document.getElementById("line2") as HTMLInputElement).value,
        city: (document.getElementById("city") as HTMLInputElement).value,
        county: (document.getElementById("county") as HTMLInputElement).value,
        postcode: (document.getElementById("postcode") as HTMLInputElement)
          .value,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (response.ok) {
        const json = await response.json();
        console.log(
          "New member created: " + json.name + " (ID: " + json.memberId + ")"
        );
        // showBookSearchForm();
      } else {
        const error = await response.text();
        console.log("Error: " + error);
      }
    } catch (e) {
      console.log("Failed to connect to the Spring Boot API.");
    }
  });
}

renderOldMemberFormContainer();
renderNewMemberFormContainer();
attachOldFormEventListeners();
attachNewFormEventListeners();

// function init() {
//   // Injects the forms into the DOM
//   renderForms();

//   // Attaches the event listeners
//   attachOldFormEventListeners();
//   attachNewFormEventListeners();
// }

// init();
