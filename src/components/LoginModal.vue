<template>
    <div class="login-modal">
        <div class="modal-text">
            You must login with your @g.ucla.edu account
        </div>
        <div>
            <GoogleSignIn @signIn="(data) => $emit('signIn', data)"/>
        </div>
    </div>
    <div class="modal-backdrop" @click="modalClick" />
</template>

<script>
import GoogleSignIn from './GoogleSignIn.vue'

export default {
    emits: ['signIn', 'closeModal'],
    components: {
        GoogleSignIn,
    }, 
    methods: {
        modalClick() {
            this.$emit('closeModal')
        }
    } 
}
</script>

<style scoped>
.login-modal {
    position: fixed;
    z-index: 1000; 
    padding: 30px;
    background: white;
    transform: translate(50%, 50%);
    right: 50%;
    bottom: 50%;
    animation-duration: 400ms;
    animation-name: keyframe_slideup;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
    width: 70vw;
    max-width: 340px;
}
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    /* background: rgba(0, 0, 0, 0.3); */
    background: rgb(34, 34, 34);
    animation-duration: 400ms;
    animation-name: keyframe_opacity;
    animation-fill-mode: both;
    animation-iteration-count: 1;
}
@keyframes keyframe_opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.6;
    }
}
@keyframes keyframe_slideup {
    0% {
        opacity: 0;
        transform: translate(50%, calc(50% + 50vh));
    }
    100% {
        opacity: 1;
        transform: translate(50%, 50%);
    }
    
}

.modal-text {
    margin-bottom: 20px;
    font-size: 16px;
}
</style>