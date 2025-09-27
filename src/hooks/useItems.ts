import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteItems, getItems, postItems, putItems } from '@/core/actions';
import { ItemsResponse } from '@/core/types/api-response.type';

export const itemsKeys = {
  all: (userCacheId?: string) => ['items', userCacheId] as const,
  list: (userCacheId?: string) => [...itemsKeys.all(userCacheId), 'list'] as const,
  // list: (userCacheId: string | undefined, filters: UseFuncionarioProps) =>
  //   [...funcionariosKeys.lists(userCacheId), filters] as const,
};

export const useItems = () => {
  return useQuery<ItemsResponse, Error>({
    queryKey: itemsKeys.list('items'),
    queryFn: getItems,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postItems,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itemsKeys.all(),
      });
    },
  });

  return mutate;
};

export const useEditItem = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putItems,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itemsKeys.all(),
      });
    },
  });

  return mutate;
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: deleteItems,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itemsKeys.all(),
      });
    },
  });

  return mutate;
};
