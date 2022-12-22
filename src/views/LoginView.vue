<template>

  <div class="container mt-4">
    <div class="row justify-content-around">
      <div class="col-md-4">

        <div class="input-group ms-3 mt-5 pt-5 mb-4">
          <span class="input-group-text input-width" id="inputGroup-sizing-default">Kasutajanimi*</span>
          <input v-model="username" type="text" class="form-control" aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-default">
        </div>


        <div class="input-group ms-3">
          <span class="input-group-text input-width" id="inputGroup-sizing-default w-75">Parool*</span>
          <input v-model="password" type="password" class="form-control" aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-default">
        </div>

        <div class="col-7 ps-5 mt-5">
          <div class="row input-group ms-5 mb-3">
            <button v-on:click="login" type="button" class="btn btn-dark">Logi sisse</button>
          </div>
        </div>

        <div v-if="errorResponse.message.length > 0" class="alert alert-danger mb-5 align-items-center" role="alert">
          {{ errorResponse.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: function () {
    return {
      username: '',
      password: '',

      loginResponse: {
        id: 0
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }

    }

  },
  methods: {


    login: function () {
      this.errorResponse.message = ''
      if (this.username.length == 0 || this.password.length == 0) {
        this.errorResponse.message = 'Täida kõik väljad';
      } else {
        this.$http.get("/login", {
              params: {
                username: this.username,
                password: this.password
              }
            }
        ).then(response => {
          this.loginResponse = response.data
            sessionStorage.setItem('userId', this.loginResponse.id);
          this.$emit('updateStatusEvent')
            this.$router.push({
              name: 'transactionRoute'
            })
        }).catch(error => {
          this.errorResponse = error.response.data
        })
      }
    }
  }
}
</script>

