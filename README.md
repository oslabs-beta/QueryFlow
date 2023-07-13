//Port

<!-- DO NOT DELETE - Heroku Dependency stuff -->

moved @tsconfig/svelte": "^4.0.1", "@sveltejs/vite-plugin-svelte": "^2.4.2", vite to dependencies, daisyUi, autoprefixer and tailwind 

<!-- Vercel.json for vercel -->
{
  "builds": [
    {
      "src": "/server/server.mjs",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server/server.mjs"
    }
  ]
}

<!-- Procfile for heroku -->
web: npm run build && node server/server.mjs

<!-- Also random Vite.Config File for Render -->

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
const PORT = process.env.PORT || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: '/src/main.ts', // specify the input file
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  base: './',
  plugins: [svelte()],
});
 


<!-- "build": "tsc vite build", -->

changed package.json script build tsc vite build. Remove tsc

 <!-- Do Not Delete TsConfig -->
{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"noImplicitAny":true,
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"resolveJsonModule": true,
		/**
		 * Typecheck JS in `.svelte` and `.js` files by default.
		 * Disable checkJs if you'd like to use dynamic types in JS.
		 * Note that setting allowJs false does not prevent the use
		 * of JS in `.svelte` files.
		 */
		"allowJs": true,
		"checkJs": true,
		"isolatedModules": true
	},
	"include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
	"references": [{ "path": "./tsconfig.node.json" }]
} 





POLISHING TO-DO LIST:

- Remove numbers in Signup.svelte to fix color scheme
- Add parameterized queries in backend (security)
- Add option for different graph viewing (scatter plots, bar charts, pie charts, etc...)
- In the all-metrics bar chart, fix the bar positioning to start from the x-axis, rather than have a gap
- Exit sidebar after clicking run query
  - Loading animation after running a query
- Skeleton loaders when cards aren't visible (e.g. after logging in, running query for the first time)
-

<!-- # Svelte + TS + Vite

This template should help get you started developing with Svelte and TypeScript in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
``` -->
