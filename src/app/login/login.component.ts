import { AuthService } from './../services/auth.service';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Organisateur } from 'src/data/Organisateur';
import { Hebergeur } from 'src/data/Hebergeur';
import { HebergeurService } from '../services/hebergeur.service';
import { OrganisateurService } from '../services/organisateur.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, ObservedValueOf, Subject } from 'rxjs';


@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  createAccount: boolean = false;

  organisateur : Organisateur = {};
  hebergeur : Hebergeur = {};
  erreurConnection = false;

  private theBoolean: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  obs : Observable<boolean> = new Observable()

  constructor(private route: Router,private authService: AuthService,
    private hebergeurService: HebergeurService, private organisateurService: OrganisateurService) {
  }

  ngOnInit(){
    this.obs = this.theBoolean.asObservable();
  }

  connection(email:string, mdp:string, val : string){
    if(val=="hebergeur"){
      this.hebergeurService.getHebergeurByMail(email).subscribe(
        (data)=>{
          if(data != null && data.motDePasse == mdp){
            this.hebergeur=data
            this.authService.isHebergeur = true;
            this.authService.name = this.hebergeur.prenom + " " +this.hebergeur.nom
            this.route.navigateByUrl("/accueil");

          }else{
            this.theBoolean.next(true);
            this.obs = this.theBoolean.asObservable();
            }
        }
      )
    }else{
      this.organisateurService.getHebergeurByMail(email).subscribe(
        (data)=>{
          if(data !=null && data.motDePasse == mdp){
            this.organisateur=data
            this.authService.isOrganisateur = true;
            this.authService.name = this.organisateur.prenom + " " +this.organisateur.nom
            this.route.navigateByUrl("/accueil");

          }
          else{
            this.theBoolean.next(true);
            this.obs = this.theBoolean.asObservable();
          }
        })
    }
  }

  createHebergeur(prenom : string, nom : string , email : string,telephone : string, mdp : string, confirmMdp : string){
    if(mdp == confirmMdp){
      this.hebergeur.nom = nom;
      this.hebergeur.courriel = email;
      this.hebergeur.prenom = prenom;
      this.hebergeur.telephone = telephone;
      this.hebergeur.motDePasse = mdp;
      this.hebergeur.etablissements = [];
      this.hebergeurService.createHebergeur(this.hebergeur).subscribe();
      console.log("create Hebergeur",this.hebergeur);
      this.authService.isHebergeur = true;
      this.authService.name = prenom + " " +nom
      this.route.navigateByUrl("/accueil");
    }else{
      this.theBoolean.next(true);
      this.obs = this.theBoolean.asObservable();
    }
  }

  createOrganisateur(prenom : string, nom : string , email : string,telephone : string, mdp : string, confirmMdp : string){
    if(mdp == confirmMdp){
      this.organisateur.nom = nom;
      this.organisateur.courriel = email;
      this.organisateur.prenom = prenom;
      this.organisateur.telephone = telephone;
      this.organisateur.motDePasse = mdp;
      this.organisateur.festivals = [];
      this.organisateurService.createOrganisateur(this.organisateur).subscribe();
      this.authService.name = prenom + " " +nom
      console.log("create Organisateur",this.organisateur);
      this.authService.isOrganisateur = true;
      this.route.navigateByUrl("/accueil");
    }else{
      this.theBoolean.next(true);
      this.obs = this.theBoolean.asObservable();
    }
  }


  get auth() {
    return this.authService.auth;
  }

  loginWithGmail() {
    this.authService.loginWithGmail();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  logout() {
    this.authService.logout();
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    prenom: new FormControl(''),
    name: new FormControl(''),
    telephone: new FormControl(''),
    nom: new FormControl(''),
    motdepasse: new FormControl(''),
    confirmmotdepasse: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
