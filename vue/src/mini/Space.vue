<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    height: {
      type: [Number, String],
      default: null
    }
  })
  const boxClass = computed(() => props.size ? `space-${props.height}`: `space`)
</script>

<template>
  <div :class="boxClass"></div>
</template>

<style lang="scss" scoped>
</style>
