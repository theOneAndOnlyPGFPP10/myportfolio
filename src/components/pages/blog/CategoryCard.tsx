"use client"
import Link from 'next/link'
import { ArticleCard } from '@/types/articles'
import { env } from '@/utils/lib/env'
import Image from 'next/image'
import { useState } from 'react'

function CategoryCard({ article }: { article: ArticleCard }) {
    const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
        <div style={{
            width: "100%", 
            height: "100%", 
            opacity: 0.5, 
            transition: "opacity 0.2s ease-in-out",
            backgroundColor: "#ccc"
        }}>
            
            {article.cover?.url ? (
                <Image 
                    src={env.NEXT_PUBLIC_STRAPI_URL + article.cover.url} 
                    alt={article.cover.alternativeText || "article cover"}
                    fill 
                    priority 
                    sizes="(max-width: 768px) 100vw, 25vw" 
                    style={{ objectFit: "cover" }}
                    onLoad={() => setIsLoaded(true)} 
                />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <span>No image</span>
                </div>
            )}
        </div>
        
        <Link href={`/blog/${article.category?.name}`} className="services-card-text" style={{ 
        }}>
            {/* Bezpieczne sprawdzanie kategorii i fallback na pusty string */}
            {article.category?.name 
                ? article.category.name.replace(/[\s-]/g, "").repeat(35) 
                : "BRAK KATEGORII "}
        </Link>

        <style>{`

        @media (max-width: 768px) {
      
          .services-card h2 {
            font-size: 5vw !important;
          }
          .services-card-text {
            font-size: 12vw !important;
          }
        }

        .services-card {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .services-card-text {
          position: absolute;
          width:140%;
          aspect-ratio:1/1;
          inset: -16%;
          line-height: 0.65;
          font-size: 7vw;
          font-weight: 700;
          color:white;
          mix-blend-mode:difference;
          text-transform: uppercase;
          word-break: break-all;
          overflow: hidden;
          text-align: justify;
          transform:rotateZ(45deg)
        }
      `}</style>
    </>
  )
}

export default CategoryCard;