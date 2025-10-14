"use client";

import { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // 设置标题初始状态
    gsap.set(headerRef.current.children, {
      opacity: 0,
      y: -20,
      filter: "blur(5px)",
    });

    // 标题动画
    gsap.to(headerRef.current.children, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.2, // 标题和副标题错开显示
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="">
      <div ref={headerRef}>
        <h1 className="mt-10 text-xl font-semibold">Posts</h1>
        <p className="text-xs mt-1 mb-8">一些有趣的文章</p>
      </div>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}
