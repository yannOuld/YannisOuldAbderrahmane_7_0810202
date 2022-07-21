import { defineStore } from 'pinia'
import { usePostStore } from '../stores/posts'
import { fetchWrapper } from '@/utils/fetchWrapp';

export const useUsersStore = defineStore({
    id: 'author',
    state: () => ({
        authors: [],
        author: null
    }),
    getters: {
        getPostAuthor: (state) => {
            const postStore = usePostStore()
            return state.authors.find((author) => author.id === postStore.post.userId)
        }
    },
    actions: {
        async fetchAuthors() {

            this.authors = await fetchWrapper.get(`http://localhost:3000/api/user/`)
        },

        async fetchOneAuthor(uuid) {
            this.author = await fetchWrapper.get(`http://localhost:3000/api/user/${uuid}`)
        }
    }
})