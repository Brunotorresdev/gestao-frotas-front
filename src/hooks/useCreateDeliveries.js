import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

// API function to create deliveries
async function createDeliveries(payload) {
  return instance.post('/deliveries', payload);
}

// Hook to create deliveries
function useCreateDeliveries() {
  const queryClient = useQueryClient(); // Get the query client instance
  const { enqueueSnackbar } = useSnackbar(); // Use enqueueSnackbar correctly

  return useMutation({
    mutationKey: ['create-deliveries'],
    mutationFn: createDeliveries,
    onSuccess: () => {
      // Refetch 'deliveries' queries after successful mutation
      queryClient.refetchQueries(['deliveries']);
      enqueueSnackbar('Delivery created successfully!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create delivery. Please try again.', { variant: 'error' });
    },
  });
}

export { createDeliveries, useCreateDeliveries };
