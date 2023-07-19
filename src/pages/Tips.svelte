<script lang="ts">
	import denormalize from '../assets/denormalize.avif';
	import cacheAside from '../assets/cache-aside.avif';
	import joinNotOptimized from '../assets/join-not-optimized.avif';
	
	let DenormalizedLinkURL: string = 'https://rubygarage.org/blog/database-denormalization-with-examples';
	let cacheAsideURL: string = 'https://blog.cdemi.io/design-patterns-cache-aside-pattern/';
	let joinNotOptimizedUrl: string = 'https://stephenn.com/2021/03/sql-join-queries-temporary-tables/';
</script>

<article class="mt-10 mx-auto pb-10 mb-0 prose">
	<h1>PostgreSQL database efficiency</h1>
	<h3 class="text-center">
		Below are some general options for improving the performance of slow queries:
	</h3>

	<br />

	<h3>Use Indexes Wisely</h3>
	<p>
		Proper indexing can greatly improve query performance. Identify the columns frequently used in
		WHERE clauses, or JOIN conditions, and create indexes on those columns. However, be cautious not
		to over-index, as too many indexes can negatively impact write performance. Over time, consider
		adjusting or adding indexes based on query patterns and workload changes.
	</p>

	<h3>Optimize Joins</h3>
	<p>
		Select appropriate join algorithms (e.g. nested loop, hash join, merge join) based on the size of the
		tables, available indexes, and join conditions. Ensure the join columns have proper indexes, and
		consider breaking the query into smaller parts using sub-queries or Common Table Expressions
		(CTEs) to optimize performance. See below example of an inefficient join operation.
	</p>

	<img class="w-96" src={joinNotOptimized} alt="Poor SQL table indexing" />

	<p class="text-xs">
		Figure 1: Stephen Nancekivell 2021, 'Improve SQL Join Queries that use Temporary Tables & File
		Sorts', accessed 15 July 2023, {joinNotOptimizedUrl}
	</p>
	
	<h3>Avoid Over-fetching</h3>
	<p>
		Fetch only the necessary data in your queries. Look for places where queries are fetching
		columns/rows that are not required. Using proper filtering and projection to retrieve only
		the relevant data will reduce network traffic and improve query performance.
	</p>
	
	<h3>Refactor your Query Strings</h3>
	<p>
		Review your queries and consider refactoring them. Look for complex sub-queries, unnecessary
		joins, or redundant conditions. Additionally, restructuring the query logic can sometimes
		achieve the same result with more efficiency.
	</p>
	
	<h3>Consider Denormalization</h3>
	<p>
		In certain scenarios, denormalizing your data by duplicating or aggregating information can
		improve query performance. This approach can reduce the need for complex joins or calculations,
		making queries faster. Consider the trade-offs in terms of data consistency, available space
		in the database, and potential update anomalies.
	</p>
	
	<img src={denormalize} alt="Denormalization Graphic" />
	<p class="text-xs">
		Figure 2: Alex B 2020, 'When and How You Should Denormalize a Relational Database', accessed 15
		July 2023 {DenormalizedLinkURL}
	</p>

	<h1 class="mt-16">Secondary Databases</h1>
	<p>
		Caching in a secondary database is an ideal option for fast data retrieval. Especially for
		queries where SQL optimization is not feasible. Caching is configurable for most SQL databases,
		but geocaching is another option. See the <a href="https://www.npmjs.com/package/@query-flow/query-flow" target="_blank">QueryFlow auto-caching engine.</a>
	</p>
	
	<img src={cacheAside} alt="Cache Aside Graphic" />
	<p class="text-xs">
		Figure 3: Christopher Demicoli 2016, 'Design Patterns: Cache-Aside Pattern', accessed 15 July
		2023, {cacheAsideURL}
	</p>
</article>
