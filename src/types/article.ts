export interface Article {
    slug: string;
    title: string;
    date: string;
    tags?: string[];
    description: string;
    cover: string;
    content: string;
}