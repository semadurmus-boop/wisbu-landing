import { FooterCTA } from "@/components/PremiumFooter";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="article-content">
        {children}
      </main>
      <FooterCTA flat />
    </>
  );
}
