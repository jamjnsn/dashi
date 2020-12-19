<template>
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
</style>

<style scoped lang="scss">
@import "../sass/_settings";
</style>