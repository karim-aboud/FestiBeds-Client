import { PanierService } from './services/panier.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticatedObs: Observable<boolean>;
  isAuthenticated : boolean;
  username: any;
  public totalItems: number = 0;

  constructor(private authService: AuthService,
              private panierService: PanierService) {}

  ngOnInit() {
    //this.isAuthenticatedObs = this.authService.isAuthenticatedObs;
    this.isAuthenticated = this.authService.isAuthenticated;
    this.username = this.authService.name;
    this.currentAuthUser;
    this.panierService.getProducts().subscribe(
      res => {
        this.totalItems = res.length;
      }
    )
  }

  logout() {
    this.authService.logout();
  }

  get currentAuthUser() {
    return this.authService.currentAuthUser;
  }
}
