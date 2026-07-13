import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axiosClient";
import { queryKeys } from "../api/queryClient";


export const useBrands = () => {
  return useQuery({
    queryKey: queryKeys.brands.all,
    queryFn: async () => {
      const {data} = await api.get("/brands")
      return data
    },
    staleTime: Infinity
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const {data} = await api.get('/categories')
      return data
    },
    staleTime: Infinity
  })
}

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const {data} = await api.get("/products")
      return data
    },

  })
}

export const useInitData = () => {
  return useQuery({
    queryKey: ["init-data"],
    queryFn: async () => {
      const response = await api.get("/dashboard-init-data", { 
        params: { threshold: 5 } 
      });
      return response.data;
    },
  });
};

export const useGetProductData = () => {
  const brandsQuery = useBrands();
  const categoriesQuery = useCategories();
  const productsQuery = useProducts();

  const isLoading = brandsQuery.isLoading || categoriesQuery.isLoading || productsQuery.isLoading;
  const isError = brandsQuery.isError || categoriesQuery.isError || productsQuery.isError;

  return {
    isLoading,
    isError,
    data: {
      brands: brandsQuery.data,
      categories: categoriesQuery.data,
      products: productsQuery.data,
    },
  };
};


