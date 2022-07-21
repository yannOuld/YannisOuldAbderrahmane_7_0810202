import { defineStore } from 'pinia';
import { fetchWrapper } from '@/utils/fetchWrapp';

export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: [],
        post: null,
        loading: false,
        error: null
    }),
    getters: {
        getPostAuthor: (state) => {
            return (authorId) => state.posts.filter((post) => post.userId === authorId)
        }
    },
    actions: {
        async fetchPosts() {
            this.posts = []
            this.loading = true
            try {
                this.posts = await fetchWrapper(`http://localhost:3000/api/post/`)

            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async fetchPost(id) {
            this.post = null
            this.loading = true
            try {
                this.post = await fetchWrapper(`http://localhost:3000/api/post/${id}`)

            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})