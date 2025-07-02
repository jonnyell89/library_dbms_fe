import type { OLDetails } from "../types/OpenLibraryResponse";
import type { BookRequestDTO } from "../types/BookRequestDTO";

// Maps Open Library API response to BookRequestDTO.
export function mapSearchResultsToBookRequestDTO(docs: OLDetails[]): BookRequestDTO[] {

    return docs.map(doc => ({
        author: doc.author_name?.[0],
        title: doc.title,
        authorKey: doc.author_key?.[0],
        titleKey: doc.key,
        firstPublishYear: doc.first_publish_year,
        cover: doc.cover_i,
        coverEditionKey: doc.cover_edition_key,
    }))
}
