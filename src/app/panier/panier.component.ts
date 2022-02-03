import { Router } from '@angular/router';
import { PanierService } from './../services/panier.service';
import { Component, ChangeDetectionStrategy, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PanierComponent implements OnInit {
  public products: any = [];
  public grandTotal: number = 0;

  constructor(private panierService: PanierService,
              private router: Router) {}

  ngOnInit(): void {
    this.panierService.getProducts().subscribe(
      res => {
        this.products = res;
        this.grandTotal = this.panierService.getTotalPrice();
      }
    )
  }

  removeItem(item: any) {
    this.panierService.removeCartItem(item);
  }

  emptyCart() {
    this.panierService.removeAllCart();
  }

  redirectToHome() {
    this.router.navigate(['/accueil']);
  }
}
