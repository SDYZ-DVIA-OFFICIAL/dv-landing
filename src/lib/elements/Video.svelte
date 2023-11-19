<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import 'remixicon/fonts/remixicon.css';
	import 'animate.css/animate.min.css';

	import error from '$lib/images/ERROR.jpg';

	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	dayjs.extend(duration);

	export let platform = 'bilibili';
	const formatWhiteList = ['mid', 'uid', 'cid', 'created'];

	class LiveData {
		constructor(obj) {
			this.code = 100;
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
	}
	let liveData = new LiveData();
	async function fetchLiveData() {
		return await (await fetch(`/api/live/bilibili`)).json();
	}
	class VideoData {
		constructor(obj) {
			this.code = 100;
			this.data = {
				list: {
					vlist: [
						{
							title: 'SDYZ',
							comment: 1000,
							play: 10000,
							created: 1700000000,
							bvid: 'BV0000000000'
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

	async function getTrace() {
		const trace = await (await fetch('https://www.cloudflare.com/cdn-cgi/trace')).text();
		function toObject(text) {
			const lines = text.split('\n');
			const result = {};
			for (const line of lines) {
				const [key, value] = line.split('=');
				result[key] = value;
			}
			return result;
		}
		return toObject(trace);
	}
	onMount(() => {
		fetchLiveData()
			.then((value) => {
				if (value.code == 0) {
					liveData = new LiveData(value);
				}
			})
			.catch((err) => {
				liveData.code = 404;
				console.log(err);
			});
		fetchVideoData()
			.then((value) => {
				if (value.code == 0) {
					getTrace().then((trace) => {
						if (trace.loc === 'CN') {
							for (const data of value.data.list.vlist) {
								const url = new URL(data.data.data.durl[0].url);
								const path = url.pathname + url.search;
								data.data.data.durl[0].url = `https://cn-gdfs-ct-01-01.bilivideo.com${path}`;
							}
						}
						videoData = new VideoData(value);
					});
				}
			})
			.catch((err) => {
				videoData.code = 404;
				console.log(err);
			});
		setInterval(fetchLiveData, 150000);
	});
</script>

<div class="main">
	{#if (videoData.code !== 100 && videoData.code !== 404) || liveData.data.live_status !== 0}
		<table>
			<thead>
				<tr>
					<th colspan="3">
						{#if liveData.data.live_status !== 0}
							<div>
								<i class="ri-live-line text-red-600" />
								<b>{$_('liveNow')}</b>
								{liveData.data.title}
							</div>
						{:else}
							<div>
								<i class="ri-refresh-line" />
								<b>{$_('latestVideo')}</b>
								{videoData.data.list.vlist[0].title}
							</div>
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
					{#if liveData.data._attention}
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
		{#if liveData.code === 100 && videoData.code === 100}
			<div class="placeholder" style="background-color: black">
				<div>{$_('waiting')}</div>
			</div>
		{:else if (liveData.code === 404 && videoData.code === 404) || (liveData.data.live_status === 0 && videoData.code === 404)}
			<div class="placeholder" style="background-image: url({error})">
				<div>{$_('noSignal')}</div>
			</div>
		{:else if liveData.data.live_status !== 0}
			{#if platform === 'bilibili'}
				<iframe
					title="bilibili live"
					src="https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=22590024&quality=1"
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
		{:else if videoData.code !== 100}
			{#if !videoData.data.list.vlist[0].data.data.accept_quality.includes(64)}
				<iframe
					title="latest video"
					src={`https://player.bilibili.com/player.html?bvid=${videoData.data.list.vlist[0].bvid}`}
					scrolling="no"
					border="0"
					frameborder="no"
					framespacing="0"
					allowfullscreen="true"
				/>
			{:else}
				<video autoplay controls muted>
					<track kind="captions" />
					<source src={videoData.data.list.vlist[0].data.data.durl[0].url} />
				</video>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	.main {
		@apply mb-4 mt-4 overflow-hidden rounded-xl bg-red-300 p-2 shadow-lg  shadow-red-200 dark:bg-cyan-900 dark:shadow-cyan-900;
	}
	table {
		@apply mb-2 w-full text-left;
	}
	thead > tr > th > div {
		@apply ml-1;
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
		@apply ml-1 mr-1 break-keep rounded-lg bg-red-400 pb-2 pl-4 pr-4 pt-2 text-base font-semibold text-white shadow-lg shadow-red-400 dark:bg-cyan-800 dark:shadow-cyan-800 sm:text-xl;
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
	video,
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
