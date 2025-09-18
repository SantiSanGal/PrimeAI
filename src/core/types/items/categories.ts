// TODO: Decirle a Hugo que cambie el tipado
export interface Categorieaaa {
  category: Categoryaaa;
}

export interface Categoryaaa {
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
