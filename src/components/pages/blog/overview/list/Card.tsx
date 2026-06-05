import style from '@/styles/pages/blog/articlesOverview/Card.module.css';
import { ServiceGroup, services } from '@/utils/lib/services';
import { ArticleCard } from '@/types/articles';
import { env } from '@/utils/lib/env';
import { Badge } from 'lucide-react';
import Image from 'next/image';

function truncate(text: string, maxChars = 130) {
  if (text.length <= maxChars) return text;
  const cut = text.lastIndexOf(' ', maxChars);
  return (cut > 0 ? text.slice(0, cut) : text.slice(0, maxChars)) + '...';
}

function isNew(publishedAt: string, days = 4) {
  const diff = Date.now() - new Date(publishedAt).getTime();
  return diff < days * 24 * 60 * 60 * 1000;
}

function Card({ item }: { item: ArticleCard }) {
  const serviceIndex = services.findIndex(
    (s: ServiceGroup) => s.serviceCategory === item.category?.name
  );

  const coverSrc = item.cover?.url
    ? `${env.NEXT_PUBLIC_STRAPI_URL}${item.cover.url}`
    : null;

  return (
    <div className={style.card}>

      {item?.publishedAt && isNew(item.publishedAt) && (
        <Badge className={style.newIcon} />
      )}

      {/* okładka */}
      <div className={style.cover}>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={item.cover?.alternativeText ?? item.title}
            fill
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div className={style.coverFallback} />
        )}
      </div>

      {/* content */}
      <div className={style.content}>

        {/* lewa — tytuł */}
        <div className={style.titleCon}>
          {item?.category?.name && serviceIndex !== -1 && (
            <span
              className={style.category}
              style={{ backgroundColor: services[serviceIndex].color }}
            >
              {item.category.name}
            </span>
          )}
          <h5 className={style.title}>{item?.title}</h5>
        </div>

        {/* prawa — excerpt + separator + autor */}
        <div className={style.restInfo}>
          <p>{truncate(item.excerpt, 130)}</p>
          <p className={style.separator} aria-hidden="true">
            {'- '.repeat(18)}
          </p>
          <p className={style.author}>{item.author?.name}</p>
        </div>

      </div>
    </div>
  );
}

export default Card;