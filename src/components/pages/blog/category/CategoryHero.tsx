import { ArticleCard } from "@/types/articles"
import { env } from "@/utils/lib/env";
import { services } from "@/utils/lib/services"
import Image from "next/image";

function CategoryHero({ article, category }: { article: ArticleCard; category: string }) {
  const service = services.find((serv) => serv.serviceCategory === category)

  if (!service) return null

  return (
    <>
      <div style={{
        position:"relative",
        width:"100%",
        height:"clamp(100px,60vh,1000px)",
        backgroundColor:"black",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <div style={{
          width:"70%",
          height:"70%",
          // mixBlendMode:"difference",
          // backgroundColor:"white",
          zIndex:"1",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
          gap:"1vh"
        }}>
          <h2 style={{backgroundColor:"black", color:"white", padding:"20px", mixBlendMode:"darken"}}>{service.serviceCategory.toUpperCase()}</h2>
          <p style={{backgroundColor:"black", color:"white", padding:"20px", mixBlendMode:"darken"}}>{service.description}</p>
        </div>
        <div style={{
          position:"absolute",
          width:"100%",
          height:"100%",
        }}>
          <Image src={env.NEXT_PUBLIC_STRAPI_URL+article.cover?.url} alt={article.cover?.alternativeText} fill priority style={{width:"100%", height:"100%", objectFit:"cover"}}/>
        </div>
      </div>
      <style>
        {`
        `}      
      </style>
    </>
  )
}

export default CategoryHero