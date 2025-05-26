<script setup>
import Boxes from "./../mini/Boxes.vue"
import Box from "./../mini/Box.vue"
import Space from "./../mini/Space.vue"
import Button from "./../mini/Button.vue"
</script>

<template>
    <Boxes class="fh space-top-bot align-items-center">
        <Box :size="100">
            <div class="flex justify-content-center">
                <img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" style="width: 32px;" class="inline-block mx-1"/>
            </div>
            <p class="center">A <b>new</b> <i>mini</i>...</p>
            <Space />
            <p class="center">a <img src="./../assets/logo.svg" style="width: 16px;" class="inline-block"/> <b>vue</b> <i>mini</i>.</p>
            <Space />
            <p class="center"><Button link="#" color="uwa" size="" /></p>
        </Box>
    </Boxes>
</template>

<style lang="scss" scoped>
</style>
