export interface Author {
  id: number;
  documentId: string;
  name: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
}

export interface CoverFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: CoverFormat;
    small: CoverFormat;
    medium: CoverFormat;
    large: CoverFormat;
  };
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ArticleCard {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: Author | null;
  category: Category | null;
  cover: Cover | null;
}

export interface Article extends ArticleCard {
  contentMD: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ArticleListResponse {
  data: ArticleCard[];
  meta: {
    pagination: Pagination;
  };
}

export interface ArticleSingleResponse {
  data: Article;
  meta: Record<string, never>;
}
