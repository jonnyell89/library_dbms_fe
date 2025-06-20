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

export function getSelectedBooks(): BookResponseDTO[] {
    return selectedBooks;
}

export function clearSelectedBooks() {
    selectedBooks = [];
}
