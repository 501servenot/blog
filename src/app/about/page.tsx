import Image from "next/image";

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
    "vite.svg"
  ];

  const toolicons = ["figma.svg", "perplexity.svg", 'vscode.svg', 'arc.svg', 'notion.svg', 'cursor.svg'];
  return (
    <div className=" mx-auto max-w-1/3">
      <h1 className="text-2xl mt-10">关于我</h1>
      <div className="ml-6">
        <p className=" font-medium mt-4">
          你好呀，很高兴与你在这里相遇!
        </p>
        <p className=" font-medium mt-2">
          我是一名物理系的大学生，但对计算机有浓厚的兴趣，自学了前端开发，还学过一些机器学习（没什么成果）
        </p>
        <p className=" font-medium mt-2">
          在这里我会分享有趣，实用的文章，以及自己的学习心得，让我们一起进步！
        </p>
      </div>
      <div className="mt-4">
        <h2 className="font-lg font-medium">我使用的技术栈:</h2>
        <div className="grid grid-cols-4 gap-x-6 px-6 py-2">
          {tecicons.map((icon) => (
            <div
              className="flex items-center justify-center w-16 h-16"
              key={icon}
            >
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
        <h2 className="font-lg font-medium">我使用的工具栈:</h2>
        <div className="grid grid-cols-4 gap-x-6 px-6 py-2">
          {toolicons.map((icon) => (
            <div
              className="flex items-center justify-center w-16 h-16 "
              key={icon}
            >
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
      <div>
        <p className="">如果你想联系我，欢迎发送邮件:</p>
              <p className=" text-center mt-2">zq2012566134@gmail.com</p>
              <p></p>
      </div>
    </div>
  );
}
