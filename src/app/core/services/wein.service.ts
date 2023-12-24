import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Konstanten 
const WEIN_URL = 'http://localhost/api/wein/';

@Injectable({providedIn: "root"})
export class weinService{
    //Data
    private wineData = [
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

    constructor(private http: HttpClient){
        
    }

    getWines() {
        return this.wineData;
      }
    
      getWineById(id: number) {
        return this.wineData.find(wine => wine._id === id);
      }

      getWinesByProductTyp(produktTyp: String){
        return this.wineData.find(wine => wine.produktTyp === produktTyp);
      }

    /*  removeAllFilters(): void {
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
      }*/

}