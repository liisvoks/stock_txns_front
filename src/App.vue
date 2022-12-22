<template>
  <div id="app">
    <div v-if="displayWithLogin">
      <nav>
        <router-link to="/">Tehingud</router-link>
        |
        <router-link to="/login">Logi sisse</router-link>
      </nav>
    </div>
    <div v-else>
      <nav>
        <router-link to="/">Tehingud</router-link>
        |
        <button v-on:click="logout" type="button" class="btn btn-dark">Logi välja</button>
      </nav>
    </div>

    <router-view @updateStatusEvent="updateStatus"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      displayWithLogin: true,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    updateStatus: function () {
      this.userId = sessionStorage.getItem('userId')
      this.displayWithLogin = this.userId == null
    },
    logout: function () {
      sessionStorage.clear()
      this.$router.go()
      this.updateStatus()
    }
  },
  mounted() {
    this.updateStatus()
  }
}
</script>
