import { ItemsResponse } from '@/core/types/api-response.type';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/core/actions';

export const useCategories = () => {
    return useQuery<ItemsResponse, Error>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};
