import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

// API function to create deliveries
async function createTrucks(payload) {
  return instance.post('/deliveries', payload);
}

// Hook to create deliveries
function useCreateTrucks() {
  const queryClient = useQueryClient(); // Get the query client instance
  const { enqueueSnackbar } = useSnackbar(); // Use enqueueSnackbar correctly

  return useMutation({
    mutationKey: ['create-trucks'],
    mutationFn: createTrucks,
    onSuccess: () => {
      // Refetch 'deliveries' queries after successful mutation
      queryClient.refetchQueries(['trucks']);
      enqueueSnackbar('Delivery created successfully!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create delivery. Please try again.', { variant: 'error' });
    },
  });
}

export { createTrucks, useCreateTrucks };
