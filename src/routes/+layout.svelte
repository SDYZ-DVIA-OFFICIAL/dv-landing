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
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	addMessages('zh', zh);
	addMessages('en', en);
	init({
		fallbackLocale: 'zh',
		initialLocale: 'zh'
	});
	onMount(() => {
		locale.set(getLocaleFromNavigator().slice(0, 2));
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
		<div class="title">
			<div class="logo dark-logo">
				<img src={darkLogo} alt="logo" width="2685" height="1356" />
			</div>
			<div class="logo light-logo">
				<img src={lightLogo} alt="logo" width="2685" height="1356" />
			</div>
			<div class="names">
				<span class="name">{$_('name')}</span><span class="abb">{$_('abb')}</span>
			</div>
		</div>
		<div class="items" />
	</a>
	<div class="content"><slot /></div>
	<div class="footer">
		<div>
			{#if $page.url.pathname === '/'}
				<a class="hover:underline" href="https://github.com/DoNotEditIt/dv-landing"
					><i class="ri-github-line" /> {$_('sourcecode')}</a
				>
				<div>{$_('design')}</div>
			{/if}
			<div>© {$_('abb')} 2008 - {new Date().getFullYear()}</div>
		</div>
		{#if $page.url.pathname === '/'}
			<div class="langs">
				{#each $locales as loc, index}
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
						{loc}
					</div>
				{/each}
			</div>
		{/if}
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
		@apply m-0 w-full bg-red-100 p-0 text-black dark:bg-cyan-950 dark:text-white md:pt-4;
	}
	:global(*) {
		@apply grow-0;
	}
	.main {
		@apply flex h-full w-full flex-shrink-0 flex-col flex-nowrap md:pl-12 md:pr-12 lg:pl-32 lg:pr-32;
	}
	.nav {
		@apply fixed left-0 top-0 z-50 mb-8 flex h-20 w-full flex-shrink-0 flex-row flex-nowrap justify-between bg-red-200 shadow-xl shadow-red-200 dark:bg-cyan-900 dark:shadow-cyan-900 md:mb-10 lg:pl-4 lg:pr-4;
	}
	.nav div {
		@apply ml-4 mr-4;
	}
	img {
		@apply h-full max-h-full w-fit pb-6 pt-6;
	}
	.logo {
		@apply h-full max-h-full w-fit;
	}
	.dark-logo {
		@apply inline-block dark:hidden;
	}
	.light-logo {
		@apply hidden dark:inline-block;
	}
	.title {
		@apply flex items-center;
	}
	.names {
		@apply text-xl;
	}
	.name {
		@apply hidden md:inline;
	}
	.abb {
		@apply md:hidden;
	}
	.content {
		@apply mt-28 h-full pl-4 pr-4;
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
