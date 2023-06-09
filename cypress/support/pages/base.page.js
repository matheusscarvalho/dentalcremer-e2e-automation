class BasePage {
    cabecalho = {
        campo: {
            pesquisa: () => {return cy.get(".header-search-input")}
        },
        botao: {
            pesquisar: () => {return cy.get("[title='Procurar']")},
            carrinho: () => {return cy.get(".icon-ic_shopping-cart")}
        }
    }

    abrir(rota = "/") {
        cy.visit(rota)
    }

    abrirCarrinho() {
        this.cabecalho.botao.carrinho().click({force: true});
        cy.contains("Ir para o carrinho").click({force: true});;
    }
}

module.exports = BasePage;