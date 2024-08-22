import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  register(name: string, email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        if (userCredential.user) {
          // Update profile with name
          return from(userCredential.user.updateProfile({ displayName: name }));
        } else {
          return from(Promise.reject('No user credential returned'));
        }
      }),
      catchError(error => {
        // Handle and throw any errors
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  // Login a user
  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        // Handle and throw any errors
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Log out the current user
  logout() {
    return from(this.afAuth.signOut()).pipe(
      catchError(error => {
        // Handle and throw any errors
        console.error('Logout error:', error);
        throw error;
      })
    );
  }

  // Get the current user's profile
  getCurrentUser() {
    return this.afAuth.user;
  }

}
