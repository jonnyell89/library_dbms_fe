import type { OLDetails } from "../types/OpenLibraryResponse";
import type { BookRequestDTO } from "../types/BookRequestDTO";

export function mapOLResponseToBookRequestDTO(docs: OLDetails[]): BookRequestDTO[] {
    return docs.map(doc => ({
        author: doc.author_name?.[0],
        title: doc.title,
        authorKey: doc.author_key?.[0],
        titleKey: doc.key,
        firstPublishYear: doc.first_publish_year,
        cover: doc.cover_i
    }));
}
