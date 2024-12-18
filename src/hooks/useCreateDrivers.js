import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

async function createDrivers(payload) {
  return instance.post('/drivers', payload);
}

function useCreateDrivers() {
  const queryClient = useQueryClient(); 
  const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['create-drivers'],
    mutationFn: createDrivers,
    onSuccess: () => {
      queryClient.refetchQueries(['drivers']);
      enqueueSnackbar('Motorista criado com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Falha ao criar motorista. Por favor, tente novamente.', { variant: 'error' });
    },
  });
}

export { createDrivers, useCreateDrivers };
