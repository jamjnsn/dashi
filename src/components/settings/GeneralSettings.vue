<template>
	<div>
		<header>
			<h3>Settings</h3>
			<span class="close-button" @click="$root.$emit('settingsClosed')">
				<feather type="x"></feather>
			</span>
		</header>
		<div class="setting inline-field">
			<label>Accent Color</label>
			<div>
				<v-swatches
					v-model="settings.theme.accentColor"
					show-fallback
					fallback-input-type="color"
					popover-x="left"
					class="color-picker"
				>
				</v-swatches>
			</div>
		</div>

		<div class="setting">
			<label>Font</label>
			<div>
				<input v-model="settings.theme.mainFont" class="input" />
			</div>
		</div>

		<div class="setting">
			<label>Wallpaper</label>
			<div class="background-selector buttons">
				<div class="button">
					<div class="button-container">
						<span class="icon">
							<feather type="upload" size="16" />
						</span>
						<span class="button-label">Upload</span>
					</div>
					<input
						type="file"
						class="file-selector"
						name="wallpaper"
						:disabled="isUploading"
						@change="wallpaperSelected($event.target.files)"
						accept="image/*"
					/>
				</div>

				<settings-button
					icon="x"
					type="ghost"
					v-if="settings.theme.wallpaper !== ''"
					@click="removeBackground"
				>
				</settings-button>
			</div>
		</div>

		<div class="setting inline-field">
			<label>Topbar Background</label>
			<div>
				<Toggle v-model="settings.theme.topbarHasBackground"></Toggle>
			</div>
		</div>

		<div class="setting inline-field">
			<label>Module Background</label>
			<div>
				<Toggle v-model="settings.theme.modulesHaveBackground"></Toggle>
			</div>
		</div>

		<div class="setting inline-field">
			<label>Add Category</label>
			<div>
				<a @click="addModule('link-list')" class="add-category-button">
					<feather type="plus"></feather>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import http from 'axios'

import VSwatches from 'vue-swatches'
import Toggle from '../Toggle.vue'
import { v4 as uuid } from 'uuid'

import modules from '/modules.json'

export default {
	methods: {
		addModule(type) {
			let moduleDefinition = modules.find((obj) => {
				return obj.type === type
			})

			if (moduleDefinition) {
				let module = {
					id: uuid(),
					type: type,
					...moduleDefinition.template,
				}

				this.$settings.data.modules.push(module)
			} else {
				console.log('Module type ' + type + ' not found!')
			}
		},
		removeBackground() {
			this.settings.theme.wallpaper = ''
		},
		wallpaperSelected(files) {
			const formData = new FormData()
			if (!files.length) return

			formData.append('wallpaper', files[0])

			let self = this

			http({
				method: 'post',
				url: '/wallpaper/upload',
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then((response) => {
					return response.data
				})
				.then((data) => {
					this.settings.theme.wallpaper =
						data.fileName + '?' + Date.now()
					console.log(data.fileName)
				})
				.catch(function (error) {
					console.log(error)
				})
		},
	},
	data() {
		return {
			settings: this.$settings.data,
			isUploading: false,
		}
	},
	components: { VSwatches, Toggle },
}
</script>

<style scoped lang="postcss">
.add-category-button {
	cursor: pointer;

	&:hover {
		color: var(--green);
	}
}

.background-selector {
	display: flex;
	flex-direction: row;
}

.file-selector {
	position: absolute;
	cursor: pointer;
	opacity: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.upload-button {
	position: static;
}
</style>
