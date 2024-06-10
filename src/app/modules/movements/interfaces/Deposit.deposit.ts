import { AccountInterface } from '../../account/interfaces/account.interface';
export interface DepositInterface {
  id: string;
  amount: 100;
  account: AccountInterface;
  dateTime: string;
}
