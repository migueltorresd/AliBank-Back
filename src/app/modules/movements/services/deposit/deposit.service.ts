import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositModel } from '../../../main/Models/deposit.model';
import { DepositInterface } from '../../interfaces/Deposit.deposit';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  // El constructor inyecta el servicio HttpClient para realizar solicitudes HTTP.
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Crea un nuevo depósito.
   * @param deposit - Un objeto DepositModel que contiene los detalles del depósito.
   * @returns Un Observable de DepositInterface que emite la respuesta de la solicitud HTTP.
   */
  createDeposit(deposit: DepositModel): Observable<DepositInterface> {
    return this.httpClient.post<DepositInterface>(
      'http://localhost:3000/deposit/', // URL del endpoint de creación de depósitos
      deposit // Datos del depósito que se enviarán en el cuerpo de la solicitud POST
    );
  }

  /**
   * Obtiene un depósito por su ID.
   * @param depositId - El ID del depósito que se desea obtener.
   * @returns Un Observable de DepositInterface que emite la respuesta de la solicitud HTTP.
   */
  getDeposit(depositId: string): Observable<DepositInterface> {
    // Opciones HTTP que incluyen los encabezados, específicamente el token de autorización.
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`, // Se obtiene el token de acceso del almacenamiento local
      }),
    };
    return this.httpClient.get<DepositInterface>(
      'http://localhost:3000/transfer/select/' + depositId, // URL del endpoint para obtener el depósito, concatenando el ID del depósito
      httpOptions // Opciones HTTP que incluyen los encabezados
    );
  }
}
