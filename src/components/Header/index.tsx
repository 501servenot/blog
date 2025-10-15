"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const handleClickAbout = () => {
    router.push("/about");
  };
  const handleClickArticles = () => {
    router.push("/articles");
  };
  const handleClickHome = () => {
    router.push("/");
  };
  const handleClickChat = () => {
    router.push('/message')
  }

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-8 z-50">
      <div
        className="flex items-center justify-center gap-10 py-6 rounded-full border border-white/10 
              bg-oklch(20.5% 0 0) backdrop-blur-xs overflow-hidden shadow-lg h-10 w-65"
      >
        <Image
          alt="home"
          width={18}
          height={18}
          src={"/home.svg"}
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickHome}
        />

        <Image
          alt="articles"
          width={18}
          height={18}
          src={"/article.svg"}
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickArticles}
        />
        <Image
          alt="about"
          width={18}
          height={18}
          src={"/about.svg"}
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickAbout}
        />
        <Image
          alt="chat"
          width={18}
          height={18}
          src={"/chat.svg"}
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickChat}
        />
      </div>
    </div>
  );
}
