<script>
	let sections = [
		{
			title: 'Introduction',
			content:
				"QueryFlow is an open source project built to optimize database performance by automatically caching slow queries. By leveraging Svelte and Tailwind CSS, it provides a seamless and efficient way to enhance your application's response time.",
		},
		{
			title: 'Features',
			content:
				'Automatic caching of slow queries\nEfficient and scalable performance optimization\nEasy integration with existing projects\nCustomizable cache settings\nReal-time query monitoring and statistics',
		},
		{
			title: 'Getting Started',
			content:
				'To get started with QueryFlow, follow the steps below:\n\n1. Install the QueryFlow package via npm or yarn: `npm install query-flow`\n2. Import QueryFlow into your project\n3. Initialize the cache with your preferred settings\n4. Enjoy faster query responses!',
		},
		{
			title: 'Contribute',
			content:
				"QueryFlow is an open source project, and we welcome contributions from the community. If you'd like to contribute, please visit our GitHub repository and follow the guidelines for submitting pull requests.",
			githubLink: 'https://github.com/your-repository-link',
		},
	];
</script>

<header class="bg-indigo-500 py-4">
	<div class="container mx-auto px-4">
		<h1 class="text-white text-3xl font-bold corporate-font">QueryFlow</h1>
		<p class="text-white mt-2">Visualizing and caching slow queries in real time.</p>
	</div>
</header>

<main class="py-8">
	<div class="container mx-auto px-4">
		{#each sections as section}
			<section class="mb-12">
				<div class="bg-white rounded-lg p-6 card custom-border">
					<h2 class="text-2xl font-bold mb-4 custom-color corporate-font">{section.title}</h2>
					{#if section.content}
						<p class="text-gray-800">{section.content}</p>
					{/if}
					{#if section.githubLink}
						<a
							href={section.githubLink}
							class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 mt-4 rounded-md transition-colors duration-300 button corporate-font"
							>GitHub Repository</a
						>
					{/if}
				</div>
			</section>
		{/each}
	</div>
</main>

<footer class="bg-gray-800 py-4">
	<div class="container mx-auto px-4 text-center text-gray-300">
		<p class="corporate-font">© 2023 QueryFlow. All rights reserved.</p>
	</div>
</footer>

<style>
	/* Customize additional styles here */
	.card {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.button {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	}

	.custom-bg {
		background-color: #f8fafc;
	}

	.custom-color {
		color: #333333;
	}

	.custom-border {
		border-width: 2px;
		border-color: #e2e8f0;
	}

	.custom-padding {
		padding: 2rem;
	}

	.corporate-font {
		font-family: Arial, sans-serif;
	}
</style>
