import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: firebase.User | null = null;
  private loaded: boolean = false;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((state: firebase.User | null) => {
      this.loaded = true;
      this.state = state;
    });
  }

  get stateLoaded(): boolean {
    return this.loaded;
  }

  get isAuthenticated(): boolean {
    return this.state != null && this.state.emailVerified;
  }

  get email(): string {
    return this.state!.email!;
  }

  logIn() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logOut() {
    this.auth.signOut();
  }
}
