<template>
	<div>
		<form enctype="multipart/form-data" novalidate>
			<header>
				<h3>Link Settings</h3>
				<span
					class="close-button"
					@click="$root.$emit('settingsClosed')"
				>
					<feather type="x"></feather>
				</span>
			</header>

			<div class="setting">
				<label>Icon</label>
				<div class="icon-selector">
					<link-icon :link="data.link" />

					<div class="upload-button-container">
						<div class="upload-icon-container">
							<div class="icon">
								<feather type="upload" size="22"></feather>
							</div>
						</div>
						<input
							type="file"
							class="file-selector"
							name="icon"
							:disabled="isUploading"
							@change="iconSelected($event.target.files)"
							accept="image/*"
						/>
					</div>
				</div>
			</div>

			<div class="setting">
				<label>Name</label>
				<input class="input" type="text" v-model="data.link.name" />
			</div>

			<div class="setting">
				<label>Description</label>
				<input
					class="input"
					type="text"
					v-model="data.link.description"
				/>
			</div>

			<div class="setting">
				<label>URL</label>
				<input class="input" type="text" v-model="data.link.url" />
			</div>

			<div class="setting">
				<a class="button is-danger" @click="deleteSelf()">
					<feather type="trash-2"></feather>
					<span>Delete</span>
				</a>
			</div>
		</form>
	</div>
</template>

<script>
import http from 'axios'

export default {
	props: ['data'],
	data() {
		return {
			isUploading: false,
		}
	},
	methods: {
		deleteSelf() {
			let id = this.data.link.id

			this.$root.$emit('settingsClosed')

			this.$delete(
				this.data.parent.links,
				this.data.parent.links.findIndex((obj) => {
					return obj.id === id
				})
			)
		},
		updateIcon(fileName) {
			this.$set(this.data.link, 'icon', fileName + '?' + Date.now())
		},
		iconSelected(files) {
			const formData = new FormData()
			if (!files.length) return

			formData.append('linkId', this.data.link.id)
			formData.append('icon', files[0])

			let self = this

			http({
				method: 'post',
				url: '/icons/upload',
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then((response) => {
					return response.data
				})
				.then((data) => {
					self.updateIcon(data.fileName)
					console.log(data.fileName)
				})
				.catch(function (error) {
					console.log(error)
				})
		},
	},
}
</script>

<style scoped lang="postcss">
.icon-selector {
	position: relative;
	display: block;
	width: 50px;
	height: 50px;
	cursor: pointer;

	&:hover {
		filter: drop-shadow(0 0.1em 0.2em var(--black));
		.upload-button-container {
			opacity: 1;
		}
	}

	.upload-button-container {
		opacity: 0;
		transition: opacity 0.1s ease-in-out;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		cursor: pointer;

		.file-selector {
			cursor: pointer;
			opacity: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
		}

		.upload-icon-container {
			cursor: pointer;
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				box-sizing: content-box;
				background: var(--accent-color);
				padding: 0.2em;
				border-radius: 100%;
			}
		}
	}
}
</style>
