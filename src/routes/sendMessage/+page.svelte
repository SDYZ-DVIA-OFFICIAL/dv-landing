<script>
	import { onMount } from 'svelte';
</script>

<div>
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
	div {
		@apply overflow-visible;
	}
	iframe {
		height: 150vh;
		@apply w-full overflow-visible rounded-lg shadow-lg shadow-gray-500;
	}
</style>
