<template>
    <div class="module" :class="type">
        <div class="module-header">
            <h2 class="module-title">
                <feather :type="icon" size="18"></feather>
                <span>{{ name }}</span>
            </h2>
        </div>

        <div class="module-body">
            <a 
                :href="link.url"
                v-for="link in links"
                class="link">
                <div class="icon-container">
                    <img src="https://via.placeholder.com/150" />
                </div>

                <div class="details">
                    <h3>{{ link.name }}</h3>
                    <p>{{ link.description }}</p>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'settings'
        ],
        data() {
            return {
                ...this.settings
            }
        }
    }
</script>

<style scoped lang="scss">
@import '~bulma';

.module {
    padding: 1em;
}

.module-title {
    @extend .is-size-5;
    font-weight: bold;
    padding: 0.6em;

    span {
        margin-left: 0.2em;
    }
}

.link {
    display: flex;
    align-items: center;
    color: inherit;
    padding: 1em;
    background-color: lighten($black, 10%);
    border-radius: 4px;
    border: 3px solid transparent;
    transition: border-color 0.1s ease-in-out;

    &:not(:last-child) {
        margin-bottom: 0.5em;
    }

    &:hover {
        color: inherit;
        border-color: $primary;
    }
}

.details {
    margin-left: 1em;

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
    display: block;
    width: 48px;
    height: 48px;

    img {
        display: block;
        width: auto;
        height: 100%;
    }
}

.link-list {
    flex: 1 1 calc(100% / 3);
}
</style>