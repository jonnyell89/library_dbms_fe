import type { BookRequestDTO } from "../types/BookRequestDTO";
import type { BookResponseDTO } from "../types/BookResponseDTO";
import type { MemberResponseDTO } from "../types/MemberResponseDTO";
import type { ReservationResponseDTO } from "../types/ReservationResponseDTO";

export let currentMember: MemberResponseDTO | null = null;
export let currentReservation: ReservationResponseDTO | null = null;
export let selectedBooks: BookResponseDTO[] = [];

export function getCurrentMember(): MemberResponseDTO | null {
    return currentMember;
}

export function setCurrentMember(member: MemberResponseDTO) {
    currentMember = member;
}

export function clearCurrentMember(): void {
    currentMember = null;
}

export function getCurrentReservation(): ReservationResponseDTO | null {
    return currentReservation;
}

export function setCurrentReservation(reservation: ReservationResponseDTO) {
    currentReservation = reservation;
}

export function clearCurrentReservation(): void {
    currentReservation = null;
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

export function getSelectedBook(book: BookResponseDTO): BookResponseDTO | undefined {
    return selectedBooks.find(bookResponseDTO => bookResponseDTO.bookId === book.bookId);
}

export function getSelectedBooks(): BookResponseDTO[] {
    return selectedBooks;
}

export function clearSelectedBooks(): void {
    selectedBooks = [];
}

export function isSelectedBook(book: BookRequestDTO): boolean {
    return selectedBooks.some(bookResponseDTO => 
        bookResponseDTO.author === book.author &&
        bookResponseDTO.title === book.title &&
        bookResponseDTO.authorKey === book.authorKey &&
        bookResponseDTO.titleKey === book.titleKey &&
        bookResponseDTO.firstPublishYear === book.firstPublishYear &&
        bookResponseDTO.cover === book.cover &&
        bookResponseDTO.coverEditionKey === book.coverEditionKey
    )
}
