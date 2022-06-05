<template>
    <PostForm @finished="handleFormComplete" :completed="formComplete" />
    <LoginModal v-if="showSignIn" @signIn="handleSignIn" @closeModal="handleCloseModal"/>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import PostForm from '@/components/PostForm.vue'

export default {
    components: { 
        LoginModal,
        PostForm
    },
    data () {
        return {
            showSignIn: false,
            userProfile: {},
            formComplete: false,
            postData: {},
        }
    },
    methods: {
        handleSubmitPost () {
            this.showSignIn = true
        },
        handleSignIn (userProfile) {
            this.showSignIn = false
            this.userProfile = {
                name: userProfile.getName(),
                email: userProfile.getEmail(),
                id: userProfile.getId(),
                imageUrl: userProfile.getImageUrl(),
            }
            this.addPosting()
        },
        handleCloseModal () {
            this.showSignIn = false
        },
        handleFormComplete (formData) {
            this.postData = formData
            this.showSignIn = true
        },
        addPosting () {
            if (!this.postData || !this.userProfile)
                return
            
            const instance = process.env.VUE_APP_API_URL + 'ride'
            const body = this.getPostBody()
            const options = {
                method: 'POST',
                body: JSON.stringify(body),
            }

            fetch(instance, options)
            this.formComplete = true
        },
        getPostBody () {
            return {
                posterName: this.userProfile.name,
                posterEmail: this.userProfile.email,
                posterId: this.userProfile.id,
                posterImageUrl: this.userProfile.imageUrl,

                date: this.postData.date.split('T')[0],
                time: this.postData.date.split('T')[1],
                dest: this.postData.dest,
                contact: this.postData.contact,
                description: this.postData.description
            }
        }
    }
}
</script>

<style scoped>
.add-post-header{
    padding-top: 30px;
    font-size: 24px;
}
.draft-post {
    margin-top: 50px;
}


</style>