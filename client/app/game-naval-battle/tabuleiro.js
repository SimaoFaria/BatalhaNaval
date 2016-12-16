"use strict";
var navio_1 = require("./navio");
var celula_1 = require("./celula");
var navio_2 = require("./navio");
var posicao_1 = require("./posicao");
var Tabuleiro = (function () {
    function Tabuleiro() {
        var _this = this;
        this.currentValues = {};
        this.nrPortaAvioes = 0;
        this.couracado = 0;
        this.cruzadores = 0;
        this.contratorpedeiros = 0;
        this.submarinos = 0;
        this.currentValues["PortaAvioes"] = 0;
        this.currentValues["Couracado"] = 0;
        this.currentValues["Cruzador"] = 0;
        this.currentValues["ContraTorpedeiro"] = 0;
        this.currentValues["Submarino"] = 0;
        this.celulas = [];
        this.posicoesOcupadas = [];
        this.navios = [];
        Tabuleiro.todasLinhas().forEach(function (letra) {
            Tabuleiro.todasColunas().forEach(function (coluna) {
                var c = new celula_1.Celula(letra, coluna);
                _this.celulas.push(c);
            });
        });
    }
    // Devolve a célula que está na posição linha, coluna
    Tabuleiro.prototype.getCelula = function (linha, coluna) {
        var posicao = new posicao_1.Posicao(linha, coluna);
        return this.celulas[posicao.linhaIndex() * 10 + posicao.colunaIndex()];
    };
    Tabuleiro.prototype.getMaxShipsPerTypeByType = function (type) {
        var max = null;
        switch (type) {
            case navio_2.TipoNavio.PortaAvioes:
                max = Tabuleiro._G_MAXPORTAAVIOES;
                break;
            case navio_2.TipoNavio.Couracado:
                max = Tabuleiro._G_MAXCOURACADO;
                break;
            case navio_2.TipoNavio.Cruzador:
                max = Tabuleiro._G_MAXCRUZADORES;
                break;
            case navio_2.TipoNavio.ContraTorpedeiro:
                max = Tabuleiro._G_MAXCONTRATORPEDEIRO;
                break;
            case navio_2.TipoNavio.Submarino:
                max = Tabuleiro._G_MAXSUBMARINOS;
                break;
        }
        return max;
    };
    Tabuleiro.prototype.adicionaNavio = function (tipo, orientacao, linha, coluna) {
        var _this = this;
        try {
            if (this.currentValues[navio_1.Navio.type_toString(tipo)] + 1 > this.getMaxShipsPerTypeByType(tipo)) {
                throw new Error('Numero maximo de barcos dos tipo ' + navio_1.Navio.type_toString(tipo) + " é " + this.getMaxShipsPerTypeByType(tipo));
            }
            this.currentValues[navio_1.Navio.type_toString(tipo)]++;
            // console.log("Mais um barco =======================================================>" + tipo + " current number: " + this.getMaxShipsPerTypeByType(tipo));
            var navio_3 = new navio_1.Navio(tipo, orientacao, linha, coluna);
            if (posicao_1.Posicao.conflito(navio_3.posicoesOcupadas, this.posicoesOcupadas)) {
                throw new Error('O navio "' + tipo + '" na posição (' + linha + coluna + ') e orientação "' + orientacao + '" está em sobreposição ou encostado a um navio já existente');
            }
            navio_3.posicoesOcupadas.forEach(function (p) {
                navio_3.addCelula(_this.getCelula(p.linha, p.coluna));
            });
            this.posicoesOcupadas = posicao_1.Posicao.merge(this.posicoesOcupadas, navio_3.posicoesVizinhas);
            this.navios.push(navio_3);
            return navio_3;
        }
        catch (e) {
            // Alterar para fazer tratamento de erros
            throw e;
        }
    };
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
    Tabuleiro.prototype.celulasMatrix = function () {
        var _this = this;
        var c = [];
        Tabuleiro.todasLinhas().forEach(function (linha) {
            var l = [];
            Tabuleiro.todasColunas().forEach(function (coluna) {
                l.push(_this.getCelula(linha, coluna));
            });
            c.push(l);
        });
        return c;
    };
    // ------------------------------------------------------------------------------------------------
    // Métodos estátios auxiliares
    // ------------------------------------------------------------------------------------------------
    Tabuleiro.todasLinhas = function () {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    };
    Tabuleiro.todasColunas = function () {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    };
    Tabuleiro.prototype.isConfigDone = function () {
        if (this.currentValues['PortaAvioes'] == Tabuleiro._G_MAXPORTAAVIOES &&
            this.currentValues['Couracado'] == Tabuleiro._G_MAXCOURACADO &&
            this.currentValues['Cruzador'] == Tabuleiro._G_MAXCRUZADORES &&
            this.currentValues['ContraTorpedeiro'] == Tabuleiro._G_MAXCONTRATORPEDEIRO &&
            this.currentValues['Submarino'] == Tabuleiro._G_MAXSUBMARINOS) {
            return true;
        }
        return false;
    };
    // ------------------------------------------------------------------------------------------------
    // Interface Publica da classe - Membros Principais
    // ------------------------------------------------------------------------------------------------
    //TODO so ativar o ready quanto dtodos os barcos postos (3/4)   (4/4)???
    Tabuleiro._G_MAXPORTAAVIOES = 1;
    Tabuleiro._G_MAXCOURACADO = 1;
    Tabuleiro._G_MAXCRUZADORES = 2;
    Tabuleiro._G_MAXCONTRATORPEDEIRO = 3;
    Tabuleiro._G_MAXSUBMARINOS = 4;
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;
//# sourceMappingURL=tabuleiro.js.map