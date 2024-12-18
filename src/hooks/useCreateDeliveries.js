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
      enqueueSnackbar('Delivery created successfully!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to create delivery. Please try again.', { variant: 'error' });
    },
  });
}

export { createDeliveries, useCreateDeliveries };
