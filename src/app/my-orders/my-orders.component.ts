import { Component} from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order: any;

  userId: string;

  constructor(private orderService: OrderService, private authService: AuthService) { 
    this.authService.user$.subscribe(user => this.userId = user.uid);

    this.orderService.getOrdersByUser(this.userId)
          .subscribe(x => this.order = x);
  }
}
