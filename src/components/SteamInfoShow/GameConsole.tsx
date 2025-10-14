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
    tl.to(".body-frame", { drawSVG: "0% 100%", duration: 3, ease: "none" }, 0)
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

    // Steam图标的独立动画时间线
    const steamTl = gsap.timeline();

    // 设置Steam图标初始状态：完全隐藏和模糊
    gsap.set(".steam", {
      filter: "blur(15px)",
      opacity: 0,
      scale: 0.8,
    });

    // Steam图标动画序列
    steamTl
      // 4秒后开始显示：从模糊到清晰
      .to(".steam", {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        duration: 1, // 1秒变清晰
        delay: 4, // 4秒后开始
        ease: "power2.out",
      })
      // 停留2秒后开始消失：从清晰到模糊
      .to(".steam", {
        filter: "blur(15px)",
        opacity: 0,
        scale: 0.8,
        duration: 1.5, // 1秒变模糊消失
        delay: 3, // 停留2秒
        ease: "power2.in",
      });
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

        {/* steam图标 */}
        <g className="steam" transform="translate(162, 55)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 24 24"
          >
            <path
              fill="#e6e6e6"
              d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658a3.4 3.4 0 0 1 1.912-.59q.094.001.188.006l2.861-4.142V8.91a4.53 4.53 0 0 1 4.524-4.524c2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911l.004.159a3.39 3.39 0 0 1-3.39 3.396a3.41 3.41 0 0 1-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0M7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25a2.551 2.551 0 0 0 3.337-3.324a2.547 2.547 0 0 0-3.255-1.413l1.523.63a1.878 1.878 0 0 1-1.445 3.467zm11.415-9.303a3.02 3.02 0 0 0-3.015-3.015a3.015 3.015 0 1 0 3.015 3.015m-5.273-.005a2.264 2.264 0 1 1 4.531 0a2.267 2.267 0 0 1-2.266 2.265a2.264 2.264 0 0 1-2.265-2.265"
            />
          </svg>
        </g>
      </svg>
  );
}
