import { ItemsResponse } from '@/core/types/api-response.type';
import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getItems = async (): Promise<ItemsResponse> => {
  const { data } = await primeaiApi.get(Parameters.services.products.items.list);
  return data;
};

export const postItems = async () => {
  const { data } = await primeaiApi.post(Parameters.services.products.items.add);
  return data;
};

export const putItems = async () => {
  const url = Parameters.services.products.items.edit('1');
  const { data } = await primeaiApi.put(url);
  return data;
};

export const deleteItems = async () => {
  const url = Parameters.services.products.items.del('1');
  const { data } = await primeaiApi.delete(url);
  return data;
};
