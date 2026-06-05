'use client';

import { useRouter } from 'next/navigation';
import { Pagination } from './Pagination';
import { ArticleListResponse } from '@/types/articles';

interface PaginationClientProps {
  meta: ArticleListResponse['meta'];
  basePath: string;
}

export function PaginationClient({ meta, basePath }: PaginationClientProps) {
  const router = useRouter();

  return (
    <Pagination
      meta={meta}
      onPageChange={(page) => router.push(`${basePath}?page=${page}`,{scroll:false})}
    />
  );
}