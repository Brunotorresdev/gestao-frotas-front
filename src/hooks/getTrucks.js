import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

async function getTrucks() {
  const response = await instance.get('/trucks');
  return response.data;
}

export function useTrucks() {
  return useQuery({
    queryKey: ['trucks'],
    queryFn: getTrucks,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
