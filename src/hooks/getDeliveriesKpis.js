import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

async function getDeliveriesKpis() {
  const response = await instance.get(`/deliveries/earnings`);
  return response.data;
}

export function useDeliveriesKpis() {
  return useQuery({
    queryKey: ['deliveries-earnings'],
    queryFn: getDeliveriesKpis,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
