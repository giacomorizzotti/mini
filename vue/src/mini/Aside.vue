<script setup>
  import { computed } from 'vue'
  import { menuState } from '@/composables/menuState'
  const { isMenuOpen } = menuState()  
  const props = defineProps({
    side: {
      type: [Number, String],
      default: null
    }
  })
  const asideId = computed(() => {
  const id = []
  if (props.side === 'left' || props.side === 'l') {
    id.push('side-left')
  } else if (props.side === 'right' || props.side === 'r') {
    id.push('side-right')
  }
  return id
})
</script>

<template>
  <aside :id="asideId" :class="{ 'open-menu': isMenuOpen }">
    <slot />
  </aside>
</template>

<style lang="scss" scoped>
  aside {
    transition: flex 0.2s ease-out, opacity 0.2s ease-out, padding 0.2s ease-out;
    flex: 0 0 0;
    overflow: hidden;
    &.open-menu {
      padding: calc( var(--padding) * 1 );
      flex: 10;
      @media only screen and (min-width: 576px) {
        flex: 3;
      }
      @media only screen and (min-width: 768px) {
        flex: 2.5;
      }
      @media only screen and (min-width: 1200px) {
        flex: 2;
      }
      @media only screen and (min-width: 1920px) {
        flex: 1.5;
      }
    }
  }
  aside#side-right {
    order: 2;
    @media only screen and (min-width: 992px) {
      order: 3;
    }
  }
  aside#side-left {
    order: 1;
    @media only screen and (min-width: 992px) {
      order: 1;
    }
  }
</style>
