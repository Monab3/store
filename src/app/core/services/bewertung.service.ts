import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bewertung } from '../models/Bewertung';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BewertungWrapper } from '../models/Bewertung';


@Injectable({ providedIn: "root" })
export class bewertungService {

  constructor(private http: HttpClient) {
  }

  private bewertungenByWine: { [wineId: number]: BehaviorSubject<BewertungWrapper> } = {
    1: new BehaviorSubject<BewertungWrapper>({
      averageRating: 4,
      bewertungen: [
        {
          _id: 1,
          idWein: 1,
          vorname: 'S.',
          nachname: 'second',
          email: 'john.doe@example.com',
          datum: new Date('2020-11-01'), // Replace with a valid date
          sterne: 2,
          text: 'This is a sample review text. I love the wein.This is a sample review text. I love the wein.This is a sample review text. I love the wein.'
        },
        {
          _id: 1,
          idWein: 1,
          vorname: 'S.',
          nachname: 'third',
          email: 'john.doe@example.com',
          datum: new Date('2022-12-01'), // Replace with a valid date
          sterne: 4,
          text: 'This is a sample review text. I love the wein.This is a sample review text. I love the wein.This is a sample review text. I love the wein.'
        },
        {
          _id: 1,
          idWein: 1,
          vorname: 'S.',
          nachname: 'third',
          email: 'john.doe@example.com',
          datum: new Date('2023-01-03'), // Replace with a valid date
          sterne: 5,
          text: 'This is a sample review text. I love the wein.This is a sample review text. I love the wein.This is a sample review text. I love the wein.'
        },
        {
          _id: 1,
          idWein: 1,
          vorname: 'S.',
          nachname: 'third',
          email: 'john.doe@example.com',
          datum: new Date('2023-01-03'), // Replace with a valid date
          sterne: 5,
          text: 'This is a sample review text. I love the wein.This is a sample review text. I love the wein.This is a sample review text. I love the wein.'
        }
      ],
    }),
  };

  get uniqueWineIds(): number[] {
    return Object.keys(this.bewertungenByWine).map(Number);
  }

  getBewertungWrapperForWine(wineId: number): Observable<BewertungWrapper> {
    if (!this.bewertungenByWine[wineId]) {
      this.initWineBehaviorSubject(wineId);
    }
    return this.bewertungenByWine[wineId].asObservable();
  }

  addBewertungForWine(wineId: any, bewertung: Bewertung): void {
    if (!this.bewertungenByWine[wineId]) {
      this.initWineBehaviorSubject(wineId);
    }

    bewertung.vorname = this.modifyName(bewertung.vorname, false);
    bewertung.nachname = this.modifyName(bewertung.nachname, true);

    console.log(JSON.stringify(bewertung));
    const bewertungen = [...(this.bewertungenByWine[wineId].value.bewertungen), bewertung];
    const averageRating = this.calculateAverageRating(bewertungen);
    this.bewertungenByWine[wineId].next({
      averageRating,
      bewertungen,
    });
  }

  private modifyName(name: string | undefined, surname: boolean): string {

    if (!name && surname) return 'Anonym'
    if (name) {
      if (!surname) return name.charAt(0).toUpperCase() + '.';
      if (surname) return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return '';
  }

  private initWineBehaviorSubject(wineId: number): void {
    const bewertungen: Bewertung[] = []; 
    const averageRating = this.calculateAverageRating(bewertungen);

    this.bewertungenByWine[wineId] = new BehaviorSubject<BewertungWrapper>({
      averageRating,
      bewertungen,
    });
  }

  private calculateAverageRating(bewertungen: Bewertung[]): number {
    if (bewertungen.length === 0) {
      return 0;
    }

    const totalRating = bewertungen.reduce((sum, bewertung) => sum + bewertung.sterne, 0);
    return Math.round(totalRating / bewertungen.length);
  }

}