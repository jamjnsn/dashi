<template>
  <div class="feather-selector">
    <div
      class="current-icon"
      @click="toggleIconList()"
      v-bind:class="{ 'is-active': iconSelectOpen }"
    >
      <feather :type="type" size="20"></feather>
    </div>

    <transition name="fade">
      <div class="icon-list" v-if="iconSelectOpen">
        <div class="icon-search">
          <input
            ref="search"
            type="text"
            class="input"
            placeholder="Search..."
            @input="filterIcons($event.target.value)"
            @blur="iconSelectOpen = false"
          />
        </div>

        <div class="icons">
          <div
            class="icon"
            v-for="icon in filteredIcons"
            :key="icon.name"
            @click="iconSelected(icon.name)"
          >
            <feather :type="icon.name"></feather>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const feather = require("feather-icons");

export default {
  props: ["type"],
  methods: {
    iconSelected(name) {
      console.log(name);
      this.iconSelectOpen = false;
      this.$emit("iconSelected", name);
    },
    filterIcons(query) {
      this.filteredIcons = this.icons.filter((icon) => {
        return icon.name.includes(query);
      });
    },
    toggleIconList() {
      this.iconSelectOpen = !this.iconSelectOpen;

      if (this.iconSelectOpen) {
        this.$nextTick(function() {
          this.$refs.search.focus();
        });
      }
    },
  },
  data() {
    return {
      iconSelectOpen: false,
      icons: [],
      filteredIcons: [],
    };
  },
  created() {
    for (const [key, value] of Object.entries(feather.icons)) {
      this.icons.push(value);
    }

    this.filteredIcons = this.icons;
  },
};
</script>

<style scoped lang="scss">
.feather-selector {
  position: relative;
}

.current-icon {
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: var(--accent);
    filter: drop-shadow(0 0 5px var(--accent));
  }
}

.icon-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 2em;
  width: 285px;
  height: 330px;
  background: $black-ter;
  border: 0.5em solid $black-ter;
  z-index: 10;
  border-radius: 5px;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.6);
  padding: 0.25em;

  .icon-search {
    flex: 0 0 auto;
    padding-bottom: 1em;

    input {
      border: 0;
      outline: 0;

      &:focus {
        border: 3px solid var(--accent);
      }
    }
  }

  .icons {
    padding-right: 0.5em;
    flex: 1 1 auto;
    flex-wrap: wrap;
    overflow-y: auto;
  }

  .icon {
    display: inline-block;
    cursor: pointer;
    padding: 0.5em;
    box-sizing: content-box;

    &:hover {
      background: $black-bis;
      border-radius: 3px;
    }
  }
}
</style>
