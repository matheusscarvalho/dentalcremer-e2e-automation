import BasePage from "./base.page";

class PagamentoPage extends BasePage{
    botao = {
        pagarComBoleto: () => {return cy.contains('Boleto à vista')},
        pagarComCartao: () => {return cy.contains('Boleto Parcelado')},
        pagarComBoletoParcelado: () => {return cy.contains('Cartão de Crédito')},
        finalizarCompra: () => {return cy.get('.cta')}
    }

    formulario = {
        cartao: {
            numero: () => {return cy.get('[name="payment[cc_number]"]')},
            titular: () => {return cy.get('[name="payment[cc_owner]"]')},
            validade: () => {return cy.get('[name="payment[cc_exp_date]"]')},
            CVV: () => {return cy.get('[name="payment[cc_cid]"]')},
            nParcelas:() => {return cy.get('[name="payment[installments]"]').eq(1)}
        }
    }
}

module.exports = PagamentoPage;