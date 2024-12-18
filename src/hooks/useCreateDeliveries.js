import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

async function createDeliveries(payload) {
  return instance.post('/deliveries', payload);
}

function useCreateDeliveries() {
  const queryClient = useQueryClient(); 
  const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['create-deliveries'],
    mutationFn: createDeliveries,
    onSuccess: () => {
      queryClient.refetchQueries(['deliveries']);
      enqueueSnackbar('Entrega criada com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Falha ao criar entrega. Por favor, tente novamente.', { variant: 'error' });
    },
  });
}

export { createDeliveries, useCreateDeliveries };
