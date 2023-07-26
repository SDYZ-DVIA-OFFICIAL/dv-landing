<script>
	import 'remixicon/fonts/remixicon.css';
	import icon from '$lib/images/DV-LOGO.svg';
	import { _, getLocaleFromNavigator } from 'svelte-i18n';
</script>

<div class="main">
	<div class="head">
		<div class="text">
			<div class="motto">{$_('motto')}</div>
			<div class="detail">
				<p>{$_('detail')}</p>
			</div>
			<div class="links">
				{#if getLocaleFromNavigator() === 'zh'}
					<a href="https://space.bilibili.com/473013658" target="_blank"
						><i class="ri-bilibili-line" />{$_('biliSpace')}</a
					>
					<a href="https://space.bilibili.com/473013658" target="_blank"
						><i class="ri-bilibili-line" />{$_('biliLive')}</a
					>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('dy')}</a>
				{:else}
					<a href="https://www.youtube.com/@SDYZDVIA"><i class="ri-youtube-line" />{$_('yt')}</a>
					<a href="/" target="_blank"><i class="ri-telegram-line" />{$_('tg')}</a>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />{$_('tt')}</a>
				{/if}
			</div>
		</div>
		<div class="icon"><img src={icon} alt="icon" /></div>
	</div>
</div>

<style lang="postcss">
	.head {
		@apply flex w-full flex-nowrap content-between justify-between lg:mb-10 lg:mt-10;
	}
	.icon {
		@apply hidden lg:block;
	}
	.icon > img {
		@apply inline-block w-full;
	}
	.text {
		@apply w-full grow pb-2 pt-2 lg:w-2/3 lg:pr-8 lg:text-left;
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
