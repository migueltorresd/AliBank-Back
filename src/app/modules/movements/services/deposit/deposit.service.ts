import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepositInterface } from '../../interfaces/Deposit.deposit';
import { DepositModel } from 'src/app/modules/main/Models/deposit.model';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Crea un nuevo depósito.
   * @param deposit - Un objeto DepositModel que contiene los detalles del depósito.
   * @returns Un Observable de DepositInterface que emite la respuesta de la solicitud HTTP.
   */
  createDeposit(deposit: DepositModel): Observable<DepositInterface> {
    return this.httpClient.post<DepositInterface>(
      `${environment.apiUrl}/deposit/`, // URL del endpoint de creación de depósitos
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
      `${environment.apiUrl}/deposit/${depositId}`, // URL del endpoint para obtener el depósito, concatenando el ID del depósito
      httpOptions // Opciones HTTP que incluyen los encabezados
    );
  }
}
