<template>
	<div id="settings-container">
		<transition name="fade-fast">
			<div
				class="overlay"
				@click="$root.$emit('settingsClosed')"
				:class="isOpen && 'is-blocking'"
				v-if="isOpen"
			></div>
		</transition>

		<transition name="slide">
			<div class="settings" v-if="isOpen">
				<div class="content">
					<component
						v-bind:is="this.view.name"
						:data="this.view.data"
					>
					</component>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import settingTypes from '../settings'

export default {
	data() {
		return {
			isOpen: this.$showSettingsPanel,
			settings: this.$settings.data,
			view: {
				name: '',
				data: [],
			},
		}
	},
	mounted() {
		this.$root.$on('settingsOpened', (view, data) => {
			this.isOpen = true
			this.view.name = view
			this.view.data = data
		})

		this.$root.$on('settingsClosed', () => {
			this.isOpen = false
		})
	},
}
</script>

<style lang="postcss">
@import 'vue-swatches/dist/vue-swatches.css';

.slide-enter-active,
.slide-leave-active {
	transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(100%);
	opacity: 0;
}

#settings-container {
	header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}

	.close-button {
		cursor: pointer;
		transition: all 0.1s ease;

		&:hover {
			color: var(--primary);
			transform: scale(1.2);
		}
	}

	.settings {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		width: 400px;
		background: rgba(0, 0, 0, 0.99);
		backdrop-filter: blur(50px);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 0, 0, 0.7);
		padding: 2em;
	}

	.setting {
		background: var(--black-lighter);
		padding: 1em;
		border-radius: 4px;

		&:not(:last-child) {
			margin-bottom: 0.5em;
		}

		&:not(.inline-field) label {
			display: block;
			margin-bottom: 0.25em;
		}

		label {
			font-size: 0.95em;
		}

		.input {
			display: block;
			background: var(--white);
			width: 100%;
			color: var(--black);
			padding: 0.6em;
			border-radius: 0.2em;
			outline: 0;
			border: 3px solid var(--grey);
			transition: 0.1s ease;

			&:focus {
				border-color: var(--accent);
			}
		}
	}

	.inline-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.color-picker {
		display: flex;
		align-items: center;
	}

	.vue-swatches__trigger {
		width: 24px !important;
		height: 24px !important;
	}

	.buttons {
		display: flex;
		align-items: center;

		& > * {
			display: block;
			flex: 0 0 auto;

			&:not(:last-child) {
				margin-right: 0.4em;
			}
		}
	}

	.button {
		display: inline-block;
		padding: 0.65em 1em;
		border-radius: 0.4em;
		transition: all 0.1s ease;
		cursor: pointer;
		background-color: var(--primary);
		color: var(--black);

		&:hover {
			background-color: var(--primary-dark);
		}

		.button-container {
			display: flex;
			align-items: center;
			height: 100%;
		}

		.icon {
			display: flex;
			align-items: center;

			&:not(:last-child) {
				margin-right: 0.4em;
			}
		}

		&[buttontype='danger'] {
			background-color: var(--red);
			color: var(--white);

			&:hover {
				background-color: var(--red);
			}
		}

		&[buttontype='ghost'] {
			background-color: transparent;
			color: currentColor;
			padding-left: 0;
			padding-right: 0;

			&:hover {
			}
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		backdrop-filter: blur(5px);
		background: rgba(0, 0, 0, 0.8);
		pointer-events: none;

		/* if backdrop support: very transparent and blurred */
		@supports (
			(-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
		) {
			background-color: rgba(255, 255, 255, 0.5);
			-webkit-backdrop-filter: blur(2em);
			backdrop-filter: blur(2em);
		}

		&.is-blocking {
			pointer-events: all;
		}
	}
}
</style>
