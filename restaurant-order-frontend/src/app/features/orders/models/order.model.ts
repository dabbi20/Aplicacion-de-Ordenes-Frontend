export type OrderStatus = 'CREATED' | 'PREPARING' | 'DELIVERED';
export type PaymentType = 'CASH' | 'CARD' | 'TRANSFER';

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  username?: string;
  paymentType: PaymentType;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  createdAt?: string;
  items: OrderItemResponse[];
}