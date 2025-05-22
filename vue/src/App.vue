<script setup>
import Header from './mini/MiniHeader.vue'
import Container from './mini/Container.vue'
import Boxes from './mini/Boxes.vue';
import Box from './mini/Box.vue';
import Sheet from './mini/Sheet.vue';
import Aside from './mini/Aside.vue';
import Main from './mini/Main.vue';
import Menu from './mini/Menu.vue';
import Footer from './mini/MiniFooter.vue';
import Space from './mini/Space.vue';
import { useScroll } from '@vueuse/core'
import Loader from './mini/Loader.vue';

  const scroll = useScroll(window)

</script>

<template>
  <Loader />
  <div id="top"></div>
  <a href="#top"><div class="top-link"><p class=""><i class="iconoir-dot-arrow-up"></i></p></div></a>
  <Header/>

  <Sheet :class="[scroll.arrivedState.top ? 'top': 'scrolled']">
    <Aside side="left">
      <Boxes>
        <Box :size="50">
          <h5 class="light-grey-text light m-0">Management</h5>
        </Box>
      </Boxes>
      <Menu id="admin-menu"/>
    </Aside>
    <Main>
      <Container>
        <Boxes class="fh space-top-bot align-items-center">
          <Box :size="100">
            <div class="flex justify-content-center">
              <img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" style="width: 32px;" class="inline-block mx-1"/>
            
            </div>
            <p class="center">A <b>new</b> <i>mini</i>...</p>
            <Space />
            <p class="center">a <img src="./assets/logo.svg" style="width: 16px;" class="inline-block"/> <b>vue</b> <i>mini</i>.</p>
          </Box>
        </Boxes>
      </Container>
    </Main>
    <Aside side="right">
      <Menu id="main-menu"/>
      <Boxes>
        <Box :size="50">
          <h5 class="light-grey-text light m-0">User menu</h5>
        </Box>
      </Boxes>
      <Menu id="user-menu"/>
    </Aside>
  </Sheet>
  <Footer/>
</template>

<style scoped>
</style>
