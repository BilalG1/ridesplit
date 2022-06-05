<template>
    <SearchHeader @search="fetchPostings" />
    <div class="home-main">
        <div v-if="loading" class="loader-container" >
            <Loader size="100" class="loader" />
        </div>
        <div class="tiles-section" v-else>
            <PostCard 
                v-for="postData in postDataArray" 
                :key="postData._id" 
                :post="postData"
            />  
        </div>
        <div v-if="!loading && !postDataArray.length" class="no-posts">
            Sorry, no postings match your filters. Try changing your search options or 
            <router-link to="/addpost">add your own post</router-link>
        </div>
    </div>
</template>

<script>
import SearchHeader from '@/components/SearchHeader.vue'
import Loader from '@/components/Loader.vue'
import PostCard from '@/components/PostCard.vue'

export default {
    components: {
        SearchHeader,
        Loader,
        PostCard,
    },
    props: ['searchDest', 'searchDate'],
    data () {
        return {
            postDataArray: [],
            loading: true
        }
    },
    async mounted () {
        const dest = this.$route.params.searchDest === 'any' ? '' : this.$route.params.searchDest
        const date = this.$route.params.searchDate || ''
        this.fetchPostings(dest, date)
    },
    methods: {
        async fetchPostings (searchDest, searchDate) {
            this.loading = true

            let instance = process.env.VUE_APP_API_URL + 'rides?limit=100'
            if (searchDest && searchDest !== 'any')
                instance += `&dest=${searchDest}`
            if (searchDate)
                instance += `&date=${searchDate}`

            const res = await fetch(instance)
            const data = await res.json()
            data.documents.forEach(post => {
                if (!post.date || !post.time)
                    post.sortDate = new Date('2099-1-1')
                else
                    post.sortDate = new Date(post.date + 'T' + post.time + 'Z')
            })
            data.documents.sort((a,b) => 
                a.sortDate - b.sortDate
            )

            this.loading = false
            this.postDataArray = data.documents
        }
    }
}
</script>

<style scoped>
.home-main{
    margin-top: 100px; 
    /* 80px search header height */
}
.home-header{
    font-size: 28px;
    color: green;
    margin-bottom: 30px;
}
.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.tiles-section {
    padding: 0 80px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
    padding: 40px 80px;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 40px;
    max-width: 1200px;
    margin: 0 auto ;
}
.tile-container {
    min-width: 220px;
    max-width: 340px;
    flex: 1;
    cursor: pointer;
}
.no-posts {
    padding: 30px;
    text-align: left;
    margin: 0 auto;
    max-width: 400px;
    border: 2px solid black;
    border-radius: 14px;
    color: gray;
    font-weight: 600;
    line-height: 20px;
}

@media screen and (max-width: 680px) {
    .home-main {
        margin-top: 130px;
    }
    .tiles-section {
        padding: 40px 30px;
    }
}
</style>