import { BrandsResponse } from '@/core/types/api-response.type';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/core/actions';

export const useBrands = () => {
    return useQuery<BrandsResponse, Error>({
        queryKey: ['brands'],
        queryFn: getBrands,
    });
};
