import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getCategories = async () => {
  const { data } = await primeaiApi.get(Parameters.services.products.brands.list);
  return data;
};
