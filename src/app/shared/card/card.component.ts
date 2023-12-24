import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';
import { Wein } from '../../core/models/Wein';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() wein: Wein | undefined;
  @Input() cardDetail: boolean = false;
  @Input() cardProduktView: boolean = false;
  @Input() productViewList: boolean = false;

  counterForm = new FormGroup({ counter: new FormControl(1, [Validators.min(1)]) });
  ngOnInit(): void {
    console.log(this.wein);
  }

  url: string = "../../assets/image 143.png";


  constructor(private cartService: cartService, 
  ) {

  }

  handleMinus() {
    const control = this.counterForm?.get('counter');
    if (control) {
      const currentValue = control.value;
      if (currentValue !== null && currentValue >= 2) {
        control.setValue(currentValue - 1);
      } else {
        control.setValue(1);
      }
    }
  }

  handlePlus() {
    const control = this.counterForm?.get('counter');
    if (control) {
      const currentValue = control.value;
      if (currentValue !== null && currentValue >= 1) {
        control.setValue(currentValue + 1);
      } else {
        control.setValue(1);
      }
    }
  }

  addProductToCart() {
    const quantity = this.counterForm?.get('counter')?.value

    if(this.wein){
      const newProduct: CartItem = {
        wein: this.wein,
        produktAnzahl: quantity || 1
      };
      this.cartService.addToCart(newProduct);
      this.cartService.setcartVisibilityTrue();
    }

  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }
}

