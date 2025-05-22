<script setup>
  import { ref, onMounted } from 'vue'
  const props = defineProps({
    logoUrl: {
      type: [String],
      default: null
    },
  })
  
const loaderClass = ref(['loader'])
onMounted(() => {
  loaderClass.value.push('done')
} )
</script>

<template>
  <div :class="loaderClass">
    <img v-if="logoUrl" :src="logoUrl" class="loader-logo"/>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background: var(--white);
  z-index: 109;
  opacity: 1;
  transition: transform 0.15s ease-in, opacity 0.15s ease-in, filter 0.15s ease-in;
  img.loader-logo {
    display: block;
    width: auto;
    height: 3vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.done {
    transform: translate(0, -200%);
    opacity: 0;
    filter: blur(320px);
  }
  &.gone {
    display: none;
  }
}
</style>
