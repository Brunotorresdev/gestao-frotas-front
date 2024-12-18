import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";
import dayjs from "dayjs";

// Serviço para buscar as entregas
async function getDeliveriesKpis() {
  const response = await instance.get(`/deliveries/earnings`);
  return response.data;
}

// Hook customizado para usar com React Query v5
export function useDeliveriesKpis() {
  return useQuery({
    queryKey: ['deliveries-earnings'], // Chave da query
    queryFn: getDeliveriesKpis,   // Função que executa a requisição
    staleTime: 1000 * 60 * 5, // Dados considerados frescos por 5 minutos
    retry: 2,                 // Tenta novamente em caso de erro até 2 vezes
  });
}
