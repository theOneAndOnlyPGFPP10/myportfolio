import { services } from "@/utils/lib/services";
import { getLatestArticleByCategory } from "@/utils/lib/strapi/strapi";
import CategoryCard from "./CategoryCard";
import { ArticleCard } from "@/types/articles";
import { Suspense } from "react";
import CardFallback from "./CardFallback";

async function AsyncCard({ categoryName }: { categoryName: string }) {
  const res = await getLatestArticleByCategory(categoryName);
  if (!res) return null;

  const dataArray = Array.isArray(res) ? res : res.data;
  const article = dataArray && dataArray[0] ? (dataArray[0] as ArticleCard) : null;

  if (!article) return null;

  return <CategoryCard article={article} />;
}

// 2. Główny komponent siatki
function Categories() {
  const categories = services.map((serv) => serv.serviceCategory);

  return (
    <>
      <div className="services-grid">
        {categories.map((cat, index) => (
          <div key={cat || index} className="services-card">
            <Suspense fallback={<CardFallback />}>
              <AsyncCard categoryName={cat} />
            </Suspense>
          </div>
        ))}
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.3vw;
          width: clamp(100px, 50%, 700px);
          margin-bottom: 2vw;
        }

        @media (max-width: 768px) {
          .services-grid {
            // width:100%;
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </>
  );
}

export default Categories;