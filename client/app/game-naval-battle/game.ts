
import { Player } from '../models/player';

export class Game {
    status: string;
    createdBy: string;
    hasFinnish: boolean;
    startDate: string;
    endDate: string;
    winner: string;
    players: Player[];
    classification: string[];
    points: number[];
}