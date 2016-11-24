import { Historical } from '../historical/historical';

import { Player } from '../models/player';
import { Login } from '../models/login';

let loginP1: Login = {
  username: 'bananas underground',
  password: 'banasnas 32'
};

/*let p1: Player = {
    login : loginP1,
    name: 'Tonny do rock'
};

let loginP2: Login = {
  username: 'la fiesta',
  password: 'banasnas 32'
};

let p2: Player = {
    login : loginP2,
    name: 'elvis'
};*/

//para cada jogador deverá ser possivel saber a sua classificação e pontuaçao
export const HISTORICALS: Historical[] = [

    /*{
        game : {
            inProgress: false,
            createdBy: 'Tonny do rock', 
            hasFinnish: true, 
            startDate: '21-21-2121',
            endDate: '21-21-2221',
            winner: 'Travolta',
            players: [p1, p2],
            classification: ['12', '23'],
            points: [50, 100]
         }
    },
    {
        game : {
            inProgress: false,
            createdBy: 'elvis', 
            hasFinnish: false, 
            startDate: '23-23-2121',
            endDate: '30-21-2121',
            winner: 'Travolta',
            players: [p1, p2],
            classification: ['1', '2'],
            points: [200, 250]
        }
    }*/


    /*{
        createdBy: 'Tonny do rock', 
        hasFinnish: true, 
        startDate: '21-21-2121',
        endDate: '21-21-2221',
        winner: 'Travolta',
        players: [p1, p2],
        classification: ['12', '23'],
        points: [50, 100]
    },
    {
        createdBy: 'elvis', 
        hasFinnish: false, 
        startDate: '23-23-2121',
        endDate: '30-21-2121',
        winner: 'Travolta',
        players: [p1, p2],
        classification: ['1', '2'],
        points: [200, 250]
    }*/
];