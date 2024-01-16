import { Injectable } from '@angular/core';
import { Bewertung } from '../models/Bewertung';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BewertungWrapper } from '../models/Bewertung';


@Injectable({ providedIn: "root" })
export class bewertungService {

  private bewertungenByWine: { [wineId: number]: BehaviorSubject<BewertungWrapper> } = {
    1: new BehaviorSubject<BewertungWrapper>({
      averageRating: 4,
      bewertungen: [
        {
          _id: 1,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Thomas',
          email: 'maxmustermann1@gmx.de',
          datum: new Date('2020-11-01'),
          sterne: 2,
          text: 'Der Wein war sehr lecker und ich kann ihn nur weiter empfehlen.'
        },
        {
          _id: 2,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Müller',
          email: 'maxmustermann2@gmx.de',
          datum: new Date('2022-12-01'),
          sterne: 4,
          text: 'Mein absoluter lieblings Wein. Ich trinke in sogar lieber als Wasser.'
        },
        {
          _id: 3,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Becker',
          email: 'maxmustermann3@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Jedes Jahr kaufe ich mir 5 Kisten von diesem Wein und jedes Jahr verliebe ich mich aufs neue in ihn.'
        },
        {
          _id: 4,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Bieber',
          email: 'maxmustermann4@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Dieser Wein hat mich umgehauen! Die fruchtigen Noten sind intensiv, und die Tannine sind perfekt eingebunden. Ein absolutes Highlight.'
        }
      ],
    }),
    8: new BehaviorSubject<BewertungWrapper>({
      averageRating: 4,
      bewertungen: [
        {
          _id: 5,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Thomas',
          email: 'maxmustermann1@gmx.de',
          datum: new Date('2020-11-01'),
          sterne: 2,
          text: 'Der Wein war sehr lecker und ich kann ihn nur weiter empfehlen.'
        },
        {
          _id: 6,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Müller',
          email: 'maxmustermann2@gmx.de',
          datum: new Date('2022-12-01'),
          sterne: 4,
          text: 'Mein absoluter lieblings Wein. Ich trinke in sogar lieber als Wasser.'
        },
        {
          _id: 7,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Becker',
          email: 'maxmustermann3@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Jedes Jahr kaufe ich mir 5 Kisten von diesem Wein und jedes Jahr verliebe ich mich aufs neue in ihn.'
        },
        {
          _id: 8,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Bieber',
          email: 'maxmustermann4@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Dieser Wein hat mich umgehauen! Die fruchtigen Noten sind intensiv, und die Tannine sind perfekt eingebunden. Ein absolutes Highlight.'
        }
      ],
    }),
    10: new BehaviorSubject<BewertungWrapper>({
      averageRating: 3,
      bewertungen: [
        {
          _id: 9,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Thomas',
          email: 'maxmustermann1@gmx.de',
          datum: new Date('2020-11-01'),
          sterne: 2,
          text: 'Der Wein war sehr lecker und ich kann ihn nur weiter empfehlen.'
        },
        {
          _id: 10,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Müller',
          email: 'maxmustermann2@gmx.de',
          datum: new Date('2022-12-01'),
          sterne: 4,
          text: 'Mein absoluter lieblings Wein. Ich trinke in sogar lieber als Wasser.'
        }
      ],
    }),

    12: new BehaviorSubject<BewertungWrapper>({
      averageRating: 4,
      bewertungen: [
        {
          _id: 5,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Thomas',
          email: 'maxmustermann1@gmx.de',
          datum: new Date('2020-11-01'),
          sterne: 2,
          text: 'Der Wein war sehr lecker und ich kann ihn nur weiter empfehlen.'
        },
        {
          _id: 6,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Müller',
          email: 'maxmustermann2@gmx.de',
          datum: new Date('2022-12-01'),
          sterne: 4,
          text: 'Mein absoluter lieblings Wein. Ich trinke in sogar lieber als Wasser.'
        },
        {
          _id: 7,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Becker',
          email: 'maxmustermann3@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Jedes Jahr kaufe ich mir 5 Kisten von diesem Wein und jedes Jahr verliebe ich mich aufs neue in ihn.'
        },
        {
          _id: 8,
          idWein: 1,
          vorname: 'S.',
          nachname: 'Bieber',
          email: 'maxmustermann4@gmx.de',
          datum: new Date('2023-01-03'),
          sterne: 5,
          text: 'Dieser Wein hat mich umgehauen! Die fruchtigen Noten sind intensiv, und die Tannine sind perfekt eingebunden. Ein absolutes Highlight.'
        }
      ],
    }),

  };

