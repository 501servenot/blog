import gsap from "gsap";
import { useEffect, useRef } from "react";

interface StatusShowProps {
  state: number;
}
const statusMaps: { [key: number]: { color: string; text: string } } = {
  0: { color: "bg-zinc-400", text: "离线" }, // 灰色
  1: { color: "bg-blue-500", text: "在线" }, // 蓝色
  2: { color: "bg-red-400", text: "忙碌" }, // 红色
  3: { color: "bg-yellow-300", text: "离开" }, // 黄色
  4: { color: "bg-yellow-300", text: "打盹" }, // 黄色
  5: { color: "bg-green-400", text: "想要交易" },
  6: { color: "bg-green-400", text: "想要玩" },
};
export default function StatusShow({ state }: StatusShowProps) {
  const statusInfo = statusMaps[state] || statusMaps[0];
  const isBlinking = state !== 0;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 设置初始状态：完全模糊
    gsap.set(containerRef.current, {
      filter: "blur(10px)",
      opacity: 0.3,
    });

    // 5秒后开始清晰化动画
    gsap.to(containerRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.5, // 清晰化过程持续2秒
      delay: 5, // 5秒后开始
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={containerRef} className="flex items-center gap-1 absolute right-6 top-5">
      <div
        className={`
          w-1.5 h-1.5 rounded-full
          ${statusInfo.color} 
          ${isBlinking ? "animate-pulse" : ""}
        `}
      ></div>

      <span className="text-[9px] text-gray-300">{statusInfo.text}</span>
    </div>
  );
}
