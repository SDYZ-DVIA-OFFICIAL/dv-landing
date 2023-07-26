<script>
	// @ts-nocheck

	import '../app.css';
	import logo from '$lib/images/DV-DARK-LOGO.svg';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/600.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/noto-sans-sc/400.css';
	import '@fontsource/noto-sans-sc/500.css';
	import '@fontsource/noto-sans-sc/700.css';

	// i18n init
	import { locale, addMessages, init, getLocaleFromNavigator, _, locales } from 'svelte-i18n';
	// @ts-ignore
	import zh from '$lib/langs/zh.yaml';
	// @ts-ignore
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
</svelte:head>

<div class="main">
	<div class="nav">
		<div class="icon"><img src={logo} alt="icon" /></div>
		<div class="name">{$_('name')}</div>
	</div>
	<div class="content"><slot /></div>
	<div class="footer">
		<div>
			<div>Designed by HYH!</div>
			<div>© DVIA 2006 - {new Date().getFullYear()}</div>
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
		@apply m-0 min-h-screen w-full bg-red-50 p-0 text-black lg:pt-4;
	}
	.main {
		@apply w-full lg:pl-32 lg:pr-32;
	}
	.nav {
		@apply mb-4 flex h-20 w-full flex-row flex-nowrap items-center bg-red-100 shadow-lg shadow-red-100 lg:rounded-2xl lg:pl-4 lg:pr-4;
	}
	.nav > div {
		@apply ml-4 mr-4;
	}
	img {
		@apply h-full max-h-full pb-6 pt-6;
	}
	.icon {
		@apply h-full max-h-full;
	}
	.name {
		@apply text-xl;
	}
	.content {
		@apply pl-4 pr-4;
	}
	.footer {
		@apply mt-4 flex w-full flex-row-reverse flex-wrap place-items-end pb-4 pl-4 pr-4;
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
