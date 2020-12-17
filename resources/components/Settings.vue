<template>
<transition name="slide">
    <div class="settings" v-if="isOpen">
        <div class="content">
            <header>
                <h3>Settings</h3>
                <span class="close-button" @click="isOpen = false">
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
                        class="color-picker">
                    </v-swatches>
                </div>
            </div>

            <div class="setting inline-field">
                <label>Topbar Background</label>
                <div>
                    <toggle v-model="settings.theme.topbarHasBackground"></toggle>
                </div>
            </div>

            <div class="setting">
                <label>Name</label>
                <input class="input" type="text" v-model="settings.name" />
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import VSwatches from 'vue-swatches'
import settingTypes from '../settings'
import Toggle from './Toggle.vue'

export default {
    data() {
        return {
            isOpen: false,
            settings: this.$settings.data
        }
    },
    components: { VSwatches },
    mounted() {
        this.$root.$on('settingsOpened', () => {
            this.isOpen = true
        })
    }
}
</script>

<style lang="scss">
.vue-swatches__trigger {
    width: 24px !important;
    height: 24px !important;
}
</style>

<style scoped lang="scss">
@import "vue-swatches/dist/vue-swatches.css";

.slide-enter-active, .slide-leave-active {
    transition: all 0.2s ease;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
}

header {
    display: flex;
    justify-content: space-between;
}

.close-button {
    cursor: pointer;
    &:hover {
        color: var(--accent-color);
    }
}

.settings {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 400px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(50px);
    $shadow: transparentize($black, 0.5);
    box-shadow: 0 0 15px $shadow, 0 0 35px $shadow, 0 0 70px $shadow;
    padding: 2em;
}

.setting {
    background: $black-bis;
    padding: 1em;
    border-radius: 4px;

    &:not(:last-child) {
        margin-bottom: 0.5em;
    }

    &:not(.inline-field) label {
        margin-bottom: 0.1em;
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
</style>