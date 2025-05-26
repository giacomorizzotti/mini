<script setup>
import Container from '@/mini/Container.vue'
import Boxes from '@/mini/Boxes.vue';
import Box from '@/mini/Box.vue';
import MenuToggle from '@/mini/MenuToggle.vue';
import Menu from '@/mini/Menu.vue';
import { ref } from 'vue'
import HeaderMenuBox from './HeaderMenuBox.vue';
import { menuState } from '@/composables/menuState'
const { isMenuOpen } = menuState()

const props = defineProps({
  logoUrl: {
    type: [String],
    default: 'https://mini.uwa.agency/img/brand/mini_emblem.svg'
  },
  title: {
    type: [String],
    default: 'mini'
  }
})

</script>

<template>
<header id="header" class="fixed" :class="{ 'open-menu': isMenuOpen }">
  <Container>
    <Boxes class="justify-content-between align-items-center">
      <Box id="brand" class="p-0">
        <Boxes class="g-0">
          <Box>
            <a href="#/" class="">
                <img :src="logoUrl" class="header-logo" alt="logo"/>
            </a>
          </Box>
          <Box>
            <a href="#/" class="">
              <h3 class="site-title">
                {{ title }}
              </h3>
            </a>
          </Box>
        </Boxes>
      </Box>
      <Box id="head-menus" class="p-0">
        <Boxes class="g-0">
          <HeaderMenuBox>
            <Menu id="page-menu" direction="row" :menuToggleOnClick="false"/>
          </HeaderMenuBox>
          <Box>
            <MenuToggle/>
          </Box>
        </Boxes>
      </Box>
    </Boxes>
  </Container>
</header>
</template>

<style lang="scss" scoped>
header#header {
  &.fixed {
    position: fixed;
    z-index:99;
    width: 100%;
  }
  &.open-menu {
    .header-logo {
      filter: brightness(0) invert(1);
    }
    .site-title {
      color: var(--white);
    }
  }
  .header-logo {
    transition: filter 0.2s ease-out;
    height: var(--logo-height);
    width: auto;
  }
  .site-title {
    transition: color 0.2s ease-out;
    margin: 0;
  }
}
</style>
