import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DepositInterface } from '../../interfaces/Deposit.deposit';
import { TransferInterface } from '../../interfaces/transfer.interface';
import { HistoryModel } from '../../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * This function is used to get all the deposits of a user
   * @param {HistoryModel} history - HistoryModel
   * @returns An array of DepositInterface objects.
   */
  getDepositAll(history: HistoryModel): Observable<DepositInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<DepositInterface[]>(
      'http://localhost:3000/deposit/all',
      history,
      httpOptions
    );
  }

  /**
   * This function is used to get all the transfers of a specific user
   * @param {HistoryModel} history - HistoryModel
   * @returns An array of TransferInterface objects.
   */
  getTransferAll(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      'http://localhost:3000/transfer/history',
      history,
      httpOptions
    );
  }
  /**
   * This function is used to get all the income transfers of a user
   * @param {HistoryModel} history - HistoryModel - this is the object that contains the user's id and
   * the date range.
   * @returns An array of TransferInterface objects.
   */
  getTransferAllIn(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      'http://localhost:3000/transfer/income',
      history,
      httpOptions
    );
  }
  /**
   * It sends a request to the server to get all the transfers that have been made from the user's
   * account
   * @param {HistoryModel} history - HistoryModel - this is the object that contains the data that will
   * be sent to the server.
   * @returns An array of TransferInterface objects.
   */
  getTransferAllOut(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      'http://localhost:3000/transfer/outcome',
      history,
      httpOptions
    );
  }
}
