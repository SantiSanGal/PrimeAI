import { ItemsResponse } from '@/core/types/api-response.type';
import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/core/actions';

export const useItems = () => {
  return useQuery<ItemsResponse, Error>({
    queryKey: ['items'],
    queryFn: getItems,
  });
};
