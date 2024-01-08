import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Wein } from '../../core/models/Wein';
import { WeinWrapper } from '../../core/models/Wein';
import {WeinFilter} from '../../core/models/Wein';
//Konstanten 
const WEIN_URL = 'http://localhost/api/wein/';

@Injectable({ providedIn: "root" })
export class weinService {
  //Data
  private wineData: WeinWrapper[] = [
    {
      key: 'weisswein', value: [
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
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
          weinBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          servierBildString: this.getAbsoluteImageUrl('../../../assets/black_noir_weisswein.png'),
          searchTags: ['Dornfelder', 'Riesling']
        }
      ]
    }
  ];

  private wineFilters: [string, WeinFilter][] = [
    ['weisswein', { Trocken: 2, Fruchtig: 2, Herb: 2, Feinherb: 2, Riesling: 2, Burgunder: 2, Rivaner: 2, Dornfelder: 0 }],
    ['rotwein', { Trocken: 0, Fruchtig: 0, Herb: 0, Feinherb: 0, Riesling: 0, Burgunder: 0, Rivaner: 0, Dornfelder: 0 }],
    ['rosewein', { Trocken: 0, Fruchtig: 0, Herb: 0, Feinherb: 0, Riesling: 0, Burgunder: 0, Rivaner: 0, Dornfelder: 0 }],
    ['schaumwein', { Trocken: 0, Fruchtig: 0, Herb: 0, Feinherb: 0, Riesling: 0, Burgunder: 0, Rivaner: 0, Dornfelder: 0 }]
  ]; 


  constructor(private http: HttpClient, private location: Location) {

  }

  getWines() {
    return this.wineData;
  }

  getWineById(kategorie: string, id: number): Wein |undefined {
    const foundWine = this.wineData
      .flatMap((category) => category.value)
      .find((wine) => wine._id === id);
  
    return foundWine || undefined;
  }

  getWinesByKategorie(kategorie: string): Wein[] | undefined {
    const weissweinValue = this.wineData.find(category => category.key === 'weisswein')?.value;

    if (weissweinValue) {
      console.log("wein service: " + weissweinValue + "")
       return weissweinValue; 
    } 
    return; 
  }

  getFilterByNumber(kategorie: string): WeinFilter | undefined {
    const weinFilter = this.wineFilters.find(filter => filter[0] === kategorie);
    return weinFilter ? weinFilter[1] : undefined;
  }

  /**
   * Konvertiert einen relativen Bildpfad in eine absolute URL mithilfe des Angular Location-Dienstes.
   * Dadurch wird sichergestellt, dass der Bildpfad unabhängig von der Basis-URL oder der Bereitstellungsumgebung der Anwendung korrekt aufgelöst wird.
   * 
   * @param relativePath Der relative Pfad des Bildes.
   * @returns Die absolute URL des Bildes.
   */
  private getAbsoluteImageUrl(relativePath: string): String {
    return this.location.prepareExternalUrl(relativePath);
  }

}