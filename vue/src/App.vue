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
import Loader from './mini/Loader.vue';


import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import What from './pages/What.vue'
import NotFound from './pages/NotFound.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/what': What,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>


  <Loader />
  <div id="top"></div>
  <a href="#top"><div class="top-link"><p class=""><i class="iconoir-dot-arrow-up"></i></p></div></a>
  <Header title="mini"/>

  <Sheet>
    <Aside side="left">
      <Boxes>
        <Box :size="100">
          <h5 class="light-grey-text light m-0">Management</h5>
        </Box>
      </Boxes>
      <Menu id="admin-menu"/>
    </Aside>
    <Main>
      <Container>
        <component :is="currentView" />
      </Container>
    </Main>
    <Aside side="right">
      <Menu id="main-menu"/>
      <Boxes>
        <Box :size="100">
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
