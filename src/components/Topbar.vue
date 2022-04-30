<template>
	<nav
		class="topbar"
		:class="{ 'has-background': settings.theme.topbarHasBackground }"
	>
		<div></div>

		<div></div>

		<div class="controls">
			<div
				class="menu-toggle"
				@click="$root.$emit('settingsOpened', 'GeneralSettings')"
			>
				<feather type="menu" size="24"></feather>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			settings: this.$settings.data
		}
	}
}
</script>

<style scoped lang="scss">
nav {
	height: $topbar-height;
	display: flex;
	align-items: center;
	padding: 0;

	& > div {
		flex: 1 1 calc(100% / 3);
	}
}

nav.has-background {
	background-color: var(--accent);
}

.controls {
	justify-self: flex-end;
	flex: 0 0 auto !important;
}

.menu-toggle {
	filter: drop-shadow(0 1px 10px rgba(0, 0, 0, 0.9));
	display: inline-block;
	padding: 0.5em;
	text-align: right;
	color: $white;
	text-shadow: 0 1px 10px $black;
	cursor: pointer;
}
</style>
