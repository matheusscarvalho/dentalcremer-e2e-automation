// import  HomePage  from "../../support/pages/home.page";
// const homePage = new HomePage();

describe('U0001.1 - Login', ()=>{
    const credenciaisDentista = Cypress.env("usuarios").dentista;
    
    it('U0001.1.1 - Falha ao logar - Email errado', ()=>{
        let credenciaisEmailErrado = {... credenciaisDentista};
        credenciaisEmailErrado.email = "teste@gamil.com";

        // Esperada falha no login
        cy.fazerLogin(credenciaisEmailErrado, true);
        cy.contains("Login ou senha inválida.");
    }); 

    it('U0001.1.2 - Falha ao logar - Senha errada', ()=>{
        let credenciaisSenhaErrada = {... credenciaisDentista};
        credenciaisSenhaErrada.senha = "@123teste";

        // Esperada falha no login
        cy.fazerLogin(credenciaisSenhaErrada, true);
        cy.contains("Login ou senha inválida.");
    });
    
    it('U0001.1.3 - Login com sucesso', ()=>{
        cy.fazerLogin(credenciaisDentista);
        cy.contains("Olá, teste");
    });
});