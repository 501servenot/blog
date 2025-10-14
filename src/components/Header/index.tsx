"use client";
import { House, GalleryVerticalEnd, User } from "lucide-react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-8 z-50">
      <div
        className="flex items-center justify-center gap-20 py-6 rounded-full border border-white/10 
              bg-oklch(20.5% 0 0) backdrop-blur-xs overflow-hidden shadow-lg h-10 w-65"
      >
        <div
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickHome}
        >
          <House strokeWidth={2.25} width={20} height={20} />
        </div>
        <div
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickArticles}
        >
          <GalleryVerticalEnd strokeWidth={2.25} width={20} height={20} />
        </div>
        <div
          className="text-stone-300 transform transition-all duration-500 ease-out hover:text-stone-200 hover:scale-110 cursor-pointer"
          onClick={handleClickAbout}
        >
          <User strokeWidth={2.25} width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
