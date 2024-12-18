import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';


async function createPatch(payload) {

  return instance.patch(`/deliveries/${payload.id}`, {status: payload.status, deliveryData: payload});
}


function usePatchDeliveries(payload) {

   const queryClient = useQueryClient(); 
  
    const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['patch-deliveries'],
    mutationFn: (payload) => createPatch(payload),
    onSuccess: () => {
      queryClient.refetchQueries(['deliveries']);
      enqueueSnackbar('Entrega atualizada com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Falha ao atualizar entrega. Por favor, tente novamente.', { variant: 'error' });
    },
  });
}

export { createPatch, usePatchDeliveries };
