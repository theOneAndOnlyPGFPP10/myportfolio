import Overview from '@/components/pages/blog/overview/ArticlesOverview';
import { PaginationClient } from '@/components/pages/blog/overview/list/PaginationClient';
import BlogHero from '@/components/pages/blog/BlogHero';
import { getArticleCards } from '@/utils/lib/strapi/strapi';
import Categories from "@/components/pages/blog/Categories"


interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 4

async function BlogIndex({searchParams}:PageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const { data, meta } = await getArticleCards(currentPage, PAGE_SIZE);
  return (
    <div
      style={{
        minHeight: '100vh',
        height:'fit-content',
        width: "clamp(10px, 84.6vw, 7000px)",
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{width:"100%", paddingTop:"13vh",display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}}>
        <BlogHero />
        <Categories/>
      </div>
      <main style={{ width: '100%' }}>
        <Overview content={data}/>
        <PaginationClient meta={meta} basePath="/blog"/>
      </main>
      <div
        id="blog-bg"
        style={{
          height: '100%',
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -100,
          opacity: 0.2,
        }}
      >
        {['', '', '', '', '', '', '', '', '', '', '', '','',''].map((_, index) => (
          <div key={index} style={{ width: '4px', height: '100%', borderRight: `2px dashed var(--foreground)` }}></div>
        ))}
      </div>
    </div>
  );
}

export default BlogIndex;
