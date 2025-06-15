import type { OLDetails } from "../types/OpenLibraryResponse";
import type { Book } from "../types/Book";

export function mapToBook(docs: OLDetails[]): Book[] {
    return docs.map(doc => ({
        author: doc.author_name?.[0],
        title: doc.title,
        authorKey: doc.author_key?.[0],
        titleKey: doc.key,
        firstYearPublish: doc.first_publish_year,
        cover: doc.cover_i
    }));
}
