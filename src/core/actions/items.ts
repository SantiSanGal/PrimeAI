import { primeaiApi } from "src/api/primeai.api"

export const getItems = async () => {
    const { data } = await primeaiApi.get('/v1/items')
    return data
}
