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

    <div class="setting inline-field">
        <label>Add Category</label>
        <div>
            <a class="button" @click="addModule('link-list')">
                <feather type="plus"></feather>
            </a>
        </div>
    </div>
</div>
</template>

<script>
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

            if(moduleDefinition) {
                let module = { 
                    id: uuid(),
                    type: type,
                    ...moduleDefinition.template 
                }

                this.$settings.data.modules.push(module)
            } else {
                console.log("Module type "+type+" not found!")
            }
        }
    },
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