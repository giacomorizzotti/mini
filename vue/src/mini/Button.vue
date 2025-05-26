<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['click'])

const props = defineProps({
  color: String,
  invert: Boolean,
  text: {
    type: String,
    default: "I'm a default button!"
  },
  size: [Number, String],
  link: String,
  corners: String,
  type: String,
  toggle: Boolean,
})

const isBeingClicked = ref(false)
const hasBeenClicked = ref(false)
function handleClick(event) {
  isBeingClicked.value = true
  setTimeout(() => {
    isBeingClicked.value = false
  }, 250)
  hasBeenClicked.value = !hasBeenClicked.value
  emit('click', event)
}

// Color mapping
const colorClassMap = {
  wh: 'white-btn', white: 'white-btn',
  fw: 'false-white-btn', 'false-white': 'false-white-btn',
  lg: 'light-grey-btn', 'light-grey': 'light-grey-btn',
  grey: 'grey-btn',
  dg: 'dark-grey-btn', 'dark-grey': 'dark-grey-btn',
  fb: 'false-black-btn', 'false-black': 'false-black-btn',
  bk: 'black-btn', black: 'black-btn',
  col: 'main-color-btn', color: 'main-color-btn', 'main-color': 'main-color-btn',
  'col-dark': 'main-color-dark-btn', 'color-dark': 'main-color-dark-btn', 'main-color-dark': 'main-color-dark-btn',
  'second-col': 'second-color-btn', 'second-color': 'second-color-btn',
  'second-col-dark': 'second-color-dark-btn', 'second-color-dark': 'second-color-dark-btn',
  'third-col': 'third-color-btn', 'third-color': 'third-color-btn',
  'third-col-dark': 'third-color-dark-btn', 'third-color-dark': 'third-color-dark-btn',
  'fourth-col': 'fourth-color-btn', 'fourth-color': 'fourth-color-btn',
  'fourth-col-dark': 'fourth-color-dark-btn', 'fourth-color-dark': 'fourth-color-dark-btn',
  info: 'info-btn', success: 'success-btn', warning: 'warning-btn', danger: 'danger-btn', bad: 'bad-btn',
  'acid-green': 'acid-green-btn', gingerbread: 'gingerbread-btn',
  mini: 'mini-btn', 'mini-dark': 'mini-dark-btn', 'mini-second': 'mini-second-btn', 'mini-third': 'mini-third-btn', 'mini-fourth': 'mini-fourth-btn',
  uwa: 'uwa-btn', 'uwa-dark': 'uwa-dark-btn', 'uwa-second': 'uwa-second-btn', 'uwa-third': 'uwa-third-btn', 'uwa-fourth': 'uwa-fourth-btn', 'uwa-link': 'uwa-link-btn',
  aroma: 'aroma-btn', 'aroma-dark': 'aroma-dark-btn',
  pdp: 'pdp-btn', 'pdp-second': 'pdp-second-btn', 'pdp-third': 'pdp-third-btn', 'pdp-fourth': 'pdp-fourth-btn',
  lns: 'lns-btn', 'lns-dark': 'lns-dark-btn',
  dt: 'dt-btn'
}

// Size mapping
const sizeClassMap = {
  xs: 'xs', XS: 'xs', 'extra-small': 'xs',
  s: 's', S: 's', small: 's',
  l: 'l', L: 'l', large: 'l',
  xl: 'xl', XL: 'xl', 'extra-large': 'xl',
  xxl: 'xxl', XXL: 'xxl', 'extra-extra-large': 'xxl'
}

// Corners mapping
const cornersClassMap = {
  smooth: 'smooth', round: 'round', hard: 'hard'
}

const buttonClasses = computed(() => {
  const classes = ['btn']

  // Color
  if (props.color && colorClassMap[props.color]) {
    classes.push(colorClassMap[props.color])
  }

  // Invert
  if (props.invert) {
    classes.push('invert')
  }

  // Size
  const sizeClass = props.size && sizeClassMap[props.size] ? sizeClassMap[props.size] : 'regular'
  classes.push(sizeClass)

  // Corners
  const cornerClass = props.corners && cornersClassMap[props.corners] ? cornersClassMap[props.corners] : 'smooth'
  classes.push(cornerClass)

  // Clicked
  if (isBeingClicked.value) {
    classes.push('clicking')
  }
  if (props.toggle && hasBeenClicked.value) {
    classes.push('clicked')
  }

  return classes
})
</script>

<template>
<a
  :href="props.link"
  :class="buttonClasses"
  :type="props.type"
  @click="handleClick"
>
  {{ props.text }}
</a>
</template>

<style lang="scss" scoped>

