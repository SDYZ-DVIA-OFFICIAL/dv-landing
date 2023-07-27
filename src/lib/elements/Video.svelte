<script>
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import { _ } from 'svelte-i18n';
	import error from '$lib/images/ERROR.jpg';
	import { onMount } from 'svelte';
	dayjs.extend(duration);
	export let platform = 'bilibili';
	let liveData = {
		data: {
			title: 'SDYZ',
			online: 1000,
			attention: 2000,
			live_time: '1970-01-01 00:00:00',
			live_status: 0
		}
	};
	async function fetchLiveData() {
		return await (await fetch(`/api/live/bilibili`)).json();
	}
	let videoData = {
		load: 404,
		data: {
			list: {
				vlist: [
					{
						title: 'SDYZ 2023',
						comment: 1000,
						play: 10000,
						mid: 473013658,
						created: 1699999999,
						aid: 742421374,
						bvid: 'BV1jk4y1M7NJ'
					}
				]
			}
		}
	};
	async function fetchVideoData() {
		return await (await fetch(`/api/video/bilibili`)).json();
	}
	function formatNumber(num) {
		if (platform === 'bilibili') {
			if (num >= 10000) return `${String(num)[0]}.${String(num)[1]}W`;
		} else {
			if (num >= 1000000) return `${String(num)[0]}.${String(num)[1]}M`;
		}
		return num;
	}
	$: {
		(() => {
			liveData.data.online = formatNumber(liveData.data.online);
			liveData.data.attention = formatNumber(liveData.data.attention);
			videoData.data.list.vlist[0].play = formatNumber(videoData.data.list.vlist[0].play);
			videoData.data.list.vlist[0].comment = formatNumber(videoData.data.list.vlist[0].comment);
		})(platform);
	}
	onMount(() => {
		fetchLiveData().then((value) => {
			if (value.code == 0) {
				value.data.online = formatNumber(value.data.online);
				value.data.attention = formatNumber(value.data.attention);
				liveData = value;
			}
		});
		fetchVideoData().then((value) => {
			if (value.code == 0) {
				value.data.list.vlist[0].play = formatNumber(value.data.list.vlist[0].play);
				value.data.list.vlist[0].comment = formatNumber(value.data.list.vlist[0].comment);
				videoData = value;
			}
		});
		setInterval(fetchLiveData, 150000);
	});
</script>

<div class="main">
	{#if videoData.load !== 404 || liveData.data.live_status !== 0}
		<table>
			<thead>
				<tr>
					<th colspan="3">
						{#if liveData.data.live_status !== 0}
							<div>{$_('liveNow')} {liveData.data.title}</div>
						{:else}
							<div>{$_('latestVideo')} {videoData.data.list.vlist[0].title}</div>
						{/if}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th
						><div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('watcher')}</div>
								<div>{liveData.data.online}</div>
							{:else}
								<div>{$_('play')}</div>
								<div>{videoData.data.list.vlist[0].play}</div>
							{/if}
						</div></th
					>
					<th
						><div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('follower')}</div>
								<div>{liveData.data.attention}</div>
							{:else}
								<div>{$_('comment')}</div>
								<div>{videoData.data.list.vlist[0].comment}</div>
							{/if}
						</div></th
					>
					<th
						><div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('duration')}</div>
								<div>
									{dayjs.duration(
										Date.now() - dayjs(liveData.data.live_time).millisecond(),
										'm'
									)}{$_('minutes')}
								</div>
							{:else}
								<div>{$_('create')}</div>
								<div>{dayjs(videoData.data.list.vlist[0].created * 1000).format(`YYYY/MM/DD`)}</div>
							{/if}
						</div></th
					>
				</tr>
			</tbody>
		</table>
	{/if}
	<div class="video">
		{#if liveData.data.live_status !== 0}
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
		{:else if videoData.load != 404}
			<iframe
				title="latest video"
				src="https://player.bilibili.com/player.html?aid=742421374&bvid=BV1jk4y1M7NJ&cid=1166635786&page=1&high_quality=1"
				scrolling="no"
				border="0"
				frameborder="no"
				framespacing="0"
				allowfullscreen="true"
			/>
		{:else}
			<div class="placeholder" style="background-image: url({error});">
				<div>{$_('noSignal')}</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.main {
		@apply mb-4 mt-4 overflow-hidden rounded-xl bg-red-200 p-2 shadow-lg  shadow-red-200 dark:bg-cyan-800 dark:shadow-sky-800;
	}
	table {
		@apply mb-2 w-full text-left;
	}
	thead > tr > th > div {
		@apply ml-2;
	}
	thead > tr > th {
		@apply text-sm font-normal;
	}
	tbody > tr > th:first-child > div {
		@apply ml-0;
	}
	tbody > tr > th:last-child > div {
		@apply mr-0;
	}
	tbody > tr > th > div {
		@apply ml-1 mr-1 rounded-lg bg-red-300 pb-2 pl-4 pr-4 pt-2 text-base font-semibold shadow-lg shadow-red-300 dark:bg-cyan-700 dark:shadow-cyan-700 sm:text-xl;
	}
	tbody > tr > th > div > div:first-child {
		@apply text-sm font-normal;
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
		@apply overflow-hidden rounded-lg bg-black shadow-md shadow-black;
	}
	.placeholder {
		@apply z-0 flex flex-nowrap content-center items-center justify-center  bg-cover bg-center bg-no-repeat text-gray-100 md:text-xl;
	}
	.placeholder > div {
		text-shadow: 0 0 0.5rem black;
		@apply z-10 pl-8 pr-8 text-xs sm:text-lg;
	}
</style>
