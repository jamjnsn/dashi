<template>
	<div>
		<img class="link-icon" :src="iconPath" />
	</div>
</template>

<script>
export default {
	props: ['link'],
	computed: {
		iconPath() {
			let iconName = this.link.icon

			if (iconName) {
				return '/icons/' + iconName
			} else {
				return 'dashi.png'
			}
		},
		defaultIconName() {
			return this.link.name
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z0-9 -]/, '')
				.replace(/\s/g, '-')
		},
	},
}
</script>

<style scoped lang="postcss">
.link-icon {
	display: block;
	border-radius: 4px;
	object-fit: contain;
}
</style>
