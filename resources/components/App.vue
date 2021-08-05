<template>
  <div id="app" :style="theme">
    <topbar></topbar>
    <div class="container" id="content">
      <div class="modules">
        <component
          v-for="module in settings.modules"
          v-bind:is="module.type"
          :settings="module"
          :key="module.id"
        >
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
  data() {
    return {
      settings: this.$settings.data,
    };
  },
  mounted() {},
  methods: {},
  computed: {
    theme() {
      return {
        "--accent": this.settings.theme.accentColor,
      };
    },
  },
  watch: {
    settings: {
      handler(val) {
        this.$settings.save();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "../css/reset.css";
@import "../css/fonts/poppins.css";

* {
  scrollbar-width: thin;
  scrollbar-color: $grey-darker $grey;
}

*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: $grey-darker;
}

*::-webkit-scrollbar-thumb {
  background-color: $grey;
  padding: 0.2em;
}

* * {
  box-sizing: border-box;
  position: relative;
}

html,
body,
#app {
  height: 100vh;
}

body {
  font-family: var(--main-font);
  font-size: 18px;
  line-height: 1.4;

  color: $fg-color;
  background: $bg-color;
}

a {
  text-decoration: none;
}

::selection {
  background-color: var(--accent);
  color: $white;
}

i.feather {
  vertical-align: middle;
}

.has-background-accent {
  background-color: var(--accent);
  color: var(--accent-contrast);
}

#app {
  width: 100vw;

  display: flex;
  flex-direction: column;
}

#content {
  overflow-y: auto;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>

<style scoped lang="scss">
.modules {
  display: flex;
  flex-wrap: wrap;

  .module {
    flex: 1 0 auto;
    width: 400px;

    &:not(.spacer) {
      padding: 1rem;
    }
  }
}
</style>
