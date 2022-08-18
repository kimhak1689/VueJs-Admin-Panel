
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">LOG IN</v-card-title>

        <v-card-text class="mt-5">
          <v-text-field label="Username" placeholder="Enter Your Username" v-model="submit_data.username" hide-details="auto"></v-text-field>
        </v-card-text>
        <v-card-text class="mb-5">
          <v-text-field type="password" label="Password" placeholder="Enter Your Password" v-model="submit_data.password" hide-details="auto"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text  @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="submit_from" >Log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      SERVICE_LINK: process.env.VUE_APP_SERVICE_URL,
      dialog: true,
      submit_data: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    submit_from() {
      console.log("assadsad");
      axios
        .post(`${this.SERVICE_LINK}/api/user/login`, this.submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              //console.log(this.info.data.role);
              //alert(this.info.data.role);
              if(this.info.data.role=='Admin'){
                  VueCookies.set('role',this.info.data,'8h');
                  this.$router.push({ name: 'dashboard' });
              }
            } else {
              alert("Login False False");
            }
          }
        });
      this.dialog = false;
    }
  }
};
</script>