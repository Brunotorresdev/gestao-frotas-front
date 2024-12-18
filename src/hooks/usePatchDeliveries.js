
import { instance } from '../services/api';
import { QueryClient, useMutation } from '@tanstack/react-query';


async function createPatch(payload) {

  return instance.patch(`/deliveries/${payload.id}`, payload);
}


function usePatchDeliveries(payload) {

  return useMutation({
    mutationKey: ['patch-deliveries'],
    mutationFn: (payload) => createPatch(payload),
    onSuccess: () => {
      // QueryClient.refetchQueries(['deliveries']);
      
    },
  });
}

export { createPatch, usePatchDeliveries };
