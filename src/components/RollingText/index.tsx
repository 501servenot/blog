"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import { SplitText } from "gsap/all";

interface RollingTextProps {
  text: string;
  duration: number;
  delay: number;
  direction: "up" | "down";
}
gsap.registerPlugin(SplitText);

export default function RollingText({
  text,
  duration = 1.0,
  delay = 0.06,
  direction = "up",
}: RollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 将文字切割为单个字符
    const split = new SplitText(containerRef.current, { type: "chars" });

    // 初始状态
    gsap.set(split.chars, {
      y: direction === "up" ? "100%" : "-100%",
      opacity: 0,
    });

    // 构建时间线动画
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.3,
    });

    // 进入动画
    tl.to(split.chars, {
      y: "0%",
      opacity: 1,
      ease: "back.out(2)",
      duration: duration,
      stagger: delay,
    });

    // 滚出动画
    tl.to(split.chars, {
      y: direction === "up" ? "-100%" : "100%",
      opacity: 0,
      ease: "back.in(2)",
      duration: duration,
      stagger: delay,
    });

    return () => {
      tl.kill();
      split.revert(); // 清理SplitText生成的结构
    };
  }, [text, duration, delay, direction]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden text-white text-5xl font-extrabold tracking-wide"
    >
      {text}
    </div>
  );
}
