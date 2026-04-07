export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: number;
  paymentType: 'CASH' | 'CARD' | 'TRANSFER';
  items: OrderItemRequest[];
}