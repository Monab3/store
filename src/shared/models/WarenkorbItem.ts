import { Wein } from '../models/Wein';

export interface WarenkorbItem {
    wein: Wein;
    produktAnzahl: number;
}