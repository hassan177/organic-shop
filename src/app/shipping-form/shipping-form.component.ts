import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {}; 
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;
  constructor(
    private authService: AuthService, 
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let newOrder = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(newOrder);
    this.router.navigate(['/order-success', result.key]);
  }  
}
