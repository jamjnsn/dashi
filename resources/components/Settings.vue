<template>
<div>
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
                    :data="this.view.data">
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
                data: []
            }
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
    }
}
</script>

<style lang="scss">
.vue-swatches__trigger {
    width: 24px !important;
    height: 24px !important;
}

.overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // transition: backdrop-filter 0.1s ease-in-out;
    backdrop-filter: blur(1px);
    background: rgba(0,0,0, 0.7);
    pointer-events: none;

    &.is-blocking {
        pointer-events: all;
    }
}
</style>

<style scoped lang="scss">
@import "../sass/_settings";
.fade-fast-enter-active, .fade-fast-leave-active {
    transition: opacity .1s ease-in-out;
}
.fade-fast-enter, .fade-fast-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>