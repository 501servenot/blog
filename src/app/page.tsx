"use client";
import RollingText from "@/components/RollingText";
import Image from "next/image";
import SteamInfoShow from "@/components/SteamInfoShow";

export default function Home() {
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

  return (
    <div className="">
      <main>
        <Image
          src={"/avatar.jpg"}
          width={60}
          height={60}
          alt="avatar"
          className="rounded-full object-cover w-20 h-20 mt-20"
        />
        <h1 className="mt-6">
          <RollingText text="Hello" duration={0.8} delay={0.1} direction="up" />
        </h1>
        <p className="text-lg mt-5">👋我是MrZhang</p>
        <p className="mt-2">一名前端开发工程师</p>
        <p className="mt-2">喜欢新技术，写一些炫酷的东西</p>
        <p className="mt-2">你可以在这里发现有趣，有用的文章和技术</p>
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
        <div className="mt-6">
          <SteamInfoShow pollingInterval={15000} />
        </div>
      </main>
    </div>
  );
}
