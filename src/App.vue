<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col gap-4 min-h-screen">
    <AppHeader />

    <div class="container grow flex px-4 mx-auto">
      <RouterView />
    </div>

    <AppFooter />
  </div>
</template>
