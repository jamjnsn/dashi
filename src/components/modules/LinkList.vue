<template>
	<div
		class="module"
		:class="{
			'has-background': $settings.data.theme.modulesHaveBackground,
		}"
		:style="theme"
	>
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
							linkList: settings,
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
								$root.$emit('settingsOpened', 'LinkSettings', {
									link: link,
									parent: settings,
								})
							"
						>
							<feather type="settings"></feather>
						</span>
					</div>
				</a>
			</draggable>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
import { v4 as uuid } from 'uuid'
import colorSet from '../../colorSet'

export default {
	props: ['settings'],
	data() {
		return {
			isDragging: false,
		}
	},
	components: {
		draggable,
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			}
		},
		theme() {
			let accent = colorSet(
				this.settings.accentColor ??
					this.$settings.data.theme.accentColor
			)

			return {
				...accent.toTheme('accent'),
				'--module-body-background': accent.normal.darken(0.8),
				'--module-link-background': accent.normal.darken(0.9),
				'--module-header-color': accent.normal.darken(0.85),
			}
		},
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
				url: '#',
			})
		},
		getComponentData() {
			return {
				on: {
					end: this.handleEnd,
					input: this.inputChanged,
				},
				attrs: {
					wrap: true,
				},
				props: {
					value: this.activeNames,
				},
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
		},
	},
}
</script>

<style scoped lang="postcss">
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

		font-weight: normal;

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

			transition: all 0.1s;
			text-align: center;
			background-color: transparent;
			border-radius: 5px;
			display: block;
			transition: all 0.1s ease-in-out;

			&:not(:last-child) {
				margin-right: 0.3em;
			}

			&:hover {
				opacity: 1 !important;
				background: var(--accent);
			}
		}
	}
}

.module {
	display: flex;
	flex-direction: column;

	&:hover .control-button {
		opacity: 0.3;
	}
}

.module-body {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
}

.link-list {
	min-height: 100px;
	height: 100%;
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
	padding: 0.9em;
	background-color: var(--card-background);
	backdrop-filter: blur(20px);
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
		border-color: var(--accent-darker) !important;

		.edit-link-button {
			opacity: 0.3;

			&:hover {
				opacity: 1;
			}
		}
	}

	&.ghost {
		border: 3px dashed var(--accent-lighter);
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
	font-size: 1em;

	h3 {
		font-size: 1.2em;
	}

	p {
		color: var(--grey);
	}
}

.icon-container {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;

	img {
		object-fit: contain;
		object-position: center center;
		border-radius: 3px;
	}
}

.module.has-background {
	color: var(--accent);

	.module-header {
		background-color: var(--accent);
		color: var(--module-header-color);
		border-radius: 0.4em 0.4em 0 0;
	}

	.module-body {
		padding: 0.75em;
		background-color: var(--module-body-background);
		border: 0.3em solid var(--accent);
		border-top: 0;
		border-radius: 0 0 0.4em 0.4em;
	}

	.link {
		background: var(--module-link-background);
	}

	.details p {
		color: var(--accent);
		opacity: 0.7;
	}
}
</style>
