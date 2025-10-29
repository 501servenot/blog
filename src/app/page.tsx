"use client";
import RollingText from "@/components/RollingText";
import BlurText from "@/components/BlurText";
import Image from "next/image";
import SteamInfoShow from "@/components/SteamInfoShow";
import gsap from "gsap";
import { useEffect, useRef } from "react";
// import { Matrix, wave, Frame } from "@/components/ui/matrix";

export default function Home() {
  const avatarRef = useRef<HTMLImageElement>(null)
  const handletoX = () => {
    window.open("https://x.com/Mrzhanggggg", "_blank");
  };
  const handletogithub = () => {
    window.open("https://github.com/501servenot", "_blank");
  };
  const handletoB = () => {
    window.open(
      "https://space.bilibili.com/456528093?spm_id_from=333.337.0.0",
      "_blank"
    );
  };

  // const frames: Frame[] = [
  //   [
  //     [
  //       0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //     [
  //       0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //     [
  //       0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //     [
  //       0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //     [
  //       0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //   ],
  //   // [
  //   //   [
  //   //     0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  //   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   //   ],
  //   //   [
  //   //     0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  //   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   //   ],
  //   //   [
  //   //     0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  //   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   //   ],
  //   //   [
  //   //     0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  //   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   //   ],
  //   //   [
  //   //     0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  //   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   //   ],
  //   // ],
  // ];

  useEffect(() => {
    gsap.fromTo(
      avatarRef.current,
      {
        opacity: 0,
        filter: `blur(20px)`,
      },
      {
        opacity: 1,
        duration: 2,
        filter: 'blur(0px)',
        ease: "power2.out",
      }
    );
  }, [])

  return (
    <div className="">
      <main>
        <Image
          ref={avatarRef}
          src={"/avatar.png"}
          width={70}
          height={70}
          alt="avatar"
          className="object-cover w-25 h-25 mt-20"
        />
        <h1 className="mt-6">
          <RollingText text="Hello" duration={0.8} delay={0.1} direction="up" />
        </h1>
        <p className="text-lg mt-5">👋我是MrZhang</p>
        <div className="mt-2">
          <BlurText
            text="一名前端开发工程师"
            speed={0.9}
            stagger={0.12}
            blur={30}
            delay={0.1}
          />
        </div>
        <div className="mt-2">
          <BlurText
            text="喜欢新技术，写一些炫酷的东西"
            speed={0.7}
            stagger={0.12}
            blur={30}
            delay={0.5}
          />
        </div>
        <div className="mt-2">
          <BlurText
            text="你可以在这里发现有趣，有用的文章和技术"
            speed={0.8}
            stagger={0.12}
            blur={30}
            delay={1.0}
          />
        </div>
        <div className="text-xl mt-4">#MrZhanggggg</div>
        <div className="flex gap-5 mt-4">
          <Image
            src={"/homeicon/Github.svg"}
            width={20}
            height={20}
            alt="github"
            onClick={handletogithub}
          />
          <Image
            src={"/homeicon/X.svg"}
            width={20}
            height={20}
            alt="github"
            onClick={handletoX}
          />
          <Image
            src={"/homeicon/Bilibili.svg"}
            width={20}
            height={20}
            alt="github"
            onClick={handletoB}
          />
        </div>
        {/* <div className="mt-4 ">
          <Matrix
            rows={5}
            cols={42}
            frames={frames}
            fps={2}
            loop
            ariaLabel="Wave animation"
          />
        </div> */}
        <div className="mt-6">
          <SteamInfoShow pollingInterval={15000} />
        </div>
      </main>
    </div>
  );
}
