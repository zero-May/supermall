<template>
  <div class="check-btn" :class="{ active: isChecked }">
    <img src="~assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "CheckBtn",
  props: {
    isChecked: {
        type: Boolean,
        default: false
      }
  },
  
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.check-btn {
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
}
.check-btn img {
  padding: 3px;
}
.active {
  background-color: pink;
}
</style>
