import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

// Serviço para buscar as entregas
async function getDeliveries() {
  const response = await instance.get('/deliveries');
  return response.data;
}

// Hook customizado para usar com React Query v5
export function useDeliveries() {
  return useQuery({
    queryKey: ['deliveries'], // Chave da query
    queryFn: getDeliveries,   // Função que executa a requisição
    staleTime: 1000 * 60 * 5, // Dados considerados frescos por 5 minutos
    retry: 2,                 // Tenta novamente em caso de erro até 2 vezes
  });
}
