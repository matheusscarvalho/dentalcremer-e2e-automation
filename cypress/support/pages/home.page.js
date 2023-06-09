import BasePage from "./base.page";

class HomePage extends BasePage{
    botao = {
        entrar: () => {return cy.get('.icon-ic_account_outline').parent()},
        login: () => {return cy.get("[id='header-send2']")}
    }

    campo = {
        email: () => {return cy.get("[id='email-header']")},
        senha: () => {return cy.get("[id='password-header']")}
    }
}

module.exports = HomePage;