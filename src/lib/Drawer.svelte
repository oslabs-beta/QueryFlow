<script lang="ts">
  import { metricData, filterMetricData, filterMetricDataTwo, isLoading } from '../store';
  import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'

	// initializing vars for database
	let queryName: string;
	let uri: string;
	let queryString: string;
	let queryCount: number = 1;
	let queryDelay: number = 2;
	let isDrawerOpen: boolean = false;

  // submit query POST Request
	const postQuery = async (e: any): Promise<void> => {
    e.preventDefault();
    isDrawerOpen = false;

		// adds spinning animation to logo
		isLoading.set(true);

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

				// ends spinning animation
				isLoading.set(false);
      }
      isLoading.set(false);
    } catch (error) {
      isLoading.set(false);
      console.error(error);
    }
  };
</script>

<!-- binded values automatically update -->
<div>
	<!-- sidebar named drawer -->
	<div class="drawer z-30">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen}/>
		<div class="drawer-content">
			<!-- page content here -->
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<!-- sidebar content here -->
			<div class="menu p-4 w-1/3 bg-base-200  text-base-content ">
				<form on:submit={postQuery}>
					<div class="flex flex-col pt-8 mt-10 h-screen">
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
                maxlength="30"
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
                rows="8"
								placeholder="e.g. SELECT * FROM your_table"
								class="textarea textarea-bordered textarea-lg w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>

					<div class="grid grid-cols-2 mt-6 gap-2 justify-center">
            <div class="grid grid-cols-1 text-center justify-center">
              <Button class="bg-primary"><Chevron>Query Count: {queryCount}</Chevron></Button>
<Dropdown class="text-center overflow-y-auto h-48">
  <DropdownItem on:click={() => queryCount = 1}>1</DropdownItem>
  <DropdownItem on:click={() => queryCount = 2}>2</DropdownItem>
  <DropdownItem on:click={() => queryCount = 3}>3</DropdownItem>
  <DropdownItem on:click={() => queryCount = 4}>4</DropdownItem>
  <DropdownItem on:click={() => queryCount = 5}>5</DropdownItem>
  <DropdownItem on:click={() => queryCount = 6}>6</DropdownItem>
  <DropdownItem on:click={() => queryCount = 7}>7</DropdownItem>
  <DropdownItem on:click={() => queryCount = 8}>8</DropdownItem>
  <DropdownItem on:click={() => queryCount = 9}>9</DropdownItem>
  <DropdownItem on:click={() => queryCount = 10}>10</DropdownItem>
  <DropdownItem on:click={() => queryCount = 11}>11</DropdownItem>
  <DropdownItem on:click={() => queryCount = 12}>12</DropdownItem>
  <DropdownItem on:click={() => queryCount = 13}>13</DropdownItem>
  <DropdownItem on:click={() => queryCount = 14}>14</DropdownItem>
  <DropdownItem on:click={() => queryCount = 15}>15</DropdownItem>
</Dropdown>
            </div>
            <div class="grid grid-cols-1 text-center flex justify-center">
              <Button class="bg-primary"><Chevron>Query Delay: {queryDelay}</Chevron></Button>
<Dropdown class="text-center overflow-y-auto h-48" >
  <DropdownItem on:click={() => queryDelay = 2}>2</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 4}>4</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 6}>6</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 8}>8</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 10}>10</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 12}>12</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 14}>14</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 16}>16</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 18}>18</DropdownItem>
  <DropdownItem on:click={() => queryDelay = 20}>20</DropdownItem>
</Dropdown>
            </div>
          </div>
						<!-- post query button -->
						<div class="flex justify-center my-6">
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