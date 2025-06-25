export interface OLDetails {
    author_key: string[];
    author_name: string[];
    cover_edition_key: string;
    cover_i: number;
    edition_count: number;
    first_publish_year: number;    
    has_fulltext: boolean;
    key: string;
    public_scan_b: boolean;
    title: string;
}

export interface OLResponse {
    start: number;
    num_found: number;
    docs: OLDetails[];
}
