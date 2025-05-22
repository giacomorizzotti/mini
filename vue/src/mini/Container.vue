<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    width: {
      type: [Number, String],
      default: null
    }
  })
  const containerClass = computed(() => {
    const classes = ['container']
    if (props.width === 'fw' || props.width === 'full-width') {
      classes.push('fw')
    } else if (props.width === 'thin') {
      classes.push('thin')
    } else if (props.width === 'wide') {
      classes.push('wide')
    }
    return classes
  })
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: calc( var(--max_screen) * 0.75 );
  @media only screen and (min-width:1920px) {
    max-width: calc( var(--max_screen) * 1 );
  }
  &.fw, &.full-width {
    min-width: 100%;
    width: 100%;
    max-width: 100%;
    &.forced {
      min-width: 100vw;
      width: 100vw;
      max-width: 100vw;
      left: 50%;
      transform: translate(calc(-50%), 0);
    }
  }
  &.thin {
    max-width: calc( var(--max_screen) * 0.5 );
    @media only screen and (min-width:1920px) {
      max-width: calc( var(--max_screen) * 0.75 );
    }
  }
  &.wide {
    max-width: calc( var(--max_screen) * 1 );
    @media only screen and (min-width:1920px) {
      max-width: calc( var(--max_screen) * 1.25 );
    }
  }
}
</style>
