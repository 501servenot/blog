import fs from 'fs';
import path from 'path';
import { Article } from '@/types/article';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), "content");

//获取所有文章并解析文章metadata
export function getAllArticles(): Article[] {
    const files = fs.readdirSync(contentDir)
    return files
        .filter(file => file.endsWith('.md'))
        .map((file) => {
            const filePath = path.join(contentDir, file);
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace(/\.md$/, ""),
                ...data,
                content,
            } as Article;
        });
}

export function getAllArticleBySlug(slug: string): Article {
    const filePath = path.join(contentDir, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
    const { data, content } = matter(fileContent);
    return {
        slug, ...data, content
    } as Article;
}