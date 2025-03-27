import { getAllProducts } from "@/lib/product-service";
import { useQuery } from "@tanstack/react-query";

function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, error };
}

export default useProducts;
