import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerModel } from '../../models/customer.model';
import { SingUpInterface } from '../../interfaces/sing-up.interface';
import { singInModel } from '../../models/sing-in.model';
import { SingInInterface } from '../../interfaces/sing-in.interface';
import { CustomerInterface } from '../../interfaces/customer.interface';
import { UpdateCustomer } from '../../models/update-customer.mode';
import { environment } from 'src/environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con clientes.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customerId = new BehaviorSubject<string>('');

  /**
   * Establece el ID del cliente.
   * @param customerId El ID del cliente que se establecerá.
   */
  setCustomer(customerId: string) {
    this.customerId.next(customerId);
  }

  /**
   * Obtiene un Observable para el ID del cliente.
   * @returns Un Observable que emite el ID del cliente.
   */
  getCustomerObserv(): Observable<string> {
    return this.customerId.asObservable();
  }

  /**
   * Obtiene el valor actual del ID del cliente.
   * @returns El valor actual del ID del cliente.
   */
  getCustomerSubject() {
    return this.customerId.getValue();
  }

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Crea un nuevo cliente.
   * @param customer Los datos del cliente que se va a crear.
   * @returns Un Observable que emite un objeto de tipo SingUpInterface.
   */
  createCustomer(customer: CustomerModel): Observable<SingUpInterface> {
    return this.httpClient.post<SingUpInterface>(
      `${environment.apiUrl}/security/sign-up`,
      customer
    );
  }

  /**
   * Elimina un cliente de la base de datos.
   * @param customerId El ID del cliente que se va a eliminar.
   * @returns Un Observable que emite un valor booleano indicando si la operación fue exitosa.
   */
  delete(customerId: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.delete<boolean>(
      `${environment.apiUrl}/user/${customerId}`,
      httpOptions
    );
  }

  /**
   * Actualiza los datos de un cliente.
   * @param customer Los nuevos datos del cliente.
   * @param customerId El ID del cliente que se va a actualizar.
   * @returns Un Observable que emite un objeto de tipo CustomerInterface con los datos actualizados del cliente.
   */
  updateCustomer(
    customer: UpdateCustomer,
    customerId: string
  ): Observable<CustomerInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.put<CustomerInterface>(
      `${environment.apiUrl}/user/${customerId}`,
      customer,
      httpOptions
    );
  }

  /**
   * Obtiene la cantidad de un cliente.
   * @param customerId El ID del cliente.
   * @returns Un Observable que emite un valor booleano indicando si la operación fue exitosa.
   */
  getCustomerBoolean(customerId: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `access_token ${localStorage.getItem('access_token')}`,
      }),
    };
    return this.httpClient.get<boolean>(
      `${environment.apiUrl}/account/amount/${customerId}`,
      httpOptions
    );
  }

  /**
   * Obtiene un cliente por correo electrónico.
   * @param customer El correo electrónico del cliente.
   * @returns Un Observable que emite un objeto de tipo CustomerInterface con los datos del cliente.
   */
  getCustomerByEmail(customer: string): Observable<CustomerInterface> {
    return this.httpClient.get<CustomerInterface>(
      `${environment.apiUrl}/user/email/${customer}`
    );
  }

  /**
   * Obtiene un cliente por su ID.
   * @param customerId El ID del cliente.
   * @returns Un Observable que emite un objeto de tipo CustomerInterface con los datos del cliente.
   */
  getCustomerById(customerId: string): Observable<CustomerInterface> {
    return this.httpClient.get<CustomerInterface>(
      `${environment.apiUrl}/user/${customerId}`
    );
  }

  /**
   * Inicia sesión de un cliente.
   * @param customer Los datos del cliente para iniciar sesión.
   * @returns Un Observable que emite un objeto de tipo SingInInterface con los datos de inicio de sesión.
   */
  singIn(customer: singInModel): Observable<SingInInterface> {
    return this.httpClient.post<SingInInterface>(
      `${environment.apiUrl}/security/sign-in`,
      customer
    );
  }
}
