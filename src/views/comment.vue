<template>
  <v-card max-width="100%" class="mx-auto">
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Command</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <template v-for="(item) in comments">
        <v-list-item :key="item._id">
          <v-list-item-avatar>
            <v-img
              :src="item.create_by.image"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.create_by.username"></v-list-item-title>
            <v-list-item-subtitle v-html="item.create_at"></v-list-item-subtitle>
            <v-list-item-title v-html="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  data: () => ({
    SERVICE_LINK: process.env.VUE_APP_SERVICE_URL,
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        date: "15/11/2015",
        title: "Brunch this weekend?",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
      }
    ],
    comments: null
  }),
  methods: {
    getCommand() {
      axios
        .get(`${this.SERVICE_LINK}/api/comment`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              this.comments = this.info.data.datas;
              this.comments.forEach((value, index) => {
               
                var date = new Date(this.comments[index].create_at);
                this.comments[index].create_at = date.toLocaleDateString();
                

                const default_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL-TFBkWINQO9lA-MGeCadLeonmbZN_1hAzHzuw-Osg&s';

                if(this.comments[index].create_by.image==null){
                  this.comments[index].create_by.image=default_image;
                }
                //console.log(date.toLocaleDateString());
              });
              console.log(this.comments);
            } else {
              alert("Error1");
            }
          }
        });
    },
    check_cookie() {
      var Role = VueCookies.get("role");
      if (Role != "Admin") {
        this.$router.push({ name: "login" });
      }
    }
  },
  mounted() {
    this.getCommand();
  }
};
</script>