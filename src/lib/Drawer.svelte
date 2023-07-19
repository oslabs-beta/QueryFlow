<script lang="ts">
  import { metricData, filterMetricData, filterMetricDataTwo } from '../store';
	
	// initializing vars for database
	let queryName: string;
	let uri: string;
	let queryString: string;
	let queryCount: number = 1;
	let queryDelay: number = 2;

	let isDrawerOpen: boolean = false;

  // submit query POST Request
	const postQuery = async (e: any) => {
    e.preventDefault();
    isDrawerOpen = false;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/query-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // needed for jwt
        },
        body: JSON.stringify({
          queryName,
          uri,
          queryString,
          queryCount,
          queryDelay
        }),
      });

      if (response.ok) {
				// updates metricData and filterMetricData
        const data = await response.json();
        metricData.update((arr) => [data, ...arr]);
        filterMetricData.update((arr) => [data, ...arr]);
        filterMetricDataTwo.update((arr) => [data, ...arr]);
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<!-- binded values automatically update -->
<div>
	<!-- sidebar named drawer -->
	<div class="drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen}/>
		<div class="drawer-content">
			<!-- page content here -->
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<!-- sidebar content here -->
			<div class="menu p-4 w-1/3 bg-base-200 text-base-content ">
				<form on:submit={postQuery}>
					<div class="flex flex-col pt-8 h-screen">
						<!-- name of query label/input -->
						<div class="w-full my-2">
							<label
								for="queryName"
								class="block mb-2 text-lg font-medium"
							>
								Category of your query
							</label>
							<input
								type="text"
								name="queryName"
								id="queryName"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="e.g. My query"
								required
								bind:value={queryName}
							/>
						</div>
						<!-- database URI label/input -->
						<div class="w-full my-2">
							<label for="uri" class="block mb-2 text-lg font-medium">
								Postgres DB URI/URL
							</label>
							<input
								type="text"
								name="uri"
								id="uri"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="e.g. postgres://exampleURI.com/example"
								required
								bind:value={uri}
							/>
						</div>
						<!-- query string label/input -->
						<div class="w-full my-2">
							<label
								for="queryString"
								class="block mb-2 text-lg font-medium"
							>
								Query string
							</label>
							<textarea
								name="queryString"
								id="queryString"
								required
								bind:value={queryString}
								placeholder="e.g. SELECT * FROM your_table"
								class="textarea textarea-bordered textarea-lg w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<!-- queryCount label/range -->
						<div class="w-full my-2 range-container">
              <label for="queryCount" class="block mb-2 text-lg font-medium"># of query runs</label>
              <div class="range-input-container">
                  <input
                      name="queryCount"
                      type="range"
                      id="queryCount"
                      min="1"
                      max="20"
                      class="range range-primary"
                      step="1"
											required
                      bind:value={queryCount}
                  />
              </div>
              <div class="w-full flex justify-between text-xs px-2 range-labels">
                  <!-- Label spans -->
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
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
								for="queryDelay"
								class="block mb-2 text-lg font-medium"
								>Delay between queries</label
							>
							<input
								name="queryDelay"
                id="queryDelay"
								type="range"
								min="2"
								max="20"
								class="range range-primary"
								step="2"
								required
								bind:value={queryDelay}
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
		z-index: 11; /* places drawer above everything else */
	}

  .drawer-side {
	left: -80vw; /* Initially set to negative of the drawer's width to guarantee staying off screen */
  min-width: 1000px;
  }
  
  .drawer-overlay {
    transition: all 0.2s ease-out;
	}
  /* CSS to show the drawer when checkbox is checked */
    /* The tilde is a conditional statement */
  #my-drawer:checked ~ .drawer-side {
		left: 0;
  }

	#my-drawer:not(:checked) ~ .drawer-side {
		transition: all 0.8s ease-in;
	}

</style>