/// <reference types="cypress" />

describe('Navbar Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/', {
      onBeforeLoad(win) {
        // Mock the localStorage getItem method to return a token
        cy.stub(win.localStorage, 'getItem').returns('token');
      },
    });
  });

  it('displays the logo and link to homepage', () => {
    cy.get('.logo-text').should('have.attr', 'href', 'http://localhost:5173/');
    cy.get('.logo-text img').should('have.attr', 'src', '/src/assets/QueryFlow-icon.avif'); // Replace 'path/to/logo.png' with the actual path to your logo image
    cy.get('.logo-text').contains('QueryFlow');
  });

  it('displays the navigation links', () => {
    cy.get('.navtags').should('have.length', 3);
    cy.get('.navtags').eq(0).should('have.text', 'About');
    cy.get('.navtags').eq(1).should('have.text', 'SQL Tips');
    cy.get('.navtags').eq(2).should('have.text', 'GitHub').should('have.attr', 'href', 'https://github.com/oslabs-beta/QueryFlow');
  });


  it('logs out and redirects to homepage', () => {
    cy.intercept('https://accounts.google.com/o/oauth2/revoke*').as('revokeToken');
    cy.url().should('eq', 'http://localhost:5173/home'); // Replace 'http://localhost:5173/' with the actual URL of your homepage
  });

  it('navigates to the About page', () => {
    cy.get('.navtags').contains('About').click();
    cy.url().should('include', 'http://localhost:5173/about'); // Replace '/about' with the actual URL of your About page
  });

  it('navigates to the SQL Tips page', () => {
    cy.get('.navtags').contains('SQL Tips').click();
    cy.url().should('include', 'http://localhost:5173/tips'); // Replace '/sql-tips' with the actual URL of your SQL Tips page
  });

  it('opens the GitHub link in a new tab', () => {
    cy.get('.navtags').contains('GitHub').should('have.attr', 'target', '_blank');
  });

});