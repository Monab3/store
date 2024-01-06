import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
//Konstanten 
const WEIN_URL = 'http://localhost/api/wein/';

@Injectable({ providedIn: "root" })
export class weinService {
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
    },
  ];

  constructor(private http: HttpClient, private location: Location) {

  }

  getWines() {
    return this.wineData;
  }

  getWineById(id: number) {
    return this.wineData.find(wine => wine._id === id);
  }

  getWinesByProductTyp(produktTyp: String) {
    return this.wineData.find(wine => wine.produktTyp === produktTyp);
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