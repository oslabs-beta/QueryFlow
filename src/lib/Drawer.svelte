<script lang="ts">
	// userId from Home
  import { metricData } from '../store'
	import { get } from 'svelte/store';
	export let userId: string;

	// initializing vars for database
	let queryname: string;
	let uri: string;
	let querystring: string;
	let querycount: number = 1;
	let querydelay: number = 2;

	const postQuery = async (e): Promise<void> => {
		e.preventDefault();

		try {
			const response = await fetch('/api/querymetrics', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ queryname, uri, querystring, querycount, querydelay, _id: userId }),
			});
			console.log('drawer fetch response: ', response.ok)
			if (response.ok) {
				const data = await response.json();
				// render body again with response data
				const oldData = get(metricData)
				metricData.set([data, ...oldData])
			}
		} catch (error) {}
	};
</script>

<div>
	<!-- left div 1/3 of screen -->
	<div class="drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer" class="btn btn-primary drawer-button">Add a query</label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<!-- Sidebar content here -->
			<div class="menu p-4 w-1/3 h-full bg-base-200 text-base-content">
				<form on:submit={postQuery}>
					<div class="flex flex-col pt-8 h-screen">
						<!-- name of query label/input -->

						<div class="w-full my-2">
							<label
								for="queryName"
								class="block mb-2 text-lg font-medium text-white dark:text-white"
							>
								Name of your query
							</label>
							<input
								type="text"
								name="queryName"
								id="queryName"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="e.g. My query"
								bind:value={queryname}
							/>
						</div>
						<!-- database URI label/input -->
						<div class="w-full my-2">
							<label for="uri" class="block mb-2 text-lg font-medium text-white dark:text-white">
								Postgres DB URI/URL
							</label>
							<input
								type="text"
								name="uri"
								id="uri"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="e.g. postgres://exampleURI.com/example"
								bind:value={uri}
							/>
						</div>
						<!-- query string label/input -->
						<div class="w-full my-2">
							<label
								for="queryString"
								class="block mb-2 text-lg font-medium text-white dark:text-white"
							>
								Query string
							</label>
							<textarea
								name="queryString"
								id="queryString"
								bind:value={querystring}
								placeholder="e.g. SELECT * FROM your_table"
								class="textarea textarea-bordered textarea-lg w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<!-- querycount label/range -->
						<div class="w-full my-2">
							<label
								for="querycount"
								class="block mb-2 text-lg font-medium text-white dark:text-white"
								># of query runs</label
							>
							<input
								name="querycount"
								type="range"
								min="1"
								max="20"
								class="range range-primary"
								step="1"
								bind:value={querycount}
							/>
							<div class="w-full flex justify-between text-xs px-2">
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<span>6</span>
								<span>6</span>
								<span>7</span>
								<span>8</span>
								<span>9</span>
								<span>10</span>
								<span>11</span>
								<span>12</span>
								<span>13</span>
								<span>14</span>
								<span>15</span>
								<span>16</span>
								<span>17</span>
								<span>18</span>
								<span>19</span>
								<span>20</span>
							</div>
						</div>
						<!-- query delay label/range -->
						<div class="w-full my-2">
							<label
								for="querydelay"
								class="block mb-2 text-lg font-medium text-white dark:text-white"
								>Delay between queries</label
							>
							<input
								name="querydelay"
								type="range"
								min="2"
								max="20"
								class="range range-primary"
								step="2"
								bind:value={querydelay}
							/>
							<div class="w-full flex justify-between text-xs px-2">
								<span>2</span>
								<span>4</span>
								<span>6</span>
								<span>8</span>
								<span>10</span>
								<span>12</span>
								<span>14</span>
								<span>16</span>
								<span>18</span>
								<span>20</span>
							</div>
						</div>
						<!-- post query button -->
						<div class="flex justify-center my-2">
							<button
								type="submit"
								class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base p-16 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>Run query</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.drawer {
		z-index: 1;
	}
</style>