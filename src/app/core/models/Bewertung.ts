export interface Bewertung {
    _id: number;
    idWein: number;
    vorname?: string;
    nachname?: string;
    email: string;
    datum: Date;
    sterne: number;
    text: string;
  }