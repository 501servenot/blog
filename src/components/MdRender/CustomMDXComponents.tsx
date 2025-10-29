"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import clsx from "clsx";

// 类型定义
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

interface CodeBlockProps extends ComponentProps {
  children: string;
}

interface LinkProps extends ComponentProps {
  href?: string;
}

interface ImageProps extends ComponentProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

// 代码块组件
const CodeBlock = ({ children, className, ...props }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children]);

  return (
    <div className="relative group my-6">
      <pre className="rounded-lg overflow-x-auto scrollbar-hide">
        <code
          ref={codeRef}
          className={clsx(className, "block p-4 text-sm")}
          {...props}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

// 内联代码组件
const InlineCode = ({ children, ...props }: ComponentProps) => (
  <code
    className="bg-neutral-800 px-2 py-1 rounded text-sm font-mono text-pink-600 dark:text-pink-400"
    {...props}
  >
    {children}
  </code>
);

// 表格组件
const Table = ({ children, ...props }: ComponentProps) => (
  <div className="overflow-x-auto my-6">
    <table
      className="min-w-full border-collapse border border-neutral-600"
      {...props}
    >
      {children}
    </table>
  </div>
);

const TableHead = ({ children, ...props }: ComponentProps) => (
  <thead className="bg-neutral-800" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: ComponentProps) => (
  <tbody {...props}>{children}</tbody>
);

const TableRow = ({ children, ...props }: ComponentProps) => (
  <tr className="border-b border-neutral-600" {...props}>
    {children}
  </tr>
);

const TableHeader = ({ children, ...props }: ComponentProps) => (
  <th
    className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700 last:border-r-0"
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ children, ...props }: ComponentProps) => (
  <td
    className="px-4 py-3 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
    {...props}
  >
    {children}
  </td>
);

// 标题组件
const Heading1 = ({ children, ...props }: ComponentProps) => (
  <h1 className="text-xl font-bold mt-8 mb-4 pb-2" {...props}>
    {children}
  </h1>
);

const Heading2 = ({ children, ...props }: ComponentProps) => (
  <h2 className="text-lg font-semibold mt-8 mb-4 pb-2" {...props}>
    {children}
  </h2>
);

const Heading3 = ({ children, ...props }: ComponentProps) => (
  <h3 className="text-base font-semibold mt-6 mb-3" {...props}>
    {children}
  </h3>
);

const Heading4 = ({ children, ...props }: ComponentProps) => (
  <h4 className="text-sm font-semibold mt-6 mb-3" {...props}>
    {children}
  </h4>
);

const Heading5 = ({ children, ...props }: ComponentProps) => (
  <h5 className="text-sm font-semibold mt-4 mb-2" {...props}>
    {children}
  </h5>
);

const Heading6 = ({ children, ...props }: ComponentProps) => (
  <h6 className="text-sm font-semibold mt-4 mb-2" {...props}>
    {children}
  </h6>
);

// 段落组件
const Paragraph = ({ children, ...props }: ComponentProps) => (
  <p className="text-sm leading-5 mb-3" {...props}>
    {children}
  </p>
);

// 列表组件
const UnorderedList = ({ children, ...props }: ComponentProps) => (
  <ul className="list-disc space-y-1 mb-2 ml-4 " {...props}>
    {children}
  </ul>
);

const OrderedList = ({ children, ...props }: ComponentProps) => (
  <ol className="list-decimal space-y-2 mb-4 ml-4" {...props}>
    {children}
  </ol>
);

const ListItem = ({ children, ...props }: ComponentProps) => (
  <li className="leading-relaxed" {...props}>
    {children}
  </li>
);

// 链接组件
const Link = ({ children, href, ...props }: LinkProps) => (
  <a
    href={href}
    className="text-teal-500 hover:text-teal-300 transition-colors"
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    {...props}
  >
    {children}
  </a>
);

// 图片组件
const CustomImage = ({ src, alt, width, height, ...props }: ImageProps) => {
  if (!src) return null;

  return (
    <div className="my-6 text-center">
      <div className="inline-block rounded-lg overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt || ""}
          width={width || 800}
          height={height || 600}
          className="max-w-full h-auto"
          {...props}
        />
      </div>
      {alt && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  );
};

// 引用块组件
const Blockquote = ({ children, ...props }: ComponentProps) => (
  <blockquote
    className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-800/50 italic text-gray-700 dark:text-gray-300"
    {...props}
  >
    {children}
  </blockquote>
);

// 分割线组件
const HorizontalRule = (props: ComponentProps) => (
  <hr className="my-6 border-t border-gray-700" {...props} />
);

// 强调文本组件
const Strong = ({ children, ...props }: ComponentProps) => (
  <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
    {children}
  </strong>
);

const Emphasis = ({ children, ...props }: ComponentProps) => (
  <em className="italic text-gray-700 dark:text-gray-300" {...props}>
    {children}
  </em>
);

const CustomMDXComponents = {
  // 标题
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,

  // 段落和文本
  p: Paragraph,
  strong: Strong,
  em: Emphasis,

  // 代码
  code: ({ className, children, ...props }: ComponentProps) => {
    // 如果有className且包含language-，说明是代码块
    if (
      className &&
      className.includes("language-") &&
      typeof children === "string"
    ) {
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      );
    }
    // 否则是内联代码
    return <InlineCode {...props}>{children}</InlineCode>;
  },
  pre: ({ children, ...props }: ComponentProps) => {
    // 如果pre包含code子元素，直接返回children（避免双重包装）
    if (
      React.isValidElement(children) &&
      (children as React.ReactElement).type === "code"
    ) {
      return children;
    }
    return (
      <pre {...props} className="overflow-x-auto">
        {children}
      </pre>
    );
  },

  // 列表
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,

  // 表格
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,

  // 其他元素
  a: Link,
  img: CustomImage,
  blockquote: Blockquote,
  hr: HorizontalRule,
};

export default CustomMDXComponents;
