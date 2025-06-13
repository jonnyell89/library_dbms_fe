export function attachOldMemberFormEventListeners() {
  const oldMemberForm = document.getElementById("oldContainer__form") as HTMLFormElement | null;

  if (!oldMemberForm) {
    throw new Error("Old Member Form did not render.");
  }

  oldMemberForm.addEventListener("submit", async function (event) {
    
    event.preventDefault();

    const name = (document.getElementById("oldName") as HTMLInputElement).value;
    const email = (document.getElementById("oldEmail") as HTMLInputElement).value;
    const url = `http://localhost:8080/api/members/search?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    try {
      // GET request does not require a body.
      const response = await fetch(url);

      console.log({ name, email });

      if (response.ok) {
        const json = await response.json();
        console.log("Old member found: " + json.name + " (ID: " + json.memberId + ")");
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