$colors: //color name, color code, text color over color
  "wh" var(--white) var(--black),
  "white" var(--white) var(--black),
  "false-white" var(--false-white) var(--black),
  "light-grey" var(--light-grey) var(--black),
  "grey" var(--grey) var(--white),
  "dark-grey" var(--dark-grey) var(--white),
  "false-black" var(--false-black) var(--white),
  "bk" var(--black) var(--white),
  "black" var(--black) var(--white),
  "col" var(--main-color) var(--white),
  "color" var(--main-color) var(--white),
  "main-color" var(--main-color) var(--white),
  "color-dark" var(--main-color-dark) var(--white),
  "main-color-dark" var(--main-color-dark) var(--white),
  "second-color" var(--second-color) var(--white),
  "second-color-dark" var(--second-color-dark) var(--white),
  "third-color" var(--third-color) var(--white),
  "third-color-dark" var(--third-color-dark) var(--white),
  "fourth-color" var(--fourth-color) var(--white),
  "fourth-color-dark" var(--fourth-color-dark) var(--white),
  "info" var(--info) var(--white),
  "success" var(--success) var(--white),
  "warning" var(--warning) var(--white),
  "danger" var(--danger) var(--white),
  "bad" var(--bad) var(--white),
  "acid-green" var(--acid-green) var(--white),
  "gingerbread" var(--gingerbread) var(--white),

  "mini" var(--mini-color) var(--white),
  "mini-dark" var(--mini-color-dark) var(--white),
  "mini-second" var(--mini-second) var(--white),
  "mini-third" var(--mini-third) var(--white),
  "mini-fourth" var(--mini-fourth) var(--white),

  "uwa" var(--uwa-color) var(--white),
  "uwa-dark" var(--uwa-color-dark) var(--white),
  "uwa-second" var(--uwa-second-color) var(--white),
  "uwa-third" var(--uwa-third-color) var(--white),
  "uwa-fourth" var(--uwa-fourth-color) var(--white),
  "uwa-link" var(--uwa-link-color) var(--white),

  "aroma" var(--aroma-color) var(--white),
  "aroma-dark" var(--aroma-color-dark) var(--white),

  "pdp" var(--pezzidipla-color) var(--white),
  "pdp-second" var(--pezzidipla-second-color) var(--white),
  "pdp-third" var(--pezzidipla-third-color) var(--white),
  "pdp-fourth" var(--pezzidipla-fourth-color) var(--white),

  "lns" var(--lanuovastartup-color) var(--white),
  "lns-dark" var(--lanuovastartup-color-dark) var(--white),

  "dt" var(--doingthings-color) var(--black);

@each $colorname, $colorcode, $colortext in $colors {
  .#{$colorname} {
      &-btn {
          --button-text-color: #{$colortext}!important;
          --button-background-color: #{$colorcode}!important;
          --button-border-color: #{$colorcode}!important;
          --button-hover-text-color: #{$colorcode}!important;
          --button-hover-background-color: #{$colortext}!important;
          --button-hover-border-color: #{$colorcode}!important;
      }
  }
}
.btn {
  --button-text-color: var(--white);
  --button-background-color: var(--link-color);
  --button-border-color: var(--link-color);
  --button-hover-text-color: var(--link-color);
  --button-hover-background-color: transparent;
  --button-hover-border-color: var(--link-color);
  font-size: var(--p);
  line-height: calc( var(--p) * 1.5 );
  width: auto;
  padding: calc(var(--padding) * 0.5) calc(var(--padding) * 1);
  display: inline-block;
  margin: calc( var(--margin) * 0.5 ) calc( var(--margin) * 1 ) calc( var(--margin) * 0.5 ) 0;
  border: 1px solid;
  font-weight: 700;
  transition: color ease-out 0.15s, background-color ease-out 0.15s, border-color ease-out 0.15s, box-shadow ease-out 0.15s;
  cursor: pointer;
  vertical-align: middle;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  &.hard {
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }
  &.smooth {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  &.round {
    -webkit-border-radius: 250px;
    -moz-border-radius: 250px;
    border-radius: 250px;
  }
  &:last-child {
    margin-right: 0;
  }
  color: var(--button-text-color);
  background: var(--button-background-color);
  border-color: var(--button-border-color);
  &:hover {
    color: var(--button-text-color);
    background: var(--button-background-color);
    border-color: var(--button-border-color);
    box-shadow: 0 0 15px -5px var(--button-border-color);
  }
  &.clicked, &.active {
    color: var( --button-hover-text-color);
    background: var(--button-hover-background-color);
    border-color: var(--button-hover-border-color);
  }
  &.invert {
    color: var( --button-hover-text-color);
    background: var(--button-hover-background-color);
    border-color: var(--button-hover-border-color);
    &.clicked, &.active {
      color: var(--button-text-color);
      background: var(--button-background-color);
      border-color: var(--button-border-color);
    }
  }
  &.xs {
    padding: calc(var(--padding)*.125) calc(var(--padding)*.25);
    margin: calc(var(--margin) * .25) 0;
    @media only screen and (min-width:768px) {
        margin: calc(var(--margin) * .25) calc(var(--margin) * 0.25) calc(var(--margin) * .25) 0;
    }
  }
  &.s {
    padding: calc(var(--padding)*.25) calc(var(--padding)*.5);
    margin: calc(var(--margin) * .35) 0;
    @media only screen and (min-width:768px) {
        margin: calc(var(--margin) * .35) calc(var(--margin) * 0.5) calc(var(--margin) * .35) 0;
    }
  }
  &.l {
    padding: calc(var(--padding)*0.625) calc(var(--padding)*1.125);
    margin: calc(var(--margin) * .75) 0;
    @media only screen and (min-width:768px) {
        margin: calc(var(--margin) * .75) calc(var(--margin) * 1.125) calc(var(--margin) * .75) 0;
    }
  }
  &.xl {
    padding: calc(var(--padding)*0.85) calc(var(--padding)*1.35);
  }
  &.xxl {
    padding: calc(var(--padding)*1.25) calc(var(--padding)*1.75);
  }
  &.clicking {
    animation-name: clickingAnimation;
    animation-duration: 0.25s;
    animation-iteration-count: 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @-webkit-keyframes clickingAnimation {
      from {
        box-shadow:0 0 15px -5px var(--button-border-color), 0 0 0 var(--button-border-color);
      }
      to {
        box-shadow:0 0 15px -5px var(--button-border-color), 0 0 10px 10px rgb(255 255 255 / 0%)
      }
    }
  }
}
</style>

