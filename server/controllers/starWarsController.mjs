import  starWarsDB  from '../models/starWarsDB.mjs';

const starWarsController = {};

starWarsController.queryMetrics = async (req, res, next) => {
  const query = 'EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,  FORMAT JSON) SELECT people.name, people.gender, species.name AS species, people.birth_year, people.eye_color, people.hair_color, people.skin_color, people.mass, people.height, planets.name AS homeworld, people.homeworld_id FROM people INNER JOIN species ON species._id = people.species_id INNER JOIN planets ON planets._id = people.homeworld_id';
  
  try {
    const delayedTasks = await Promise.all(
      Array.from({ length: 1 }, (_, i) => i).map(async (i) => {
        await new Promise((resolve) => setTimeout(resolve, i * 2000));
        const data = await starWarsDB(query);
        const parsedData = data.rows;
        console.log(parsedData[0]['QUERY PLAN']);
        const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
        const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
        const cacheSize = parsedData[0]['QUERY PLAN'][0]['Settings']['effective_cache_size'];
        const workingMem = parsedData[0]['QUERY PLAN'][0]['Settings']['work_mem'];
        const sharedHitBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Hit Blocks'];
        const sharedReadBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Read Blocks'];
        return {
          planningTime,executionTime,cacheSize,workingMem, sharedHitBlocks, sharedReadBlocks
        };
      })
    );
    console.log(delayedTasks);
    res.locals.metrics = delayedTasks;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in starWarsController.queryMetrics middleware',
      status: 400,
      message: 'Error handler caught error in starWarsController.queryMetrics middleware',
    });
  }
};

export default starWarsController;
