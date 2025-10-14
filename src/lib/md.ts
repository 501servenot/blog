// import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemoteSerializeResult } from "next-mdx-remote";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";

// export interface MdxContent {
//   mdxSource: MDXRemoteSerializeResult;
//   frontMatter: {
//     [key: string]: any;
//   };
// }

// export async function serializeMdx(content: string): Promise<MdxContent> {
//   // 解析front matter
//   const frontMatterRegex = /^---\s*\n(.*?)\n---\s*\n/s;
//   const match = content.match(frontMatterRegex);

//   let frontMatter = {};
//   let mdxContent = content;

//   if (match) {
//     // 简单的YAML解析（你可能需要使用yaml库来处理复杂情况）
//     const frontMatterText = match[1];
//     frontMatter = parseFrontMatter(frontMatterText);
//     mdxContent = content.replace(frontMatterRegex, "");
//   }

//   const mdxSource = await serialize(mdxContent, {
//     mdxOptions: {
//       remarkPlugins: [
//         remarkGfm, // 支持GitHub风格的Markdown
//       ],
//       rehypePlugins: [
//         rehypeHighlight, // 代码高亮
//         rehypeSlug, // 为标题添加id
//         [
//           rehypeAutolinkHeadings, // 为标题添加锚点链接
//           {
//             behavior: "wrap",
//             properties: {
//               className: ["anchor-link"],
//             },
//           },
//         ],
//       ],
//     },
//     parseFrontmatter: false, // 我们手动处理front matter
//   });

//   return {
//     mdxSource,
//     frontMatter,
//   };
// }

// // 简单的front matter解析器
// function parseFrontMatter(frontMatterText: string): { [key: string]: any } {
//   const lines = frontMatterText.split("\n");
//   const result: { [key: string]: any } = {};

//   for (const line of lines) {
//     const trimmedLine = line.trim();
//     if (!trimmedLine) continue;

//     const colonIndex = trimmedLine.indexOf(":");
//     if (colonIndex === -1) continue;

//     const key = trimmedLine.slice(0, colonIndex).trim();
//     let value = trimmedLine.slice(colonIndex + 1).trim();

//     // 移除引号
//     if (
//       (value.startsWith('"') && value.endsWith('"')) ||
//       (value.startsWith("'") && value.endsWith("'"))
//     ) {
//       value = value.slice(1, -1);
//     }

//     // 尝试解析数字和布尔值
//     if (value === "true") {
//       result[key] = true;
//     } else if (value === "false") {
//       result[key] = false;
//     } else if (!isNaN(Number(value)) && value !== "") {
//       result[key] = Number(value);
//     } else {
//       result[key] = value;
//     }
//   }

//   return result;
// }

// // 从文件读取并序列化MDX内容
// export async function getMdxFromFile(filePath: string): Promise<MdxContent> {
//   const fs = await import("fs/promises");
//   const path = await import("path");

//   try {
//     const fullPath = path.resolve(filePath);
//     const fileContent = await fs.readFile(fullPath, "utf8");
//     return await serializeMdx(fileContent);
//   } catch (error) {
//     console.error("Error reading MDX file:", error);
//     throw new Error(`Failed to read MDX file: ${filePath}`);
//   }
// }

// // 从字符串序列化MDX内容
// export async function getMdxFromString(content: string): Promise<MdxContent> {
//   return await serializeMdx(content);
// }
