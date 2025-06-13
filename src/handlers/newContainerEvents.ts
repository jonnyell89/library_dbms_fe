export function attachNewMemberFormEventListeners() {
  const newMemberForm = document.getElementById("newContainer__form") as HTMLFormElement | null;

  if (!newMemberForm) {
    throw new Error("New Member Form did not render.");
  }

  newMemberForm.addEventListener("submit", async function (event) {
    
    event.preventDefault();

    const data = {
      name: (document.getElementById("newName") as HTMLInputElement).value,
      email: (document.getElementById("newEmail") as HTMLInputElement).value,
      address: {
        line1: (document.getElementById("line1") as HTMLInputElement).value,
        line2: (document.getElementById("line2") as HTMLInputElement).value,
        city: (document.getElementById("city") as HTMLInputElement).value,
        county: (document.getElementById("county") as HTMLInputElement).value,
        postcode: (document.getElementById("postcode") as HTMLInputElement).value,
      },
    };

    try {
      // POST request does require a body.
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
        console.log("New member created: " + json.name + " (ID: " + json.memberId + ")");
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
