import { Component} from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../categories.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [];
  filteredProducts;
  categories$;
  category

  constructor(route: ActivatedRoute, productService: ProductService, categoryService: CategoryService) {
    productService.getAll().subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
    });
    this.categories$ = categoryService.getCategories();
   }
}
