import { deleteCategories, getCategories, postCategories, putCategories } from '@/core/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type NewCategoryData } from '@/core/actions/items/categories';
import { CategoriesResponse } from '@/core/types/api-response.type';
import { toast } from 'src/components/snackbar';

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
