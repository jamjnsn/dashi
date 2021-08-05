<template>
  <div class="toggle-button">
    <div class="toggle-icon" :class="value ? 'is-on' : 'is-off'">
      <span></span>
      <span></span>
    </div>

    <input
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped lang="scss">
.toggle-button {
  width: 24px;
  height: 24px;
}

.toggle-icon {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &.is-on {
    span {
      &:nth-child(1) {
        background-color: $green;
      }
      &:nth-child(2) {
        left: auto;
        right: 0%;
      }
    }
  }

  span {
    display: block;
    position: absolute;
    transition: 0.1s ease;

    &:nth-child(1) {
      top: 50%;
      transform: translateY(-50%);
      height: 3px;
      width: 100%;
      background: $grey;
      border-radius: 5em;
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      left: 0%;
      width: 0.75em;
      height: 0.75em;
      border-radius: 9999px;
      background: $white;
      box-shadow: 0 0 0.5em $black;
    }
  }
}

input {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
</style>
