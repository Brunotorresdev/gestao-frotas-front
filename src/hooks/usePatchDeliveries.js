
import { instance } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';


async function createPatch(payload) {


  // const { status, ...restPayload } = payload;
  

  return instance.patch(`/deliveries/${payload.id}`, {status: payload.status, deliveryData: payload});
}


function usePatchDeliveries(payload) {

   const queryClient = useQueryClient(); // Get the query client instance
  
    const { enqueueSnackbar } = useSnackbar(); 

  return useMutation({
    mutationKey: ['patch-deliveries'],
    mutationFn: (payload) => createPatch(payload),
    onSuccess: () => {
      queryClient.refetchQueries(['deliveries']);

      enqueueSnackbar('Delivery deleted successfully!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to delete delivery. Please try again.', { variant: 'error' });
    },
  });
}

export { createPatch, usePatchDeliveries };
