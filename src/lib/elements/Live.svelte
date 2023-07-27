<script>
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	dayjs.extend(duration);
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	export let platform = 'bilibili';
	let data = {
		data: {
			online: 1000,
			attention: 2000,
			live_time: '1970-01-01 00:00:00',
			live_status: 0
		}
	};
	async function fetchData() {
		data = await (await fetch(`/api/bilibili`)).json();
		console.log(data);
	}
	onMount(() => {
		fetchData(platform);
		setInterval(() => fetchData(platform), 150000);
	});
</script>

<div class="main">
	<table>
		<thead>
			<tr>
				<th>{$_('watcher')}</th>
				<th>{$_('follower')}</th>
				<th>{$_('duration')}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>{data.data.online}</th>
				<th>{data.data.attention}</th>
				{#if data.data.live_status !== 0}
					<th
						>{dayjs.duration(Date.now() - dayjs(data.data.live_time).millisecond(), 'm')}{$_(
							'minutes'
						)}</th
					>
				{:else}
					<th>{$_('offline')}</th>
				{/if}
			</tr>
		</tbody>
	</table>
	<div class="video">
		{#if data.data.live_status !== 0}
			{#if platform === 'bilibili'}
				<iframe
					title="bilibili live"
					src="https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=22590024&quality=0"
					frameborder="no"
					framespacing="0"
					scrolling="no"
					allow="autoplay; encrypted-media"
					allowfullscreen="true"
				/>
			{:else if platform === 'youtube'}
				<iframe
					title="youtube live"
					src="https://www.youtube.com/embed/live_stream?channel=UC7vRSbEDoaVf7uJY-IeCzVA&autoplay=1"
					frameborder="no"
					framespacing="0"
					scrolling="no"
					allow="autoplay; encrypted-media"
					allowfullscreen="true"
				/>
			{/if}
		{:else}
			<div class="placeholder">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div role="button" tabindex="0" on:click={fetchData}>{$_('noSignal')}</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.main {
		@apply mb-4 mt-4 rounded-xl bg-red-200 p-2  shadow-red-200 dark:bg-cyan-800 dark:shadow-sky-800;
	}
	table {
		@apply mb-2 w-full text-center;
	}
	thead > tr > th {
		@apply font-normal;
	}
	tbody > tr > th {
		@apply text-xl font-semibold;
	}
	th {
		@apply w-1/3;
	}
	.video {
		position: relative;
		padding-bottom: 56.25%;
		width: 100%;
	}
	iframe,
	.placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		@apply rounded-lg bg-black shadow-sm shadow-black;
	}
	.placeholder {
		@apply flex flex-nowrap content-center items-center justify-center text-gray-100;
	}
	.placeholder > div {
		@apply text-xl hover:underline;
	}
</style>
