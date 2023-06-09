// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import HomePage from "./pages/home.page";
import ProdutoPage from "./pages/produto.page";
import CheckoutPage from "./pages/checkout.page";
import EntregaPage from "./pages/entrega.page";
import PagamentoPage from "./pages/pagamento.page";

const homePage = new HomePage();
const produtoPage = new ProdutoPage();
const checkoutPage = new CheckoutPage();
const entregaPage = new EntregaPage();
const pagamentoPage = new PagamentoPage();

Cypress.Commands.add("fazerLogin", (usuario = Cypress.env("usuarios").dentista, esparadaFalhaLogin = false) => {
    localStorage.clear();
    sessionStorage.clear();
    homePage.abrir();
    cy.wait('@homeCarregada');
    homePage.botao.entrar().click({ force: true, timeout: 1000 });
    homePage.campo.email().type(usuario.email);
    homePage.campo.senha().type(usuario.senha);
    homePage.botao.login().click({ force: true });

    if (!esparadaFalhaLogin)
        cy.wait('@completeLogin');
});

Cypress.Commands.add("pesquisarItem", (textoPesquisa, item) => {
    homePage.cabecalho.campo.pesquisa().type(textoPesquisa, { force: true });
    homePage.cabecalho.botao.pesquisar().click({ force: true });

    if (item) {
        const textoBuscaNormalizado = textoPesquisa.replace(/[^0-9]/g, '').normalize('NFD');
        cy.contains(`Buscando por: ${textoBuscaNormalizado}`);

        // Acessa a página do item
        cy.xpath(`//span[text() = '${item.name}'][1]//parent::a`).click({ force: true });

        // Valida o título
        cy.xpath(`//span[text() = "${item.name}"]//parent::h1[@class='page-title']`);

        // Valida a descrição
        cy.get("h2").contains(item.description);

        // Valida a URL
        cy.url().then(url => {
            expect(url).contains(item.url);
        });

        // Valida a imgam
        cy.get(`img[src="${item.images.default}"]`);
    }

});

Cypress.Commands.add("adicionarItemCarrinho", (quantidade = 1) => {

    if (quantidade > 1) {
        quantidade = quantidade - 1;

        for (let index = 0; index < quantidade; index++) {
            produtoPage.botao.aumentarQuantidade().click({ force: true });
        }

        produtoPage.botao.adicionarCarrinho().click({ force: true });
        cy.contains("Produto adicionado ao carrinho. Ver carrinho");
    }
});

Cypress.Commands.add("abrirCarrinho", () => {
    homePage.abrirCarrinho();
    checkoutPage.paginaCarregada();
});

Cypress.Commands.add("limparCarrinhoApi", () => {
    const token = localStorage.getItem("customerToken");
    cy.request({
        url: "/rest/V2/carts/mine/?origin=SITE",
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(response => {
        expect(response.body, "Cart successfully cleaned");
    });

    cy.reload();
    cy.wait('@homeCarregada');
});


Cypress.Commands.add("validaTotais", (subtotal, total) => {
   checkoutPage.validaSubtotal(subtotal);
   checkoutPage.validaTotal(total);
});

Cypress.Commands.add("fecharPedido", () => {
    checkoutPage.botao.fecharPedido().click({force: true});
 });

 Cypress.Commands.add("adicionarEndereco", (endereco) => {
    entregaPage.paginaCarregada();
    entregaPage.botao.adicionarEndereco().click({force: true});
    entregaPage.formulario.endereco.nome().type(endereco.nome);
    entregaPage.formulario.endereco.sobrenome().type(endereco.sobrenome);
    entregaPage.formulario.endereco.CEP().type(endereco.CEP);
    entregaPage.formulario.endereco.numero().type(endereco.numero);
    entregaPage.formulario.endereco.telefone().type(endereco.telefone);
    entregaPage.formulario.endereco.complemento().type(endereco.complemento);
    entregaPage.botao.salvarEndereco().click({force: true});
    cy.wait('@atualizaEndereco');
    cy.wait(3000);
    entregaPage.icon.enderecoSelecionado().click({force: true});
    entregaPage.botao.pagar().click({force: true});
 });

 Cypress.Commands.add("pagarComCartao", (cartao, nParcelas) => {
    pagamentoPage.botao.pagarComBoletoParcelado().click({force: true});

    Object.keys(cartao).forEach(chave => {
        cy.log(chave);
        pagamentoPage.formulario.cartao[`${chave}`]().type(cartao[chave]);
    });

    // pagamentoPage.formulario.cartao.nParcelas().click({force: true});
    pagamentoPage.formulario.cartao.nParcelas().select(nParcelas);
    cy.wait(3000);
    pagamentoPage.botao.finalizarCompra().click({force: true});

 });

