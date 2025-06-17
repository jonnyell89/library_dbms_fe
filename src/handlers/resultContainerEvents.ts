import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { toggleConfirmButton } from "./reservationContainerEvents";

export function displaySearchBooks(books: BookRequestDTO[]) {
    const resultContainerCards = document.getElementById("resultContainer__cards");

    if (!resultContainerCards) {
        throw new Error("Result Container Cards did not render.")
    }

    // Clears resultContainerCards.
    resultContainerCards.innerHTML = "";

    books.forEach(book => {
        // Creates bookCard.
        const bookCard = createBookCard(book);

        // Selects bookCard reserveButton.
        const reserveButton = bookCard.querySelector("button");

        if (reserveButton && reserveButton instanceof HTMLButtonElement) {
            // Attaches an event listener to the reserveButton for each bookCard.
            attachReserveButtonEvent(reserveButton, bookCard, book);
        }

        // Appends bookCard to resultContainerCards.
        resultContainerCards.appendChild(bookCard);
    });
}

export function createBookCard(book: BookRequestDTO) {
    const bookCard = document.createElement("div");
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
    reserveButton.addEventListener("click", async () => {
        try {
            // Saves book to bookRepository.
            const savedBook = await saveBookToDatabase(book);

            // Adds BookResponseDTO to selectedBooks list globally.
            addSelectedBook(savedBook);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles the confirmButton state.
            toggleConfirmButton();

            // Clones bookCard for reuse in reservationContainer.
            const reservedCard = bookCard.cloneNode(true) as HTMLElement;

            // To swap the reservedCard reserveButton with removeBotton.
            const removeButton = reservedCard.querySelector("button");
            
            if (removeButton) {
                removeButton.textContent = "Remove";
                removeButton.classList.remove("reserveButton");
                removeButton.classList.add("removeButton");
                attachRemoveButtonEvent(removeButton, reservedCard, savedBook);
            }

            const reservationContainerCards = document.getElementById("reservationContainer__cards");
            if (reservationContainerCards) {
                reservationContainerCards.appendChild(reservedCard);
            }
        } catch (error) {
            console.error("Failed to reserve book: ", error);
        }
    });
}

export async function saveBookToDatabase(book: BookRequestDTO): Promise<BookResponseDTO> {
    const response = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (response.ok) {
        console.log(`${book.title} saved to bookRepository.`)
    }

    if (!response.ok) {
        throw new Error("Failed to save book to bookRepository.")
    }

    const savedBook: BookResponseDTO = await response.json();
    return savedBook;
}

export function attachRemoveButtonEvent(removeButton: HTMLButtonElement, bookCard: HTMLElement, book: BookResponseDTO): void {
    removeButton.addEventListener("click", async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/${book.bookId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`${book.title} deleted from bookRespository.`)
            }

            if (!response.ok) {
                throw new Error("Failed to delete book from bookRepository.");
            }

            // Removes bookCard from reservationContainerCards.
            bookCard.remove();

            // Removes BookResponseDTO from selectedBooks list globally.
            removeSelectedBook(book);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles the confirmButton state.
            toggleConfirmButton();
        } catch (error) {
            console.error("Failed to remove book from reservationContainerCards.")
        }
    });
}
