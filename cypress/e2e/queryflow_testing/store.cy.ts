/// <reference types="cypress" />

import {
  userInfoStore,
  metricData,
  filterMetricData,
  filterMetricDataTwo,
  redisData,
  isAuthenticated,
} from '../../../src/store';


describe('UserInfo Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    userInfoStore.set({ firstName: '', lastName: '' });
    // metricData.set([]);
    // filterMetricData.set([]);
    // filterMetricDataTwo.set([]);
    // isAuthenticated.set(false);
  });
  
  it('should update userInfoStore', () => {
    // Set new values in userInfoStore
    userInfoStore.set({ firstName: 'John', lastName: 'Doe' });

    // Retrieve the updated values from the store
    userInfoStore.subscribe((value) => {
      expect(value.firstName).to.equal('John');
      expect(value.lastName).to.equal('Doe');
    });
  });
});

describe('MetricData Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    metricData.set([]);
  });
  it('should update metricData', () => {
    // Set new values in metricData
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
    metricData.set(metricDataSample);
  
    // Retrieve the updated values from the store
    metricData.subscribe((value) => {
      expect(value).to.deep.equal(metricDataSample);
    });
  });
});

describe('FilterMetricData Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    filterMetricData.set([]);
    // filterMetricDataTwo.set([]);
    // isAuthenticated.set(false);
  });
  it('should update filterMetricData', () => {
    // Set new values in metricData
    const filterMetricDataSample = [
      {
        _id: 2,
        queryString: 'SELECT * FROM another_table',
        queryMetrics: [
          {
            planningTime: 15,
            executionTime: 25,
            totalTime: 40,
            cacheSize: '5MB',
            workingMem: '128MB',
            sharedHitBlocks: 80,
            sharedReadBlocks: 30,
          },
        ],
        queryName: 'Another Query',
        queryCount: 3,
        queryDelay: 200,
        averageTime: 60,
        createdAt: '2023-07-14',
      },
    ];
    filterMetricData.set(filterMetricDataSample);
  
    // Retrieve the updated values from the store
    filterMetricData.subscribe((value) => {
      expect(value).to.deep.equal(filterMetricDataSample);
    });
  });
});

describe('FilterMetricDataTwo Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    filterMetricDataTwo.set([]);
    // isAuthenticated.set(false);
  });
  it('should update filterMetricDataTwo', () => {
    // Set new values in metricData
    const filterMetricDataTwoSample = [
      {
        _id: 3,
        queryString: 'SELECT * FROM table',
        queryMetrics: [
          {
            planningTime: 5,
            executionTime: 15,
            totalTime: 20,
            cacheSize: '2MB',
            workingMem: '64MB',
            sharedHitBlocks: 60,
            sharedReadBlocks: 20,
          },
        ],
        queryName: 'Third Query',
        queryCount: 2,
        queryDelay: 150,
        averageTime: 70,
        createdAt: '2023-07-13',
      },
    ];
    filterMetricDataTwo.set(filterMetricDataTwoSample);
  
    // Retrieve the updated values from the store
    filterMetricDataTwo.subscribe((value) => {
      expect(value).to.deep.equal(filterMetricDataTwoSample);
    });
  });
});


describe('RedisData Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    redisData.set({
      totalTimeRedis: 0,
      totalTimeSQL: 0
    });
  });

  it('should update redisData', () => {
    // Set new values in metricData
    const redisDataSample = {
      totalTimeRedis: 100,
      totalTimeSQL: 200,
    };
    redisData.set(redisDataSample);
  
    // Retrieve the updated values from the store
    redisData.subscribe((value) => {
      expect(value).to.deep.equal(redisDataSample);
    });
  });
});

// isAuthenticated.set(false);

describe('IsAuthenticated Store', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    isAuthenticated.set(false);
  });

  it('should update isAuthenticated', () => {
    isAuthenticated.set(true);
    isAuthenticated.subscribe(value => {
      expect(value).to.deep.equal(true);
    });
  });
});