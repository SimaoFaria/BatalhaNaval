
import { Player } from '../models/player';
import { GamingPlayer } from '../models/player';

export class Game {
    status: string;
    createdBy: string;
    aborted: boolean;
    startDate: string;
    endDate: string;
    winner: string;
    players: GamingPlayer[];
    //classification: string[];
    //points: number[];
}