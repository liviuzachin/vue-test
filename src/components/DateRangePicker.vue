<script lang="ts" setup>
type DateString = number | string | null

const start = defineModel<DateString>('start', {
  default: null,
})
const end = defineModel<DateString>('end', {
  default: null,
})
</script>

<template>
  <ul class="w-full bg-base-100 rounded-t-none p-2 space-y-2">
    <li>
      <input v-model.lazy="start" type="date" placeholder="Start" class="input" />
    </li>
    <li>
      <input v-model.lazy="end" type="date" placeholder="End" class="input" />
    </li>
  </ul>
</template>
