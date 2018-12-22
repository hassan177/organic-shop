import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order: any;

  constructor(orderService: OrderService) { 
    orderService.getOrders().subscribe(x => this.order = x);
  }
}
