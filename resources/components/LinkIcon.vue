<template>
<div>
    <img class="link-icon" :src="iconPath" />
</div>
</template>

<script>
export default {
    props: ['link'],
    computed: {
        iconPath() {
            let iconName = this.link.icon

            if(typeof(iconName) === 'undefined') {
                iconName = this.defaultIconName+'.png'
            }

            return '/icons/'+iconName
        },
        defaultIconName() {
            return this.link.name.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
        }
    }
}
</script>

<style scoped lang="scss">
    .link-icon {
        width: 50px;
        height: auto;
        display: block;
        border-radius: 4px;
        // margin: 0 auto;
    }
</style>