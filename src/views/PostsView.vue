<script lang="ts" setup>
import usePosts from '@/composables/usePosts'

const { posts, filteredAndSortedPosts, loading, error } = usePosts()

</script>

<template>
  <div class="posts w-full flex flex-col">
    <div v-if="loading" class="flex items-center justify-center">
      <span class="loading loading-ring loading-xl"></span>
    </div>

    <div v-else-if="error" role="alert" class="alert alert-warning">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <div v-else-if="posts.length === 0" role="alert" class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>No posts found.</span>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="post in filteredAndSortedPosts" :key="post.id" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title capitalize">{{ post.title }}</h2>
          <p>{{ post.body }}</p>
          <div class="card-actions items-center justify-between">
            <div>
              Created at:
              <time>
                {{ new Date(post.createdAt!).toLocaleDateString() }}
              </time>
            </div>
            <RouterLink class="btn" :to="`/posts/${post.userId}`">
              View post
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
