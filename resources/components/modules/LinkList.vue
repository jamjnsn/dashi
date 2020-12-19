<template>
    <div class="module">
        <div class="module-header">
            <h2 class="module-title">
                <feather :type="settings.icon" size="18"></feather>
                <span>{{ settings.name }}</span>
            </h2>
        </div>

        <div class="module-body">
            <draggable 
                :list="settings.links"
                v-bind="dragOptions"
                :class="isDragging ? 'is-dragging' : 'is-not-dragging'"
                class="link-list"
                :component-data="getComponentData()"
                @start="isDragging = true"
                @end="isDragging = false">
                <transition-group type="transition" :name="!isDragging ? 'flip-list' : 'fade'">
                    <a 
                        v-for="link in settings.links"
                        :href="link.url"
                        :key="link.id"
                        class="link">
                        <div class="icon-container">
                            <img :src="getIconPath(link)" />
                        </div>

                        <div class="details">
                            <h3>{{ link.name }}</h3>
                            <p>{{ link.description }}</p>
                        </div>

                        <div class="controls">
                            <span class="edit-link-button"
                                v-on:click.prevent
                                @click="$root.$emit('settingsOpened', 'LinkSettings', {
                                    link: link,
                                    parent: settings
                                });">
                                <feather type="settings"></feather>
                            </span>
                        </div>
                    </a>
                </transition-group>
            </draggable>
            <a class="add-link-button" @click="addNewLink()">
                <feather type="plus"></feather>
            </a>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import { v4 as uuid } from 'uuid'

    export default {
        props: [
            'settings'
        ],
        data() {
            return {
                isDragging: false
            }
        },
        components: { 
            draggable
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        methods: {
            handleEnd() {
                // this.$settings.save()
            },
            inputChanged(value) {
                this.activeNames = value;
            },
            addNewLink() {
                
                this.settings.links.push({
                    id: uuid(),
                    name: "New link",
                    icon: "dashi",
                    url: "#"
                })
            },
            getComponentData() {
                return {
                    on: {
                        end: this.handleEnd,
                        input: this.inputChanged
                    },
                    attrs:{
                        wrap: true
                    },
                    props: {
                        value: this.activeNames
                    }
                };
            },
            getIconPath(link) {
                let iconName = link.icon

                if(typeof(iconName) === 'undefined') {
                    iconName = this.parameterize(link.name)
                }

                return '/icons/'+iconName+'.png'
            },
            parameterize(str) {
                return str.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
            }
        }
    }
</script>

<style scoped lang="scss">
@import '~bulma';

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.module {
    padding: 1em;

    .add-link-button {
        opacity: 0;
        transition: opacity 0.4s;

        color: $white-bis;
        transition: all 0.1s;
        text-align: center;
        padding: 1em;
        background-color: transparent;
        border-radius: 5px;
        display: block;

        &:hover {
            color: $white-bis;
            opacity: 1 !important;
            text-shadow: 0 1px 5px transparentize($white, 0.5);
            background-color: $black-bis;
        }
    }

    &:hover .add-link-button {
        opacity: 0.2;
    }
}

.module-title {
    @extend .is-size-5;
    font-weight: bold;
    padding: 0.6em;

    span {
        margin-left: 0.2em;
    }
}

.link-list:not(.is-dragging) {
    .link:hover {
        border-color: var(--accent-color);
    }
}

.link-list.is-dragging {
    .link {
        transition: none;
    }
}

.link {
    display: flex;
    align-items: center;
    color: inherit;
    padding: 1em;
    background-color: lighten($black, 10%);
    border: 3px solid transparent;
    transition: border-color 0.1s ease-in-out;
    border-radius: 5px;
    margin-bottom: 0.5em;

    .controls {
        justify-self: flex-end;
        flex: 0 0 auto;
    }

    .edit-link-button {
        opacity: 0;
        transition: opacity 0.4s;
    }

    &:hover {
        color: inherit;

        .edit-link-button {
            opacity: 0.3;

            &:hover {
                opacity: 1;
            }
        }
    }

    &.ghost {
        border: 3px dashed $grey-dark;
        background-color: transparent;

        * {
            opacity: 0;

        }
    }
}



.details {
    margin-left: 1em;
    flex: 1 1 auto;

    h3 {
        @extend .is-size-4;
        line-height: 1em;
    }

    p {
        color: $grey;
        line-height: 1em;
    }
}

.icon-container {
    flex: 0 0 auto;
    display: block;
    width: 48px;
    height: 48px;

    img {
        display: block;
        width: auto;
        height: 100%;
        border-radius: 3px;
    }
}

.module {
    flex: 1 1 calc(100% / 3);
}
</style>