import { getAllArticleBySlug } from "@/lib/fs";
import { serializeMarkdown } from "@/lib/mdtest";
import MdxRenderer from "@/components/MdRender/MdxRenderer";
import { ChevronsLeft } from "lucide-react";

export default async function Articles({
  params,
}: {
  params: { slug: string };
}) {
  const article = getAllArticleBySlug(params.slug);
  const mdxSource = await serializeMarkdown(article.content);

  return (
    <div className="mt-10">
      <div className="flex gap-1 mb-2"
      >
        <ChevronsLeft className="w-5 h-5" />
        <span className="text-sm hover:text-neutral-100">返回</span>
      </div>
      <h1 className="text-xl font-bold mb-4">{article.title}</h1>
      <div className="flex gap-6">
        <div className="text-xs flex-col text-neutral-400">
          发布日期
          <div className="mt-1 text-neutral-100">{article.date}</div>
        </div>
        <div className="text-xs flex-col text-neutral-400">
          作者
          <div className="mt-1 text-neutral-100">MrZhang</div>
        </div>
      </div>
      <article className="prose mx-auto dark:prose-invert">
        <MdxRenderer mdxSource={mdxSource} />
      </article>
    </div>
  );
}
