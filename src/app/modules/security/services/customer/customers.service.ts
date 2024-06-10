import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerModel } from '../../models/customer.model';
import { SingUpInterface } from '../../interfaces/sing-up.interface';
import { singInModel } from '../../models/sing-in.model';
import { SingInInterface } from '../../interfaces/sing-in.interface';
import { CustomerInterface } from '../../interfaces/customer.interface';
import { UpdateCustomer } from '../../models/update-customer.mode';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customerId = new BehaviorSubject<string>('');
  /**
   * It takes a customerId as a parameter and then calls the next() function on the customerId property
   * of the BehaviorSubject class
   * @param {string} customerId - The customer ID to set.
   */
  setCustomer(customerId: string) {
    this.customerId.next(customerId);
  }
  getCustomerObserv(): Observable<string> {
    return this.customerId.asObservable();
  }
  /**
   * It returns the current value of the customerId BehaviorSubject.
   * @returns The customerId property of the Customer object.
   */
  getCustomerSubject() {
    return this.customerId.getValue();
  }
  constructor(private readonly httpClient: HttpClient) {}
  createCustomer(customer: CustomerModel): Observable<SingUpInterface> {
    let response = this.httpClient.post<SingUpInterface>(
      'http://localhost:3000/security/sign-up',
      customer
    );
    return response;
  }
  /**
   * It deletes a customer from the database
   * @param {string} customerId - The id of the customer to be deleted.
   * @returns A boolean
   */
  delete(customerId: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    let response = this.httpClient.delete<boolean>(
      'http://localhost:3000/user/' + customerId,
      httpOptions
    );
    return response;
  }
  updateCustomer(
    customer: UpdateCustomer,
    customerId: string
  ): Observable<CustomerInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    let response = this.httpClient.put<CustomerInterface>(
      'http://localhost:3000/user/' + customerId,
      customer,
      httpOptions
    );
    return response;
  }
  /**
   * This function is used to get the amount of a customer
   * @param {string} customerId - The customer's ID.
   * @returns A boolean value.
   */
  getCustomerBoolean(customerId: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    let response = this.httpClient.get<boolean>(
      'http://localhost:3000/account/amount/' + customerId,
      httpOptions
    );
    return response;
  }
  /**
   * It takes a string as a parameter, and returns an Observable of type CustomerInterface
   * @param {string} customer - string
   * @returns The response is an observable of type CustomerInterface.
   */
  getCustomerByEmail(customer: string): Observable<CustomerInterface> {
    let response = this.httpClient.get<CustomerInterface>(
      'http://localhost:3000/user/email/' + customer
    );
    return response;
  }
  /**
   * It returns an Observable of type CustomerInterface
   * @param {string} customerId - string
   * @returns An observable of type CustomerInterface
   */
  getCustomerById(customerId: string): Observable<CustomerInterface> {
    let response = this.httpClient.get<CustomerInterface>(
      'http://localhost:3000/user/' + customerId
    );
    return response;
  }
  /**
   * The function takes a customer object as a parameter, sends it to the server, and returns an
   * observable of type SingInInterface
   * @param {singInModel} customer - singInModel - the model that we created in the previous step.
   * @returns The response is being returned.
   */
  singIn(customer: singInModel): Observable<SingInInterface> {
    let response = this.httpClient.post<SingInInterface>(
      'http://localhost:3000/security/sign-in',
      customer
    );
    return response;
  }
}
