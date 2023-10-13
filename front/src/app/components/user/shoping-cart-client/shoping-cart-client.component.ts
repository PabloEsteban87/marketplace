import { Component } from '@angular/core';
import { ComicService } from '../../../services/comic/comic.service';
import { Comic } from 'src/app/models/Comic';
import { CartService } from 'src/app/services/cart/cart.service';
import {OrderService} from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping-cart-client',
  templateUrl: './shoping-cart-client.component.html',
  styleUrls: ['./shoping-cart-client.component.scss']
})
export class ShopingCartClientComponent {

  comics: Comic[] = [];
  genres: any[] = [];

  orders: Order[] = [];
  
  subtotal!:number;

  total!:number;

 isbn!: string;

  constructor(private comicService: ComicService,private cartService: CartService, private orderservice:OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getComics();
    this.getGenres();
    this.setSubtotal();
    this.setTotal();
    this.order();
  }

  getComics(): void {
    this.comics = this.cartService.getCartItems();
  }

  getGenres(): void {
    this.comicService.getGenres().subscribe((genres: any) => {
      this.genres = genres;
    });
  }

  deleteShoppingComic(index:number): void{
    this.cartService.removeFromCart(index);
    this.setSubtotal();
    this.setTotal();
  }

  setSubtotal(): void {
    this.subtotal = this.cartService.getSubtotal();

  }

  setTotal() : void {
    this.total = this.subtotal + 6;
    console.log ("total=" + this.total);
  }

  order(): Order[]{
    console.log(this.comics);
      for(let i= 0; i<= this.comics.length; i++){
        let comic = {
          isbn: this.comics[i].isbn,
          title: this.comics[i].title,
          genres: this.comics[i].genres,
          price: this.comics[i].price,
          ishardcover: this.comics[i].ishardcover
        };
      }
      return this.orders.push(comic);
  
  
 
}
  
  
  addOrder(): void{
this.orderservice.createOrderComic(this.orders).subscribe((resultData: any) => {
});
  
  
    }
}









