import { Tabuleiro } from './../tabuleiro';
import {Posicao} from "../posicao";
import {Orientacao, TipoNavio, Navio} from "../navio";
import {Celula, TipoCelula} from "../celula";

export class BoardDefense extends Tabuleiro{

    //private ships: Navio[];

    constructor() {
        super();
    }

    public adicionaNavioToDefenseBoard(tipo: TipoNavio, posicoes: Posicao[]): void{
        try {

            console.log("adicionaNavioToDefenseBoard");

            //public constructor (tipo: TipoNavio, orientacao: Orientacao, linha: string, coluna: number){
            let navio: Navio = new Navio(tipo, Orientacao.Roda180, 'F', 5);
            navio.posicoesOcupadas = posicoes;
            this.posicoesOcupadas = navio.calculaPosicoesOcupadas(); //TODO voltar a private
            navio.preenchePosicoesVizinhas(); //TODO voltar a provate

            this.navios.push(navio);

            posicoes.forEach((position) => {
                this.getCelula(position.linha, position.coluna).pertenceA = navio;
                this.getCelula(position.linha, position.coluna).tipo = TipoCelula.Navio;

            })



            /*let navio: Navio = new Navio(tipo, posicoes);
            this.adicionaNavio(navio);*/
        }
        catch (e){
            // Alterar para fazer tratamento de erros
            throw e;
        }
    }


    // addShip(posicoes : Posicao[]) : void {
    //
    //
    // }
    //
    // //tranformaçao
    // loadTabuleiro() : void {
    //
    // }

}