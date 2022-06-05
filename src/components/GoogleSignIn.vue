<template>
  <div id="google-signin-button"></div>
</template>

<script>
export default {
  emits: ['signIn'],
  mounted() {
    this.initGoogleAuth()
    // this.signOut()
    window.gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })

  },
  methods: {
    onSignIn(gUser) {
      const profile = gUser.getBasicProfile()
      if (gUser.getHostedDomain() !== 'g.ucla.edu')
        this.signOut()
      else
        this.$emit('signIn', profile)
    },

    signOut() {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {});
    },

    initGoogleAuth() {
      window.gapi.load("auth2", function () {
        window.gapi.auth2.init();
      });
    },
  },
  
}
</script>