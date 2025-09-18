// TODO: Decirle a Hugo que cambie el tipado
export interface Categorie {
    category: Category;
}

export interface Category {
    content: Content[];
    page: Page;
}

export interface Content {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    name: string;
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}
