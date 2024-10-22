import { Product } from './product';
import { User } from './user';

export class Order {
  public orderId!: number;
  public description!: string;
  public orderQuantity!: string;
  public orderDate!: Date;
  public status!: string;
  public customer!: User;
  public product!: Product;
}
