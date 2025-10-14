import { getAllArticles } from "@/lib/fs";
import ArticlesList from "@/components/ArticlesList";

export default async function Articles() {
  const articles = getAllArticles();

  return <ArticlesList articles={articles} />;
}
