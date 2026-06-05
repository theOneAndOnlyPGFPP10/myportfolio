import CategoryHero from '@/components/pages/blog/category/CategoryHero';
import { getLatestArticleByCategory } from '@/utils/lib/strapi/strapi';

interface PageProps {
  params: Promise<{ category: string }>;
}

// Zmieniono [params] na { params }
async function CategoryPage({ params }: PageProps) {

  const { category } = await params;
  const {data} = await getLatestArticleByCategory(category);

  console.log("PARAMS: ", category);

  return (
    <div
      style={{
        minHeight: '80vh',
        height: 'fit-content',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: "hidden"
      }}
    >
      <CategoryHero category = {category} article = {data[0]} />
      <main style={{ width: 'clamp(10px,84.6vw,7000px)' }}>
        {/* Tutaj możesz użyć zmiennej category, np. przekazać do CategoryHero */}
      </main>
    </div>
  );
}

export default CategoryPage;