  /**
  * Initialisiert das Behavior Subject für einen bestimmten Wein mit einer leeren Bewertungsliste. Diese Methode wird aufgerufen, 
  * falls es zu einem Wein noch keine Bewertung gibt.
  *
  * @param wineId - Die eindeutige ID des Weins.
  */
  private initWineBehaviorSubject(wineId: number): void {
    const bewertungen: Bewertung[] = [];
    const averageRating = this.calculateAverageRating(bewertungen);
    this.bewertungenByWine[wineId] = new BehaviorSubject<BewertungWrapper>({
      averageRating,
      bewertungen,
    });
  }

  /**
  * Modifiziert den Namen des Benutzer. Nur der erste Buchstabe des Vornamens wird gespeichert. Wenn kein Nachname hinterlassen wurde, wird der Name auf "Anonym" gesetzt.
  *
  * @param name - Der zu modifizierende Name.
  * @param surname - Gibt an, ob es sich um einen Nachnamen handelt.
  * @returns Der modifizierte Name.
  */
  private modifyName(name: string | undefined, surname: boolean): string {
    if (!name && surname) return 'Anonym'
    if (name) {
      if (!surname) return name.charAt(0).toUpperCase() + '.';
      if (surname) return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return '';
  }

  /**
  * Berechnet den Durchschnittswert der Sterne in einer Bewertungsliste.
  *
  * @param bewertungen - Die Liste der Bewertungen.
  * @returns Der berechnete Durchschnittswert.
  */
  private calculateAverageRating(bewertungen: Bewertung[]): number {
    if (bewertungen.length === 0) {
      return 0;
    }
    const totalRating = bewertungen.reduce((sum, bewertung) => sum + bewertung.sterne, 0);
    return Math.round(totalRating / bewertungen.length);
  }
 
  /**
  * Gibt das Observable für den Bewertungswrapper eines Weins zurück. Initialisiert es, falls es noch nicht existiert.
  *
  * @param wineId - Die eindeutige ID des Weins.
  * @returns Das Observable für den Bewertungswrapper des Weins.
  */
  getBewertungWrapperForWine(wineId: number): Observable<BewertungWrapper> {
    if (!this.bewertungenByWine[wineId]) {
      this.initWineBehaviorSubject(wineId);
    }
    return this.bewertungenByWine[wineId].asObservable();
  }

  /**
  * Fügt eine Bewertung für einen Wein hinzu und aktualisiert das entsprechende Behavior Subject.
  *
  * @param wineId - Die eindeutige ID des Weins.
  * @param bewertung - Die hinzuzufügende Bewertung.
  */
  addBewertungForWine(wineId: any, bewertung: Bewertung): void {
    if (!this.bewertungenByWine[wineId]) {
      this.initWineBehaviorSubject(wineId);
    }
    bewertung.vorname = this.modifyName(bewertung.vorname, false);
    bewertung.nachname = this.modifyName(bewertung.nachname, true);
    const bewertungen = [...(this.bewertungenByWine[wineId].value.bewertungen), bewertung];
    const averageRating = this.calculateAverageRating(bewertungen);
    this.bewertungenByWine[wineId].next({
      averageRating,
      bewertungen,
    });
  }
}