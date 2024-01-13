import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Wein } from '../../core/models/Wein';
import { WeinWrapper } from '../../core/models/Wein';
import { WeinFilter } from '../../core/models/Wein';
import { EmpfehlungDesHauses } from '../../core/models/Wein';
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
          name: 'Alte Rebe',
          geschmack: 'Trocken',
          rebsorte: 'Riesling',
          preis: 5.00,
          preisProLiter: 6.66,
          herstellungsDatum: new Date('2022-01-01'),
          beschreibungsText: '„Alte Rebe“ - Kräftiger, sehr fruchtbetonter Wein aus unserem 50-jährigen Weinberg.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 6.2,
          gesamtSaeure: 7.3,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '5 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 30,
          servierempfehlung: 'Ideal zu gegrilltem Fleisch.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Trocken', 'Riesling']
        },
        {
          _id: 2,
          name: 'Grauer Burgunder',
          geschmack: 'Trocken',
          rebsorte: 'Grauer Burgunder',
          preis: 5.00,
          preisProLiter: 6.66,
          herstellungsDatum: new Date('2022-01-02'),
          beschreibungsText: 'Frisch, kraftvoll, Duftaromen von Birnen, Mandeln und Ananas.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 6.4,
          gesamtSaeure: 6.4,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '5 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 30,
          servierempfehlung: 'Ideal zu gegrilltem Fisch.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          searchTags: ['Trocken', 'Burgunder']
        },
        {
          _id: 3,
          name: 'Blanc de Noir',
          geschmack: 'Halbtrocken',
          rebsorte: 'Spätburgunder',
          preis: 5.00,
          preisProLiter: 6.66,
          herstellungsDatum: new Date('2022-01-03'),
          beschreibungsText: 'Der Weiße aus roten Trauben, kräftig, würzig, harmonisch.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 12.0,
          gesamtSaeure: 7.7,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '5 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 30,
          servierempfehlung: 'Ideal zu Geflügelgerichten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Trocken', 'Burgunder']
        },
        {
          _id: 4,
          name: 'Weisser Burgunder',
          geschmack: 'Trocken',
          rebsorte: 'Weißer Burgunder',
          preis: 5.00,
          preisProLiter: 6.66,
          herstellungsDatum: new Date('2021-01-04'),
          beschreibungsText: 'Reifer Burgunder mit frischer Säure, tolle Frucht, nussige Aromen.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 8.2,
          gesamtSaeure: 6.8,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '4 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 25,
          servierempfehlung: 'Passt gut zu Käseplatten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Trocken', 'Burgunder']
        },
        {
          _id: 5,
          name: 'Pinot Blanc',
          geschmack: 'Feinherb',
          rebsorte: 'Weißer Burgunder',
          preis: 5.50,
          preisProLiter: 7.33,
          herstellungsDatum: new Date('2022-01-04.1'),
          beschreibungsText: 'Frischer Burgunder mit eigener Restsüße, Duft von Aprikose, Apfel und Pfirsich.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 11.5,
          restZucker: 16.3,
          gesamtSaeure: 6.9,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '4 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 25,
          servierempfehlung: 'Perfekt zu leichten Desserts.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Feinherb', 'Burgunder']
        },
        {
          _id: 6,
          name: 'Rivaner',
          geschmack: 'Feinherb',
          rebsorte: 'Rivaner',
          preis: 4.50,
          preisProLiter: 6.00,
          herstellungsDatum: new Date('2021-01-05'),
          beschreibungsText: 'Weiche Muskat-Aromen.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 11.0,
          restZucker: 11.3,
          gesamtSaeure: 6.0,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '3 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 20,
          servierempfehlung: 'Perfekt zu leichten Salaten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Feinherb', 'Rivaner']
        },
        {
          _id: 7,
          name: 'Filou',
          geschmack: 'Lieblich',
          rebsorte: 'Filou',
          preis: 4.75,
          preisProLiter: 6.33,
          herstellungsDatum: new Date('2021-01-06'),
          beschreibungsText: 'Duftet nach Aprikose und Stachelbeere.',
          produktTyp: 'Weißwein',
          fuellmenge: 0.75,
          alkoholgehalt: 8.5,
          restZucker: 66.1,
          gesamtSaeure: 7.1,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '2 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 15,
          servierempfehlung: 'Genießen Sie ihn zu Desserts.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
          weinBildAlt: 'Weinflasche Weißwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
          searchTags: ['Lieblich', 'Anderes']
        },
      ],
    },
    {
      key: 'rosewein', value: [
        {
          _id: 8,
          name: 'Roséwein',
          geschmack: 'Fruchtig',
          rebsorte: undefined,
          preis: 4.50,
          preisProLiter: 6.00,
          herstellungsDatum: new Date('2022-01-07'),
          beschreibungsText: 'Kräftige Waldbeerenfrüchte treffen auf Schwarzkirsche, hohe Fruchtsüße.',
          produktTyp: 'Roséwein',
          fuellmenge: 0.75,
          alkoholgehalt: 9.0,
          restZucker: 43.6,
          gesamtSaeure: 7.2,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '2 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 15,
          servierempfehlung: 'Perfekt zu leichtem Dessert.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose.png'),
          weinBildAlt: 'Weinflasche Roéwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Roséwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Fruchtig', 'Anderes']
        },
        {
          _id: 9,
          name: 'Roséwein',
          geschmack: 'Trocken',
          rebsorte: undefined,
          preis: 4.50,
          preisProLiter: 6.00,
          herstellungsDatum: new Date('2022-01-08'),
          beschreibungsText: 'Saftig, frisch, mineralisch, fruchtige Säure.',
          produktTyp: 'Roséwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 9.5,
          gesamtSaeure: 6.7,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '2 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 15,
          servierempfehlung: 'Passt gut zu mediterranen Gerichten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose.png'),
          weinBildAlt: 'Weinflasche Roséwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Roséwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Trocken', 'Anderes']
        }
      ]
    },
    {
      key: 'rotwein', value: [
        {
          _id: 10,
          name: 'Dornfelder',
          geschmack: 'Feinherb',
          rebsorte: 'Dornfelder',
          preis: 4.50,
          preisProLiter: 6.00,
          herstellungsDatum: new Date('2022-01-13'),
          beschreibungsText: 'Der Trendrotwein. Im Holzfass gereift.',
          produktTyp: 'Rotwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 13.0,
          gesamtSaeure: 5.5,
          verschlussArt: 'Korken',
          trinkTemperatur: 16,
          lagerfaehigkeit: '5 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 25,
          servierempfehlung: 'Passt gut zu herzhaften Gerichten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein.jpg'),
          weinBildAlt: 'Weinflasche Rotwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Feinherb', 'Dornfelder']
        },
        {
          _id: 11,
          name: 'Spätburgunder',
          geschmack: 'Trocken',
          rebsorte: 'Spätburgunder',
          preis: 6.00,
          preisProLiter: 8.00,
          herstellungsDatum: new Date('2022-01-14'),
          beschreibungsText: 'Trocken, im Fass Nr. 9 gereift. Samtig, weich, schöne Tannine.',
          produktTyp: 'Rotwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.5,
          restZucker: 6.0,
          gesamtSaeure: 4.3,
          verschlussArt: 'Korken',
          trinkTemperatur: 18,
          lagerfaehigkeit: '8 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 30,
          servierempfehlung: 'Perfekt zu Pasta und Fleischgerichten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein.jpg'),
          weinBildAlt: 'Weinflasche Rotwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Trocken', 'Burgunder']
        },
        {
          _id: 12,
          name: 'Amour',
          geschmack: 'Lieblich',
          rebsorte: 'Merlot',
          preis: 4.50,
          preisProLiter: 6.00,
          herstellungsDatum: new Date('2022-01-15'),
          beschreibungsText: 'Der süße Rote. Lieblicher Rotwein.',
          produktTyp: 'Rotwein',
          fuellmenge: 0.75,
          alkoholgehalt: 9.0,
          restZucker: 55.1,
          gesamtSaeure: 4.9,
          verschlussArt: 'Korken',
          trinkTemperatur: 14,
          lagerfaehigkeit: '3 Jahre',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 20,
          servierempfehlung: 'Ideal zu Desserts und Käse.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein.jpg'),
          weinBildAlt: 'Weinflasche Rotwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Lieblich', 'Anderes']
        },
      ]
    },
    {
      key: 'schaumwein', value: [
        {
          _id: 13,
          name: 'Becher,s Frizz',
          geschmack: 'Riesling',
          rebsorte: 'Lieblich',
          preis: 6.00,
          preisProLiter: 8.00,
          herstellungsDatum: new Date('2022-01-13'),
          beschreibungsText: 'Erfrischender Schaumwein mit Riesling – Secco Geschmack.',
          produktTyp: 'Schaumwein',
          fuellmenge: 0.75,
          alkoholgehalt: 11.5,
          restZucker: 15.0,
          gesamtSaeure: 7.0,
          verschlussArt: 'Korken',
          trinkTemperatur: 8,
          lagerfaehigkeit: '3 years',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 20,
          servierempfehlung: 'Ideal als Aperitif oder zu leichten Vorspeisen.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein.jpg'),
          weinBildAlt: 'Weinflasche Schaumwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Riesling', 'Anderes']
        },
        {
          _id: 14,
          name: 'Rosini',
          geschmack: 'Trocken',
          rebsorte: 'Riesling',
          preis: 6.00,
          preisProLiter: 8.00,
          herstellungsDatum: new Date('2022-01-14'),
          beschreibungsText: 'Erfrischender Rosé-Schaumwein mit Rosee – Secco Geschmack.',
          produktTyp: 'Schaumwein',
          fuellmenge: 0.75,
          alkoholgehalt: 10.0,
          restZucker: 10.0,
          gesamtSaeure: 6.5,
          verschlussArt: 'Korken',
          trinkTemperatur: 6,
          lagerfaehigkeit: '2 years',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 15,
          servierempfehlung: 'Perfekt für gesellige Anlässe und leichte Speisen.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein.jpg'),
          weinBildAlt: 'Weinflasche Schaumwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Trocken', 'Riesling']
        },
        {
          _id: 15,
          name: 'Winzerssekt',
          geschmack: 'Trocken',
          rebsorte: 'Riesling',
          preis: 9.50,
          preisProLiter: 12.66,
          herstellungsDatum: new Date('2022-01-15'),
          beschreibungsText: 'Edler trockener Winzersekt mit Riesling – Sekt trocken Geschmack.',
          produktTyp: 'Schaumwein',
          fuellmenge: 0.75,
          alkoholgehalt: 12.0,
          restZucker: 8.0,
          gesamtSaeure: 7.2,
          verschlussArt: 'Korken',
          trinkTemperatur: 10,
          lagerfaehigkeit: '4 years',
          allergieHinweis: 'Enthält Sulfite',
          inventar: 25,
          servierempfehlung: 'Perfekt für besondere Anlässe und festliche Mahlzeiten.',
          weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein.jpg'),
          weinBildAlt: 'Weinflasche Schaumwein',
          weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__schaumwein__label.jpg'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
          servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
          searchTags: ['Trocken', 'Riesling']
        },
      ]
    }
  ];

  private geschmackFilters: [string, WeinFilter][] = [
    ['weisswein', { Trocken: 4, Lieblich: 1, Feinherb: 1, Riesling: 2 }],
    ['rotwein', { Trocken: 1, Lieblich: 1, Feinherb: 1 }],
    ['rosewein', { Trocken: 1, Fruchtig: 1 }],
    ['schaumwein', { Trocken: 2, Lieblich: 1 }]
  ];

  private rebsorteFilters: [string, WeinFilter][] = [
    ['weisswein', { Riesling: 2, Burgunder: 4, Rivaner: 1 }],
    ['rotwein', { Burgunder: 1, Dornfelder: 1, Anderes: 1 }],
    ['schaumwein', { Riesling: 2 }]
  ];

  private empfehlungDesHauses: EmpfehlungDesHauses = {
    wein: {
      _id: 12,
      name: 'Amour',
      geschmack: 'Lieblich',
      rebsorte: undefined,
      preis: 4.50,
      preisProLiter: 6.00,
      herstellungsDatum: new Date('2022-01-15'),
      beschreibungsText: 'Der süße Rote. Lieblicher Rotwein.',
      produktTyp: 'Rotwein',
      fuellmenge: 0.75,
      alkoholgehalt: 9.0,
      restZucker: 55.1,
      gesamtSaeure: 4.9,
      verschlussArt: 'Korken',
      trinkTemperatur: 14,
      lagerfaehigkeit: '3 Jahre',
      allergieHinweis: 'Enthält Sulfite',
      inventar: 20,
      servierempfehlung: 'Ideal zu Desserts und Käse.',
      weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein.jpg'),
      weinBildAlt: 'Weinflasche Rotwein',
      weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rotwein__label.jpg'),
      weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
      servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
      searchTags: ['Lieblich', 'Anderes']
    },
    img: this.getAbsoluteImageUrl('../../../assets/landingpage/landingpage__rotwein-teaser.png'),
    alt: 'Weinflasche Rotwein',
    kategorie: 'rotwein',
    text: 'Rotwein ist ein beliebter Wein, der aus dunklen Trauben hergestellt wird. Er zeichnet sich durch seine tiefrote Farbe, seinen vollmundigen Geschmack und seine vielfältigen Aromen von Beeren, Gewürzen und manchmal auch Schokolade aus. Rotwein wird oft zu herzhaften Speisen wie Fleisch und Käse serviert und kann je nach Sorte trocken, halbtrocken oder lieblich sein. Er wird weltweit angebaut und ist bekannt für seine gesundheitsfördernden Eigenschaften aufgrund seines hohen Gehalts an Antioxidantien.'
  }

  private weinTeaser: EmpfehlungDesHauses[] = [{
    wein: {
      _id: 8,
      name: 'Roséwein',
      geschmack: 'Fruchtig',
      rebsorte: undefined,
      preis: 4.50,
      preisProLiter: 6.00,
      herstellungsDatum: new Date('2022-01-07'),
      beschreibungsText: 'Kräftige Waldbeerenfrüchte treffen auf Schwarzkirsche, hohe Fruchtsüße.',
      produktTyp: 'Roséwein',
      fuellmenge: 0.75,
      alkoholgehalt: 9.0,
      restZucker: 43.6,
      gesamtSaeure: 7.2,
      verschlussArt: 'Korken',
      trinkTemperatur: 8,
      lagerfaehigkeit: '2 Jahre',
      allergieHinweis: 'Enthält Sulfite',
      inventar: 15,
      servierempfehlung: 'Perfekt zu leichtem Dessert.',
      weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose.png'),
      weinBildAlt: 'Weinflasche Roéwein',
      weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__rose__label.jpg'),
      weinEttiketBildAlt: 'Weinflasche Roséwein Etikett',
      servierBildString: this.getAbsoluteImageUrl('../../../assets/grauburgunder.png'),
      searchTags: ['Fruchtig', 'Anderes']
    },
    alt: 'Empfehlung des Hauses Roséwein',
    kategorie: 'rosewein',
    text: 'Roséwein ist ein beliebter Wein, der aus dunklen Trauben hergestellt wird.',
    img: this.getAbsoluteImageUrl('../../../assets/danke/danke__teaser__rose.jpg')
  },
  {
    wein: {
      _id: 3,
      name: 'Blanc de Noir',
      geschmack: 'Halbtrocken',
      rebsorte: 'Spätburgunder',
      preis: 5.00,
      preisProLiter: 6.66,
      herstellungsDatum: new Date('2022-01-03'),
      beschreibungsText: 'Der Weiße aus roten Trauben, kräftig, würzig, harmonisch.',
      produktTyp: 'Weißwein',
      fuellmenge: 0.75,
      alkoholgehalt: 12.0,
      restZucker: 12.0,
      gesamtSaeure: 7.7,
      verschlussArt: 'Korken',
      trinkTemperatur: 8,
      lagerfaehigkeit: '5 Jahre',
      allergieHinweis: 'Enthält Sulfite',
      inventar: 30,
      servierempfehlung: 'Ideal zu Geflügelgerichten.',
      weinBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein.jpg'),
      weinBildAlt: 'Weinflasche Weißwein',
      weinEttiketBildString: this.getAbsoluteImageUrl('../../../assets/katalog/katalog__weisswein__label.jpg'),
      weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
      servierBildString: this.getAbsoluteImageUrl('pfad_zum_bild'),
      searchTags: ['Trocken', 'Burgunder']
    },
    alt: 'Empfehlung des Hauses Roséwein',
    kategorie: 'rosewein',
    text: 'Roséwein ist ein beliebter Wein, der aus dunklen Trauben hergestellt wird.',
    img: this.getAbsoluteImageUrl('../../../assets/danke/danke__teaser__weisswein.jpg')
  },
  ]
  constructor(private http: HttpClient, private location: Location) {

  }

  getWines() {
    return this.wineData;
  }

  getEmpfehlungDesHauses() {
    return this.empfehlungDesHauses;
  }

  getWeinTeaser() { 
    return this.weinTeaser;
  }

  getWineById(kategorie: string, id: number): Wein | undefined {
    const foundWine = this.wineData
      .find((category) => category.key === kategorie)
      ?.value.find((wine) => wine._id === id);

    return foundWine || undefined;
  }

  getWinesByKategorie(kategorie: string): Wein[] | undefined {
    const weinValue = this.wineData.find(category => category.key === kategorie)?.value;

    if (weinValue) {
      console.log("wein service: " + weinValue + "")
      return weinValue;
    }
    return;
  }

  getGeschmackByNumber(kategorie: string): WeinFilter | undefined {
    const weinFilter = this.geschmackFilters.find(filter => filter[0] === kategorie);
    return weinFilter ? weinFilter[1] : undefined;
  }

  getRebsorteByNumber(kategorie: string): WeinFilter | undefined {
    const weinFilter = this.rebsorteFilters.find(filter => filter[0] === kategorie);
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