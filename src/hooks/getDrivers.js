import { useQuery } from "@tanstack/react-query";
import { instance } from "../services/api";

// Serviço para buscar as entregas
async function getDrivers() {
  const response = await instance.get('/drivers');
  return response.data;
}

// Hook customizado para usar com React Query v5
export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'], // Chave da query
    queryFn: getDrivers,   // Função que executa a requisição
    staleTime: 1000 * 60 * 5, // Dados considerados frescos por 5 minutos
    retry: 2,                 // Tenta novamente em caso de erro até 2 vezes
  });
}
