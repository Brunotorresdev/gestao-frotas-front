import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

async function getDrivers() {
  const response = await instance.get('/drivers');
  return response.data;
}

export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: getDrivers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
