import type { BookRequestDTO } from "../types/BookRequestDTO";

export function createBookCard(book: BookRequestDTO): HTMLDivElement {

    const bookCard = document.createElement("div");

    bookCard.classList.add("bookCard");

    bookCard.innerHTML = `
        <img class="bookCard__img" alt="${book.title}", style="width: 100%">
        <div class="bookCard__information">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
        </div>
        <button class="bookCard__btn" type="button"></button>
    `;

    return bookCard;
}

export function attachBookCardImage(bookCardImage: HTMLImageElement, book: BookRequestDTO): void {

    if (book.coverEditionKey) {
        bookCardImage.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-L.jpg`; // Attaches coverEditionKey to src directly from public access URL.
    } else if (book.cover) {
        bookCardImage.src = `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`; // Attaches cover to src directly from public access URL.
    } else {
        console.log(`No cover information available for ${book.title}.`);
    }
}

export function attachBookCardReserveButton(reserveButton: HTMLButtonElement): void {

    reserveButton.textContent = "Reserve";
    reserveButton.classList.add("bookCard__btn--reserve");
}

export function attachBookCardRemoveButton(removeButton: HTMLButtonElement): void {

    removeButton.textContent = "Remove";
    removeButton.classList.add("bookCard__btn--remove");
}

export function attachBookCardUnavailableButton(unavailableButton: HTMLButtonElement): void {

    unavailableButton.textContent = "Unavailable";
    unavailableButton.classList.add("bookCard__btn--unavailable");
    unavailableButton.disabled = true;
}

// export function cloneBookCard(bookCard: HTMLDivElement): HTMLDivElement {

//     const clonedBookCard = bookCard.cloneNode(true) as HTMLDivElement;

//     if (!clonedBookCard) {
//         throw new Error("clonedBookCard did not clone.");
//     }

//     return clonedBookCard;
// }
