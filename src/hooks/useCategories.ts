import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoriesResponse } from '@/core/types/api-response.type';
import { getCategories } from '@/core/actions';

export const categoriesKeys = {
  all: (userCacheId?: string) => ['categories', userCacheId] as const,
  list: (userCacheId?: string) => [...categoriesKeys.all(userCacheId), 'list'] as const,
};

export const useCategories = () => {
  return useQuery<CategoriesResponse, Error>({
    queryKey: categoriesKeys.list('categories'),
    queryFn: getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
    },
  });

  return mutate;
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return [];
    },
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
    mutationFn: async () => {
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
    },
  });

  return mutate;
};
