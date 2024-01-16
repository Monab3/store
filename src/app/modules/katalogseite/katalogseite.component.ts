import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  rebsorten = ['Riesling', 'Burgunder', 'Rivaner', 'Dornfelder', 'MuellerThurgau'];
  kategorie: string | undefined;

  weinmenueBilder = ['../assets/landingpage/weinmenue_weisswein.jpg', '../assets/landingpage/weinmenue_rotwein.jpg', '../assets/landingpage/weinmenue_rosewein.jpg', '../assets/landingpage/weinmenue_schaumwein.jpg'];
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

  weinGeschmackByNumbers: WeinFilter | undefined;
  weinRebsorteByNumbers: WeinFilter | undefined;

  /*Filter Objects */
  filters: WeinFilters = {
    geschmack: null,
    rebsorte: null,
  };

  constructor(private weinService: weinService,
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
        console.log("subscribeUrl logs: "+ this.kategorie); 
        this.dataWein = this.weinService.getWinesByKategorie(this.kategorie); 
        this.filterDataWine = this.dataWein;
        this.weinRebsorteByNumbers = this.weinService.getRebsorteByNumber(this.kategorie);
        this.weinGeschmackByNumbers = this.weinService.getGeschmackByNumber(this.kategorie);
        console.log("weinfilters by number: "+ JSON.stringify(this.weinGeschmackByNumbers)); 
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
