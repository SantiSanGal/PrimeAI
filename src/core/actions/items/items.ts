import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getItems = async () => {
  const { data } = await primeaiApi.get(Parameters.services.products.items.list);
  return data;
};
