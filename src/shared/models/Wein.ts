export interface Wein {
    _id: number;
    name: string;
    geschmack: string;
    rebsorte: string;
    preis: number;
    preisProLiter: number;
    herstellungsDatum: Date;
    beschreibungsText: string;
    produktTyp: string;
    fuellmenge: number;
    alkoholgehalt: number;
    restZucker: number;
    gesamtSaeure: number;
    verschlussArt: string;
    trinkTemperatur: number;
    lagerfähigkeit: string;
    allergieHinweis: string;
    iventar: number;
    servierempfehlung: string;
    weinBildString?: string;
    weinEttiketBildString: string;
    servierBildString?: string;
  }