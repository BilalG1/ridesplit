<template>
    <div class="post-form-full">
        <div class="container-left">
            <router-link to ="/" class="home-link">
                Home
            </router-link>
            <div class="step-display">
                Step {{step+1}} / 4
            </div>
            <Transition mode="out-in" name="header-fade">
                <div class="form-step-header" :key="step">
                    {{ getCurrentHeader }}
                </div>
            </Transition>
        </div>
        <div class="container-right">
            <Transition name="form-switch" mode="out-in">
                <div v-if="step === 0" class="right-content">
                    <div>
                        <input type="datetime-local" v-model="form.date" class="input-date" />
                    </div>
                    <button class="b1 bmain b-bottom-right" :disabled="!form.date" @click="step++">
                        Next
                    </button>
                </div>
                <div v-else-if="step === 1" class="right-content">
                    <div>
                        <div 
                            v-for="option in ['UCLA to LAX', 'LAX to UCLA']" 
                            :key="option" 
                            :class="['dest-option', {destselected: form.dest == option}]" 
                            @click="form.dest = option"
                        >
                            {{ option }}
                        </div>
                    </div>
                    <!-- add back button -->
                    <button class="b1 bmain b-bottom-right" :disabled="!form.dest" @click="step++">
                        Next
                    </button>
                </div>
                <div v-else-if="step === 2" class="right-content">
                    <div class="form-step-subheader">
                        This will only be visible to verified UCLA students that are logged in
                    </div>
                    <div>
                        <input type="text" v-model="form.contact" class="input-date" placeholder="email: jim@gmail.com, ig: jim_32" />
                    </div>
                    <button class="b1 bmain b-bottom-right" :disabled="!form.contact" @click="step++">
                        Next
                    </button>
                </div>
                <div v-else-if="step === 3 && !completed" class="right-content">
                    <div>
                        <textarea 
                            type="textarea" 
                            v-model="form.description" 
                            class="input-date textarea-restrict" 
                            placeholder="Can split cost with zelle or venmo" 
                            maxlength="500"    
                        />
                    </div>
                    <Loader v-if="loaderActive" class="loader"/>
                    <button class="b1 bmain b-bottom-right b-submit" :disabled="!form.description" @click="formComplete">
                        Submit
                    </button>
                </div>
                <div v-else-if="completed" class="right-content">
                    <div class="dest-option border-none">
                        Post was successfully submitted
                    </div>
                    <router-link to="/" class="b1">
                        Return Home
                    </router-link>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
    components: {
        Loader
    },
    props: ['completed'],
    data() {
        return{
            step: 0,
            form: { },
            loaderActive: false,
        }
    },
    emits: ['finished'],
    methods: {
        formComplete() {
            this.loaderActive = true
            setTimeout(() => {
                this.$emit('finished', this.form)
            }, 1000)
        }
    },
    computed: {
        getCurrentHeader(){
            if (this.completed)
                return 'Congrats'
            const headers = ['When is your trip?', 'Where are you going?', 'How should people contact you?', 'What else should people know?']
            return headers[this.step]
        }
    }
}
</script>

<style scoped>
.form-switch-enter-active,
.form-switch-leave-active {
    transition: .5s all;
}
.form-switch-enter-from{
    opacity: 0;
}
.form-switch-leave-to {
    opacity: 0;
}

.post-form-full {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.container-left {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,255,201,1) 0%, rgb(0 197 39) 100%);
}
.container-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.step-display {
    position: fixed;
    top: 60px;
    color: white;
    left: 20px;
}
.home-link {
    position: fixed;
    top: 20px;
    left: 20px;
    color: white;
    font-weight: 600;
    text-decoration: none;
}
.form-step-header{
    font-size: 48px;
    font-weight: 600;
    color: white;
    margin-left: min(10%, 56px);
    margin-right: 20px;
    text-align: left;
}
.right-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px;
}
.b-bottom-right {
    position: fixed;
    bottom: 30px;
    right: 30px;
}
.input-date {
    font-family: sans-serif;
    border-radius: 15px;
    margin-bottom: 100px;
    border: 1px solid gray;
    height: 90px;
    max-width: 416px;
    width: calc(100% - 40px);
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;
}
.dest-option {
    cursor: pointer;
    height: 88px;
    max-width: 464px;
    border-radius: 12px;
    border: 1px solid rgb(221, 221, 221);
    background: white;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 30px;
    padding-left: 30px;
    transition: 0.3s ease all;
}
.dest-option:hover, .destselected {
    border-color: transparent;
    box-shadow: rgb(34, 34, 34) 0px 0px 0px 2px;
}
.destselected {
    background-color: rgb(247, 247, 247)
}
.form-step-subheader {
    font-size: 22px;
    text-align: left;
    margin-bottom: 20px;
    position: fixed;
    top: 30px;
    margin-right: 30px;
    font-weight: 600;
    color: gray;
}
.textarea-restrict {
    resize: vertical;
    min-height: 100px;
    max-height: 80vh;
    padding-top: 20px;
}
.loader {
    position: fixed;
    bottom: 20px;
    right: 150px;
}

.header-fade-enter-active, 
.header-fade-leave-active {
    transition: 0.5s ease all;
}
.header-fade-enter-from,
.header-fade-leave-to {
    /* opacity: 0.4; */
}

.border-none{
    border: none;
    margin-bottom: 100px;
    cursor: inherit;
}
.border-none:hover {
    box-shadow: none;
}

@media screen and (max-width: 680px) {
    .post-form-full {
        flex-direction: column;
    }   
    .form-step-header {
        font-size: 40px;
    }
    .form-step-subheader {
        top: 50%;
        padding-top: 5px;
        font-size: 18px;
    }
}
</style>