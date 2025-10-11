import { primeaiApi } from 'src/api/primeai.api';
import Parameters from '@/Parameters';

type PaginationParams = {
  page: number;
  size: number;
};

export const getCategories = async ({ page, size }: PaginationParams) => {
  const { data } = await primeaiApi.get(Parameters.services.products.categories.list, {
    params: {
      page,
      size,
    },
  });
  return data;
};

export type NewCategoryData = {
  name: string;
};

export const postCategories = async (categoryData: NewCategoryData) => {
  const { data } = await primeaiApi.post(
    Parameters.services.products.categories.add,
    categoryData
  );
  return data;
};

export const putCategories = async () => {
  const url = Parameters.services.products.categories.edit('1');
  const { data } = await primeaiApi.put(url);
  return data;
};

export const deleteCategories = async () => {
  const url = Parameters.services.products.categories.del('1');
  const { data } = await primeaiApi.delete(url);
  return data;
};
