"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

interface BlurTextProps {
  text: string;
  speed?: number; // 每个字符动画持续时间，默认0.8秒
  stagger?: number; // 字符间隔时间，默认0.02秒
  blur?: number; // 模糊程度，默认20px
  delay?: number; // 开始延迟，默认0
  className?: string;
  onComplete?: () => void;
}

gsap.registerPlugin(SplitText);

export default function BlurText({
  text,
  speed = 0.8,
  stagger = 0.02,
  blur = 20,
  delay = 0,
  className = "",
  onComplete,
}: BlurTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "chars" });

    // 初始状态：设置强模糊和透明度
    gsap.set(split.chars, {
      opacity: 0,
      filter: `blur(${blur}px)`,
      y: 10,
    });

    // 创建动画时间线
    const timeline = gsap.timeline({
      delay: delay,
      onComplete: () => {
        onComplete?.();
      },
    });

    // 逐字符动画 - 更快的连续显示
    timeline.to(split.chars, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: speed,
      stagger: stagger, // 很小的间隔时间，让文字快速连续显示
      ease: "power3.out",
    });

    setIsVisible(true);

    // 清理函数
    return () => {
      split.revert();
    };
  }, [text, speed, stagger, blur, delay, onComplete]);

  return (
    <div
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {text}
    </div>
  );
}
