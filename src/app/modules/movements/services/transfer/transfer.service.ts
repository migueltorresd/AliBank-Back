import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransferInterface } from '../../interfaces/transfer.interface';
import { TransferModel } from '../../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  outComeId = new BehaviorSubject<string>('');
  inComeId = new BehaviorSubject<string>('');
  transferId = new BehaviorSubject<string>('');
  /**
   * The function takes a customerId as a parameter and then uses the next() method to pass the
   * customerId to the outComeId subject
   * @param {string} customerId - string - The customer ID that we want to pass to the customer-details
   * component.
   */
  setCustomerOut(customerId: string) {
    this.outComeId.next(customerId);
  }
  /**
   * It takes a string as an argument and sets the value of the transferId property to the value of the
   * argument
   * @param {string} transferId - The ID of the transfer.
   */
  setTransferId(transferId: string) {
    this.transferId.next(transferId);
  }
  /**
   * The function takes a customerId as a parameter and then uses the next() method to pass the
   * customerId to the inComeId subject
   * @param {string} customerId - The customer ID that you want to pass to the other component.
   */
  setCustomerIn(customerId: string) {
    this.inComeId.next(customerId);
  }
  /**
   * The function returns an observable of type string
   * @returns Observable<string>
   */
  getCustomerObservOut(): Observable<string> {
    return this.outComeId.asObservable();
  }
  /**
   * It returns an observable that emits the value of the transferId subject
   * @returns An observable of type string.
   */
  getTransferIdObserv(): Observable<string> {
    return this.transferId.asObservable();
  }
  /**
   * It returns the value of the transferId subject
   * @returns The value of the transferId property.
   */
  getTransferIdSubject() {
    return this.transferId.getValue();
  }
  /**
   * This function returns the value of the outComeId property
   * @returns The value of the outComeId property.
   */
  getCustomerSubjectOut() {
    return this.outComeId.getValue();
  }
  /**
   * The function returns an observable of type string
   * @returns Observable<string>
   */
  getCustomerObservIn(): Observable<string> {
    return this.inComeId.asObservable();
  }
  /**
   * This function returns the value of the inComeId property
   * @returns The value of the inComeId property.
   */
  getCustomerSubjectIn() {
    return this.inComeId.getValue();
  }
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * This function creates a new transfer and returns an observable of type TransferInterface
   * @param {TransferModel} transfer - TransferModel - this is the model that we created earlier.
   * @returns Observable<TransferInterface>
   */
  createTransfer(transfer: TransferModel): Observable<TransferInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface>(
      'http://localhost:3000/transfer/',
      transfer,
      httpOptions
    );
  }
  /**
   * It returns an observable of type TransferInterface
   * @param {string} transferId - The id of the transfer you want to get.
   * @returns The transfer object with the given transferId.
   */
  getTransfer(transferId: string): Observable<TransferInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.get<TransferInterface>(
      'http://localhost:3000/transfer/select/' + transferId,
      httpOptions
    );
  }
}
