import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransferInterface } from '../../interfaces/transfer.interface';
import { HistoryModel } from '../../models/history.model';
import { environment } from 'src/environments/environment';
import { DepositInterface } from '../../interfaces/Deposit.deposit';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene todos los depósitos de un usuario.
   * @param {HistoryModel} history - El objeto que contiene la información histórica del usuario.
   * @returns Un Observable que emite un array de objetos de tipo DepositInterface.
   */
  getDepositAll(history: HistoryModel): Observable<DepositInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<DepositInterface[]>(
      `${environment.apiUrl}/deposit/all`,
      history,
      httpOptions
    );
  }

  /**
   * Obtiene todas las transferencias de un usuario específico.
   * @param {HistoryModel} history - El objeto que contiene la información histórica del usuario.
   * @returns Un Observable que emite un array de objetos de tipo TransferInterface.
   */
  getTransferAll(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      `${environment.apiUrl}/transfer/history`,
      history,
      httpOptions
    );
  }

  /**
   * Obtiene todas las transferencias entrantes de un usuario.
   * @param {HistoryModel} history - El objeto que contiene el id del usuario y el rango de fechas.
   * @returns Un Observable que emite un array de objetos de tipo TransferInterface.
   */
  getTransferAllIn(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      `${environment.apiUrl}/transfer/income`,
      history,
      httpOptions
    );
  }

  /**
   * Obtiene todas las transferencias salientes de la cuenta de un usuario.
   * @param {HistoryModel} history - El objeto que contiene los datos que se enviarán al servidor.
   * @returns Un Observable que emite un array de objetos de tipo TransferInterface.
   */
  getTransferAllOut(history: HistoryModel): Observable<TransferInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.post<TransferInterface[]>(
      `${environment.apiUrl}/transfer/outcome`,
      history,
      httpOptions
    );
  }
}
