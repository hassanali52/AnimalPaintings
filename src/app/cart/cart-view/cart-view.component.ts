import { Component , OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { product } from 'app/Models/product.model';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {
  
  cartItems: product[] = []
  totalPrice:number = 0

  constructor(private service: CartService){}
  
  ngOnInit(): void {
    this.service.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice =  this.getTotalPrice();
    })
  }

  getTotalPrice()
  {
    let total:number = 0;
    for(let item of this.cartItems)
      {
        total += item.price
      }
    return total;
  }

  clearCart(): void
  {
    this.service.clearCartItems().subscribe();
  }

}
