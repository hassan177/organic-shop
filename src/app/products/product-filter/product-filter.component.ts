import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/categories.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;
  icons = {
    Bread: "bag.png",
    Dairy: "milk.png",
    Fruits: "fruits.png",
    "Seasoning and Spices": "spice.png",
    Vegetables: "vegetables.png"
  }

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();

   }

  

  
}
