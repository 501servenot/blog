"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin);

export default function DrawGameConsole() {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建时间线
    const tl = gsap.timeline();

    // 设置所有路径的初始状态为不可见
    gsap.set(".draw-path", { drawSVG: "0%" });

    // 所有部件同时开始，3秒内完成，线性动画，不同的绘制方向
    tl.to(".body-frame", { drawSVG: "0% 100%", duration: 3, ease: "none" }, 0) // 顺时针绘制
      .to(
        ".screen-frame",
        { drawSVG: "100% 0%", duration: 3.2, ease: "none" },
        0
      ) // 逆时针绘制
      .to(
        ".middle-screen",
        { drawSVG: "0% 100%", duration: 3.5, ease: "none" },
        0
      ) // 从左到右
      .to(
        ".dpad-vertical",
        { drawSVG: "100% 0%", duration: 2.5, ease: "none" },
        0
      ) // 从下到上
      .to(
        ".dpad-horizontal",
        { drawSVG: "0% 100%", duration: 2.5, ease: "none" },
        0
      ) // 从左到右
      .to(".button-r", { drawSVG: "100% 0%", duration: 2.0, ease: "none" }, 0) // 逆时针
      .to(".button-l", { drawSVG: "0% 100%", duration: 2.3, ease: "none" }, 0) // 顺时针
      .to(".big-mic", { drawSVG: "100% 0%", duration: 2.4, ease: "none" }, 0) // 从右下到左上
      .to(
        ".little-mic",
        { drawSVG: "0% 100%", duration: 2.5, ease: "none" },
        0
      ); // 从左上到右下
  }, []);
  return (
    <svg ref={containerRef} width={350} height={265} viewBox="0 0 400 300">
      {/* 游戏机外框 */}
      <rect
        className="draw-path body-frame"
        x="1.5"
        y="1.5"
        width="397"
        height="297"
        rx="40.5"
        stroke="#E5E5E5"
        strokeWidth="1"
        fill="none"
      />

      {/* 屏幕部分 */}
      <g filter="url(#filter0_i_194_54)">
        <rect
          className="draw-path screen-frame"
          x="13"
          y="13"
          width="374"
          height="150"
          rx="27.5"
          stroke="#E5E5E5"
          strokeWidth="1"
          fill="none"
        />
      </g>

      <defs>
        <filter
          id="filter0_i_194_54"
          x="0"
          y="0"
          width="400"
          height="200"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.62 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_194_54"
          />
        </filter>
      </defs>

      {/* 中间屏幕 */}
      <rect
        className="draw-path middle-screen"
        x="142"
        y="173"
        width="115"
        height="18"
        rx="9"
        stroke="#E5E5E5"
        strokeWidth="1"
        fill="none"
      />

      {/* 十字键 - 重新设计为简单的十字形 */}
      <g transform="translate(40, 198)" className="dpad-group">
        {/* 垂直条 */}
        <rect
          className="draw-path dpad-vertical"
          x="29"
          y="0"
          width="20"
          height="70"
          rx="6"
          stroke="#E5E5E5"
          strokeWidth="1"
          fill="none"
        />
        {/* 水平条 */}
        <rect
          className="draw-path dpad-horizontal"
          x="4"
          y="26"
          width="70"
          height="20"
          rx="6"
          stroke="#E5E5E5"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* 右按钮 */}
      <circle
        className="draw-path button-r"
        cx="343.5"
        cy="214.5"
        r="10"
        stroke="#D9D9D9"
        strokeWidth="1"
        fill="none"
      />

      {/* 左按钮 */}
      <circle
        className="draw-path button-l"
        cx="310.5"
        cy="251.5"
        r="10"
        stroke="#D9D9D9"
        strokeWidth="1"
        fill="none"
      />

      {/* 大麦克风 */}
      <g transform="translate(340, 240)">
        <rect
          className="draw-path big-mic"
          x="45.7793"
          y="1.12132"
          width="4.94855"
          height="63.1557"
          rx="2.47428"
          transform="rotate(45 45.7793 1.12132)"
          stroke="#E5E5E5"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* 小麦克风 */}
      <g transform="translate(361, 262)">
        <rect
          className="draw-path little-mic"
          x="22.853"
          y="1.12132"
          width="4.94855"
          height="30.7332"
          rx="2.47428"
          transform="rotate(45 22.853 1.12132)"
          stroke="#E5E5E5"
          strokeWidth="1"
          fill="none"
        />
      </g>
    </svg>
  );
}
