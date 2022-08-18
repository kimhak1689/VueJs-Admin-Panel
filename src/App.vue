<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    <Topbar @drawerEvent="drawer = !drawer" />
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import VueCookies from "vue-cookies";

export default {
  name: "App",
  components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null
  }),
  methods: {
    check_cookie() {
      var Role = VueCookies.get("role");
      if(Role!='Admin'){
         this.$router.push({ name: 'login' });
      }
    }
  },
  mounted() {
    this.check_cookie();
  }
};
</script>
