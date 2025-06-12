import "./style.scss";

function renderForms() {
  const oldFormContainer = document.querySelector<HTMLDivElement>(
    "#oldContainer__form"
  );
  const newFormContainer = document.querySelector<HTMLDivElement>(
    "#newContainer__form"
  );

  if (!oldFormContainer) {
    throw new Error("Old Member Form Container did not render.");
  }

  if (!newFormContainer) {
    throw new Error("New Member Form Container did not render.");
  }

  oldFormContainer.innerHTML = `
  <form id="old-member-form">
    <p>
      <label for="name">Name</label><br>
      <input type="text" id="old-name" required />
    </p>
    <p>
      <label for="email">Email</label><br>
      <input type="email" id="old-email" required" />
    </p>
    <p class="button">
      <button type="submit">Submit</button>
    </p>
  </form>
`;

  newFormContainer.innerHTML = `
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
`;
}

function attachOldFormEventListeners() {
  const oldForm = document.getElementById(
    "old-member-form"
  ) as HTMLFormElement | null;

  if (!oldForm) {
    throw new Error("Old Member Form did not render.");
  }

  oldForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
      name: (document.getElementById("old-name") as HTMLInputElement).value,
      email: (document.getElementById("old-email") as HTMLInputElement).value,
    };

    try {
      const response = await fetch("http://localhost:8080/api/members/search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (response.ok) {
        const json = await response.json();
        console.log(
          "Old member found: " + json.name + " (ID: " + json.memberId + ")"
        );
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
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
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
      } else {
        const error = await response.text();
        console.log("Error: " + error);
      }
    } catch (e) {
      console.log("Failed to connect to the Spring Boot API.");
    }
  });
}

renderForms();
attachOldFormEventListeners();
attachNewFormEventListeners();
