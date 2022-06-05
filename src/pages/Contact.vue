<template>
  <BasicHeader />
  <div class="contact-page">
    <div class="page-center">
      <div class="contact-header">
        Contact Us
        <PlaneLoader />
      </div>
      <div class="form-pane">
        <div class="send-text">
          Send us a message
        </div>
        <div class="form" id="contact-form">
          <label class="form-box-label" :style="first.length ? 'opacity: 1; transform: translateY(0px); z-index: 2;' : ''"> First name </label>
          <input type="text" placeholder="First name" class="form-box" v-model="first" autocomplete="new-password"/>
          <label class="form-box-label" :style="last.length ? 'opacity: 1; transform: translateY(0px); z-index: 2;' : ''"> Last name </label>
          <input type="text" placeholder="Last name" class="form-box" v-model="last" autocomplete="new-password"/>
          <label class="form-box-label" :style="email.length ? 'opacity: 1; transform: translateY(0px); z-index: 2;' : ''"> Email </label>
          <input type="text" placeholder="Email" class="form-box" v-model="email" autocomplete="new-password"/>
          <label class="form-box-label" :style="message.length ? 'opacity: 1; transform: translateY(0px); z-index: 2;' : ''"> Message </label>
          <textarea placeholder="Message" rows=1 class="form-box" v-model="message" autocomplete="new-password"/>
          <button @click="sendMail" class="send-button" :style="email.length && first.length && last.length && message.length ? 'opacity: 1' : 'opacity: 0'"> Send </button>
        </div>
        <div id="form-complete">
          Message sent
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from '@/components/BasicHeader.vue'
import PlaneLoader from '@/components/PlaneLoader.vue'

export default {
  components: {
      BasicHeader,
      PlaneLoader,
  },
  data() {
    return{
      first: '',
      last: '',
      email: '',
      message: '',
    }
  },
  methods:{
    sendMail: async function(){
      const options = {
        method: 'post',
        body: JSON.stringify({first:this.first, last: this.last, email: this.email, message: this.message, messageType: 'Contact Form (ridesplit)'}),
        headers: {'Content-Type': 'application/json'}
      };
      fetch(process.env.VUE_APP_API_URL+'/contactform', options)
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-complete').style.display = 'block';
      setTimeout(() => document.getElementById('form-complete').style.opacity = 1, 500);
    },
    
  }
}
</script>
<style scoped>
.contact-page{
  margin: 0 24px;
}
.page-center{
  max-width: 1120px;
  margin: 0 auto;
}
.contact-header{
  padding: 160px 0 100px;
  border-bottom: 1px solid #D0D0D0;
  font-size: 40px;
  text-align: left;
}
.form-pane{
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.send-text{
  font-size: 24px;
  font-weight: 600;
}
.form{
  display: flex;
  flex-direction: column;
  width: 540px;
  align-items: flex-end;
}
.form-box{
  border: none;
  border-bottom: 2px solid #D0D0D0;
  margin-bottom: 32px;
  font-size: 14px;
  font-family: inherit;
  padding: 7px 0;
  width: 100% !important;
}
.form-box:focus{
  outline: none;
  border-bottom: 2px solid black;
}
.form-box-label{
  opacity: 0;
  transition: .3s all;
  transform: translateY(20px);
  text-align: left;
  font-size: 12px;
  z-index: -2;
  color: var(--light-gray);
  width: 100%;
}
.send-button{
  padding: 10px 35px;
  text-decoration: none;
  transition: .3s all;
  border-radius: 30px;
  color: white;
  background-color: green;
  border: none;
  font-size: 16px;
  width: 125px;
  margin-right: 0px;
  margin-top: 40px;
}
.send-button:hover{
  background-color: green;
}
#form-complete{
  opacity: 0;
  display: none;
  width: 500px;
  height: 390px;
  font-size: 30px;
  transition: 1s all;
  text-align: center;
}

</style>
