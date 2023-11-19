<script>
	import 'remixicon/fonts/remixicon.css';
	import icon from '$lib/images/DV-LOGO.svg';
	import { _, locale } from 'svelte-i18n';
	import Video from '$lib/elements/Video.svelte';
	let platform = 'bilibili';
	locale.subscribe((value) => {
		if (value.slice(0, 2) === 'zh') {
			platform = 'bilibili';
		} else {
			platform = 'youtube';
		}
	});
</script>

<div class="main">
	<div class="head">
		<div class="text">
			<div class="motto">
				<div class="small-icon"><img src={icon} alt="icon" /></div>
				{$_('motto')}
			</div>
			<div class="detail">
				<p>{$_('detail')}</p>
			</div>
			<div class="links">
				<a href="https://space.bilibili.com/473013658" target="_blank"
					><i class="ri-bilibili-line" />{$_('biliSpace')}</a
				>
				<a href="https://live.bilibili.com/22590024" target="_blank"
					><i class="ri-bilibili-line" />{$_('biliLive')}</a
				>
				{#if platform === 'bilibili'}
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('dy')}</a>
				{:else}
					<a href="https://www.youtube.com/@SDYZDVIA"><i class="ri-youtube-line" />{$_('yt')}</a>
					<a href="https://t.me/SDYZDVIA" target="_blank"
						><i class="ri-telegram-line" />{$_('tg')}</a
					>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('tt')}</a>
				{/if}
				<a href="/sendMessage"><i class="ri-mail-send-line" />{$_('sendMessage')}</a>
			</div>
			<Video {platform} />
		</div>
		<div class="big-icon"><img src={icon} alt="icon" /></div>
	</div>
</div>

<style lang="postcss">
	.head {
		@apply flex w-full flex-nowrap content-between justify-between;
	}
	.small-icon {
		@apply inline-block h-10 md:hidden;
	}
	.small-icon > img {
		@apply mb-2 inline-block h-6 rounded-md;
	}
	.big-icon {
		@apply hidden grow md:block;
	}
	.big-icon > img {
		@apply inline-block w-full rounded-[2rem] shadow-xl shadow-red-600;
	}
	.text {
		@apply w-full grow-0 pb-2 pt-2 md:pr-8 lg:w-3/4 lg:text-left;
	}
	.motto {
		@apply mb-4 text-3xl font-semibold capitalize md:text-5xl;
	}
	.detail {
		@apply mb-4 mt-4 text-lg font-normal;
	}
	.links > a {
		@apply inline;
	}
	i {
		@apply pl-1 pr-1;
	}
</style>
