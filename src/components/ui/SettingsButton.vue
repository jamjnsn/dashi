<template>
	<div class="button" :buttonType="type" @click="$emit('click')">
		<div class="button-container">
			<span class="icon" v-if="icon != null">
				<feather :type="icon" size="16" />
			</span>
			<span class="button-label"><slot /></span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['icon', 'type'],
}
</script>

<style lang="postcss"></style>
