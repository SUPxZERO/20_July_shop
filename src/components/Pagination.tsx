'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Determine the range of pages to show
  // We'll show up to 5 page buttons total: first, last, current, and adjacent
  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
        className={`p-2 rounded-full transition-colors ${
          currentPage > 1
            ? 'text-brand-charcoal hover:bg-brand-pink-50 hover:text-brand-pink-600'
            : 'text-brand-charcoal/20 pointer-events-none'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-brand-charcoal/40">
                &hellip;
              </span>
            );
          }
          
          const isCurrentPage = page === currentPage;
          return (
            <Link
              key={`page-${page}`}
              href={createPageURL(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                isCurrentPage
                  ? 'bg-brand-charcoal text-white shadow-md'
                  : 'text-brand-charcoal hover:bg-brand-pink-50 hover:text-brand-pink-600'
              }`}
            >
              <span>{page}</span>
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
        className={`p-2 rounded-full transition-colors ${
          currentPage < totalPages
            ? 'text-brand-charcoal hover:bg-brand-pink-50 hover:text-brand-pink-600'
            : 'text-brand-charcoal/20 pointer-events-none'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
