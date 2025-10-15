import { getAllArticleBySlug } from "@/lib/fs";
import { serializeMarkdown } from "@/lib/md";
import MdxRenderer from "@/components/MdRender/MdxRenderer";
import { ChevronsLeft } from "lucide-react";
import BlurText from "@/components/BlurText";
import Link from "next/link";

export default async function Articles({
  params,
}: {
  params: { slug: string };
}) {
  const article = getAllArticleBySlug(params.slug);
  const mdxSource = await serializeMarkdown(article.content);

  return (
    <div className="mt-10">
      <Link
        href="/articles"
        className="flex gap-1 mb-2 cursor-pointer hover:text-neutral-100 transition-colors"
      >
        <ChevronsLeft className="w-5 h-5" />
        <span className="text-sm">返回</span>
      </Link>
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
      <div className="flex-col mt-4 border-[2px] border-neutral-600 rounded-2xl bg-[#222222] px-4 py-2">
        <div className="text-xs text-neutral-50">
          <BlurText
            text="文章摘要"
            speed={1}
            stagger={0.12}
            blur={30}
            delay={0.1}
            className=""
          />
        </div>
        <BlurText
          text={article.description}
          speed={0.7}
          stagger={0.12}
          blur={30}
          delay={0.1}
          className="text-[11px] ml-2"
        />
      </div>
      <article className="prose mx-auto dark:prose-invert">
        <MdxRenderer mdxSource={mdxSource} />
      </article>
    </div>
  );
}
