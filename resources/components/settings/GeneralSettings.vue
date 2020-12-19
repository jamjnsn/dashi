<template>
<div>
    <header>
        <h3>Settings</h3>
        <span class="close-button" @click="$root.$emit('settingsClosed');">
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
        <label>Your Name</label>
        <input class="input" type="text" v-model="settings.name" />
    </div>
</div>
</template>

<script>
import VSwatches from 'vue-swatches'
import Toggle from '../Toggle.vue'

export default {
    data() {
        return {
            settings: this.$settings.data
        }
    },
    components: { VSwatches }
}
</script>

<style scoped lang="scss">
@import "../../sass/_settings";
</style>