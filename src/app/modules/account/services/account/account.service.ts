import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountInterface } from '../../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {}

  accountId = new BehaviorSubject<string>('');
  /**
   * The function takes a customerId as a parameter and then uses the next() method to pass the
   * customerId to the accountId subject
   * @param {string} customerId - The customer ID that you want to set as the current customer.
   */
  setAccountOut(customerId: string) {
    this.accountId.next(customerId);
  }
  /**
   * It returns an observable of type string, which is the accountId
   * @returns An observable of type string.
   */
  getAccountObservOut(): Observable<string> {
    return this.accountId.asObservable();
  }
  /**
   * It returns the value of the accountId subject
   * @returns The accountId property of the object.
   */
  getAccountSubjectOut() {
    return this.accountId.getValue();
  }
  /**
   * This function creates a new account for a customer
   * @param {string} accountTypeId - The account type id of the account you want to create.
   * @param {string} customerId - The id of the customer that the account is being created for.
   * @returns An observable of type AccountInterface
   */
  createAccount(
    accountTypeId: string,
    customerId: string
  ): Observable<AccountInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    const newAccount = { accountTypeId: accountTypeId, customerId: customerId };
    return this.httpClient.post<AccountInterface>(
      'http://localhost:3000/account/',
      newAccount,
      httpOptions
    );
  }

  /**
   * This function is used to get all the accounts of a customer
   * @param {string} customer - string
   * @returns An array of AccountInterface objects.
   */
  getAll(customer: string): Observable<AccountInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.get<AccountInterface[]>(
      'http://localhost:3000/account/customer/' + customer,
      httpOptions
    );
  }
  /**
   * It removes the amount from the account balance
   * @param {string} accountId - The account id of the account you want to remove balance from.
   * @param {number} amount - The amount to be removed from the account.
   * @returns A boolean value.
   */
  removeBalance(accountId: string, amount: number): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.put<boolean>(
      'http://localhost:3000/account/removebalance/' + accountId,
      { amount: amount },
      httpOptions
    );
  }
}
