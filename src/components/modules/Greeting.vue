<template>
	<div class="greeting">Hello, {{ this.$settings.data.name }}!</div>
</template>

<script>
export default {
	props: ['settings'],
	data() {
		return {
			...this.settings
		}
	}
}
</script>

<style lang="scss" scoped>
.greeting {
	flex: 0 0 100%;
	text-align: center;
	font-size: 2em;
	padding: 2em;
}
</style>
