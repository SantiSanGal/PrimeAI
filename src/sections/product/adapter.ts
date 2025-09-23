import type { ItemsResponse } from '@/core/types/api-response.type';

export type ProductRow = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  quantity: number; // usamos 0 si viene null
  sellPrice: number;
  coverUrl?: string; // para el Avatar del renderer
  category?: string; // texto legible para filtros/quick search
  brand?: string;
  // opcional: para reutilizar toolbars/filters existentes
  inventoryType?: 'in stock' | 'low stock' | 'out of stock';
  publish?: 'published' | 'draft';
};

export function mapItemsToRows(api?: ItemsResponse): ProductRow[] {
  if (!api || !api.page || !api.page.content) return [];
  return (api.page.content || []).map(({ item, categories, imageUrl }) => {
    const qty = item.quantity ?? 0;
    const inv: ProductRow['inventoryType'] =
      qty <= 0 ? 'out of stock' : qty <= 5 ? 'low stock' : 'in stock';

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      createdAt: String(item.createdAt),
      quantity: qty,
      sellPrice: Number(item.sellPrice ?? 0),
      coverUrl: imageUrl,
      category: (categories || []).map((c) => c.name).join(', '),
      brand: item.brand?.name,
      inventoryType: inv,
      publish: 'published',
    };
  });
}
