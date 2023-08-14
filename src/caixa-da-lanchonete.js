class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            {codigo: "cafe", descricao: "Café", valor: 3.00, tipo: "principal"},
            {codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50, tipo: "extra", principal: "cafe"},
            {codigo: "suco", descricao: "Suco Natural", valor: 6.20, tipo: "principal"},
            {codigo: "sanduiche", descricao: "Sanduíche", valor: 6.50, tipo: "principal"},
            {codigo: "queijo",	descricao: "Queijo (extra do Sanduíche)",	valor: 2.00, tipo: "extra", principal: "sanduiche"},
            {codigo: "salgado",	descricao: "Salgado", valor: 7.25, tipo: "principal"},
            {codigo: "combo1",	descricao: "1 Suco e 1 Sanduíche",	valor: 9.50, tipo: "combo"},
            {codigo: "combo2",	descricao: "1 Café e 1 Sanduíche",	valor: 7.50, tipo: "combo"},
        ];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        // OUTRAS REGRAS: "Não há itens no carrinho de compra!"
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }

        // const formaDePagamento = ['dinheiro', 'credito', 'debito'];

        let total = 0;
        for (const iten of itens) {
            const [codigo, quantidade] = iten.split(',');
            const itemDoCardapio = this.cardapio.find(item => item.codigo === codigo);

            // OUTRAS REGRAS: "Item inválido!"
            if (!itemDoCardapio) {
                return "Item inválido!";
            }

            // OUTRAS REGRAS: "QUANTIDADE INVÁLIDA!"
            // NO CASO DE USO, ESTA DEFINIDO PARA QUANTIDADE == 0, PORÉM, TAMBÉM NÃO FAZ SENTIDO PARA CASOS NEGATIVOS
            if (quantidade < 1) {
                return "Quantidade inválida!";
            }

            // OUTRAS REGRAS: "Item extra"
            if (itemDoCardapio.tipo === 'extra') {
                const itemPrincipal = itens.find(item => item.split(',')[0] === itemDoCardapio.principal);
                // const itemPrincipal = itens.find(item => item.codigo === itemDoCardapio.principal);
                if (!itemPrincipal) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            total += itemDoCardapio.valor * quantidade;
        }
        if (metodoDePagamento === 'credito') {
            total = total * 1.03;
        }else if (metodoDePagamento === 'dinheiro') {
            total = total * 0.95;
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