import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BrandsResponse } from '@/core/types/api-response.type';
import { getBrands } from '@/core/actions';

export const brandsKeys = {
  all: () => ['brands'] as const,
  list: () => [...brandsKeys.all(), 'list'] as const,
};

export const useBrands = () => {
  return useQuery<BrandsResponse, Error>({
    queryKey: brandsKeys.list(),
    queryFn: getBrands,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
  });

  return mutate;
};

export const useEditBrand = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
  });

  return mutate;
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
  });

  return mutate;
};
