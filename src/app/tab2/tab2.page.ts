// tab2.page.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishListService } from '../services/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  wishList: any[] = [];
  private wishListSubscription!: Subscription;

  constructor(private wishListService: WishListService) {}

  ngOnInit(): void {
    this.wishList = this.wishListService.getWishList();

    // Subscribe to changes in the wishList
    this.wishListSubscription = this.wishListService.getWishListObservable().subscribe((updatedWishList) => {
      this.wishList = updatedWishList;
      console.log(this.wishList);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.wishListSubscription) {
      this.wishListSubscription.unsubscribe();
    }
  }

  removeFromWishList(course: any): void {
    this.wishListService.removeFromWishList(course);
  }

  addToCart(course: any): void {
    this.wishListService.addToCart(course);
  }
}
