import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts;
  category;
  cart$: Observable<ShoppingCart>;

  constructor (
              private route: ActivatedRoute, 
              private productService: ProductService, 
              private cartService: ShoppingCartService) {
   }

   async ngOnInit() {
    this.cart$= await this.cartService.getCart();
    this.populateProducts();
      
   }

   private populateProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');  
        this.applyFilter();  
      });
    });
   }

   private applyFilter() {
    this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) : this.products;
   }
}
