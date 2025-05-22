<script setup>
import { menuState } from '@/composables/menuState'
const { isMenuOpen } = menuState()    
</script>

<template>
  <main :class="{ 'open-menu': isMenuOpen }">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
  main {
    background: var(--white);
    transition: flex 0.2s ease-out, border-radius 0.2s ease-out, box-shadow 0.2s ease-out, padding 0.2s ease-out;
    flex: 10;
    overflow: hidden;
    order: 3;
    @media only screen and (min-width: 992px) {
      order: 2;
    }
    &.open-menu {
      padding: calc(var(--padding) * 2);
      -webkit-border-top-right-radius: 15px;
      -moz-border-radius-topright: 15px;
      border-top-right-radius: 15px;
      -webkit-border-top-left-radius: 15px;
      -moz-border-radius-topleft: 15px;
      border-top-left-radius: 15px;
      -webkit-box-shadow: 0 0 10px 10px rgba(0 0 0 / 10%);
      -moz-box-shadow: 0 0 10px 10px rgba(0 0 0 / 10%);
      box-shadow: 0 0 10px 10px rgba(0 0 0 / 10%);
      flex: 10;
    }
  }
</style>
