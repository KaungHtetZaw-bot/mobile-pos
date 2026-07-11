import { useQuery } from "@tanstack/react-query";
import api from "../axios/api";

const getBrand = async () => {
   const { data } = await api.get("/brands");
   return data;
};

const getCate = async () => {
   const { data } = await api.get("/categories");
   return data;
};

const getProduct = async () => {
   const { data } = await api.get("/products");
   return data;
};

export const useInitData = () => {
  return useQuery({
    queryKey: ["init-data"],
    queryFn: async () => {
      const response = await api.get("/dashboard-init-data", { 
        params: { threshold: 5 } 
      });
      return response.data;
    },
    staleTime: 60000,
  });
};

export const useGetProductData = () => {
  return useQuery({
    queryKey: ["products-combos"],
    queryFn: async () => {
      const [brands, categories, products] = await Promise.all([
        getBrand(),
        getCate(),
        getProduct()
      ]);
      return { brands, categories, products };
    },
    staleTime: 60000,
  });
};
export const useTransations = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get('/orders')
      return res.data;
    },
    staleTime: 60000,
  });
};