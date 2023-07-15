/// <reference types="cypress" />

describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Fills out the form and submits', () => {
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();

    // Add any assertions you want to perform after submitting the form.
    // For example, you might want to check if you are redirected to another page.
  });

  it('Clicks the Sign Up button', () => {
    cy.get('button').contains('Sign Up').click();
  });
  
  it('Verifies all elements exist', () => {
    cy.get('input[name=email]');
    cy.get('input[name=password]');
    cy.get('button[type=submit]');
    cy.get('button').contains('Sign Up');
    cy.get('button').contains('Sign in with Google');
  });

  it('Submits form with empty fields', () => {
    cy.get('button[type=submit]').click();
  });

  it('Submits form with incorrect email format', () => {
    cy.get('input[name=email]').type('notanemail');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();
  });

  it('Submits form with incorrect password', () => {
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('wrongpassword');
    cy.get('button[type=submit]').click();
    cy.get('.alert-warning').should('be.visible');
  });
});