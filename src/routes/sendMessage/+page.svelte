<div class="main">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<iframe
		title="sendMessage"
		src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__tS7Dp5UQzk2UUhZWkUySkI3U1Y2VUZUNEJKTzU4WC4u&embed=true"
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
		height: 100dvh;
		height: calc(var(--1svh, 1vh) * 100); /* This is the "polyfill" */
		height: 100vh; /* For browsers that don't support CSS variables */
	}
	.main {
		@apply h-full;
	}
	iframe {
		@apply h-full w-full rounded-lg shadow-lg shadow-gray-500;
	}
</style>
