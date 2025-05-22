<script setup>
import { ref } from 'vue'

import { menuState } from '@/composables/menuState'
const { isMenuOpen } = menuState()
const toggleMenu = () => {
  if (isMenuOpen.value == false) window.scrollTo(0,0);
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    id="menu-toggle"
    :class="{ clicked: isMenuOpen }"
    @click="toggleMenu"
  >
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
#menu-toggle {
  display:flex;
  flex-flow: column;
  justify-content: space-between;
  top: var(--margin);
  right: var(--margin);
  width: var(--menu-toggle-height);
  height: var(--menu-toggle-height);
  padding: calc( var(--menu-toggle-height) / 7 );
  margin: 0 0 0 0;
  z-index: 9;
  border-radius: 5px;
  transition: width 0.2s ease-out, height 0.2s ease-out, width 0.25s ease-out, transform 0.25s ease-out;
  transform-origin: center center;
  cursor: pointer;
  .line {
    display: block;
    height: calc( var(--menu-toggle-height) / 8);
    width: 100%;
    margin: 0;
    background: var(--menu-toggle-color);
    border-radius: 5px;
    transition: width 0.25s ease-out, height 0.25s ease-out, width 0.25s ease-out, transform 0.25s ease-out;
  }
  &:hover, &.clicked {
    .line {
      width: 70%;
      &:first-child {
        width: 100%;
      }
      &:last-child {
        width: 85%;
      }
    }
  }
  &.clicked {
    transform: rotate(90deg);
    .line {
      background: var(--white);
      &:first-child {
        background-color: var(--menu-toggle-line-special-color)!important;
      }
    }
  }
}
</style>
