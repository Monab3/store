import { Bewertung } from "./Bewertung";

export interface BewertungWrapper {
    averageRating: number;
    bewertungen: Bewertung[];
  }