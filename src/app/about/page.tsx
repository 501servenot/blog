import Image from "next/image";
import gsap from "gsap";


export default function AboutMe() {
  const tecicons = [
    "Css3.svg",
    "Html5.svg",
    "Javascript.svg",
    "Nextjs.svg",
    "React.svg",
    "SupabaseIcon.svg",
    "Tailwindcss.svg",
    "Typescript.svg",
    ];
    
    const toolicons = [
        'figma.svg',
        'perplexity.svg',
    ]
  return (
    <div className="text-white mx-auto max-w-1/3">
      <h1 className="text-xl text-neutral-300 font-semibold mt-10">关于我</h1>
      <div className="ml-6">
        <p className=" text-neutral-300 font-medium mt-4">
          你好呀，很高兴与你在这里相遇
        </p>
        <p className=" text-neutral-300 font-medium mt-2">
          我是一名物理系的大学生，但对计算机有浓厚的兴趣，自学了前端开发，还学过一些机器学习（但没什么成果）
        </p>
        <p className=" text-neutral-300 font-medium mt-2">
          在这里我会分享有趣，实用的文章，以及自己的学习心得，让我们一起进步！
        </p>
      </div>
      <div className="ml-4 mt-4">
        <h2 className="text-neutral-300 font-lg font-semibold">
          我使用的技术栈
        </h2>
        <div className="grid grid-cols-4 gap-6 px-6 py-2">
          {tecicons.map((icon) => (
            <div className="flex items-center justify-center w-16 h-16 ">
              <Image
                key={icon}
                src={`/aboutpagesvg/${icon}`}
                alt={icon}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
        <h2 className="text-neutral-300 font-lg font-semibold">
          我使用的工具栈
        </h2>
        <div className="grid grid-cols-4 gap-6 px-6 py-2">
          {toolicons.map((icon) => (
            <div className="flex items-center justify-center w-16 h-16 ">
              <Image
                key={icon}
                src={`/aboutpagesvg/${icon}`}
                alt={icon}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
