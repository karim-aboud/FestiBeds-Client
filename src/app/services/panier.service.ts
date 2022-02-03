import { Hebergement } from './../../data/Hebergement';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public cartItemList: Hebergement[] = [];
  public productList = new BehaviorSubject<Hebergement[]>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: Hebergement) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number{
    let grandTotal = 0;
    this.cartItemList.map((a:any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: Hebergement) {
    this.cartItemList.map((a: Hebergement, index:any) => {
      if (product.idHebergement === a.idHebergement) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
