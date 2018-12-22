import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }

  async clearCart () {
    let cardId = await this.getOrCreateId();
    this.db.object('/shopping-carts/' + cardId + '/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/' + cartId).pipe(map(x => new ShoppingCart(x.items)));
  }

  private async getOrCreateId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;  
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateId();
    let item$ = this.getItem(cartId.toString(), product.$key);
    (item$.pipe(take(1)).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity});
    }));
  }
}
