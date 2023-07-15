<script lang="ts">
	import addAQueryPNG from '../assets/add-a-query.png';
	import drawerExamplePNG from '../assets/drawer-example.png';
</script>

<article class="mt-10 m-10 pb-10 mb-0 prose md:mx-20 lg:mx-40 xl:mx-60">
	<h1>Purpose and Benefits</h1>
	<p>
		QueryFlow enables you to analyze the database performance of PostgreSQL queries by plotting
		planning, execution, and total against other queries. Take note of shared, hit and read blocks
		as well in the table view, to pinpoint areas of poor performance. There are options to compare
		all queries as well as specific queries benchmarked against a redis database.
	</p>
	<h1>Getting Started</h1>
	<p>
		To get comfortable, you can test query strings in our sandbox PostgreSQL database. Start by
		navigating to our homepage then select “Add A Query”
	</p>
	<img src={addAQueryPNG} alt="screenshot of Add a Query here" />
	<p>A drawer will open, enter the following information into the provided fields:</p>
	<p>
		<strong>Name of your query:</strong><br />
		pagila-customer-select-10 <br /><br />
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
	<img src={drawerExamplePNG} class="w-52" alt="drawer with data above as input" />
	<p>Run the query and browse the metrics data</p>
	<p>
		Try changing the query string, # of query runs and Delay between queries to see how metrics are
		affected. Note that it is best practice to use another query name whenever a change is made to
		the query string.
	</p>
	<p class="text-xs">* For your security QueryFlow does not save Postgres database URI/URLs</p>
</article>
