<script lang="ts">
	import addAQuery from '../assets/add-a-query.avif';
	import drawerExample from '../assets/drawer-example.avif';
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
		To get comfortable, you can test query strings in our sandbox PostgreSQL database. Start by
		navigating to our homepage, then select “Add A Query”.
	</p>
	<img src={addAQuery} alt="screenshot of 'Add a Query' button" />
	<p>When the drawer opens, enter the following information into the provided fields:</p>
	<p>
		<strong>Category of your query:</strong><br />
		pagila-customer-select-10-delay-2 <br /><br />
		<strong>Postgres DB URI/URL:</strong><br />
		postgres://yttdzhlk:HnLO6cyc9fLwqqNjttS-HhsEnie7-aT5@mahmud.db.elephantsql.com/yttdzhlk<br /><br
		/>
		<strong>Query string:</strong><br />

		SELECT customer.customer_id, customer.first_name, customer.last_name, SUM(payment.amount) AS
		total_revenue<br />
		FROM customer<br />
		JOIN payment ON customer.customer_id = payment.customer_id<br />
		GROUP BY customer.customer_id<br />
		ORDER BY total_revenue DESC<br />
		LIMIT 10;<br /><br />

		<strong>Set # of query runs to 3 and leave Delay between queries at 2</strong> <br /><br />
		The data should look like this:
	</p>
	<img src={drawerExample} class="w-52" alt="drawer with above data as input" />
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