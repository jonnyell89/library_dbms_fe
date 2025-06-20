import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { toggleConfirmButton } from "./reservationContainerEvents";

export function displayResults(books: BookRequestDTO[]): void {
    // Captures resultContainerCards.
    const resultContainerCards = document.querySelector<HTMLDivElement>("#resultContainer__cards");

    // Handles error event.
    if (!resultContainerCards) {
        throw new Error("Result Container Cards did not render.")
    }

    // Clears resultContainerCards.
    resultContainerCards.innerHTML = "";

    books.forEach(book => {
        // Creates bookCard.
        const bookCard = createBookCard(book);

        // Captures bookCard reserveButton.
        const reserveButton = bookCard.querySelector<HTMLButtonElement>("button");

        if (reserveButton && reserveButton instanceof HTMLButtonElement) {
            // Attaches click event listener to reserveButton for each bookCard.
            attachReserveButtonEvent(reserveButton, bookCard, book);
        }

        // Appends bookCard to resultContainerCards.
        resultContainerCards.appendChild(bookCard);
    });
}

export function createBookCard(book: BookRequestDTO) {
    // Creates new bookCard.
    const bookCard = document.createElement("div");

    // Adds bookCard class to bookCard element.
    bookCard.classList.add("bookCard");

    bookCard.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Published: ${book.firstPublishYear}</p>
        <button class="reserveButton" type="button">Reserve</button>
    `;

    return bookCard;
}

export function attachReserveButtonEvent(reserveButton: HTMLButtonElement, bookCard: HTMLElement, book: BookRequestDTO): void {
    // Attaches click event listener to reserveButton.
    reserveButton.addEventListener("click", async () => {
        
        try {
            // Saves book to bookRepository.
            const savedBook = await saveBookToDatabase(book);

            // Adds BookResponseDTO to selectedBooks list held in state.
            addSelectedBook(savedBook);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles confirmButton state.
            toggleConfirmButton();

            // Clones bookCard for reservationContainer.
            const reservedCard = bookCard.cloneNode(true) as HTMLElement;

            // Captures reservedCard removeButton.
            const removeButton = reservedCard.querySelector<HTMLButtonElement>("button");
            
            if (removeButton && removeButton instanceof HTMLButtonElement) {
                // Swaps Reserve with Remove.
                removeButton.textContent = "Remove";
                removeButton.classList.remove("reserveButton");
                removeButton.classList.add("removeButton");
                attachRemoveButtonEvent(removeButton, reservedCard, savedBook);
            }

            // Captures reservationContainerCards.
            const reservationContainerCards = document.querySelector<HTMLDivElement>("#reservationContainer__cards");

            if (reservationContainerCards && reservationContainerCards instanceof HTMLDivElement) {
                // Appends reservedCard to reservationContainerCards.
                reservationContainerCards.appendChild(reservedCard);
            }
        } catch (error) {
            console.error("Failed to reserve book: ", error);
        }
    });
}

export async function saveBookToDatabase(book: BookRequestDTO): Promise<BookResponseDTO> {
    // Attempts to POST BookRequestDTO to API endpoint.
    const response = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (response.ok) {
        console.log(`${book.title} saved to bookRepository.`)
    } else {
        throw new Error("Failed to save book to bookRepository.")
    }

    // Maps response from API endpoint to BookResponseDTO.
    const savedBook: BookResponseDTO = await response.json();

    return savedBook;
}

export function attachRemoveButtonEvent(removeButton: HTMLButtonElement, bookCard: HTMLElement, book: BookResponseDTO): void {
    // Attaches click event listener to removeButton.
    removeButton.addEventListener("click", async () => {

        try {
            // Attempts to DELETE Book object from API endpoint.
            const response = await fetch(`http://localhost:8080/api/books/${book.bookId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`${book.title} deleted from bookRespository.`)
            } else {
                throw new Error("Failed to delete book from bookrepository.");
            }

            // Removes bookCard from reservationContainerCards.
            bookCard.remove();

            // Removes BookResponseDTO from selectedBooks list held in state.
            removeSelectedBook(book);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles confirmButton state.
            toggleConfirmButton();
        } catch (error) {
            console.error("Failed to remove book from reservationContainerCards.")
        }
    });
}
