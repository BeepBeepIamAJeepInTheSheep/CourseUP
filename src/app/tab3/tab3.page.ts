import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishListService } from '../services/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {

  constructor(private wishListService: WishListService) {}
  cartList: any[] = [];
  private cartSubscription!: Subscription;
  ngOnInit(): void {
    this.cartList = this.wishListService.getCart();

    // Subscribe to changes in the wishList
    this.cartSubscription = this.wishListService.getCartObservable().subscribe((updatedCart) => {
      this.cartList = updatedCart;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeFromCart(course: any): void {
    this.wishListService.removeFromCart(course);
  }
}
