<template>
  <div>
    <header>
      <h3>Link List Settings</h3>
      <span class="close-button" @click="$root.$emit('settingsClosed')">
        <feather type="x"></feather>
      </span>
    </header>

    <div class="setting">
      <label>Name</label>
      <input class="input" type="text" v-model="data.linkList.name" />
    </div>

    <div class="setting">
      <label>Icon</label>
      <div class="icon-select-container">
        <feather-selector
          :type="data.linkList.icon"
          @iconSelected="iconSelected"
        ></feather-selector>
      </div>
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
import FeatherSelector from "../FeatherSelector.vue";
export default {
  components: { FeatherSelector },
  props: ["data"],
  methods: {
    iconSelected(newIcon) {
      this.data.linkList.icon = newIcon;
    },
    deleteSelf() {
      let id = this.data.linkList.id;

      this.$root.$emit("settingsClosed");

      let settings = this.$settings.data;

      this.$delete(
        settings.modules,
        settings.modules.findIndex((obj) => {
          return obj.id === id;
        })
      );
    },
  },
};
</script>
