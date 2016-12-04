import {Navio} from "./navio";
import {Celula} from "./celula";
import {TipoNavio} from "./navio";
import {Orientacao} from "./navio";
import {Posicao} from "./posicao";

export class Tabuleiro {
    // ------------------------------------------------------------------------------------------------
    // Interface Publica da classe - Membros Principais
    // ------------------------------------------------------------------------------------------------


    //TODO so ativar o ready quanto dtodos os barcos postos (3/4)   (4/4)???

    private static _G_MAXPORTAAVIOES : number = 1;
    private static _G_MAXCOURACADO : number = 1;
    private static _G_MAXCRUZADORES : number = 2;
    private static _G_MAXCONTRATORPEDEIRO : number = 3;
    private static _G_MAXSUBMARINOS : number = 4;

    private nrPortaAvioes : number;
    private couracado : number;
    private cruzadores: number;
    private contratorpedeiros : number;
    private submarinos : number;

    private currentValues= {};


    //Propriedade com todos as navios do tabuleiro
    public navios: Navio[];

    //Propriedade com todas as celulas do tabuleiro
    public celulas: Celula[];

    //Propriedade com todas as posições já ocupadas (incluindo a vizinhança dos navios)
    public posicoesOcupadas: Posicao[];

    constructor (){

        this.nrPortaAvioes = 0;
        this.couracado  = 0;
        this.cruzadores = 0;
        this.contratorpedeiros = 0;
        this.submarinos  = 0;

        this.currentValues["PortaAvioes"] = 0;
        this.currentValues["Couracado"] = 0;
        this.currentValues["Cruzador"] = 0;
        this.currentValues["ContraTorpedeiro"] = 0;
        this.currentValues["Submarino"] = 0;

        this.celulas = [];
        this.posicoesOcupadas = [];
        this.navios= [];

        Tabuleiro.todasLinhas().forEach(letra=> {
            Tabuleiro.todasColunas().forEach(coluna =>{
                let c: Celula = new Celula(letra, coluna);
                this.celulas.push(c);
            });
        });
    }

    // Devolve a célula que está na posição linha, coluna
    public getCelula(linha: string, coluna: number): Celula{
        let posicao: Posicao = new Posicao(linha, coluna);
        return this.celulas[posicao.linhaIndex() * 10 + posicao.colunaIndex()];
    }

    private getMaxShipsPerTypeByType(type : TipoNavio) : number {

        let max : number = null;

        switch (type) {
            case TipoNavio.PortaAvioes:
                max =  Tabuleiro._G_MAXPORTAAVIOES;
                break;
            case TipoNavio.Couracado:
                max =  Tabuleiro._G_MAXCOURACADO;
                break;
            case TipoNavio.Cruzador:
                max =  Tabuleiro._G_MAXCRUZADORES;
                break;
            case TipoNavio.ContraTorpedeiro:
                max =  Tabuleiro._G_MAXCONTRATORPEDEIRO;
                break;
            case TipoNavio.Submarino:
                max = Tabuleiro._G_MAXSUBMARINOS;
                break;
        }

        return max;
    }

    public adicionaNavio(tipo: TipoNavio, orientacao: Orientacao, linha: string, coluna: number): Navio{
        try {

            if(this.currentValues[Navio.type_toString(tipo)]+1 > this.getMaxShipsPerTypeByType(tipo)) {
                throw new Error('Numero maximo de barcos dos tipo '+ Navio.type_toString(tipo) + " é " + this.getMaxShipsPerTypeByType(tipo));
            }
            this.currentValues[Navio.type_toString(tipo)]++;
            console.log("Mais um barco =======================================================>" + tipo + " current number: " + this.getMaxShipsPerTypeByType(tipo));


            let navio: Navio = new Navio(tipo, orientacao, linha, coluna);
            if (Posicao.conflito(navio.posicoesOcupadas, this.posicoesOcupadas)){
                throw new Error('O navio "' + tipo + '" na posição (' + linha + coluna + ') e orientação "' + orientacao + '" está em sobreposição ou encostado a um navio já existente')
            }
            navio.posicoesOcupadas.forEach(p => {
                navio.addCelula(this.getCelula(p.linha, p.coluna));
            });
            this.posicoesOcupadas = Posicao.merge(this.posicoesOcupadas, navio.posicoesVizinhas);
            this.navios.push(navio);
            return navio;
        } 
        catch (e){
            // Alterar para fazer tratamento de erros
            throw e;
        }
    }


    /**
     *
     * **/
    // public adicionaNavio(navio : Navio): Navio{
    //     try {
    //         this.navios.push(navio);
    //         return navio;
    //     }
    //     catch (e){
    //         // Alterar para fazer tratamento de erros
    //         throw e;
    //     }
    // }



    // Devolve as células na forma de matriz - usar só para testes (performance inferior à propriedade celulas)
    public celulasMatrix(): Celula[][] {
        let c: Celula[][] = [];    
        Tabuleiro.todasLinhas().forEach(linha =>{
            let l: Celula[] = [];
            Tabuleiro.todasColunas().forEach(coluna =>{
                l.push(this.getCelula(linha, coluna))
            });
            c.push(l);
        });
        return c;
    }


    // ------------------------------------------------------------------------------------------------
    // Métodos estátios auxiliares
    // ------------------------------------------------------------------------------------------------

    public static todasLinhas(): string[]{
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    }  

    public static todasColunas(): number[]{
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }





    public isConfigDone() : boolean{

        if(
            this.currentValues['PortaAvioes'] == Tabuleiro._G_MAXPORTAAVIOES &&
            this.currentValues['Couracado'] == Tabuleiro._G_MAXCOURACADO &&
            this.currentValues['Cruzador'] == Tabuleiro._G_MAXCRUZADORES &&
            this.currentValues['ContraTorpedeiro'] == Tabuleiro._G_MAXCONTRATORPEDEIRO &&
            this.currentValues['Submarino'] == Tabuleiro._G_MAXSUBMARINOS

        ) {

            return true;
        }

        return false;
    }
}