import { CreateHebergementComponent } from './create-hebergement/create-hebergement.component';
import { CreateFestivalComponent } from './create-festival/create-festival.component';
import { FestivalDetailsComponent } from './festival-details/festival-details.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PanierComponent } from './panier/panier.component';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToAccueil = () => redirectLoggedInTo(['accueil']);

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'festivals/:festivalId', component: FestivalDetailsComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'create-festival', component: CreateFestivalComponent },
  { path: 'create-hebergement', component: CreateHebergementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
