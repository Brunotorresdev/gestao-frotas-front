import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

async function getDeliveries() {
  const response = await instance.get('/deliveries');
  return response.data;
}

export function useDeliveries() {
  return useQuery({
    queryKey: ['deliveries'],
    queryFn: getDeliveries,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
