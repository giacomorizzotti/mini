<script setup>
import Boxes from "./../mini/Boxes.vue"
import Box from "./../mini/Box.vue"
import Button from "./../mini/Button.vue"
</script>

<template>
    <Boxes class="fh space-top-bot align-items-center">
        <Box :size="100">
            <p class="huge center bold danger-text">Page not found</p>
        </Box>
    </Boxes>
</template>

<style lang="scss" scoped>
</style>
