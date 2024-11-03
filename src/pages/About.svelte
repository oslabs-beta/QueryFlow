<script lang="ts">
	import add_query from '../assets/add_query.png';
	import drawer from '../assets/drawer.png';
	import pagila from "../assets/Pagila-ER-Diagram.png"
	import { Modal } from 'flowbite-svelte'
	let defaultModal = false;
	const sqlQuery = `
    		SELECT film.title,
    			   category.name AS category,
    			   actor.first_name || ' ' || actor.last_name AS actor_name,
    			   rental.rental_date
    		FROM film
    		JOIN film_category ON film.film_id = film_category.film_id
    		JOIN category ON film_category.category_id = category.category_id
    		JOIN film_actor ON film.film_id = film_actor.film_id
    		JOIN actor ON film_actor.actor_id = actor.actor_id
    		JOIN inventory ON film.film_id = inventory.film_id
    		JOIN rental ON inventory.inventory_id = rental.inventory_id
    		WHERE category.name = 'Action'
    		AND rental.rental_date >= '2005-05-24 21:54:33 +0000'
    		AND rental.rental_date <= '2005-05-25 08:41:01 +0000'
    		ORDER BY rental.rental_date DESC;
    	`;
</script>


<article class="mt-10 mx-auto pb-10 mb-0 prose about">
	<h1>Purpose and Benefits</h1>
	<p>
		QueryFlow enables you to analyze the database performance of PostgreSQL queries by running
		planning, execution, and total times against other queries. Take note of shared hit and read blocks
		in the table view to help pinpoint areas of poor performance. There's also an option to compare
		any or all queries benchmarked against a redis database.
	</p>
	<h1>Getting Started</h1>
	<p>
		To get comfortable, you can test query strings in our <span class="cursor-pointer underline text-blue-700" on:keydown={() => defaultModal = true} on:click={() => defaultModal = true}>sandbox PostgreSQL database</span>. Start by
		navigating to our homepage, then select “Add A Query”.
	</p>
	<Modal bind:open={defaultModal} size="xl" autoclose>
		<h1>Sandbox Database Entity Relationship Diagram</h1>
		<img src={pagila} alt="Entity relationship diagram for our sandbox database." />
	</Modal>
	<img src={add_query} alt="screenshot of 'Add a Query' button" />
	<p>When the drawer opens, enter the following information into the provided fields:</p>
	<p>
		<strong>Category of your query:</strong><br />
		All data from films in the action category <br /><br />
		<strong>Postgres DB URI/URL:</strong><br />
		postgresql://postgres:u1Flgeub6ZSpwD8m@tremulously-definite-giraffe.data-1.use1.tembo.io:5432/postgres<br /><br
		/>
		<strong>Query string:</strong><br /><br />

        	{sqlQuery}<br /><br />


        <strong>Set the number of query runs to 3 and leave the delay between queries at 2.</strong><br /><br />
        <strong>The query should look like this:</strong>


	</p>
    <img src={drawer} class="w-92" alt="drawer with above data as input" />
	<p>Now run the query and browse the metrics data!</p>
	<p>
		Try changing the query string, # of query runs, and delay between queries to see how metrics are
		affected. Note that it is best practice to use another name for your query category whenever a change
		is made to the query string.
	</p>
	<p class="text-xs">* For your security, QueryFlow does not save PostgreSQL database URI/URLs</p>
</article>

<style>
  .about p{
    padding:10px;
  }
  .about img{
    padding:10px;
  }
</style>