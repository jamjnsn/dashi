<template>
<div>
    <span class="toggle-button" :class="value ? 'is-on' : 'is-off'">
        <input 
            type="checkbox"
            :checked="value"
            @change="$emit('input', $event.target.checked)" />

        <div>
            <feather type="toggle-left" v-if="!value"></feather>
            <feather type="toggle-right" v-if="value"></feather>
        </div>
    </span>
</div>
</template>

<script>
export default {
    props: ['value']
}
</script>

<style scoped lang="scss">
input {
    opacity: 0;
    position: absolute;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

div {
    display: inline-block;
    transition: none;
}
</style>