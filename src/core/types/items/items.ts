export interface Item {
    item: ItemClass;
    categories: Category[];
    imageUrl: string;
}

export interface Category {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    name: string;
}

export interface ItemClass {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    name: string;
    sku: string;
    description: string;
    buyPrice: number;
    sellPrice: number;
    brand: Category;
    quantity: null;
}
