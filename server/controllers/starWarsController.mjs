import { starWarsDB } from '../models/starWarsDB.mjs';

const starWarsController = {};

starWarsController.getCharacters = async (req, res, next) => {
  // Read: name, gender, species_name, species_id, birth_year, eye_color, hair_color, homeworld_name, homeworld_id, films
  const query = 'EXPLAIN (ANALYZE true, COSTS true, FORMAT JSON) SELECT people.name, people.gender, species.name AS species, people.birth_year, people.eye_color, people.hair_color, people.skin_color, people.mass, people.height, planets.name AS homeworld, people.homeworld_id FROM people INNER JOIN species ON species._id = people.species_id INNER JOIN planets ON planets._id = people.homeworld_id';
  try {
    const data = await starWarsDB.query(query);
    const parsedData = data.rows;
    const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
    const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
    console.log('Planning Time: ', planningTime);
    console.log('Execution Time: ', executionTime);
    // const initialMetrics = 
    res.locals.executionTime = executionTime;
    res.locals.planningTime = planningTime;
    return next();
  } catch (err) {
    return next(err);
  }
};

export default starWarsController;
