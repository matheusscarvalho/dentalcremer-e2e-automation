import BasePage from "./base.page";

class ProdutoPage extends BasePage{
    botao = {
        adicionarCarrinho: () => {return cy.contains('Adicionar ao Carrinho')},
        aumentarQuantidade: () => {return cy.xpath(`//input[@id='qty']//following-sibling::button`)},
        diminuirQuantidade: () => {return cy.xpath(`//input[@id='qty']//previous-sibling::button`)},
    }
}

module.exports = ProdutoPage;