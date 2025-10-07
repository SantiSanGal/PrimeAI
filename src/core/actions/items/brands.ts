import { BrandsResponse } from '@/core/types/api-response.type';
import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

export const getBrands = async (): Promise<BrandsResponse> => {
  const { data } = await primeaiApi.get(Parameters.services.products.brands.list);
  return data;
};

export type NewBrandData = {
  name: string;
};

export const postBrands = async (brandData: NewBrandData) => {
  const { data } = await primeaiApi.post(
    Parameters.services.products.brands.add,
    brandData
  );
  return data;
};

export const putBrands = async () => {
  const url = Parameters.services.products.brands.edit('1');
  const { data } = await primeaiApi.put(url);
  return data;
};

export const deleteBrands = async () => {
  const url = Parameters.services.products.brands.del('1');
  const { data } = await primeaiApi.delete(url);
  return data;
};
