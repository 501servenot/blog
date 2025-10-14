import { GeistSans } from "geist/font/sans";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${GeistSans.className} font-sans`}>{children}</section>
  );
}
