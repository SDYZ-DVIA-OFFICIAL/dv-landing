<script>
	import 'remixicon/fonts/remixicon.css';
	import icon from '$lib/images/DV-LOGO.svg';
	import { _, locale } from 'svelte-i18n';
	import Video from '$lib/elements/Video.svelte';
	let platform = 'bilibili';
	locale.subscribe((value) => {
		if (value === 'zh' || value === 'zh-CN' || value === 'zh-SG') {
			platform = 'bilibili';
		} else {
			platform = 'youtube';
		}
	});
</script>

<div class="main">
	<div class="head">
		<div class="text">
			<div class="motto">{$_('motto')}</div>
			<div class="detail">
				<p>{$_('detail')}</p>
			</div>
			<div class="links">
				{#if platform === 'bilibili'}
					<a href="https://space.bilibili.com/473013658" target="_blank"
						><i class="ri-bilibili-line" />{$_('biliSpace')}</a
					>
					<a href="https://live.bilibili.com/22590024" target="_blank"
						><i class="ri-bilibili-line" />{$_('biliLive')}</a
					>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('dy')}</a>
				{:else}
					<a href="https://www.youtube.com/@SDYZDVIA"><i class="ri-youtube-line" />{$_('yt')}</a>
					<a href="https://t.me/SDYZDVIA" target="_blank"
						><i class="ri-telegram-line" />{$_('tg')}</a
					>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('tt')}</a>
				{/if}
			</div>
			<Video {platform} />
		</div>
		<div class="icon"><img src={icon} alt="icon" /></div>
	</div>
</div>

<style lang="postcss">
	.head {
		@apply flex w-full flex-nowrap content-between justify-between;
	}
	.icon {
		@apply hidden md:block;
	}
	.icon > img {
		@apply inline-block w-full rounded-[3rem];
	}
	.text {
		@apply w-full grow pb-2 pt-2 md:pr-8 lg:w-2/3 lg:text-left;
	}
	.motto {
		@apply mb-4 text-4xl font-semibold capitalize lg:text-5xl;
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
