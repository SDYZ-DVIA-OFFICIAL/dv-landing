<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import 'animate.css/animate.min.css';

	import error from '$lib/images/ERROR.jpg';

	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	dayjs.extend(duration);

	export let platform = 'bilibili';
	const formatWhiteList = ['mid', 'uid', 'cid', 'created'];

	function LiveData(obj) {
		this.code = 8964;
		this.data = {
			title: 'SDYZ',
			online: 1000,
			attention: 2000,
			live_time: '1970-01-01 00:00:00',
			live_status: 0
		};
		if (obj) {
			this.code = obj.code;
			this.data = obj.data;
			for (const key in this.data) {
				const value = this.data[key];
				if (typeof value == typeof 0 && !formatWhiteList.includes(key)) {
					this.data[`_${key}`] = formatNumber(value);
				}
			}
		}
	}
	let liveData = new LiveData();
	async function fetchLiveData() {
		return await (await fetch(`/api/live/bilibili`)).json();
	}
	function VideoData(obj) {
		this.code = 8964;
		this.data = {
			list: {
				vlist: [
					{
						title: 'SDYZ 2023',
						comment: 1000,
						play: 10000,
						created: 1699999999,
						bvid: 'BV1jk4y1M7NJ'
					}
				]
			}
		};
		if (obj) {
			this.code = obj.code;
			this.data.list.vlist = obj.data.list.vlist;
			for (const key in this.data.list.vlist[0]) {
				const value = this.data.list.vlist[0][key];
				if (typeof value == typeof 0 && !formatWhiteList.includes(key)) {
					this.data.list.vlist[0][`_${key}`] = formatNumber(value);
				}
			}
		}
	}

	let videoData = new VideoData();
	async function fetchVideoData() {
		return await (await fetch(`/api/video/bilibili`)).json();
	}
	function formatNumber(num) {
		if (platform === 'bilibili') {
			if (num >= 10000) return `${String(num)[0]}.${String(num)[1]}W`;
		} else {
			if (num >= 1000000) return `${String(num)[0]}.${String(num)[1]}M`;
		}
		if (num >= 1000) return `${String(num)[0]}.${String(num)[1]}K`;
		return Number(num);
	}

	const date = {
		now: Date.now(),
		Date: new Date()
	};
	setInterval(() => {
		date.now = Date.now();
		date.Date = new Date();
	}, 25);
	$: Duration = dayjs
		.duration(date.now - Number(+dayjs(liveData.data.live_time)), 'ms')
		.format('HH:mm:ss');

	onMount(() => {
		fetchLiveData().then((value) => {
			if (value.code == 0) {
				liveData = new LiveData(value);
				console.log(liveData);
			}
		});
		fetchVideoData().then((value) => {
			if (value.code == 0) {
				videoData = new VideoData(value);
				console.log(videoData);
			}
		});

		setInterval(fetchLiveData, 150000);
	});
</script>

<div class="main">
	{#if videoData.code !== 8964 || liveData.data.live_status !== 0}
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
					<th>
						<div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('watcher')}</div>
								<div>{liveData.data._online}</div>
							{:else}
								<div>{$_('play')}</div>
								<div>{videoData.data.list.vlist[0]._play}</div>
							{/if}
						</div>
					</th>
					<th>
						<div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('follower')}</div>
								<div>{liveData.data._attention}</div>
							{:else}
								<div>{$_('comment')}</div>
								<div>{videoData.data.list.vlist[0]._comment}</div>
							{/if}
						</div>
					</th>
					{#if liveData.data.live_status === 0}
						<th>
							<div>
								<div>{$_('follower')}</div>
								<div>{liveData.data._attention}</div>
							</div>
						</th>
					{/if}
					<th>
						<div>
							{#if liveData.data.live_status !== 0}
								<div>{$_('duration')}</div>
								<div>
									{Duration}
								</div>
							{:else}
								<div>{$_('create')}</div>
								<div>{dayjs(videoData.data.list.vlist[0].created * 1000).format(`YY/M/D`)}</div>
							{/if}
						</div>
					</th>
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
			<div
				class="placeholder animate__animated animate__fast"
				style="background-image: url({error})"
			>
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
		@apply ml-1 mr-1 break-keep rounded-lg bg-red-300 pb-2 pl-4 pr-4 pt-2 text-base font-semibold shadow-lg shadow-red-300 dark:bg-cyan-700 dark:shadow-cyan-700 sm:text-xl;
	}
	tbody > tr > th > div > div:first-child {
		@apply text-xs font-normal md:text-sm;
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
		animation: wait 10s ease-in-out, headShake 1s ease-in-out 10s;
		@apply z-0 flex flex-nowrap content-center items-center justify-center  bg-cover bg-center bg-no-repeat text-gray-100 md:text-xl;
	}
	@keyframes wait {
		0% {
			filter: brightness(0);
		}
		90% {
			filter: brightness(0);
		}
		100% {
			filter: unset;
		}
	}
	.placeholder > div {
		text-shadow: 0 0 0.5rem black;
		@apply z-10 pl-8 pr-8 text-xs sm:text-lg;
	}
</style>
