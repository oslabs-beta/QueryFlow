function delay(ms) {
    // Utility function to create a delayed Promise
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function delayedLoop() {
    const metricsArray = [];
    for (let i = 0; i < 10; i++) {
      await delay(i * 5000); // Wait for the specified delay
      const data = await clientDBModel(queryString);
      const parsedData = data.rows;
      const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
      const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
      console.log('Planning Time: ', planningTime);
      console.log('Execution Time: ', executionTime);
      metricsArray.push({
        planningTime: planningTime,
        executionTime: executionTime
      });
    }
    return metricsArray;
  }

export default { delay, delayedLoop };
  