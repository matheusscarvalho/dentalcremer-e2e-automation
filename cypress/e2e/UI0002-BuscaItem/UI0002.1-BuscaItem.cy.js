describe('U0002.1 - Busca Item', ()=>{
    const item = Cypress.env("item");

    it('U0002.1.1 - Busca Item pelo Código', ()=>{
        cy.fazerLogin();
        cy.pesquisarItem(item.id, item);
    }); 

    it('U0002.1.2 - Busca Item pelo Nome', ()=>{
        cy.fazerLogin();
        cy.pesquisarItem(item.name, item);
    });

    it('U0002.1.3 - Busca Item pelo Nome - Item não Encontrado', ()=>{
        cy.fazerLogin();
        cy.pesquisarItem("tststs");
        cy.contains("Nenhum resultado encontrado");
        cy.contains("Revise a ortografia ou tente outro termo. Se ainda assim não achar, mande sua sugestão de qual produto você gostaria de ver aqui!");
        cy.get(".title-no-result").find(".icon-ic_search");
    }); 

});