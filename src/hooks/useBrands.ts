import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { deleteBrands, getBrands, postBrands, putBrands } from '@/core/actions';
import { type BrandsResponse } from '@/core/types/api-response.type';
import { type NewBrandData } from '@/core/actions/items/brands';
import { toast } from 'src/components/snackbar';

type UseBrandsParams = {
  page: number;
  size: number;
};

export const brandsKeys = {
  all: () => ['brands'] as const,
  list: (params: UseBrandsParams) => [...brandsKeys.all(), 'list', params] as const,
};

export const useBrands = ({ page, size }: UseBrandsParams) => {
  const params = { page, size };

  return useQuery<BrandsResponse, Error>({
    queryKey: brandsKeys.list(params),
    queryFn: () => getBrands(params),
    placeholderData: keepPreviousData,
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
