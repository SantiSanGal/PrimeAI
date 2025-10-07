import { deleteBrands, getBrands, postBrands, putBrands } from '@/core/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  type NewBrandData } from '@/core/actions/items/brands';
import { BrandsResponse } from '@/core/types/api-response.type';
import { toast } from 'src/components/snackbar';

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
    mutationFn: (newBrand: NewBrandData) => postBrands(newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
      toast.success('Brand created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create brand:', error);
      toast.error('Could not create the brand. Please try again.');
    },
  });

  return mutate;
};

export const useEditBrand = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putBrands,
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
    mutationFn: deleteBrands,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
  });

  return mutate;
};
