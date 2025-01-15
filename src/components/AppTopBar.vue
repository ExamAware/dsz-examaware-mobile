<template>
  <v-app-bar :elevation="2" class="position-fixed">
    <v-app-bar-title>{{ profileStore.appHeader }}</v-app-bar-title>

    <template #append>
      <div class="ga-4">
        <v-btn @click="gotoHome">回到主页</v-btn>
        <v-btn @click="router.push('/about')">关于</v-btn>
        <v-icon icon="mdi-fullscreen" @click="toggleFullScreen"></v-icon>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/app'

const profileStore = useProfileStore()
const router = useRouter()

function gotoHome() {
  router.push({ path: '/mainWindow', query: { skipAutoEnter: true } })
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}
</script>
