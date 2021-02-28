import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: firebase.User | null = null;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((state: firebase.User | null) => {
      this.state = state;
    });
  }

  get isAuthenticated(): boolean {
    return this.state != null && this.state.emailVerified;
  }

  get uid(): string {
    return this.state!.uid;
  }

  logIn() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logOut() {
    this.auth.signOut();
  }
}
