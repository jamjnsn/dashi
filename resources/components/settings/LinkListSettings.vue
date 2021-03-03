<template>
<div>
    <header>
        <h3>Link List Settings</h3>
        <span class="close-button" @click="$root.$emit('settingsClosed');">
            <feather type="x"></feather>
        </span>
    </header>

    <div class="setting">
        <label>Name</label>
        <input class="input" type="text" v-model="data.linkList.name" />
    </div>

    <div class="setting">
        <a class="button is-danger" @click="deleteSelf()">
            <feather type="trash-2"></feather>
            <span>Delete</span>
        </a>
    </div>
</div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        deleteSelf() {
            let id = this.data.linkList.id

            this.$root.$emit('settingsClosed')

            let settings = this.$settings.data

            this.$delete(
                settings.modules, 
                settings.modules.findIndex((obj) => {
                    return obj.id === id
                }
            ))
        } 
    }
}
</script>

<style scoped lang="scss">
@import "../../sass/_settings";
</style>