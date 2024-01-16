import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Wein } from '../../core/models/Wein';
import { WeinWrapper } from '../../core/models/Wein';
import { WeinFilter } from '../../core/models/Wein';
import { EmpfehlungDesHauses } from '../../core/models/Wein';
import { Event } from '../../core/models/Event';
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
          servierempfehlung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein, der das Picknick am Rhein zu einem kulinarischen Höhepunkt macht.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Oliven-Tapenade auf knusprigem Ciabatta - eine mediterrane Köstlichkeit, die die Sinne belebt und den Wein noch besser zur Geltung bringt. Auf zum sommerlichen Genuss!',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
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
          servierempfehlung: 'Frische Tomaten-Bruschetta mit Basilikum: Ein leichtes und erfrischendes Gericht, das perfekt zu diesem Spätburgunder passt. Genießt Sie den Sommergeschmack und lassen Sie die Aromen tanzen.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Spinat- und Feta-Quiche: Die würzige Füllung und der buttrige Teig bilden eine ideale Ergänzung zu diesem trockenen Burgunder. Ein Picknick am Rhein wird so zu einem wahren Gaumenfest.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Knusprige Hähnchenspieße mit Teriyaki-Glasur: Die süß-salzige Note dieser Spezialität lässt sich hervorragend mit dem Pfälzer Wein kombinieren. Ein Muss für Weinliebhaber.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Antipasti-Platte mit luftgetrocknetem Schinken und verschiedenen Käsesorten - eine geschmackliche Reise, die den Wein in seiner vollen Pracht erstrahlen lässt!',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Gegrillte Gemüsespieße mit Pesto-Dip: Die aromatischen Gemüsesorten und das würzige Pesto sind die perfekte Ergänzung zu diesem Filou!',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein-l.png'),
          weinBildAlt: 'Weinflasche Weißwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__weisswein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__weisswein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Weißwein Etikett',
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
          servierempfehlung: 'Ein herzhaftes Baguette mit cremigem Camembert ist die perfekte Begleitung zu diesem Roséwein. Der milde Käse und das fruchtige Aroma verschmelzen zu einem genussvollen Erlebnis am Rheinufer.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rose-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rose-l.png'),
          weinBildAlt: 'Weinflasche Roséwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rose__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rose__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Roséwein Etikett',
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
          beschreibungsText: 'Caprese-Salat mit Mozzarella, Tomaten und frischem Basilikum: Ein Klassiker, der mit unserem Roséwein eine unschlagbare Kombination bildet.',
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
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rose-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rose-l.png'),
          weinBildAlt: 'Weinflasche Roséwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rose__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rose__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Roséwein Etikett',
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
          servierempfehlung: 'Blätterteiggebäck mit Ziegenkäse und Honig: Die süße Note des Honigs und die cremige Konsistenz des Ziegenkäses sind ein Traumpaar für diesen Dornfelder.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein-l.png'),
          weinBildAlt: 'Weinflasche Rotwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
          searchTags: ['Trocken', 'Spätburgunder']
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
          servierempfehlung: 'Garnelenspieße mit Knoblauch und Limette: Die pikante Frische dieser Spezialität passt hervorragend zu diesem Spätburgunder. Ein exquisites Duo für ein unvergessliches Picknick am Rhein.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein-l.png'),
          weinBildAlt: 'Weinflasche Rotwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
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
          servierempfehlung: 'Melonenschiffchen mit Parmaschinken: Die süße Melone und der herzhafte Schinken vereinen sich zu einem erfrischenden Gaumenschmaus. Perfekt für einen sommerlichen Wein-Genuss.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein-l.png'),
          weinBildAlt: 'Weinflasche Rotwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__rotwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__rotwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Rotwein Etikett',
          searchTags: ['Lieblich', 'Anderes']
        },
      ]
    },
    {
      key: 'schaumwein', value: [
        {
          _id: 13,
          name: 'Bechers Frizz',
          geschmack: 'Lieblich',
          rebsorte: 'Riesling',
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
          servierempfehlung: 'Gebackener Ziegenkäse mit Honig und Walnüssen: Die süße Cremigkeit des Käses und die knackigen Nüsse lassen den "Bechers Fritz" in seiner ganzen Vielfalt erstrahlen.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein-l.png'),
          weinBildAlt: 'Weinflasche Schaumwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
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
          servierempfehlung: 'Pesto-Nudelsalat mit getrockneten Tomaten und Pinienkernen: Ein leichter, mediterraner Genuss, der wunderbar mit unserem Wein harmoniert. Verführt eure Sinne an einem sonnigen Tag am Rhein.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein-l.png'),
          weinBildAlt: 'Weinflasche Schaumwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
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
          servierempfehlung: 'Rucola-Salat mit Erdbeeren und Balsamico-Dressing: Die fruchtige Frische dieses Salats ist die perfekte Begleitung zu unserem Wein.',
          weinBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein-s.png'),
          weinBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein-l.png'),
          weinBildAlt: 'Weinflasche Schaumwein',
          ausfuehrlicheBeschreibung: 'Lachs-Crostini mit Zitronencreme: Die frische des Lachses harmoniert wunderbar zu diesem Weißwein',
          weinEttiketBildS: this.getAbsoluteImageUrl('../../../assets/katalog/small/katalog__schaumwein__label-s.png'),
          weinEttiketBildL: this.getAbsoluteImageUrl('../../../assets/katalog/large/katalog__schaumwein__label-l.png'),
          weinEttiketBildAlt: 'Weinflasche Schaumwein Etikett',
          searchTags: ['Trocken', 'Riesling']
        },
      ]
    }
  ];

  //Definieren wie viele Weine pro Geschmack exsistieren
  private geschmackFilters: [string, WeinFilter][] = [
    ['weisswein', { Trocken: 4, Lieblich: 1, Feinherb: 1, Riesling: 2 }],
    ['rotwein', { Trocken: 1, Lieblich: 1, Feinherb: 1 }],
    ['rosewein', { Trocken: 1, Fruchtig: 1 }],
    ['schaumwein', { Trocken: 2, Lieblich: 1 }]
  ];

    //Definieren wie viele Weine pro Rebsorte exsistieren
  private rebsorteFilters: [string, WeinFilter][] = [
    ['weisswein', { Riesling: 2, Burgunder: 4, Rivaner: 1 }],
    ['rotwein', { Burgunder: 1, Dornfelder: 1, Anderes: 1 }],
    ['schaumwein', { Riesling: 2 }]
  ];

  private empfehlungDesHauses: EmpfehlungDesHauses = {
    wein: this.getWineById('rotwein', 12),
    img: this.getAbsoluteImageUrl('../../../assets/landingpage/landingpage__rotwein-teaser.png'),
    alt: 'Weinflasche Rotwein',
    kategorie: 'rotwein',
    text: 'Rotwein ist ein beliebter Wein, der aus dunklen Trauben hergestellt wird. Er zeichnet sich durch seine tiefrote Farbe, seinen vollmundigen Geschmack und seine vielfältigen Aromen von Beeren, Gewürzen und manchmal auch Schokolade aus. Rotwein wird oft zu herzhaften Speisen wie Fleisch und Käse serviert und kann je nach Sorte trocken, halbtrocken oder lieblich sein. Er wird weltweit angebaut und ist bekannt für seine gesundheitsfördernden Eigenschaften aufgrund seines hohen Gehalts an Antioxidantien.'
  }

  private eventTeaser: Event = {
    alt: 'Event des Weingutes',
    text: 'Roséwein ist ein beliebter Wein, der aus dunklen Trauben hergestellt wird.',
    img: this.getAbsoluteImageUrl('../../../assets/weinglas.png'),
    link: 'https://www.buhrmannbecher.de/aktuelles/'
  };

  constructor(private location: Location) { }

  /**
 * Konvertiert einen relativen Bildpfad in eine absolute URL mithilfe des Angular Location-Dienstes.
 * Dadurch wird sichergestellt, dass der Bildpfad unabhängig von der URL oder der Bereitstellungsumgebung der Anwendung korrekt aufgelöst wird.
 * 
 * @param relativePath Der relative Pfad des Bildes.
 * @returns Die absolute URL des Bildes.
 */
  private getAbsoluteImageUrl(relativePath: string): String {
    return this.location.prepareExternalUrl(relativePath);
  }

  getWines() {
    return this.wineData;
  }

  getEmpfehlungDesHauses() {
    return this.empfehlungDesHauses;
  }

  getEventTeaser() {
    return this.eventTeaser;
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
      return weinValue;
    }
    return;
  }

  /**
  * Gibt die Anzahl der Weine einer Kategorie  pro Geschmacks Filter zurück
  * 
  * @param kategorie - Die Kategorie des Geschmacks, für den der Weinfilter abgerufen werden soll.
  * @returns Der Weinfilter für den angegebenen Geschmack oder 'undefined', wenn nicht gefunden.
  */
  getGeschmackByNumber(kategorie: string): WeinFilter | undefined {
    const weinFilter = this.geschmackFilters.find(filter => filter[0] === kategorie);
    return weinFilter ? weinFilter[1] : undefined;
  }

  /**
  * Gibt die Anzahl der Weine einer Kategorie  pro Rebsorten Filter zurück
  * 
  * @param kategorie - Die Kategorie des Geschmacks, für den der Weinfilter abgerufen werden soll.
  * @returns Der Weinfilter für den angegebenen Geschmack oder 'undefined', wenn nicht gefunden.
  */
  getRebsorteByNumber(kategorie: string): WeinFilter | undefined {
    const weinFilter = this.rebsorteFilters.find(filter => filter[0] === kategorie);
    return weinFilter ? weinFilter[1] : undefined;
  }
}