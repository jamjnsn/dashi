<template>
	<div class="module">
		<div class="module-header">
			<h2 class="module-title">
				<feather :type="settings.icon" size="20"></feather>
				<div class="module-name">{{ settings.name }}</div>
			</h2>

			<div class="controls">
				<a
					class="control-button"
					v-on:click.prevent
					@click="
						$root.$emit('settingsOpened', 'LinkListSettings', {
							linkList: settings
						})
					"
				>
					<feather type="settings" size="18"></feather>
				</a>

				<a class="control-button" @click="addNewLink()">
					<feather type="plus" size="18"></feather>
				</a>
			</div>
		</div>

		<div class="module-body">
			<draggable
				:list="settings.links"
				v-bind="dragOptions"
				:class="isDragging ? 'is-dragging' : 'is-not-dragging'"
				class="link-list"
				:component-data="getComponentData()"
				@start="isDragging = true"
				@end="isDragging = false"
			>
				<transition-group
					type="transition"
					:name="!isDragging ? 'flip-list' : 'fade'"
				>
					<a
						v-for="link in settings.links"
						:href="link.url"
						:key="link.id"
						class="link"
					>
						<link-icon class="icon-container" :link="link" />

						<div class="details">
							<h3>{{ link.name }}</h3>
							<p>{{ link.description }}</p>
						</div>

						<div class="controls">
							<span
								class="edit-link-button"
								v-on:click.prevent
								@click="
									$root.$emit(
										'settingsOpened',
										'LinkSettings',
										{
											link: link,
											parent: settings
										}
									)
								"
							>
								<feather type="settings"></feather>
							</span>
						</div>
					</a>
				</transition-group>
			</draggable>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
import { v4 as uuid } from 'uuid'

export default {
	props: ['settings'],
	data() {
		return {
			isDragging: false
		}
	},
	components: {
		draggable
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost'
			}
		}
	},
	methods: {
		handleEnd() {
			// this.$settings.save()
		},
		inputChanged(value) {
			this.activeNames = value
		},
		addNewLink() {
			this.settings.links.push({
				id: uuid(),
				name: 'New link',
				icon: '',
				url: '#'
			})
		},
		getComponentData() {
			return {
				on: {
					end: this.handleEnd,
					input: this.inputChanged
				},
				attrs: {
					wrap: true
				},
				props: {
					value: this.activeNames
				}
			}
		},
		getIconPath(link) {
			let iconName = link.icon

			if (typeof iconName === 'undefined') {
				iconName = this.parameterize(link.name)
			}

			return '/icons/' + iconName + '.png'
		},
		parameterize(str) {
			return str
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z0-9 -]/, '')
				.replace(/\s/g, '-')
		}
	}
}
</script>

<style scoped lang="scss">
.flex-center {
	display: flex;
	align-items: center;
	justify-content: flex-start;

	.icon {
		padding-right: 0.3em;
	}
}

.flip-list-move {
	transition: transform 0.5s;
}

.no-move {
	transition: transform 0s;
}

.module-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.6em;

	.module-title {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		font-weight: bold;

		span {
			margin-left: 0.2em;
		}

		.module-name {
			margin-left: 0.4em;
		}
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.control-button {
			opacity: 0;
			transition: opacity 0.4s;

			color: $white-bis;
			transition: all 0.1s;
			text-align: center;
			background-color: transparent;
			border-radius: 5px;
			display: block;
			transition: all 0.1s ease-in-out;
			padding: 0.1em 0.5em;

			&:not(:last-child) {
				margin-right: 0.3em;
			}

			&:hover {
				color: $white;
				opacity: 1 !important;
				text-shadow: 0 1px 5px transparentize($white, 0.5);
				background: var(--accent);
			}
		}
	}
}

.module {
	&:hover .control-button {
		opacity: 0.3;
	}
}

.link-list {
	min-height: 100px;
}

.link-list:not(.is-dragging) {
	.link:hover {
		border-color: var(--accent);
	}
}

.link-list.is-dragging {
	.link {
		transition: none;
	}
}

.link {
	display: flex;
	align-items: center;
	color: inherit;
	padding: 1em;
	background-color: lighten($black, 10%);
	border: 3px solid transparent;
	transition: border-color 0.1s ease-in-out;
	transition: transform 0.1s ease-in-out;
	border-radius: 5px;
	margin-bottom: 0.5em;

	.controls {
		justify-self: flex-end;
		flex: 0 0 auto;
	}

	.edit-link-button {
		opacity: 0;
		transition: opacity 0.4s;
	}

	&:hover {
		color: inherit;
		transform: scale(1.02);

		.edit-link-button {
			opacity: 0.3;

			&:hover {
				opacity: 1;
			}
		}
	}

	&.ghost {
		border: 3px dashed $grey-dark;
		background-color: transparent;

		* {
			opacity: 0;
		}
	}
}

.details {
	margin-left: 1em;
	flex: 1 1 auto;
	line-height: 1.2;
	font-size: 1.1rem;

	h3 {
		font-size: 1.2em;
	}

	p {
		color: $grey;
	}
}

.icon-container {
	flex: 0 0 auto;
	display: block;
	width: 48px;
	height: 48px;

	img {
		display: block;
		width: auto;
		height: 100%;
		border-radius: 3px;
	}
}
</style>
