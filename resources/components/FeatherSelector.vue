<template>
<div class="feather-selector">
    <div class="current-icon" @click="iconSelectOpen = !iconSelectOpen">
        <feather :type="type" size="20"></feather>
    </div>

    <transition name="fade">
    <div class="icon-list" v-if="iconSelectOpen">
        <div class="icon-search">
            <input 
                type="text" 
                class="input" 
                placeholder="Search..." 
                @input="filterIcons($event.target.value)" />
        </div>

        <div class="icons">
            <div class="icon" v-for="icon in filteredIcons" :key="icon.name" @click="iconSelected(icon.name)">
                <feather :type="icon.name"></feather>
            </div>
        </div>
    </div>
    </transition>
</div>
</template>

<script>
const feather = require('feather-icons')

export default {
    props: ['type'],
    methods: {
        iconSelected(name) {
            console.log(name)
            this.iconSelectOpen = false
            this.$emit('iconSelected', name)
        },
        filterIcons(query) {
            this.filteredIcons = this.icons.filter(icon => {
                return icon.name.includes(query)
            })
        }
    },
    data() {
        return {
            iconSelectOpen: false,
            icons: [],
            filteredIcons: []
        }
    },
    created() {
        for(const [key, value] of Object.entries(feather.icons)) {
            this.icons.push(value)
        }

        this.filteredIcons = this.icons
    }
}
</script>

<style scoped lang="scss">
.feather-selector {
    position: relative;
}

.current-icon {
    cursor: pointer;
}

.icon-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 2em;
    left: -2em;
    width: 280px;
    height: 320px;
    background: $black-ter;
    border: 0.5em solid $black-ter;
    z-index: 10;
    border-radius: 5px;
    box-shadow: 0 5px 45px rgba(0,0,0,0.6);

    .icon-search {
        flex: 0 0 auto;
        padding-bottom: 0.5em;
    }

    .icons {
        padding-right: 0.5em;
        flex: 1 1 auto;
        // display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
    }

    .icon {
        cursor: pointer;
        margin: 0.5em;
    }
}
</style>