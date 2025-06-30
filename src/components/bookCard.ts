import type { BookRequestDTO } from "../types/BookRequestDTO";

export function createBookCard(book: BookRequestDTO): HTMLDivElement {

    const bookCard = document.createElement("div");

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

    const bookCardImage = bookCard.querySelector<HTMLImageElement>(".bookCard__image");
    
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

export function attachBookCardReserveButton(bookCard: HTMLDivElement): void {

    const bookCardButton = bookCard.querySelector<HTMLButtonElement>(".bookCard__btn");

    if (!bookCardButton) {
        throw new Error("bookCardButton did not render.");
    }

    bookCardButton.textContent = "Reserve";
    bookCardButton.classList.add("bookCard__btn--reserve");
}

export function attachBookCardRemoveButton(bookCard: HTMLDivElement): void {

    const reservedCard = bookCard.cloneNode(true) as HTMLDivElement;

    if (!reservedCard) {
        throw new Error("reservedCard did not clone.");
    }

    const removeButton = reservedCard.querySelector<HTMLButtonElement>(".bookCard__btn");

    if (!removeButton) {
        throw new Error("removeButton did not render.");
    }

    removeButton.textContent = "Remove";
    removeButton.classList.remove("bookCard__btn--reserve");
    removeButton.classList.add("bookCard__btn--remove");
}
