import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

async function createTrucks(payload) {
  return instance.post('/trucks', payload);
}

function useCreateTrucks() {
  const queryClient = useQueryClient(); 
  const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['create-trucks'],
    mutationFn: createTrucks,
    onSuccess: () => {
      queryClient.refetchQueries(['trucks']);
      enqueueSnackbar('Caminhão criado com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Falha ao criar caminhão. Por favor, tente novamente.', { variant: 'error' });
    },
  });
}

export { createTrucks, useCreateTrucks };
