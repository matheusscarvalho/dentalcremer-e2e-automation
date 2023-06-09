beforeEach(()=> {
    cy.intercept('/lovers/points/get?first-login*').as('completeLogin');
    cy.intercept('https://recs.chaordicsystems.com/v0/pages/recommendations?*').as('homeCarregada');
    cy.intercept('/hsb_customeraddress/address/update').as('atualizaEndereco');
 });