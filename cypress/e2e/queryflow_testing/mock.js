export const mockData = {
  metricData: [
    {
      _id: 1,
      queryString: 'SELECT * FROM users',
      queryMetrics: [
        {
          planningTime: 10,
          executionTime: 50,
          totalTime: 60,
          cacheSize: '10MB',
          workingMem: '20MB',
          sharedHitBlocks: 100,
          sharedReadBlocks: 50,
        }
      ],
      queryName: 'getUsers',
      queryCount: 10,
      queryDelay: 100,
      averageTime: 200,
      createdAt: '2022-07-14T07:21:21.779Z',
    },
  ],
  userInfo: {
    firstName: 'John',
    lastName: 'Doe',
  },
};