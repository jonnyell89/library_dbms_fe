import { addSelectedBook, removeSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { toggleConfirmButton } from "./reservationContainerEvents";

export function displayResults(books: BookRequestDTO[]): void {
    // Captures resultContainerCards.
    const resultContainerCards = document.querySelector<HTMLDivElement>(".resultContainer__cards");

    // Handles error event.
    if (!resultContainerCards) {
        throw new Error("Result Container Cards did not render.")
    }

    // Clears resultContainerCards.
    resultContainerCards.innerHTML = "";

    books.forEach(book => {
        // Creates bookCard.
        const bookCard = createBookCard(book);

        // Assigns cover image to bookCard imageElement.
        bookCardCoverImage(book, bookCard);

        // Captures bookCard reserveButton.
        const reserveButton = bookCard.querySelector<HTMLButtonElement>(".resultContainer__btn--reserve");

        if (reserveButton && reserveButton instanceof HTMLButtonElement) {
            // Attaches click event listener to reserveButton for each bookCard.
            attachReserveButtonEvent(reserveButton, bookCard, book);
        }

        // Appends bookCard to resultContainerCards.
        resultContainerCards.appendChild(bookCard);
    });
}

export function createBookCard(book: BookRequestDTO): HTMLDivElement {
    // Creates new bookCard.
    const bookCard = document.createElement("div");

    // Adds bookCard class to bookCard element.
    bookCard.classList.add("resultContainer__cards--card");

    bookCard.innerHTML = `
        <img class="bookCardImage" alt="${book.title}", style="width: 100%">
        <div class="bookCardInformation">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Published: ${book.firstPublishYear}</p>
            <button class="resultContainer__btn resultContainer__btn--reserve" type="button">Reserve</button>
        </div>
    `;

    return bookCard;
}

export function bookCardCoverImage(book: BookRequestDTO, bookCard: HTMLDivElement): void {
    // Captures bookCard imageElement.
    const imageElement = bookCard.querySelector<HTMLImageElement>(".bookCardImage");
    
    // Handles error event.
    if (!imageElement) {
        throw new Error("Book Card Image did not render.");
    }

    if (book.coverEditionKey) {
        // Assigns coverEditionKey to src directly from public access URL.
        imageElement.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-L.jpg`;
    } else if (book.cover) {
        // Assigns cover to src directly from public access URL.
        imageElement.src = `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`;
    } else {
        console.log(`No cover information available for ${book.title}.`);
    }
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
            const reservedCard = bookCard.cloneNode(true) as HTMLDivElement;

            // Captures reservedCard removeButton.
            const removeButton = reservedCard.querySelector<HTMLButtonElement>(".resultContainer__btn--reserve");
            
            if (removeButton && removeButton instanceof HTMLButtonElement) {
                // Swaps Reserve with Remove.
                removeButton.textContent = "Remove";
                removeButton.classList.remove("resultContainer__btn--reserve");
                removeButton.classList.add("reservationContainer__btn--remove");
                attachRemoveButtonEvent(removeButton, reservedCard, savedBook);
            }

            // Captures reservationContainerCards.
            const reservationContainerCards = document.querySelector<HTMLDivElement>(".reservationContainer__cards");

            if (reservationContainerCards && reservationContainerCards instanceof HTMLDivElement) {
                // Appends reservedCard to reservationContainerCards.
                reservationContainerCards.appendChild(reservedCard);
            }
        } catch (error) {
            console.error(`Failed to reserve ${book.title}: `, error);
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
        throw new Error(`Failed to save ${book.title} to bookRepository.`)
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
                throw new Error(`Failed to delete ${book.title} from bookrepository.`);
            }

            // Removes bookCard from reservationContainerCards.
            bookCard.remove();

            // Removes BookResponseDTO from selectedBooks list held in state.
            removeSelectedBook(book);
            console.log("selectedBooks list: ", selectedBooks);

            // Toggles confirmButton state.
            toggleConfirmButton();
        } catch (error) {
            console.error(`Failed to remove ${book.title} from reservationContainerCards: `, error)
        }
    });
}
