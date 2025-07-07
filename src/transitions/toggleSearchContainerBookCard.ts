import { getBookCardKey, selectSearchContainerBookCard } from "../components/bookCard";
import { toggleElement } from "./toggleElement";

export function toggleSearchContainerBookCard(bookCard: HTMLDivElement): void {

    const bookCardKey: string = getBookCardKey(bookCard);

    const searchContainerBookCard: HTMLDivElement = selectSearchContainerBookCard(bookCardKey);

    toggleElement(searchContainerBookCard);
}
