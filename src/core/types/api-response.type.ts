import { Brand, Categories, Item } from "./items";

export interface APIListResponse<T> {
    page: APIListResponsePage<T>;
}

export type APIListResponsePage<T> = {
    content: T;
    page: PagePage;
}

export interface PagePage {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export type ItemsResponse = APIListResponse<Item[]>
export type BrandsResponse = APIListResponse<Brand[]>
export type CategoriesResponse = APIListResponse<Categories[]>
