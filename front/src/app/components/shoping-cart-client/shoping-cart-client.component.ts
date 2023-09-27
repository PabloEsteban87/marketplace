import { Component } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { Comic } from 'src/app/models/Comic';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shoping-cart-client',
  templateUrl: './shoping-cart-client.component.html',
  styleUrls: ['./shoping-cart-client.component.scss']
})
export class ShopingCartClientComponent {

  comics: Comic[] = [];
  genres: any[] = [];
  
  subtotal!:number;

  total!:number;
   


  constructor(private comicService: ComicService,private cartService: CartService) {}

  ngOnInit(): void {
    this.getComics();
    this.getGenres();
    this.setSubtotal();
    this.setTotal();
  }

  getComics(): void {
    this.comics = this.cartService.getCartItems();
  }

  getGenres(): void {
    this.comicService.getGenres().subscribe((genres) => {
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
}

