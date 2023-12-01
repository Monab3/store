import { Component, Inject, OnInit } from '@angular/core';
import { rebsortenService } from '../shared/services/rebsorten.service';
import { warenkorbService } from '../shared/services/warenkorb.service';
import { base64ToImageConverter } from '../shared/services/base64ToImageConverter.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fix the property name to styleUrls
})

export class AppComponent implements OnInit {

  title = 'store';
  base64String: string | undefined;


  /* */

  /* Arrays */ 
  geschmaecker = ['Trocken', 'Süß', 'Herb', 'Feinherb'];
  rebsorten = ['Riesling', 'Burgunder', 'Rivaner', 'Dornfelder'];
  navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  weinmenueBilder = ['../assets/weinmenue_weisswein.jpg', '../assets/weinmenue_rotwein.jpg', '../assets/weinmenue_rosewein.jpg', '../assets/weinmenue_schaumwein.jpg'];

 mockDataWine = [
    {
      name: 'Wine B',
      geschmack: 'Sweet',
      rebsorte: 'Merlot',
      preis: 18.99,
      preisProLiter: 25.32,
      herstellungsDatum: new Date('2022-02-15'),
      beschreibungsText: 'Vivamus fermentum tincidunt justo, sit amet pulvinar lacus facilisis vel.',
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
      weinBildString: '../../images/bottle_card_2.png',
      servierBildString: '../../images/bottle_card_2.png',
    },
    {
      name: 'Wine C',
      geschmack: 'Medium',
      rebsorte: 'Sauvignon Blanc',
      preis: 21.50,
      preisProLiter: 25.32,
      herstellungsDatum: new Date('2022-03-20'),
      beschreibungsText: 'Cras non fringilla urna, eu fringilla nisi.',
      produktTyp: 'White Wine',
      fuellmenge: 750,
      alkoholgehalt: 12.8,
      restZucker: 1.5,
      gesamtSaeure: 6.2,
      verschlussArt: 'Cork',
      trinkTemperatur: 12,
      lagerfähigkeit: '4 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 40,
      servierempfehlung: 'Pairs well with seafood and salads.',
      weinBildString: '../../images/bottle_card_2.png',
      servierBildString: '../../images/bottle_card_2.png',
    },
    {
      name: 'Wine D',
      geschmack: 'Dry',
      rebsorte: 'Cabernet Sauvignon',
      preis: 32.99,
      preisProLiter: 25.32,
      herstellungsDatum: new Date('2022-04-10'),
      beschreibungsText: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      produktTyp: 'Red Wine',
      fuellmenge: 750,
      alkoholgehalt: 15.0,
      restZucker: 1.8,
      gesamtSaeure: 5.5,
      verschlussArt: 'Cork',
      trinkTemperatur: 16,
      lagerfähigkeit: '7 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 25,
      servierempfehlung: 'Great with red meat dishes.',
      weinBildString: '../../images/bottle_card_2.png',
      servierBildString: '../../images/bottle_card_2.png',
    },
  ];

  // Other component logic goes here

  constructor(private rebsortenService: rebsortenService, private imageTransformSerivce: base64ToImageConverter,
    private fb: FormBuilder, private warenkorbService: warenkorbService
    ) {

  }
  formGeschmack = new FormGroup({
    geschmack: new FormControl(''), 
    trockenCount: new FormControl(0),
    süßCount: new FormControl(0),
    herbCount: new FormControl(0),
    feinherbCount: new FormControl(0)
  });


  formRebsorte = new FormGroup({
    rebsorte: new FormControl(''),
    rieslingCount: new FormControl(1),
    burgunderCount: new FormControl(2),
    rivanerCount: new FormControl(3),
    dornfelderCount: new FormControl(4)
  });

  formPreis = new FormGroup({
    preisMax: new FormControl(''),
    preisMin: new FormControl(''),
  });

  //there must be an input

  //this.registerForm.invalid; 



  ngOnInit(): void {
    this.formGeschmack.get('geschmack')?.valueChanges.subscribe((value) => {
      console.log('Selected Geschmack:', value);
      this.formGeschmack.get('suess')?.valueChanges.subscribe((value) => {
        console.log('Selected Suess:', value);
        });
    });

  }

  onValueChanged(i: number, newValue: number) {
    console.log('Quantity changed:', newValue + " "+ i);
  }


  public fetchDatafromBackend(): void {
    this.rebsortenService.fetchRebsorten().subscribe((data) => {
      if (data) {

        for (let item of data) {
          if (item.rebsorteImage) {
            this.base64String = this.imageTransformSerivce.transform(item.rebsorteImage, 'image/png');
            console.log("test");
          }
        }

      }
    })
  }


  dateConverter(date: Date): string {
    return "Ursprung "+ date.getFullYear();
  }

}
