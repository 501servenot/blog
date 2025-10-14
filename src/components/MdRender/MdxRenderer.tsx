'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import CustomMDXComponents from "./CustomMDXComponents";

interface MdxRendererProps {
  mdxSource: MDXRemoteSerializeResult;
  className?: string;
}

export default function MdxRenderer({
  mdxSource,
  className = "",
}: MdxRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <MDXRemote {...mdxSource} components={CustomMDXComponents} />
    </div>
  );
}
