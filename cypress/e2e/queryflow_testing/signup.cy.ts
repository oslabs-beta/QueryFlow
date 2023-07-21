/// <reference types="cypress" />

describe('Signup tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('button').contains('Sign Up').click();

  });

  it('displays validation error on empty submission', () => {
    cy.get('button[type=submit]').click();
  });

  it('displays validation error on incorrect input', () => {
    cy.get('input[name=email]').type('incorrectemail@test.com');
    cy.get('input[name=password]').type('incorrectpassword{enter}');
  });

  it('navigates to home on successful login with correct input', () => {
    cy.get('input[name=email]').type('correctemail@test.com');
    cy.get('input[name=password]').type('correctpassword{enter}');
  });
  it('displays validation error on mismatched passwords', () => {
    cy.get('input#grid-first-name').type('Test');
    cy.get('input#grid-last-name').type('User');
    cy.get('input#email').type('testuser@test.com');
    cy.get('input#password').type('testpassword');
    cy.get('input#confirm-password').type('wrongpassword');
    cy.get('input#terms').check();
    cy.get('button[type=submit]').click();
  });

  it('displays validation error on terms not agreed', () => {
    cy.get('input#grid-first-name').type('Test');
    cy.get('input#grid-last-name').type('User');
    cy.get('input#email').type('testuser@test.com');
    cy.get('input#password').type('testpassword');
    cy.get('input#confirm-password').type('testpassword');

    cy.get('button[type=submit]').click();
  });

  it('displays validation error on already existing email', () => {
    cy.get('input#grid-first-name').type('Test');
    cy.get('input#grid-last-name').type('User');
    cy.get('input#email').type('existingemail@test.com');
    cy.get('input#password').type('testpassword');
    cy.get('input#confirm-password').type('testpassword');
    cy.get('input#terms').check();

    cy.get('button[type=submit]').click();
  });

  it('navigates to home on successful signup', () => {
    cy.get('input#grid-first-name').type('Test');
    cy.get('input#grid-last-name').type('User');
    cy.get('input#email').type('testuser@test.com');
    cy.get('input#password').type('testpassword');
    cy.get('input#confirm-password').type('testpassword');
    cy.get('input#terms').check();
    cy.get('button[type=submit]').click();
  });
});