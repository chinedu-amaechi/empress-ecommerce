import { getAllCollections } from "@/lib/collection-service";
import { useQuery } from "@tanstack/react-query";

function useCollections() {
  const { data, isLoading, error } = useQuery({
    queryFn: getAllCollections,
    queryKey: ["collections"],
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, error };
}

export default useCollections;
