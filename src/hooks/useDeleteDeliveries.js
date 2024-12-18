
import { instance } from '../services/api';
import { QueryClient, useMutation } from '@tanstack/react-query';


async function deleteDeliveries(id) {
  return instance.delete(`/deliveries/${id}`);
}


function useDeleteDeliveries(id) {

  return useMutation({
    mutationKey: ['delete-deliveries', id],
    mutationFn: (id) => deleteDeliveries(id),
    onSuccess: () => {
      // QueryClient.refetchQueries(['deliveries']);
      
    },
  });
}

export { deleteDeliveries, useDeleteDeliveries };
