import BasePage from "./base.page";

class CheckoutPage extends BasePage {
    botao = {
        recarregarCarrinho: () => { return cy.get(".reload-cart.action.update") },
        fecharPedido: () => { return cy.get("#proceedToCheckoutBtnCart")}
    }

    aba = {
        comprarAgora: () => { return cy.get(".select-buy-list").contains("Comprar agora") },
        suasListas: () => { return cy.get(".select-buy-list").contains("Suas Listas") }
    }

    label = {
        titulo: () => { return cy.get(".container-title-cart").contains("Carrinho") },
        subtotal: () => { return cy.get(".summary-subtotal")},
        total: () => { return cy.get(".summary-total")}
    }

    icone = {
        etapaCarrinho: () => { return cy.get(".icon-step.icon-ic_shopping-cart") },
        etapaEntrega: () => { return cy.get(".icon-step.icon-ic_truck-delivery-outline") },
        etapaPagamento: () => { return cy.get(".icon-step.icon-ic_credit-card") }

    }

    paginaCarregada() {
        this.botao.recarregarCarrinho();
        this.aba.comprarAgora();
        this.aba.suasListas();
        this.label.titulo();
        this.icone.etapaCarrinho();
        this.icone.etapaEntrega();
        this.icone.etapaPagamento();
    }

    validaSubtotal(subtotalEsperado) {
        this.label.subtotal().contains(subtotalEsperado);
    }

    validaTotal(totalEsperado) {
        this.label.total().contains(totalEsperado);
    }
}

module.exports = CheckoutPage;