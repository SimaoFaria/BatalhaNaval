import { Tabuleiro } from './../tabuleiro';
import {Posicao} from "../posicao";
import {Orientacao, TipoNavio, Navio} from "../navio";
import { TipoCelula} from "../celula";

export class BoardDefense extends Tabuleiro{

    constructor() {
        super();
    }

    public adicionaNavioToDefenseBoard(tipo: TipoNavio, posicoes: Posicao[]): void{
        try {

            let navio: Navio = new Navio(tipo, Orientacao.Roda90, 'F', 5);
            navio.posicoesOcupadas = posicoes;
            this.posicoesOcupadas = navio.calculaPosicoesOcupadas(); //TODO voltar a private
            navio.preenchePosicoesVizinhas(); //TODO voltar a provate

            this.navios.push(navio);

            posicoes.forEach((position) => {
                this.getCelula(position.linha, position.coluna).pertenceA = navio;
                this.getCelula(position.linha, position.coluna).tipo = TipoCelula.Navio;

            });

        }
        catch (e){
            throw e;
        }
    }
}