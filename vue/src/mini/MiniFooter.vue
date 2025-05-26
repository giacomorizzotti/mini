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
    },
    company: {type: [String], default: "UWA.agency"},
    phone: {type: [String], default: "+345 329 7079"},
    email: {type: [String], default: "ciao@uwa.agency"},
    address: {type: [String], default: "Via Sant'Andrea Apostolo 32"},
    addressTwo: {type: [String], default: "28100, Novara [NO], Italy"},
    TaxNumber: {type: [String], default: "0123456789"},
    idCode: {type: [String], default: "0123456789"},
  })
</script>

<template>
  <footer id="footer">
    <Container>
        <Boxes class="space-top-bot">
            <Box size="33">
                <p class="">&nbsp;©&nbsp;<span class="bold">{{ props.company }}</span></p>
                <p v-if="props.address" class="mb-0">{{ props.address }}</p>
                <p v-if="props.addressTwo" class="mt-0">{{ props.addressTwo }}</p>
                <p v-if="props.email" class="mb-0"><span class="label">email:</span> <b>{{ props.email }}</b></p>
                <p v-if="props.phone" class="mt-0"><span class="label">phone:</span> <b>{{ props.phone }}</b></p>
                <p v-if="props.TaxNumber" class="mb-0"><span class="label">P.IVA:</span> <b>{{ props.TaxNumber }}</b></p>
                <p v-if="props.idCode" class="mt-0"><span class="label">C.F:</span> <b>{{ props.idCode }}</b></p>
            </Box>
            <Box size="33">
                <a href="#/home" class=""><img :src="logoUrl" class="logo emblem" alt="logo"/></a>
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
