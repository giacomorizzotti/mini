import { ref } from 'vue'

const isMenuOpen = ref(false)

export function menuState() {
  return {
    isMenuOpen
  }
}