import { selectDocumentElement } from "../utils/selectDocumentElement";

export function toggleElement<T extends HTMLElement>(elementSelector: string): void {

    const element: T = selectDocumentElement(`${elementSelector}`);

    const ishidden = element.style.display === "none";

    element.style.display = ishidden ? "block" : "none";
}
