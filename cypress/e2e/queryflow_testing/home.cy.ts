/// <reference types="cypress" />

import {
  metricData,
} from '../../../src/store';

describe('Home Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home', {
    });
  });
  it('loads the homepage', () => {
    cy.url().should('include', '/');
  });

  it('checks Global Metrics Button', () => {
    cy.get('button').contains('Global Metrics').click(); 
    cy.url().should('include', '/all-metrics'); 
  });

  it('checks the dropdown selection', () => {
    cy.get('select').should('have.value', 'all');
  });

  it('tests if the query metrics are being fetched', () => {
    cy.intercept('POST', '/api/get-metrics').as('getMetrics');
  });

  it('tests if user can navigate to /all-metrics', () => {
    cy.get('button').contains('Global Metrics').click();
    cy.url().should('include', '/all-metrics');
  });
});


const metricDataSample = [
  {
    _id: 1,
    queryString: 'SELECT * FROM table',
    queryMetrics: [
      {
        planningTime: 10,
        executionTime: 20,
        totalTime: 30,
        cacheSize: '10MB',
        workingMem: '256MB',
        sharedHitBlocks: 100,
        sharedReadBlocks: 50,
      },
    ],
    queryName: 'Sample Query',
    queryCount: 5,
    queryDelay: 100,
    averageTime: 50,
    createdAt: '2023-07-15',
  },
];

describe('Home Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
    metricData.set(metricDataSample);
  });
});