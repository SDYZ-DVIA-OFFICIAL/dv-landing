<script>
	import 'core-js/stable';
	import 'regenerator-runtime/runtime';
	import '../app.css';
	import darkLogo from '$lib/images/DV-DARK-LOGO.svg';
	import lightLogo from '$lib/images/DV-WHITE-LOGO.svg';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/600.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/noto-sans-sc/400.css';
	import '@fontsource/noto-sans-sc/500.css';
	import '@fontsource/noto-sans-sc/700.css';
	import 'large-small-dynamic-viewport-units-polyfill';
	// i18n init
	import { locale, addMessages, init, getLocaleFromNavigator, _, locales } from 'svelte-i18n';
	import zh from '$lib/langs/zh.yaml';
	import en from '$lib/langs/en.yaml';
	addMessages('zh', zh);
	addMessages('zh-CN', zh);
	addMessages('zh-SG', zh);
	addMessages('en', en);
	addMessages('en-US', en);
	addMessages('en-GB', en);
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
</script>

<svelte:head>
	<title>{$_('abb')}</title>
	<meta
		name="description"
		content="The Digital Video Intelligence Association Official Website. DVIA is the place where your dreams come true."
	/>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace.min.js"
		integrity="sha512-2cbsQGdowNDPcKuoBd2bCcsJky87Mv0LEtD/nunJUgk6MOYTgVMGihS/xCEghNf04DPhNiJ4DZw5BxDd1uyOdw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace-theme-default.min.css"
		integrity="sha512-Ai6m3x6GYjuLAcJXEGBxHPLNOj6eIxh+/21wGpXT9B2dmcdvaFqEZr+/H/aaup+Rrkw4t3FzifGIuYhVPuBsrg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<div class="main">
	<a href="/" class="nav">
		<div class="logo dark-logo"><img src={darkLogo} alt="logo" /></div>
		<div class="logo light-logo"><img src={lightLogo} alt="logo" /></div>
		<div class="name">{$_('name')}</div>
	</a>
	<div class="content"><slot /></div>
	<div class="footer">
		<div>
			<a class="hover:underline" href="https://github.com/DoNotEditIt/dv-landing"
				><i class="ri-github-line" /> Source Code</a
			>
			<div>Designed by HYH!</div>
			<div>© {$_('abb')} 2006 - {new Date().getFullYear()}</div>
		</div>
		<div class="langs">
			{#each $locales as lo, index}
				{#if index !== 0}
					/
				{/if}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					role="button"
					tabindex="0"
					data-index={index}
					on:click={(e) => {
						locale.set($locales[e.target.dataset.index]);
					}}
				>
					{lo}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply m-0;
	}
	:global(body) {
		font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
		min-height: 100vh !important; /* For browsers that don't support CSS variables */
		min-height: calc(var(--1svh, 1vh) * 100) !important; /* This is the "polyfill" */
		min-height: 100dvh !important;
		@apply m-0 w-full bg-red-50 p-0 text-black dark:bg-cyan-950 dark:text-white md:pt-4;
	}
	:global(*) {
		@apply grow-0;
	}
	.main {
		@apply flex h-full w-full flex-shrink-0 flex-col flex-nowrap md:pl-12 md:pr-12 lg:pl-32 lg:pr-32;
	}
	.nav {
		@apply mb-8 flex h-20 w-full flex-shrink-0 flex-row flex-nowrap items-center bg-red-200 shadow-lg shadow-red-200 dark:bg-cyan-800 dark:shadow-sky-800 md:mb-10 md:rounded-2xl lg:pl-4 lg:pr-4;
	}
	.nav > div {
		@apply ml-4 mr-4;
	}
	img {
		@apply h-full max-h-full pb-6 pt-6;
	}
	.logo {
		@apply h-full max-h-full min-w-fit;
	}
	.dark-logo {
		@apply inline-block dark:hidden;
	}
	.light-logo {
		@apply hidden dark:inline-block;
	}
	.name {
		@apply text-xl;
	}
	.content {
		@apply h-full pl-4 pr-4;
	}
	.footer {
		@apply mt-4 flex w-full flex-shrink-0 flex-row-reverse flex-wrap items-end justify-start
			pb-4 pl-4 pr-4;
	}
	.footer > div {
		@apply ml-2 mr-2 text-right;
	}
	.langs {
		@apply h-fit uppercase;
	}
	.langs > div {
		@apply inline;
	}
</style>
