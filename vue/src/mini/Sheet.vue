<script setup>
import { computed } from 'vue'
import { menuState } from '@/composables/menuState'
const { isMenuOpen } = menuState()
import { useScroll } from '@vueuse/core'
const scroll = useScroll(window)

const sheetClasses = computed(() => {
  const classes = []
  // Scroll
  scroll.arrivedState.top ? classes.push('top') : classes.push('scrolled')
  // Menu open
  if (isMenuOpen.value == true) classes.push('open-menu')
  return classes
})

</script>

<template>
  <div 
    id="sheet"
    :class="sheetClasses"
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
