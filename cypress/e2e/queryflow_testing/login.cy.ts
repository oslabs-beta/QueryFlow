/// <reference types="cypress" />

describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('fills out the form and submits', () => {
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();
  });

  it('clicks the Sign Up button', () => {
    cy.get('button').contains('Sign Up').click();
  });
  
  it('verifies all elements exist', () => {
    cy.get('input[name=email]');
    cy.get('input[name=password]');
    cy.get('button[type=submit]');
    cy.get('button').contains('Sign Up');
    cy.get('button').contains('Sign in with Google');
  });

  it('submits form with empty fields', () => {
    cy.get('button[type=submit]').click();
  });

  it('submits form with incorrect email format', () => {
    cy.get('input[name=email]').type('notanemail');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();
  });

  it('submits form with incorrect password', () => {
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('wrongpassword');
    cy.get('button[type=submit]').click();
    cy.get('.alert-warning').should('be.visible');
  });
});