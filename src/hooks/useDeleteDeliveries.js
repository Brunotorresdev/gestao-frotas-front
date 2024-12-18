import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

async function deleteDeliveries(id) {
  return instance.delete(`/deliveries/${id}`);
}

function useDeleteDeliveries() {
  const queryClient = useQueryClient(); 

  const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['delete-deliveries'],
    mutationFn: (id) => deleteDeliveries(id),
    onSuccess: () => {
      queryClient.refetchQueries(['deliveries']);

      enqueueSnackbar('Entrega deletada com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Falha ao deletar entrega. Por favor, tente novamente.', { variant: 'error' });
    },
  });
}

export { deleteDeliveries, useDeleteDeliveries };
