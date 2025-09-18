import { ItemsResponse } from '@/core/types/api-response.type';
import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getItems = async (): Promise<ItemsResponse> => {
  const { data } = await primeaiApi.get(Parameters.services.products.items.list);
  return data;
};
