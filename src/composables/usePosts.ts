import { ref, reactive, computed } from 'vue'

type Post = {
  userId: string
  id: number
  title: string
  body: string
  createdAt?: number
}

type DateFilter = {
  start: number | null
  end: number | null
}

export default function usePosts() {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const sortBy = ref<'date' | 'title' | null>(null)
  const filters = reactive({
    date: {
      start: null,
      end: null,
    },
  })

  function setSortBy(value: 'date' | 'title' | null) {
    sortBy.value = value
  }

  async function fetchPosts() {
    loading.value = true

    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. ${response.status}`)
    }

    const rawPosts: Partial<Post>[] = await response.json()

    console.log('fetched posts: ', rawPosts)

    const oneDayInMs = 24 * 60 * 60 * 1000
    const startDate = Date.now() - oneDayInMs * rawPosts.length

    posts.value = rawPosts.map((p: Partial<Post>, idx: number) => ({
      ...p,
      createdAt: +new Date(startDate + oneDayInMs * idx)
    }) as Post)

    loading.value = false
  }

  function filterAndSortPosts({ posts, sortBy, filters }: {
    posts: Post[],
    sortBy: 'title' | 'date' | null
    filters: { date: DateFilter }
  }): Post[] {

    let result = [...posts]

    if (filters.date.start || filters.date.end) {
      if (filters.date.start !== undefined) {
        result = result.filter(p => p.createdAt! >= filters.date.start!)
      }
      if (filters.date.end !== undefined) {
        result = result.filter(p => p.createdAt! <= filters.date.end!)
      }
    }

    if (sortBy === 'title') {
      return [...result].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'date') {
      return [...result].sort((a, b) => a.createdAt! - b.createdAt!)
    } else {
      return result
    }
  }

  const filteredAndSortedPosts = computed(() => {
    return filterAndSortPosts({
      posts: posts.value,
      sortBy: sortBy.value,
      filters,
    })
  })

  return {
    error,
    filters,
    loading,
    posts,
    sortBy,
    fetchPosts,
    setSortBy,
    filteredAndSortedPosts,
  }
}
