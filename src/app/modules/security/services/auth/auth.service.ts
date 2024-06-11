import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AccountService } from '../../../account/services/account/account.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

/**
 * Servicio para manejar la autenticación de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Propiedad de ejemplo
  hola = 'hola mundo';

  /**
   * BehaviorSubject para almacenar el estado de la sesión de Google.
   */
  sessionGoogle = new BehaviorSubject<boolean>(false);

  /**
   * Establece el estado de la sesión de Google.
   * @param google El estado de la sesión de Google.
   */
  setGoogleOut(google: boolean) {
    this.sessionGoogle.next(google);
  }

  /**
   * Obtiene un Observable para el estado de la sesión de Google.
   * @returns Un Observable que emite el estado de la sesión de Google.
   */
  getGoogleObservOut(): Observable<boolean> {
    return this.sessionGoogle.asObservable();
  }

  /**
   * Obtiene el valor actual del estado de la sesión de Google.
   * @returns El valor actual del estado de la sesión de Google.
   */
  getGoogleSubjectOut() {
    return this.sessionGoogle.getValue();
  }

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore,
    private readonly acountService: AccountService
  ) {}

  /**
   * Inicia sesión utilizando Google.
   * @returns Una promesa que se resuelve en un objeto UserCredential.
   */
  GoogleAuth(): Promise<firebase.auth.UserCredential> {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  /**
   * Inicia sesión utilizando un proveedor de autenticación.
   * @param provider El proveedor de autenticación.
   * @returns La promesa de un objeto de usuario.
   */
  private AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }

  /**
   * Inicia sesión con correo electrónico y contraseña.
   * @param email El correo electrónico del usuario.
   * @param password La contraseña del usuario.
   * @returns El usuario que ha iniciado sesión.
   */
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * Comprueba si un correo electrónico ya está registrado.
   * @param email El correo electrónico a comprobar.
   * @returns True si el correo electrónico ya está registrado, de lo contrario false.
   */
  isEmail(email: string) {
    return this.afAuth
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          localStorage.clear();
          sessionStorage.clear();
          return true;
        } else {
          return false;
        }
      });
  }

  /**
   * Registra un nuevo usuario con correo electrónico y contraseña.
   * @param email El correo electrónico del nuevo usuario.
   * @param password La contraseña del nuevo usuario.
   * @returns El usuario recién registrado.
   */
  async SignUp(email: string, password: string) {
    debugger;
    if (!(await this.isEmail(email))) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user);
        })
        .catch((error) => {
          this.SetUserData({});
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
    return null;
  }

  /**
   * Almacena los datos del usuario en Firestore.
   * @param user Los datos del usuario.
   * @returns El resultado de la operación de almacenamiento.
   */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /**
   * Verifica si el usuario está actualmente autenticado.
   * @returns True si el usuario está autenticado, de lo contrario false.
   */
  get isLoggedIn(): boolean {
    if (localStorage.getItem('id')) return true;
    return false;
  }
}
