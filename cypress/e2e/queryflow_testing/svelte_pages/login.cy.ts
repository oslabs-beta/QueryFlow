describe('landing', () => {
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

    // Add any assertions you want to perform after clicking the Sign Up button.
    // For example, you might want to check if a Sign Up form appears.
  });
  
});

