import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransferInterface } from '../../interfaces/transfer.interface';
import { TransferModel } from '../../models/transfer.model';
import { environment } from 'src/environments/environment';

/**
 * Servicio para manejar las operaciones relacionadas con las transferencias de dinero.
 */
@Injectable({
  providedIn: 'root',
})
export class TransferService {
  /**
   * BehaviorSubject para almacenar el ID de salida de la transferencia.
   */
  outComeId = new BehaviorSubject<string>('');

  /**
   * BehaviorSubject para almacenar el ID de entrada de la transferencia.
   */
  inComeId = new BehaviorSubject<string>('');

  /**
   * BehaviorSubject para almacenar el ID de la transferencia.
   */
  transferId = new BehaviorSubject<string>('');

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Establece el ID del cliente de salida para una transferencia.
   * @param customerId El ID del cliente de salida.
   */
  setCustomerOut(customerId: string) {
    this.outComeId.next(customerId);
  }
  
  /**
   * Establece el ID de la transferencia.
   * @param transferId El ID de la transferencia.
   */
  setTransferId(transferId: string) {
    this.transferId.next(transferId);
  }
  
  /**
   * Establece el ID del cliente de entrada para una transferencia.
   * @param customerId El ID del cliente de entrada.
   */
  setCustomerIn(customerId: string) {
    this.inComeId.next(customerId);
  }

  /**
   * Obtiene un Observable para el ID del cliente de salida.
   * @returns Un Observable que emite el ID del cliente de salida.
   */
  getCustomerObservOut(): Observable<string> {
    return this.outComeId.asObservable();
  }
  
  /**
   * Obtiene un Observable para el ID de la transferencia.
   * @returns Un Observable que emite el ID de la transferencia.
   */
  getTransferIdObserv(): Observable<string> {
    return this.transferId.asObservable();
  }

  /**
   * Obtiene el valor actual del ID de la transferencia.
   * @returns El valor actual del ID de la transferencia.
   */
  getTransferIdSubject() {
    return this.transferId.getValue();
  }
 
  /**
   * Obtiene el valor actual del ID del cliente de salida.
   * @returns El valor actual del ID del cliente de salida.
   */
  getCustomerSubjectOut() {
    return this.outComeId.getValue();
  }

  /**
   * Obtiene un Observable para el ID del cliente de entrada.
   * @returns Un Observable que emite el ID del cliente de entrada.
   */
  getCustomerObservIn(): Observable<string> {
    return this.inComeId.asObservable();
  }
 
  /**
   * Obtiene el valor actual del ID del cliente de entrada.
   * @returns El valor actual del ID del cliente de entrada.
   */
  getCustomerSubjectIn() {
    return this.inComeId.getValue();
  }

  /**
   * Crea una nueva transferencia.
   * @param transfer La transferencia a crear.
   * @returns Un Observable que emite la transferencia creada.
   */
  createTransfer(transfer: TransferModel): Observable<TransferInterface> {
    // Configuración de opciones HTTP con el token de autorización
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };

    // Realiza una solicitud POST a la URL de transferencia utilizando la API URL del entorno
    return this.httpClient.post<TransferInterface>(
      `${environment.apiUrl}/transfer/`,
      transfer,
      httpOptions
    );
  }

  /**
   * Obtiene una transferencia específica por su ID.
   * @param transferId El ID de la transferencia a obtener.
   * @returns Un Observable que emite la transferencia obtenida.
   */
  getTransfer(transferId: string): Observable<TransferInterface> {
    // Configuración de opciones HTTP con el token de autorización
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };

    // Realiza una solicitud GET a la URL de selección de transferencia utilizando la API URL del entorno
    return this.httpClient.get<TransferInterface>(
      `${environment.apiUrl}/transfer/select/${transferId}`,
      httpOptions
    );
  }
}
