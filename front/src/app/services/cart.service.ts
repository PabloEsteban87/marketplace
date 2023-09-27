import { Injectable } from '@angular/core';
import { Comic } from '../models/Comic';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Comic[] = [];

  constructor() {}

  addToCart(comic: Comic) {
    this.cartItems.push(comic);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
    return this.cartItems;
  }
  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.updateCartStorage();
    }
  }

  private updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  getSubtotal(): number{
    let subtotal:number= 0 ;
    for(let comic of this.cartItems){
      subtotal += comic.price;
    } 
    return subtotal;
  }
 

}
