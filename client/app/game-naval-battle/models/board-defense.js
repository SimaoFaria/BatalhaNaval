"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tabuleiro_1 = require('./../tabuleiro');
var navio_1 = require("../navio");
var celula_1 = require("../celula");
var BoardDefense = (function (_super) {
    __extends(BoardDefense, _super);
    function BoardDefense() {
        _super.call(this);
    }
    BoardDefense.prototype.adicionaNavioToDefenseBoard = function (tipo, posicoes) {
        var _this = this;
        try {
            var navio_2 = new navio_1.Navio(tipo, navio_1.Orientacao.Roda90, 'F', 5);
            navio_2.posicoesOcupadas = posicoes;
            this.posicoesOcupadas = navio_2.calculaPosicoesOcupadas(); //TODO voltar a private
            navio_2.preenchePosicoesVizinhas(); //TODO voltar a provate
            this.navios.push(navio_2);
            posicoes.forEach(function (position) {
                _this.getCelula(position.linha, position.coluna).pertenceA = navio_2;
                _this.getCelula(position.linha, position.coluna).tipo = celula_1.TipoCelula.Navio;
            });
        }
        catch (e) {
            throw e;
        }
    };
    return BoardDefense;
}(tabuleiro_1.Tabuleiro));
exports.BoardDefense = BoardDefense;
//# sourceMappingURL=board-defense.js.map