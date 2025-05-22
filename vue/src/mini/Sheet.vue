<script setup>
import { menuState } from '@/composables/menuState'
const { isMenuOpen } = menuState()
</script>

<template>
  <div 
    id="sheet"
    :class="{ 'open-menu': isMenuOpen }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
#sheet {
  display: flex;
  flex-flow: column wrap;
  align-items: stretch;
  background: var(--sheet-color);
  transition: padding 0.2s ease-out;
  min-height: 100vh;
  overflow: hidden;
  @media only screen and (min-width: 992px) {
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: stretch;
  }
  &.open-menu {
    padding-top: calc((var(--menu-toggle-height)) + var(--margin) * 2 );
  }
}
</style>
