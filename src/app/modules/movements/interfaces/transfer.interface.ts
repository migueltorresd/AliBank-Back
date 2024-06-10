import { CustomerInterface } from '../../security/interfaces/customer.interface';
export interface TransferInterface {
  id: string;
  amount: number;
  inCome: CustomerInterface;
  outCome: CustomerInterface;
  reason: string;
  dateTime: number;
}
