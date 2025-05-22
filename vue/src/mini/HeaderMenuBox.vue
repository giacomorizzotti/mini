<script setup>
import Box from '@/mini/Box.vue';
</script>

<template>
  <Box id="header-menu-box">
    <slot />
  </Box>
</template>

<style lang="scss" scoped>
#header-menu-box {
  display: none;
  @media only screen and (min-width: 768px) {
    display: flex;
  }
}
</style>
