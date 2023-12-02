import { Component, OnInit } from '@angular/core';

import { cartService } from '../../shared/services/cart.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CartItem } from '../../shared/models/CartItem';

@Component({
  selector: 'app-hauptmenue',
  templateUrl: './hauptmenue.component.html',
  styleUrl: './hauptmenue.component.scss'
})
export class HauptmenueComponent implements OnInit{
  navWein: String[] = [];
  cartItems: CartItem [] = [];
  cartAnzahl: Number=0;
  cartVisibility = false;
  cartTotal: String = "";
  
  constructor(private fb: FormBuilder, private cartService: cartService
    ) {
      this.navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  }

  //cartInhalt: Observable<any> = new Observable();

  ngOnInit(): void {
    console.log("test");

    this.cartService.cartInhalt.subscribe((data) => {
      this.cartItems = data;
      this.cartAnzahl = data.length;
    });

    this.cartService.cartVisibility.subscribe((visibility) => {
      this.cartVisibility = visibility;
      });

      this.cartService.cartTotal.subscribe((data) => {
        this.cartTotal = data.toFixed(2);
      });
  }  
  weinmenueBilder = ['../../assets/weinmenue_weisswein.jpg', '../../assets/weinmenue_rotwein.jpg', '../../assets/weinmenue_rosewein.jpg', '../../assets/weinmenue_schaumwein.jpg'];


  public togglecart(): void {
    this.cartVisibility = !this.cartVisibility;
  }

}
