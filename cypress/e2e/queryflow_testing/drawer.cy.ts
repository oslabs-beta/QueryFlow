/// <reference types="cypress" />

describe('Drawer Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
    cy.get('label').contains('Add a query').click();
  });

  it('should open the drawer when the button is clicked', () => {
    cy.get('.drawer-side').should('have.css', 'left', '0px');
  });

  it('allows input of query details', () => {

    cy.get('#queryName')
      .type('My Query')
      .should('have.value', 'My Query');

    cy.get('#uri')
      .type('postgres://exampleURI.com/example')
      .should('have.value', 'postgres://exampleURI.com/example');

    cy.get('#queryString')
      .type('SELECT * FROM your_table')
      .should('have.value', 'SELECT * FROM your_table');

    cy.get('#queryCount')
      .invoke('val', 5)
      .trigger('input')
      .should('have.value', 5);

    cy.get('#queryDelay')
      .invoke('val', 10)
      .trigger('input')
      .should('have.value', 10);
  });


  it('clicking outside of the drawer should close the drawer', () => {
    cy.get('.drawer-side').should('have.css', 'left', '0px');
    cy.get('.drawer-overlay').click();
    cy.get('.drawer-side').should('have.css', 'left', '-1536px');
  });

});