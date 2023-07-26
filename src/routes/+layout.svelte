<script>
	import '../app.css';
	import logo from '$lib/images/DV-DARK-LOGO.svg';
</script>

<div class="main">
	<div class="nav">
		<div class="icon"><img src={logo} alt="icon" /></div>
		<div class="name">The Digital Video Intelligence Association</div>
	</div>
	<div class="content"><slot /></div>
	<div class="footer">
		© DVIA 2006 - {new Date().getFullYear()}
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply m-0 p-0;
	}
	:global(body) {
		font-family: 'IBM Plex Sans', sans-serif;
		@apply min-h-screen bg-red-50 text-black;
	}
	.main {
		@apply w-full lg:pl-32 lg:pr-32;
	}
	.nav {
		@apply mb-4 flex h-24 w-full flex-row flex-nowrap items-center bg-red-100;
	}
	.nav > div {
		@apply ml-4 mr-4;
	}
	img {
		@apply h-full max-h-full pb-4 pt-4;
	}
	.icon {
		@apply h-full max-h-full;
	}
	.name {
		@apply text-xl;
	}
	.content {
		@apply ml-4 mr-4;
	}
	.footer {
		@apply ml-2 mr-2 mt-4;
	}
</style>
