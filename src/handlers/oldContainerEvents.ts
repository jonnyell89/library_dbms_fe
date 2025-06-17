import { currentMemberId, setCurrentMemberId } from "../state";
import { formatInput } from "../utils/formatInput";

export function attachOldMemberFormEvent() {
  const oldMemberForm = document.getElementById("oldContainer__form") as HTMLFormElement | null;

  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");
  const newContainer = document.querySelector<HTMLElement>(".newContainer");
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!oldMemberForm) {
    throw new Error("Old Member Form did not render.");
  }

  if (!oldContainer) {
    throw new Error("Old Member Form Container did not render.");
  }

  if (!newContainer) {
    throw new Error("New Member Form container did not render.");
  }

  if (!reservationContainer) {
    throw new Error("Reservation Container did not render.")
  }

  if (!searchContainer) {
    throw new Error("Book Search Form Container did not render.");
  }

  if (!resultContainer) {
    throw new Error("Search Result Container did not render.");
  }

  oldMemberForm.addEventListener("submit", async function (event) {
    
    event.preventDefault();

    const name = (document.getElementById("oldName") as HTMLInputElement).value;
    const email = (document.getElementById("oldEmail") as HTMLInputElement).value;
    const url = `http://localhost:8080/api/members/search?name=${formatInput(name)}&email=${formatInput(email)}`;

    try {
      // GET request does not require a body.
      const response = await fetch(url);

      console.log({ name, email });

      if (response.ok) {
        const json = await response.json();
        console.log("Old member found: " + json.name + " (ID: " + json.memberId + ")");

        // Sets currentMemberId globally.
        setCurrentMemberId(json.memberId);
        console.log("currentMemberId: " + currentMemberId);
        
        // showBookSearchForm();
        oldContainer.style.display = "none";
        newContainer.style.display = "none";
        reservationContainer.style.display = "block";
        searchContainer.style.display = "block";
        resultContainer.style.display = "block";

      } else {
        const error = await response.text();
        console.log("Error: " + error);
      }
    } catch (e) {
      console.log("Failed to connect to the Spring Boot API.");
    }
  });
}
