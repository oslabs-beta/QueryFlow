/// <reference types="cypress" />

describe('landing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('Renders Login component by default', () => {
    cy.get('div.login-shadow').contains('Login');
  });
  
  it('Login component should have title "Login"', () => {
    cy.get('h1').should('have.text', 'Login');
  });
});