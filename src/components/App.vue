<template>
	<div id="app" :style="theme">
		<topbar></topbar>
		<div id="content">
			<div class="modules">
				<component
					v-for="module in settings.modules"
					v-bind:is="module.type"
					:settings="module"
					:key="module.id"
				>
				</component>
			</div>
		</div>
		<settings></settings>
	</div>
</template>

<script>
export default {
	data() {
		return {
			settings: this.$settings.data,
		}
	},
	mounted() {},
	methods: {},
	computed: {
		theme() {
			return {
				'--accent': this.settings.theme.accentColor,
				'--main-font': this.settings.theme.mainFont,
				'--wallpaper': `url(${this.settings.theme.wallpaper})`,
				'--card-background':
					this.settings.theme.wallpaper == ''
						? 'var(--black-lighter)'
						: 'rgba(0,0,0,0.35)',
			}
		},
	},
	watch: {
		settings: {
			handler(val) {
				this.$settings.save()
			},
			deep: true,
		},
	},
}
</script>

<style scoped lang="postcss">
#app {
	height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;

	font-family: var(--main-font), 'Lato', BlinkMacSystemFont, -apple-system,
		'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

	background-image: var(--wallpaper);
	background-size: cover;

	transition: background-image 0.2s ease;
}

#content {
}

.modules {
	display: flex;
	justify-content: flex-start;

	flex-wrap: wrap;
	height: auto;

	padding: 1em;
	margin: 0 auto;
	max-width: 1400px;

	.module {
		flex: 0 0 100%;

		@media only screen and (min-width: 768px) {
			flex: 0 1 50%;
		}

		@media only screen and (min-width: 1024px) {
			flex: 0 1 33.3%;
		}

		@media only screen and (min-width: 1600px) {
			flex: 0 1 25%;
		}

		&:not(.spacer) {
			padding: 1rem;
		}
	}
}
</style>
