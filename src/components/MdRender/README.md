# MDX 自定义渲染组件使用指南

## 快速开始

```tsx
import { getMdxFromString } from "@/lib/md";
import MdxRenderer from "@/components/MdRender/MdxRenderer";

export default async function BlogPost() {
  const mdxContent = `
---
title: "我的博客文章"
date: "2024-01-01"
author: "MrZhang"
---

# 这是一个标题

这是一个段落，包含**粗体文字**和*斜体文字*。

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

内联代码：\`const x = 1;\`

## 列表示例

### 无序列表
- 项目 1
- 项目 2
- 项目 3

### 有序列表
1. 第一项
2. 第二项
3. 第三项

## 表格示例

| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |
| 王五 | 28   | 广州 |

## 引用

> 这是一个引用块
> 可以包含多行内容

## 图片

![示例图片](/example.jpg)

## 链接

[访问我的网站](https://example.com)

---

这是分割线上方的内容。
  `;

  const { mdxSource, frontMatter } = await getMdxFromString(mdxContent);

  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>
        作者：{frontMatter.author} | 日期：{frontMatter.date}
      </p>
      <MdxRenderer mdxSource={mdxSource} />
    </div>
  );
}
```

## 支持的功能

### ✅ 已实现的组件

1. **标题** (h1-h6) - 带有底部边框和合适的间距
2. **代码块** - 语法高亮 + 复制按钮
3. **内联代码** - 粉色高亮样式
4. **表格** - 响应式设计，悬停效果
5. **列表** - 有序和无序列表，带缩进
6. **图片** - Next.js Image 组件，带标题
7. **链接** - 外部链接自动新窗口打开
8. **引用块** - 左侧蓝色边框
9. **分割线** - 简洁的水平线
10. **文本强调** - 粗体和斜体

### 🎨 样式特点

- **深色模式支持** - 所有组件都支持深色主题
- **响应式设计** - 在各种屏幕尺寸下都能良好显示
- **代码高亮** - 使用 highlight.js 提供语法高亮
- **复制功能** - 代码块支持一键复制
- **无障碍访问** - 符合 WCAG 标准

### 📦 依赖包

确保安装以下依赖：

```bash
npm install next-mdx-remote remark-gfm rehype-highlight rehype-slug rehype-autolink-headings highlight.js clsx
```

### 🔧 自定义样式

你可以通过修改 `CustomMDXComponents.tsx` 中的 Tailwind 类名来自定义样式：

```tsx
// 例如：自定义标题样式
const Heading1 = ({ children, ...props }: any) => (
  <h1 className="text-5xl font-extrabold text-purple-600 mt-10 mb-6" {...props}>
    {children}
  </h1>
);
```

### 🚀 高级用法

#### 添加自定义组件

```tsx
const CustomMDXComponents = {
  // ... 现有组件

  // 添加自定义组件
  Alert: ({
    type,
    children,
  }: {
    type: "info" | "warning" | "error";
    children: React.ReactNode;
  }) => (
    <div
      className={`p-4 rounded-lg mb-4 ${
        type === "info"
          ? "bg-blue-100 text-blue-800"
          : type === "warning"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {children}
    </div>
  ),
};
```

然后在 MDX 中使用：

```mdx
<Alert type="info">这是一个信息提示框</Alert>
```
