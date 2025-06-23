import type { BookRequestDTO } from "./types/BookRequestDTO";
import type { BookResponseDTO } from "./types/BookResponseDTO";
import type { MemberResponseDTO } from "./types/MemberResponseDTO";
import type { ReservationResponseDTO } from "./types/ReservationResponseDTO";

export let currentMember: MemberResponseDTO;
export let currentReservation: ReservationResponseDTO;
export let selectedBooks: BookResponseDTO[] = [];

export function getCurrentMember(): MemberResponseDTO {
    return currentMember;
}

export function setCurrentMember(member: MemberResponseDTO) {
    currentMember = member;
}

export function getCurrentReservation(): ReservationResponseDTO {
    return currentReservation;
}

export function setCurrentReservation(reservation: ReservationResponseDTO) {
    currentReservation = reservation;
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

export function isSelectedBook(book: BookRequestDTO): boolean {
    return selectedBooks.some(bookResponseDTO => {
        bookResponseDTO.author === book.author &&
        bookResponseDTO.title === book.title &&
        bookResponseDTO.authorKey === book.authorKey &&
        bookResponseDTO.titleKey === book.titleKey &&
        bookResponseDTO.firstPublishYear === book.firstPublishYear &&
        bookResponseDTO.cover === book.cover
    })
}

export function getSelectedBook(book: BookResponseDTO): BookResponseDTO | undefined {
    return selectedBooks.find(bookResponseDTO => bookResponseDTO.bookId === book.bookId);
}

export function getSelectedBooks(): BookResponseDTO[] {
    return selectedBooks;
}

export function clearSelectedBooks() {
    selectedBooks = [];
}
