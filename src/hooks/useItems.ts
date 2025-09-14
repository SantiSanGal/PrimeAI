import { getItems } from "src/core/actions/items";
import { useQuery } from "@tanstack/react-query";

export const useItems = async () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: () => getItems(),
    });
}
