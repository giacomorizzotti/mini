<script setup>
  import { computed } from 'vue'
  import Container from './Container.vue'
  import Boxes from './Boxes.vue'
  import Box from './Box.vue'
  import Menu from './Menu.vue'
  const props = defineProps({
    logoUrl: {
      type: [String],
      default: 'https://mini.uwa.agency/img/brand/mini_emblem.svg'
    },
    siteTitle: {
      type: [String],
      default: 'mini'
    }
  })
</script>

<template>
  <footer id="footer">
    <Container>
        <Boxes class="space-top-bot">
            <Box size="33">
                <p class="">&nbsp;©&nbsp;<span class="bold">uwa.agency</span></p>
                <p class="s">A <a href="https://mini.uwa.agency/" target="_blank" class="mini-text"><i>mini</i></a> based website by <a href="https://www.uwa.agency/" target="_blank" class="mini-text"><strong>{{siteTitle}}</strong></a></p>
            </Box>
            <Box size="33">
                <a href="#top" class=""><img :src="logoUrl" class="logo emblem" alt="logo"/></a>
            </Box>
            <Box size="33">
              <Menu id="footer-menu"/>
            </Box>
        </Boxes>
    </Container>
  </footer>
</template>

<style lang="scss" scoped>
  footer#footer {
    img.logo {
      width: 66.666666%;
      height: auto;
      display: block;
      filter: grayscale(100%);
      opacity: 0.1;
      transition: all 0.3s ease;
      margin: 0 auto;
      &:hover {
        filter: grayscale(0);
        opacity:1;
      }
    }
  }
</style>
