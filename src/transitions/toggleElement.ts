import { selectContainerElement } from "../utils/selectContainerElement";
import { selectDocumentElement } from "../utils/selectDocumentElement";

export function toggleElement<T extends HTMLElement>(element: T): void {

    const ishidden = element.style.display === "none";

    element.style.display = ishidden ? "block" : "none";
}

export function toggleElementByClass<T extends HTMLElement>(elementSelector: string): void {

    const element: T = selectDocumentElement(`${elementSelector}`);

    const ishidden = element.style.display === "none";

    element.style.display = ishidden ? "block" : "none";
}

export function toggleElementByClassAndContainer<T extends HTMLElement>(container: HTMLElement, elementSelector: string): void {

    const element: T = selectContainerElement(container, `${elementSelector}`);

    const ishidden = element.style.display === "none";

    element.style.display = ishidden ? "block" : "none";
}
