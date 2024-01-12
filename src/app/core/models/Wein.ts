export interface Wein {
    _id: number;
    name: string;
    geschmack: string;
    rebsorte?: string;
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
    lagerfaehigkeit: string;
    allergieHinweis: string;
    inventar: number;
    servierempfehlung: string;
    weinBildString?: String;
    weinBildAlt: String;
    weinEttiketBildString:String;
    weinEttiketBildAlt: String;
    servierBildString?: String;
    searchTags: string[];
  }

  
export interface WeinWrapper {
  key: string;
  value: Wein[];
}

export interface WeinFilter{
  Trocken?: number ,
  Fruchtig?: number,
  Lieblich?: number,
  Feinherb?: number,
  Riesling?: number,
  Burgunder?: number,
  Rivaner?: number,
  Dornfelder?: number,
  MuellerThurgau?: number,
  [key: string]: number | undefined;
}