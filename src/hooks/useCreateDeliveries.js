
import { instance } from '../services/api';
import { QueryClient, useMutation } from '@tanstack/react-query';


async function createDeliveries(payload) {
  return instance.post('/deliveries', payload);
}


function useCreateDeliveries(payload) {

  return useMutation({
    mutationKey: ['create-deliveries'],
    mutationFn: (payload) => createDeliveries(payload),
    onSuccess: () => {
      // QueryClient.refetchQueries(['deliveries']);
      
    },
  });
}

export { createDeliveries, useCreateDeliveries };
