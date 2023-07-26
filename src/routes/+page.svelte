<script>
	import 'remixicon/fonts/remixicon.css';
	import icon from '$lib/images/DV-LOGO.svg';
</script>

<div class="main">
	<div class="head">
		<div class="text">
			<div class="motto">The place where your dreams come true.</div>
			<div class="detail">
				Founded in 2006, DVIA is one of the largest and oldest digital video associations in the
				southern part of the People's Republic of China.
			</div>
			<div class="links">
				<div class="tabs">
					<a href="https://space.bilibili.com/473013658" target="_blank"
						><i class="ri-bilibili-line" />bilibili</a
					>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />Douyin</a>
					<a href="https://www.youtube.com/@SDYZDVIA"><i class="ri-youtube-line" />YouTube</a>
					<a href="/" target="_blank"><i class="ri-telegram-line" />Telegram</a>
					<a href="/" target="_blank"><i class="ri-tiktok-line" />Tiktok</a>
				</div>
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
	.tabs > a {
		@apply tab tab-active text-lg text-black;
	}
	i {
		@apply pl-1 pr-1;
	}
</style>
