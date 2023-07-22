/// <reference types="cypress" />

describe('User API', () => {
  const user = {
    firstName: 'Test1k2jbh34kb124k',
    lastName: 'User',
    email: 'testuser2@example.com',
    password: 'testpassword',
    organization: 'Test Org',
    database: 'testdb',
  };
  
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  
 
  it('should create a new user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/signup',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('msg', 'Account made');
    });
  });

  it('should login test user',() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      body: { email: 'testuser2@example.com', password: 'testpassword' },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});  

// This test will work if you change the static folder line and sendfile in server.mjs(express server file) back to src folder and index.html respectively.
 
// it('successfully communicates with the backend', () => {
//   cy.request('http://localhost:3000/')
//     .its('status')
//     .should('eq', 200);
// });
