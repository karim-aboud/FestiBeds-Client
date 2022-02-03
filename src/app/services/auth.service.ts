import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthenticatedObs : Observable<boolean>;
  isAuthenticated : boolean = false;
  isOrganisateur : boolean = false;
  isHebergeur : boolean = false;
  error: any;
  name: string | null | undefined;

  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  loginWithGmail() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider).then((result) => {
      this.isAuthenticated = true;
      var user = result.user;
      this.name = user?.displayName;
      console.log(user?.displayName);
      console.log(user?.getIdToken);
      this.router.navigate(['/accueil']);
    }).catch(
      (err) => {
        this.error = err;
        console.log(err);
      }
    )
  }

  logout() {
    this.auth.signOut();
  }

  loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithPopup(provider).then((result) => {
      this.isAuthenticated = true;
      var user = result.user;
      this.name = user?.displayName;
      console.log(user?.displayName);
      console.log(user?.getIdToken);
      this.router.navigate(['/accueil']);
    }).catch(
      (err) => {
        this.error = err;
        console.log(err);
      }
    )
  }

  get currentAuthUser() {
    return this.auth.user;
  }

  get currentName() {
    return this.name;
  }
}
