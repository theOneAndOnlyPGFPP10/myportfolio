import { ArticleCard, ArticleListResponse, Pagination } from '@/types/articles';
import { env } from '../env';
import { unstable_cache } from 'next/cache';

const fetchArticleCards = async (
  page: number,
  pageSize: number,
  category?: string
): Promise<ArticleListResponse|{data: ArticleCard[],meta:{pagination:Pagination}}[]> => {
  const params = new URLSearchParams({
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'fields[2]': 'publishedAt',
    'fields[3]': 'excerpt',
    'populate[author][fields][0]': 'name',
    'populate[category][fields][0]': 'name',
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'alternativeText',
    'populate[cover][fields][2]': 'width',
    'populate[cover][fields][3]': 'height',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'publishedAt:desc',
  });

  if (category) {
    params.append('filters[category][name][$eq]', category);
  }

  const res = await fetch(`${env.NEXT_PUBLIC_STRAPI_URL}/api/articles?${params}`, {
    headers: { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` },
    cache:"no-store"
  });

  if (!res.ok) throw new Error(`Strapi error ${res.status}`);
  return res.json();
};

export const getArticleCards = (page = 1, pageSize = 25, category?: string) =>
  unstable_cache(
    () => fetchArticleCards(page, pageSize, category),
    ['article-cards', String(page), String(pageSize), category ?? ''],
    { revalidate: 60 }
  )();



export const getLatestArticleByCategory = (category: string) =>
  unstable_cache(
    () => fetchArticleCards(1, 1, category),
    ['article-latest', category],
    { revalidate: 60 }
  )();


  


