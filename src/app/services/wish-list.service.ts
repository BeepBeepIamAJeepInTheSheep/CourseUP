// wish-list.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishList: any[] = [];
  private cart: any[] = [];
  private wishListSubject = new BehaviorSubject<any[]>([]);
  private cartSubject = new BehaviorSubject<any[]>([]);


  getCart(): any[] {
    return this.cart;
  }

  addToCart(course: any): void {
    this.cart.push(course);
    this.notifyCartChange();
  }

  removeFromCart(course: any): void {
    const index = this.cart.indexOf(course);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.notifyCartChange();
    }
  }

  getWishList(): any[] {
    return this.wishList;
  }

  getWishListObservable(): Observable<any[]> {
    return this.wishListSubject.asObservable();
  }
  getCartObservable(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }

  addToWishList(course: any): void {
    this.wishList.push(course);
    this.notifyWishListChange();
  }

  removeFromWishList(course: any): void {
    const index = this.wishList.indexOf(course);
    if (index > -1) {
      this.wishList.splice(index, 1);
      this.notifyWishListChange();
    }
  }

  isInWishList(course: any): boolean {
    return this.wishList.some(item => item === course);
  }

  private notifyWishListChange(): void {
    this.wishListSubject.next([...this.wishList]);
  }
  private notifyCartChange(): void {
    this.cartSubject.next([...this.cart]);
  }
}
