import { SingUpInterface } from '../../security/interfaces/sing-up.interface';
import { CustomerInterface } from '../../security/interfaces/customer.interface';
export interface AccountInterface {
  id: string;
  balance: number;
  state: boolean;
  customer: CustomerInterface;
  accountType: {
    id: string;
    name: string;
    state: boolean;
  };
  selected: boolean;
}