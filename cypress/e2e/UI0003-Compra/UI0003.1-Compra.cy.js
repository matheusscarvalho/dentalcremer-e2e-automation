import { faker } from '@faker-js/faker';

describe('U0003.1 - Compra', ()=>{
    const item = Cypress.env("item");

    it('U0003.1.1 - Finalizar compra', ()=>{
        cy.fazerLogin();
        cy.limparCarrinhoApi();
        cy.pesquisarItem(item.id, item);
        cy.adicionarItemCarrinho(5);
        cy.abrirCarrinho();

        // Valida dados da compra
        // const totalEsperado = "R$1.473,91";
        // const subtotalEsperado = "R$1.519,50";
        // cy.contains(`(Cód. ${item.id})`);
        // cy.validaTotais(subtotalEsperado, totalEsperado);
        
        // Fechar pedido
        cy.fecharPedido();

        //Adicionar endereço
        cy.adicionarEndereco({
            nome: faker.person.firstName(),
            sobrenome: faker.person.lastName(),
            CEP: "87083500",
            numero: faker.number.int(9999),
            telefone: "51999999999",
            complemento: "Casa B"
        });

        cy.fixture("cartao.json").then(cartao => {
            cy.pagarComCartao(cartao, 1);
        });

        // Valida confirmação da compra
        cy.contains("Seu pedido foi recebido e está sendo processado");
        cy.contains("Enviamos para você um e-mail de confirmação do seu pedido com detalhes e informações de rastreamento.");
        cy.contains("Não solicitamos dados de cartões ou quaisquer outros dados por e-mail. Confira os dados do seu boleto antes de efetuar o pagamento.");

    }); 

});