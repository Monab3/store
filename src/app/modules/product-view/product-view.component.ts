import { Component, Inject, OnInit } from '@angular/core';
import { rebsortenService } from '../../core/services/rebsorten.service';
import { cartService } from '../../core/services/cart.service';
import { base64ToImageConverter } from '../../core/services/base64ToImageConverter.service';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { WeinFilters } from '../../core/models/WeinFilters';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
  mockDataWine = [
    {
      _id: 1,
      name: 'Wein mit Langem Namen zu Testen des Looks',
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
      lagerfaehigkeit: '5 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 30,
      servierempfehlung: 'Ideal with grilled meats.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Trocken', 'Riesling']
    },
    {
      _id: 2,
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
      lagerfaehigkeit: '4 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 40,
      servierempfehlung: 'Pairs well with seafood and salads.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Süß', 'Riesling']
    },
    {
      _id: 3,
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
      lagerfaehigkeit: '7 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 25,
      servierempfehlung: 'Great with red meat dishes.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Herb', 'Rivaner']
    },
    {
      _id: 4,
      name: 'Wine E',
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
      lagerfaehigkeit: '5 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 30,
      servierempfehlung: 'Ideal with grilled meats.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Trocken', 'Riesling']
    },
    {
      _id: 5,
      name: 'Wine F',
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
      lagerfaehigkeit: '4 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 40,
      servierempfehlung: 'Pairs well with seafood and salads.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Herb', 'Riesling']
    },
    {
      _id: 6,
      name: 'Wine G',
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
      lagerfaehigkeit: '7 years',
      allergieHinweis: 'Contains sulfites',
      iventar: 25,
      servierempfehlung: 'Great with red meat dishes.',
      weinBildString: '../../images/bottle_card_2.png',
      weinEttiketBildString: "",
      servierBildString: '../../images/bottle_card_2.png',
      searchTags: ['Dornfelder', 'Riesling']
    },
  ];

  filterDataWine = this.mockDataWine;
  title: String = ""; 

  /* Arrays */
  geschmaecker = ['Trocken', 'Süß', 'Herb', 'Feinherb'];
  rebsorten = ['Riesling', 'Burgunder', 'Rivaner', 'Dornfelder'];
  navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  
  weinmenueBilder = ['../assets/weinmenue_weisswein.jpg', '../assets/weinmenue_rotwein.jpg', '../assets/weinmenue_rosewein.jpg', '../assets/weinmenue_schaumwein.jpg'];
  productViewList: boolean = false;
  filterButtonSmallOpen: boolean = false;
  dispayNoProductsFound: boolean = false;

  /*Form Controls */
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

  /*Filter Objects */
  filters: WeinFilters = {
    geschmack: null,
    rebsorte: null,
  };

  /* Variables */
  base64String: string | undefined;

  constructor(private rebsortenService: rebsortenService, private imageTransformSerivce: base64ToImageConverter,
    private fb: FormBuilder, private cartService: cartService
  ) {

  }

  ngOnInit(): void {
    this.subscribeFilters();
  }



  counterForm: FormGroup | undefined;

  subscribeFilters() {

    this.formGeschmack.get('geschmack')?.valueChanges.subscribe((value) => {
      this.setFiltersGeschmack(value);
    });
    this.formRebsorte.get('rebsorte')?.valueChanges.subscribe((value) => {
      this.setFiltersRebsorte(value);
    });
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
    return "Ursprung " + date.getFullYear();
  }

  toggleProductViewList(): boolean {
    this.productViewList = !this.productViewList;
    return this.productViewList;
  }

  removeAllFilters(): void {
    console.log("remove all filters");
    this.filters = {
      geschmack: null,
      rebsorte: null
    }
    this.formGeschmack.controls.geschmack.setValue(null);
    this.formRebsorte.controls.rebsorte.setValue(null);
    this.addFilters();
  }

  addFilters(): void {
    this.filterDataWine = this.mockDataWine.filter((wine) => {
      const geschmackFilter = !this.filters.geschmack || wine.searchTags.includes(this.filters.geschmack);
      const rebsorteFilter = !this.filters.rebsorte || wine.searchTags.includes(this.filters.rebsorte);
      this.dispayNoProductsFound = false;
      return geschmackFilter && rebsorteFilter;
    });

    if (this.filterDataWine.length == 0) {
      this.dispayNoProductsFound = true;
    }
  }

  setFiltersGeschmack(value: any) {
    this.filters.geschmack = value;

    if (!value) {
      this.formGeschmack.controls.geschmack.setValue(null);
    }
    this.addFilters();
  }

  setFiltersRebsorte(value: any) {
    this.filters.rebsorte = value;
    if (!value) {
      this.formRebsorte.controls.rebsorte.setValue(null);
    }
    this.addFilters();
  }


  getObjectValues(obj: any): any[] {
    return Object.values(obj).filter(value => value !== null);
  }

  toggleFilterButton() {
    this.filterButtonSmallOpen = !this.filterButtonSmallOpen;
  }
}

