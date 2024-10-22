import { Order } from './order';

export class Payment {
  public paymentId!: number;
  public paymentAmount!: number;
  public status!: number;
  public paymentDate!: Date;
  public order!: Order;
}
