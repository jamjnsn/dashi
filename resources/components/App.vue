<template>
    <div id="app" :style="theme">
        <topbar></topbar>
        <div class="container" id="content">
            <div class="modules">
                <component 
                    v-for="(module, index) in settings.modules" 
                    v-bind:is="module.type" 
                    :settings="module"
                    :key="module.id">
                    </component>
                <div class="module spacer"></div>
                <div class="module spacer"></div>
                <div class="module spacer"></div>
                <div class="module spacer"></div>
            </div>
        </div>
        <settings></settings>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                settings: this.$settings.data
            }
        },
        mounted () {
        },
        methods: {
        },
        computed: {
            theme() {
                return {
                    '--accent-color': this.settings.theme.accentColor
                }
            }
        },
        watch: {
            settings: {
                handler(val) {
                    this.$settings.save()
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../sass/app';
</style>

<style scoped lang="scss">
    .modules {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;

        .module {
            padding: 0 1em 1em 1em;
            flex: 1 0 400px;
            width: 400px;
        }

        .spacer {
            
        }
    }

    #content {
        overflow-y: auto;
    }
</style>