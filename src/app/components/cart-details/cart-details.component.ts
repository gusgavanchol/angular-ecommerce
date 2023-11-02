import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.CartService.cartItems;

    this.CartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.CartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    )

    this.CartService.computeCartTotals();
  }  

  incrementQuantity(theCartItem: CartItem) {
    this.CartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem){
    this.CartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.CartService.remove(theCartItem);
  }
}
