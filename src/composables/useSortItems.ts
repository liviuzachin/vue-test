type SortItem = {
  text: string
  value: 'date' | 'title' | null
}

export default function useSortItems(): SortItem[] {
  return [
    { text: 'Title', value: 'title' },
    { text: 'Date', value: 'date' },
    { text: 'Default', value: 'default' }
  ]
}
