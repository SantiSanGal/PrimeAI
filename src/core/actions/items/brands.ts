import { BrandsResponse } from '@/core/types/api-response.type';
import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getBrands = async (): Promise<BrandsResponse> => {
  const { data } = await primeaiApi.get(Parameters.services.products.brands.list);
  return data;
};
