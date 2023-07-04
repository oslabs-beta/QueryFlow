// import starWarsDB from '../models/starWarsDB.mjs';

// const delayedTasks = await Promise.all(
//   Array.from({ length: 2 }, (_, i) => i).map(async (i) => {
//     await new Promise((resolve) => setTimeout(resolve, i * 5000));
//     const data = await starWarsDB(query);
//     const parsedData = data.rows;
//     const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
//     const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
//     console.log('Planning Time: ', planningTime);
//     console.log('Execution Time: ', executionTime);
//     return {
//       planningTime,
//       executionTime,
//     };
//   })
// );

// export default delayedTasks;
  