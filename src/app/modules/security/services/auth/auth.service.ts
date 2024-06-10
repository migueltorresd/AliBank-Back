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
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  hola = 'hola mundo';
  sessionGoogle = new BehaviorSubject<boolean>(false);
  setGoogleOut(google: boolean) {
    this.sessionGoogle.next(google);
  }
  getGoogleObservOut(): Observable<boolean> {
    return this.sessionGoogle.asObservable();
  }
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
   * The function returns a promise that resolves to a UserCredential object
   * @returns A promise that resolves to a UserCredential object.
   */
  GoogleAuth(): Promise<firebase.auth.UserCredential> {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  /**
   * This function takes a provider as a parameter and returns a promise that resolves to a user object
   * @param {any} provider - This is the provider you want to authenticate with.
   * @returns The promise of the user object.
   */
  private AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
  /**
   * The function takes in an email and password, and then uses the AngularFireAuth module to sign in
   * the user with the email and password
   * @param {string} email - string, password: string
   * @param {string} password - string - The password of the user.
   * @returns The user is being returned.
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
  // Sign up with email/password
  /**
   * The function takes in an email and password, and then creates a new user with the email and
   * password
   * @param {string} email - string - The email address of the user.
   * @param {string} password - string - The password of the user.
   * @returns The user's email and password.
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
   * We're creating a new document in the users collection, and we're setting the user's data to the
   * document
   * @param {any} user - any - This is the user object that is returned from the Firebase
   * authentication service.
   * @returns The userRef.set() method is being returned.
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
   * If the user is logged in, return true, otherwise return false
   * @returns A boolean value.
   */
  get isLoggedIn(): boolean {
    if (localStorage.getItem('id')) return true;
    return false;
  }
}
