import { deleteCategories, getCategories, postCategories, putCategories } from '@/core/actions';
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { type CategoriesResponse } from '@/core/types/api-response.type';
import { type NewCategoryData } from '@/core/actions/items/categories';
import { toast } from 'src/components/snackbar';

type UseCategoriesParams = {
  page: number;
  size: number;
};

export const categoriesKeys = {
  all: (userCacheId?: string) => ['categories', userCacheId] as const,
  list: (params: UseCategoriesParams, userCacheId?: string) =>
    [...categoriesKeys.all(userCacheId), 'list', params] as const,
};

export const useCategories = ({ page, size }: UseCategoriesParams) => {
  const params = { page, size };

  return useQuery<CategoriesResponse, Error>({
    queryKey: categoriesKeys.list(params, 'categories'),
    queryFn: () => getCategories(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (newCategory: NewCategoryData) => postCategories(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
      toast.success('Category created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create category:', error);
      toast.error('Could not create the category. Please try again.');
    },
  });

  return mutate;
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
    },
  });

  return mutate;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
    },
  });

  return mutate;
};