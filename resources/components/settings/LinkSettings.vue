<template>
<div>
    <header>
        <h3>Link Settings</h3>
        <span class="close-button" @click="$root.$emit('settingsClosed');">
            <feather type="x"></feather>
        </span>
    </header>

    <!-- <div class="setting">
        <label>Icon</label>
        <span class="currentIcon"></span>
    </div> -->

    <div class="setting">
        <label>Name</label>
        <input class="input" type="text" v-model="data.link.name" />
    </div>

    <div class="setting">
        <label>Description</label>
        <input class="input" type="text" v-model="data.link.description" />
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
</div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        deleteSelf() {
            let id = this.data.link.id

            this.$root.$emit('settingsClosed');

            this.$delete(
                this.data.parent.links, 
                this.data.parent.links.findIndex((obj) => {
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