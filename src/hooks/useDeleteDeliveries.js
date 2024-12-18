import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

async function deleteDeliveries(id) {
  return instance.delete(`/deliveries/${id}`);
}

function useDeleteDeliveries() {
  const queryClient = useQueryClient(); // Get the query client instance

  const { enqueueSnackbar } = useSnackbar(); // Use enqueueSnackbar correctly

  return useMutation({
    mutationKey: ['delete-deliveries'],
    mutationFn: (id) => deleteDeliveries(id),
    onSuccess: () => {
      queryClient.refetchQueries(['deliveries']);

      enqueueSnackbar('Delivery deleted successfully!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to delete delivery. Please try again.', { variant: 'error' });
    },
  });
}

export { deleteDeliveries, useDeleteDeliveries };
