import { currentMember, setCurrentMember } from "../state";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";

export function attachNewMemberFormEvent(): void {
  const newMemberForm = document.querySelector<HTMLFormElement>(".newContainer__form");
  const oldContainer = document.querySelector<HTMLElement>(".oldContainer");
  const newContainer = document.querySelector<HTMLElement>(".newContainer");
  const reservationContainer = document.querySelector<HTMLElement>(".reservationContainer");
  const searchContainer = document.querySelector<HTMLElement>(".searchContainer");
  const resultContainer = document.querySelector<HTMLElement>(".resultContainer");

  if (!newMemberForm) {
    throw new Error("New Member Form did not render.");
  }

  if (!oldContainer) {
    throw new Error("Old Member Container did not render.");
  }

  if (!newContainer) {
    throw new Error("New Member Container did not render.");
  }

  if (!reservationContainer) {
    throw new Error("Reservation Container did not render.");
  }

  if (!searchContainer) {
    throw new Error("Search Container did not render.");
  }

  if (!resultContainer) {
    throw new Error("Result Container did not render.");
  }

  // Attaches submit event listener to newMemberForm.
  newMemberForm.addEventListener("submit", async function (event) {
    
    // Prevents web browser from reloading after newMemberForm submission.
    event.preventDefault();

    // Maps newMemberForm data to MemberRequestDTO.
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
      // Attempts to POST MemberRequestDTO to API endpoint.
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Maps response from API to MemberResponseDTO.
        const newMember: MemberResponseDTO = await response.json();
        console.log("New member created: " + newMember.name + " (ID: " + newMember.memberId + ")");

        // Sets currentMember to state.
        setCurrentMember(newMember);
        console.log("currentMember: ", currentMember);
        
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
