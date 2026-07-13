import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache freshness
      gcTime: 1000 * 60 * 10,    // Keep garbage collection at 10 minutes
      retry: 1,                 // Single retry fallback
      refetchOnWindowFocus: false, // Prevents aggressive background noise
    },
  },
});

// Centralized Query Keys Factory 
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
  settings: {
    all: ['settings'] as const,
  },
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.products.all, 'detail', id] as const,
  },
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.orders.lists(), filters] as const,
    listsOnly: () => ['order-lists'] as const,
  },
  brands: {
    all: ['brands'] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
};