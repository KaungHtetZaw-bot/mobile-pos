// src/hooks/useOrderQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../api/queryClient';
import { api } from '../api/axiosClient';

export function useOrders(filters: Record<string, any>) {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: async () => {
      const { data } = await api.get('/orders', { params: filters });
      return data;
    },
  });
}

export function useOrderLists() {
  return useQuery({
    queryKey: queryKeys.orders.listsOnly(),
    queryFn: async () => {
      const { data } = await api.get('/order-lists');
      return data;
    },
  });
}

export function useCreateOrderMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orderPayload: Record<string, any>) => {
      const { data } = await api.post('/orders', orderPayload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all });
      qc.invalidateQueries({ queryKey: queryKeys.orders.listsOnly() });
    },
  });
}