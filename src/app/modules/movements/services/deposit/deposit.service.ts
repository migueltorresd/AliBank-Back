import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositModel } from '../../../main/Models/deposit.model';
import { DepositInterface } from '../../interfaces/Deposit.deposit';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  constructor(private readonly httpClient: HttpClient) {}
 
  createDeposit(deposit: DepositModel): Observable<DepositInterface> {
    return this.httpClient.post<DepositInterface>(
      'http://localhost:3000/deposit/',
      deposit
    );
  }
 
  getDeposit(depositId: string): Observable<DepositInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.get<DepositInterface>(
      'http://localhost:3000/transfer/select/' + depositId,
      httpOptions
    );
  }
}
