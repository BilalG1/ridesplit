<template>
    <SearchHeader />
    <div class="nav-margin-top">
        <br><br>
        <div v-if="loading">
            <Loader size="100" class="loader" />
        </div>
        <div v-if="noData">
            Sorry, this post does not exist. Maybe the post was removed
        </div>
        <div v-else class="post-data">
            <div class="description">
                <i class="fa-solid fa-user-graduate"></i>
                <div class="description-text">
                    "{{ postData['description'] }}"
                </div>
            </div>
            <div class="lower-split">
                <div class="info-container">
                    <div v-for="info in ['date', 'time', 'dest', 'contact']" :class="[info,'info-each']" :key="info" @click="() => handleInfoClick(info)">
                        {{ formatData(postData[info], info) }}
                    </div>
                </div>
                <button class="b1 b-dis" @click="showSignIn = true" :disabled="loggedIn">
                    {{ loggedIn ? 'Already signed in' : 'Sign in to view contact info' }}
                </button>
            </div>
        </div>
    </div>
    <LoginModal v-if="showSignIn" @signIn="handleSignIn" @closeModal="handleCloseModal"/>
</template>

<script>
// import BasicHeader from '@/components/BasicHeader.vue'
import SearchHeader from '@/components/SearchHeader.vue'
import Loader from '@/components/Loader.vue'
import LoginModal from '@/components/LoginModal.vue'
export default {
    props: ['postId'],
    components: {
        SearchHeader,
        Loader,
        LoginModal,
    },
    data () {
        return {
            loading: true,
            postData: {},
            noData: false,

            showSignIn: false,
            loggedIn: false,
        }
    },
    async mounted () {
        
        const instance = process.env.VUE_APP_API_URL + `ride/${this.postId}`

        const res = await fetch(instance)
        const data = await res.json()
        
        this.loading = false
        if (res.status === 200 && data.document)
            this.postData = data.document
        else
            this.noData = true
    },
    methods: {
        formatData(data, type) {
            if (type === 'time' && data) {
                const tSplit = data.split(':')
                return tSplit[0] <= 12 ? (data + ' AM') : (tSplit[0]-12 + ':' + tSplit[1] + ' PM')
            }
            if (type === 'date' && data)
                return new Date(data).toLocaleDateString('en-us', {
                    weekday: 'long', month: 'long', day: 'numeric' 
                })
            if (type === 'contact' && !this.loggedIn)
                return 'Contact Info: ' + '*'.repeat(data && data.length)
            if (type === 'contact')
                return 'Contact Info: ' + data
            else
                return data
        },
        handleCloseModal() {
            this.showSignIn = false
        },
        handleSignIn() {
            this.loggedIn = true
            this.showSignIn = false
        },
        handleInfoClick(type) {
            if (type === 'contact')
                this.showSignIn = true
        }
    }
}
</script>

<style scoped>
.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.b-dis:disabled {
  background: #DDDDDD;
  cursor: not-allowed;
}
.post-data {
    max-width: 800px;
    margin: 0 auto;
}
.description {
    display: flex;
    border: 1px solid black;
    padding: 33px;
    border-radius: 14px;
    font-size: 20px;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;
}
.description i {
    font-size: 40px;
    margin-right: 30px;
}
.description-text {
    text-align: left;
    font-style: italic;
}
.info-container {
    max-width: 1200px;
    width: 50%;
    text-align: left;
    border-radius: 14px;
    padding: 20px;
    font-weight: 600;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
}
.info-each {
    margin-bottom: 20px;
}
.contact {
    cursor: pointer;
    box-sizing: border-box;
    width: fit-content;
    color: green;
}
.lower-split {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
}

@media screen and (max-width: 640px) {
    .lower-split {
        justify-content: center;
        gap: 30px;
    }
}

@media screen and (max-width: 680px) {
    .nav-margin-top {
        margin-top: 130px;
    }
    .post-data {
        padding: 0 10px;
    }
    .description {
        padding: 15px;
    }
}
</style>