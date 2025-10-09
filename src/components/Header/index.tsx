'use client'
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
    <div className="mt-6">
      <div className="flex items-center justify-center gap-20">
        <div
          className="text-stone-400 transform transition-color duration-300 hover:text-stone-200"
          onClick={handleClickHome}
        >
          <House strokeWidth={2.25} />
        </div>
        <div
          className="text-stone-400 transform transition-color duration-300 hover:text-stone-200"
          onClick={handleClickArticles}
        >
          <GalleryVerticalEnd strokeWidth={2.25} />
        </div>
        <div
          className="text-stone-400 transform transition-color duration-300 hover:text-stone-200"
          onClick={handleClickAbout}
        >
          <User strokeWidth={2.25} />
        </div>
      </div>
    </div>
  );
}
