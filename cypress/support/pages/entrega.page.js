import BasePage from "./base.page";

class EntregaPage extends BasePage {
    botao = {
        adicionarEndereco: () => { return cy.get(".new-address-popup-action").find("button") },
        salvarEndereco: () => { return cy.get(".action-save-address").find(":visible") },
        voltar: () => { return cy.contains("Voltar para o Carrinho") },
        pagar: () => { return cy.contains("Ir para o pagamento") }
    }

    formulario = {
        endereco: {
            nome: () => { return cy.get("[name='firstname']") },
            sobrenome: () => { return cy.get("[name='lastname']") },
            CEP: () => { return cy.get("[name='postcode']") },
            numero: () => { return cy.get("[name='street[1]']") },
            telefone: () => { return cy.get("[name='telephone']") },
            complemento: () => { return cy.get("[name='street[3]']") } 
        }
    }

    label = {
        titulo: () => { return cy.get(".step-title") }
    }

    icon = {
        enderecoSelecionado: () => { return cy.get(".icon-ic_success") }
    }

    paginaCarregada() {
        this.botao.adicionarEndereco();
        this.botao.voltar();
        this.botao.pagar();
        this.label.titulo();

    }
}

module.exports = EntregaPage;