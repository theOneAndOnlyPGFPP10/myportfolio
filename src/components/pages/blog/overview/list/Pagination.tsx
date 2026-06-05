import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface PaginationProps {
  meta: PaginationMeta | undefined;
  onPageChange: (page: number) => void;
}

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  pages.push(1);

  if (current <= 4) {
    pages.push(2, 3, 4, 5);
    if (total > 6) pages.push("...");
  } else if (current >= total - 3) {
    pages.push("...");
    pages.push(total - 4, total - 3, total - 2, total - 1);
  } else {
    pages.push("...");
    pages.push(current - 1, current, current + 1);
    pages.push("...");
  }

  pages.push(total);
  return pages;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const current = meta?.pagination.page ?? 1;
  const total = meta?.pagination.pageCount ?? 1;

  if (total <= 1) return null;

  const pages = getPages(current, total);

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        aria-label="Poprzednia strona"
        className="flex items-center justify-center w-9 h-9 rounded-md border border-border text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="flex items-center justify-center w-9 h-9 text-sm text-muted-foreground tracking-widest"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === current ? "page" : undefined}
            className={`flex items-center justify-center min-w-[36px] h-9 px-2.5 rounded-md border text-sm transition-colors
              ${
                page === current
                  ? "bg-foreground text-background border-foreground font-medium"
                  : "border-border hover:bg-muted"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        aria-label="Następna strona"
        className="flex items-center justify-center w-9 h-9 rounded-md border border-border text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}