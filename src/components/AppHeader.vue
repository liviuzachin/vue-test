<script lang="ts" setup>
import { useRoute } from 'vue-router'
import usePosts from '@/composables/usePosts'
import useSortItems from '@/composables/useSortItems'
import DateRangePicker from '@/components/DateRangePicker.vue'

const route = useRoute()

const sortItems = useSortItems()
const { setSortBy, filters } = usePosts()
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="container px-4 mx-auto flex items-center">
      <div class="flex-1">
        <RouterLink to="/">
          <img alt="Vue logo" class="logo size-10" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink to="/posts">Posts</RouterLink>
          </li>
          <li v-if="route.path === '/posts'">
            <details class="w-30 z-10">
              <summary>Sort By</summary>
              <ul class="w-full bg-base-100 rounded-t-none p-2 space-y-2">
                <li v-for="item in sortItems">
                  <span class="btn btn-sm btn-ghost justify-start" @click="setSortBy(item.value)">
                    {{ item.text }}
                  </span>
                </li>
              </ul>
            </details>
          </li>
          <li v-if="route.path === '/posts'">
            <details class="w-36 z-10">
              <summary>Date Range</summary>
              <DateRangePicker v-model:start="filters.date.start" v-model:end="filters.date.end" />
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
