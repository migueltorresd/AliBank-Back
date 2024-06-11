import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountInterface } from '../../interfaces/account.interface';
import { environment } from 'src/environments/environment';

/**
 * Servicio para manejar las operaciones relacionadas con las cuentas bancarias.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * BehaviorSubject para almacenar el ID de la cuenta.
   */
  accountId = new BehaviorSubject<string>('');

  /**
   * Establece el ID de la cuenta de salida.
   * @param accountId El ID de la cuenta que se establecerá.
   */
  setAccountOut(accountId: string) {
    this.accountId.next(accountId);
  }

  /**
   * Obtiene un Observable para el ID de la cuenta de salida.
   * @returns Un Observable que emite el ID de la cuenta de salida.
   */
  getAccountObservOut(): Observable<string> {
    return this.accountId.asObservable();
  }

  /**
   * Obtiene el valor actual del ID de la cuenta de salida.
   * @returns El valor actual del ID de la cuenta de salida.
   */
  getAccountSubjectOut() {
    return this.accountId.getValue();
  }

  /**
   * Crea una nueva cuenta para un cliente.
   * @param accountTypeId El ID del tipo de cuenta que se desea crear.
   * @param customerId El ID del cliente para el cual se está creando la cuenta.
   * @returns Un Observable que emite la cuenta creada.
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
      `${environment.apiUrl}/account/`,
      newAccount,
      httpOptions
    );
  }

  /**
   * Obtiene todas las cuentas de un cliente.
   * @param customer El ID del cliente.
   * @returns Un Observable que emite un array de objetos de tipo AccountInterface.
   */
  getAll(customer: string): Observable<AccountInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.get<AccountInterface[]>(
      `${environment.apiUrl}/account/customer/${customer}`,
      httpOptions
    );
  }

  /**
   * Remueve el saldo de una cuenta.
   * @param accountId El ID de la cuenta.
   * @param amount La cantidad a ser removida del saldo de la cuenta.
   * @returns Un Observable que emite un valor booleano indicando si la operación fue exitosa.
   */
  removeBalance(accountId: string, amount: number): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.put<boolean>(
      `${environment.apiUrl}/account/removebalance/${accountId}`,
      { amount: amount },
      httpOptions
    );
  }
}
