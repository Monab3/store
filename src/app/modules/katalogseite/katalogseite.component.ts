import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rebsortenService } from '../../core/services/rebsorten.service';
import { cartService } from '../../core/services/cart.service';
import { weinService } from '../../core/services/wein.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { WeinFilters } from '../../core/models/WeinFilters';
import { Wein } from '../../core/models/Wein';
import { WeinFilter } from '../../core/models/Wein';
import { AppRoutes } from '../../core/config/app-routes.config';
@Component({
  selector: 'app-katalogseite',
  templateUrl: './katalogseite.component.html',
  styleUrl: './katalogseite.component.scss'
})
export class KatalogseiteComponent implements OnInit {
  appRoutes = AppRoutes;
dataWein: Wein[] | undefined= [];
  titel: string | undefined;

  //filterDataWine = thisdataWein;
  filterDataWine : Wein[] | undefined= [];
  title: String = "";

  navWein = [
    { key: 'weisswein', value: 'Weißwein' },
    { key: 'rotwein', value: 'Rotwein' },
    { key: 'rosewein', value: 'Roséwein' },
    { key: 'schaumwein', value: 'Schaumwein' },
  ];

  /* Arrays */
  geschmaecker = ['Trocken', 'Fruchtig', 'Herb', 'Feinherb'];
  rebsorten = ['Riesling', 'Burgunder', 'Rivaner', 'Dornfelder'];
  kategorie: string | undefined;

  weinmenueBilder = ['../assets/weinmenue_weisswein.jpg', '../assets/weinmenue_rotwein.jpg', '../assets/weinmenue_rosewein.jpg', '../assets/weinmenue_schaumwein.jpg'];
  productViewList: boolean = false;
  filterButtonSmallOpen: boolean = false;
  dispayNoProductsFound: boolean = false;
  counterForm: FormGroup | undefined;

  /*Form Controls */
  formGeschmack = new FormGroup({
    geschmack: new FormControl(''),
  });

  formRebsorte = new FormGroup({
    rebsorte: new FormControl(''),
  });

  weinfilterNumbers: WeinFilter | undefined;

  /*Filter Objects */
  filters: WeinFilters = {
    geschmack: null,
    rebsorte: null,
  };

  constructor(private rebsortenService: rebsortenService, private weinService: weinService,
    private fb: FormBuilder, private cartService: cartService, private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.initialiseData();
    this.subscribeFilters();
    this.subscribeUrl();
  }

  initialiseData(){
  
  }

  subscribeFilters() {

    this.formGeschmack.get('geschmack')?.valueChanges.subscribe((value) => {
      this.setFiltersGeschmack(value);
    });
    this.formRebsorte.get('rebsorte')?.valueChanges.subscribe((value) => {
      this.setFiltersRebsorte(value);
    });
  }

  subscribeUrl() {
    this.route.params.subscribe(params => {
      this.kategorie = params['kategorie'];
      this.titel = this.navWein.find(wine => wine.key === this.kategorie)?.value;
      if(this.kategorie){
        this.dataWein = this.weinService.getWinesByKategorie(this.kategorie); 
        this.filterDataWine = this.dataWein;
        this.weinfilterNumbers = this.weinService.getFilterByNumber(this.kategorie);
        console.log("weinfilters by number: "+ this.weinfilterNumbers); 
      }
    });
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
    this.filterDataWine = this.dataWein?.filter((wine) => {
      const geschmackFilter = !this.filters.geschmack || wine?.searchTags.includes(this.filters.geschmack);
      const rebsorteFilter = !this.filters.rebsorte || wine?.searchTags.includes(this.filters.rebsorte);
      this.dispayNoProductsFound = false;
      return geschmackFilter && rebsorteFilter;
    });

    if (this.filterDataWine?.length == 0) {
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
