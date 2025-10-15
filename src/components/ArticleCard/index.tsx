"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ArticleCardProps {
  article: Article;
  index: number; // 添加索引用于错开动画时间
  className: string;
}

export default function ArticleCard({
  article,
  index,
  className,
}: ArticleCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // 设置初始状态：模糊、透明、稍微向下偏移
    gsap.set(cardRef.current, {
      filter: "blur(10px)",
      opacity: 0,
      y: 30,
    });

    // 创建淡入动画，每个卡片延迟不同时间
    gsap.to(cardRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: index * 0.15, // 每个卡片延迟0.15秒
      ease: "power2.out",
    });
  }, [index]);

  return (
    <Link
      ref={cardRef}
      href={`/articles/${article.slug}`}
      className={`block group mb-6 ${className}`}
    >
      <div className="rounded-xl relative ">
        <Image
          src={article.cover}
          width={800}
          height={600}
          alt="cover"
          className="rounded-xl object-cover transition-all duration-300"
        />
        {/* 暗化遮罩层 */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 rounded-xl"></div>
      </div>
      <div className="mt-2">
        <h2 className="text-sm font-semibold text-neutral-200">
          {article.title}
        </h2>
        <p className="text-xs text-neutral-500">{article.date}</p>
      </div>
    </Link>
  );
}
