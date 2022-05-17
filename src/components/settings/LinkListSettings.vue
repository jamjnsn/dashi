<template>
	<div>
		<header>
			<h3>Link List Settings</h3>
			<span class="close-button" @click="$root.$emit('settingsClosed')">
				<feather type="x"></feather>
			</span>
		</header>

		<div class="setting">
			<label>Name</label>
			<input class="input" type="text" v-model="data.linkList.name" />
		</div>

		<div class="setting">
			<label>Icon</label>
			<div class="icon-select-container">
				<feather-selector
					:type="data.linkList.icon"
					@iconSelected="iconSelected"
				></feather-selector>
			</div>
		</div>

		<div class="setting inline-field">
			<label>Accent Color</label>
			<div>
				<div class="buttons">
					<v-swatches
						v-model="data.linkList.accentColor"
						show-fallback
						fallback-input-type="color"
						popover-x="left"
						class="color-picker"
					>
					</v-swatches>

					<settings-button
						icon="x"
						@click="clearAccentColor"
						v-if="data.linkList.accentColor != null"
					>
						Clear
					</settings-button>
				</div>
			</div>
		</div>

		<div class="setting">
			<settings-button type="danger" icon="trash-2" @click="deleteSelf()"
				>Delete</settings-button
			>
		</div>
	</div>
</template>

<script>
import VSwatches from 'vue-swatches'
import FeatherSelector from '../FeatherSelector.vue'

export default {
	components: { FeatherSelector, VSwatches },
	props: ['data'],
	methods: {
		iconSelected(newIcon) {
			this.data.linkList.icon = newIcon
		},
		deleteSelf() {
			let id = this.data.linkList.id

			this.$root.$emit('settingsClosed')

			let settings = this.$settings.data

			this.$delete(
				settings.modules,
				settings.modules.findIndex((obj) => {
					return obj.id === id
				})
			)
		},
		clearAccentColor() {
			this.data.linkList.accentColor = null
		},
	},
}
</script>

<style scoped lang="postcss"></style>
