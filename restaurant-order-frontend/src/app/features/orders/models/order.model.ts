export type OrderStatus = 'CREATED' | 'PREPARING' | 'DELIVERED';
export type PaymentType = 'CASH' | 'CARD' | 'TRANSFER';

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  orderId: number;
  userId: number;
  userName: string;
  paymentType: PaymentType;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  items: OrderItemResponse[];
}