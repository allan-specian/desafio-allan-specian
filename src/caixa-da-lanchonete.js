class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        // OUTRAS REGRAS: "Não há itens no carrinho de compra!"
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }

        const cardapio = [
            {codigo: "cafe", descricao: "Café", valor: 3.00},
            {codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50},
            {codigo: "suco", descricao: "Suco Natural", valor: 6.20},
            {codigo: "sanduiche", descricao: "Sanduíche", valor: 6.50},
            {codigo: "queijo",	descricao: "Queijo (extra do Sanduíche)",	valor: 2.00},
            {codigo: "salgado",	descricao: "Salgado", valor: 7.25},
            {codigo: "combo1",	descricao: "1 Suco e 1 Sanduíche",	valor: 9.50},
            {codigo: "combo2",	descricao: "1 Café e 1 Sanduíche",	valor: 7.50},
        ];
        // const formaDePagamento = ['dinheiro', 'credito', 'debito'];


        let total = 0;
        for (const iten of itens) {
            const [codigo, quantidade] = iten.split(',');
            const itemDoCardapio = cardapio.find(item => item.codigo === codigo);
            if (!itemDoCardapio) {
                // OUTRAS REGRAS: "Item inválido!"
                return "Item inválido!";
            }
            if (quantidade < 1) {
                // OUTRAS REGRAS: "QUANTIDADE INVÁLIDA!"
                // NO CASO DE USO, ESTA DEFINIDO PARA QUANTIDADE == 0, PORÉM, NÃO FAZ SENTIDO PARA CASOS NEGATIVOS
                return "Quantidade inválida!";
            }

            total += itemDoCardapio.valor * quantidade;
        }
        if (metodoDePagamento === 'credito') {
            total = total * 1.03;
        }else if (metodoDePagamento === 'dinheiro') {
            total = total * 0.95
        }else if (metodoDePagamento !== 'debito') {
            // OUTRAS REGRAS: "Forma de pagamento inválida!"
            return "Forma de pagamento inválida!";
        }


        return "R$ " + total.toFixed(2).replace('.', ',');
    }

}

export { CaixaDaLanchonete };
// recebe um valor assim:
// new CaixaDaLanchonete()
//   .calcularValorDaCompra('debito', ['cafe,1','chantily,1']);