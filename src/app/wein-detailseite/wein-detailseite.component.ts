import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cartService } from '../../shared/services/cart.service';
import { CartItem } from '../../shared/models/CartItem';
import { Wein } from '../../shared/models/Wein';


@Component({
  selector: 'app-wein-detailseite',
  templateUrl: './wein-detailseite.component.html',
  styleUrl: './wein-detailseite.component.scss'
})
export class WeinDetailseiteComponent implements OnInit {

  counterForm = new FormGroup({ counter: new FormControl(1, [Validators.min(1)]) });
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  mockWein = {
    _id: 1,
    name: 'Wine B',
    geschmack: 'Sweet',
    rebsorte: 'Merlot',
    preis: 18.99,
    preisProLiter: 25.32,
    herstellungsDatum: new Date('2022-02-15'),
    beschreibungsText: "“Der Weiße aus roten Trauben. Kräftig, würzig, harmonisch, mit Duft nach exotischen Früchten.”",
    produktTyp: 'Red Wine',
    fuellmenge: 7.5,
    alkoholgehalt: 14.2,
    restZucker: 5.0,
    gesamtSaeure: 4.8,
    verschlussArt: 'Screw Cap',
    trinkTemperatur: 18,
    lagerfähigkeit: '5 years',
    allergieHinweis: 'Contains sulfites',
    iventar: 30,
    servierempfehlung: 'Ideal with grilled meats.',
    weinBildString: '../../assets/black_noir_weisswein.png',
    servierBildString: '../../assets/grauburgunder.png',
  }

  url: string = "../../assets/image 143.png";


  constructor(private cartService: cartService
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

    const newProduct: CartItem = {
      wein: this.mockWein,
      produktAnzahl: quantity || 1
    };
    
    this.cartService.addToCart(newProduct);
    this.cartService.setcartVisibilityTrue();
  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }



  }
