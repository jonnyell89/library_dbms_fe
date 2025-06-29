import { postBook } from "../services/postBook";
import { addSelectedBook, selectedBooks } from "../state";
import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import { toggleConfirmButton } from "./reservationContainerEvents";


export function resultContainerFeedEvent(books: BookRequestDTO[]): void {
    // Captures resultContainerFeed.
    const resultContainerFeed = document.querySelector<HTMLDivElement>(".resultContainer__feed");

    // Handles error event.
    if (!resultContainerFeed) {
        throw new Error("resultContainerFeed did not render.");
    }

    // Clears resultContainerFeed.
    resultContainerFeed.innerHTML = "";

    books.forEach(book => {

        const bookCard = createBookCard(book);

        assignBookCardImage(bookCard, book);

        attachBookCardReserveButton(bookCard);

        attachBookCardReserveEvent(bookCard, book);

        resultContainerFeed.appendChild(bookCard);
    });
}

export function createBookCard(book: BookRequestDTO): HTMLDivElement {
    // Creates new bookCard.
    const bookCard = document.createElement("div");

    // Adds bookCard class to bookCard element.
    bookCard.classList.add("bookCard");

    bookCard.innerHTML = `
        <img class="bookCard__image" alt="${book.title}", style="width: 100%">
        <div class="bookCard__information">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Published: ${book.firstPublishYear}</p>
            <p>Status: ${book.availability === "AVAILABLE" ? "Available" : "Unavailable"}</p>
        </div>
        <button class="bookCard__btn" type="button"></button>
    `;

    return bookCard;
}

export function assignBookCardImage(bookCard: HTMLDivElement, book: BookRequestDTO): void {
    // Captures bookCardImage.
    const bookCardImage = bookCard.querySelector<HTMLImageElement>(".bookCard__image");
    
    // Handles error event.
    if (!bookCardImage) {
        throw new Error("bookCardImage did not render.");
    }

    if (book.coverEditionKey) {
        // Assigns coverEditionKey to src directly from public access URL.
        bookCardImage.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-L.jpg`;
    } else if (book.cover) {
        // Assigns cover to src directly from public access URL.
        bookCardImage.src = `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`;
    } else {
        console.log(`No cover information available for '${book.title}'.`);
    }
}

function attachBookCardReserveButton(bookCard: HTMLDivElement): void {
    // Captures bookCardButton.
    const bookCardButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn");

    // Handles error event.
    if (!bookCardButton) {
        throw new Error("bookCardButton did not render.");
    }

    bookCardButton.textContent = "Reserve";
    bookCardButton.classList.add("bookCard__btn--reserve");
}

function attachBookCardReserveEvent(bookCard: HTMLDivElement, book: BookRequestDTO): void {
    // Captures reserveButton.
    const reserveButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn--reserve");

    // Handles error event.
    if (!reserveButton) {
        throw new Error("reserveButton did not render.");
    }

    reserveButton.addEventListener("click", async () => handleBookCardReserveClick(bookCard, book));
}

async function handleBookCardReserveClick(bookCard: HTMLDivElement, book: BookRequestDTO): Promise<void> {
    try {
        const postedBook: BookResponseDTO = await postBook(book);

        addSelectedBook(postedBook);

        console.log(`${postedBook.title} added to selectedBooks list: `, selectedBooks);

        attachBookCardRemoveButton(bookCard);

        appendBookCardToReservationContainer(bookCard);

        toggleConfirmButton();

    } catch (error) {
        console.error("Failed to connect to the Spring Boot API: ", error);
    }
}



function attachBookCardRemoveButton(bookCard: HTMLDivElement): void {
    // Clones bookCard for reservationContainer.
    const reservedCard = bookCard.cloneNode(true) as HTMLDivElement;

    // Handles error event.
    if (!reservedCard) {
        throw new Error("reservedCard did not clone.");
    }

    // Captures bookCard button element.
    const removeButton = reservedCard.querySelector<HTMLButtonElement>(".bookCard__btn");

    // Handles error event.
    if (!removeButton) {
        throw new Error("removeButton did not render.");
    }

    removeButton.textContent = "Remove";
    removeButton.classList.remove("bookCard__btn--reserve");
    removeButton.classList.add("bookCard__btn--remove");
}

function appendBookCardToReservationContainer(bookCard: HTMLDivElement): void {
    // Captures reservationContainerFeed.
    const reservationContainerFeed = document.querySelector<HTMLDivElement>(".reservationContainer__feed");

    // Handles error event.
    if (!reservationContainerFeed) {
        throw new Error("reservationContainerFeed did not render.");
    }

    reservationContainerFeed.appendChild(bookCard);
}
