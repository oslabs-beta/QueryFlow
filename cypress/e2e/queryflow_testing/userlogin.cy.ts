/// <reference types="cypress" />

describe('landing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Renders Login component by default', () => {
    cy.get('div.landing-login-container').contains('Login');
  });
  
  it('Login component should have title "Login"', () => {
    cy.get('h1').should('have.text', 'Login');
  });
});