import type { BookResponseDTO } from "./types/BookResponseDTO";

export let currentMemberId: number | null = null;
export let currentReservationId: number | null = null;
export let selectedBooks: BookResponseDTO[] = [];

export function setCurrentMemberId(memberId: number) {
    currentMemberId = memberId;
}

export function getCurrentMemberId(): number | null {
    return currentMemberId;
}

export function setCurrentReservationId(reservationId: number) {
    currentReservationId = reservationId;
}

export function getCurrentReservationId(): number | null {
    return currentReservationId;
}

export function addSelectedBook(book: BookResponseDTO) {
    selectedBooks.push(book);
}

export function removeSelectedBook(book: BookResponseDTO) {
    const bookIndex = selectedBooks.indexOf(book);
    if (bookIndex > -1) {
        selectedBooks.splice(bookIndex, 1);
    }
}

export function getSelectedBooks(): BookResponseDTO[] {
    return selectedBooks;
}

export function clearSelectedBooks() {
    selectedBooks = [];
}
