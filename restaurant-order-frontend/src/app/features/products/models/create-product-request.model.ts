export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  available: boolean;
  imageUrl: string;
}