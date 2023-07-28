<script>
	export let src = '',
		title = '';
</script>

<div class="main">
	<div class="title">
		<div><i class="ri-pushpin-2-line" />{title}</div>
		<div>
			<i class="ri-check-line" /><i class="ri-check-double-line" /><i class="ri-close-line" />
		</div>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<iframe
		title="sendMessage"
		{src}
		frameborder="0"
		marginwidth="0"
		marginheight="0"
		style="border: none;"
		allowfullscreen
		webkitallowfullscreen
		mozallowfullscreen
		msallowfullscreen
		framespacing="0"
		scrolling="no"
		allow="autoplay; encrypted-media"
	/>
</div>

<style lang="postcss">
	:global(body) {
		height: 100vh; /* For browsers that don't support CSS variables */
		height: calc(var(--1svh, 1vh) * 100); /* This is the "polyfill" */
		height: 100dvh;
	}
	.main {
		@apply flex h-full flex-col rounded-lg bg-red-200 shadow-lg shadow-red-200 dark:bg-cyan-800 dark:shadow-sky-800;
	}
	.title {
		@apply flex w-full flex-shrink-0 flex-row justify-between pb-1 pl-2 pr-2 pt-1;
	}
	.title > div > i {
		@apply ml-1 mr-1;
	}
	iframe {
		@apply h-full w-full rounded-lg;
	}
</style>
