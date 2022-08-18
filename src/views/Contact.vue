<template>
 <div>
   <v-data-table
    :headers="dessertHeaders"
    :items="data"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length"><b>Message: </b> {{ item.message }}</td>
    </template>
  </v-data-table>
 </div>
</template>
<script>
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Contact No", value: "contactno" },
        { text: "", value: "data-table-expand" }
      ],
      data: []
    };
  },
  methods: {
    list_item() {
      axios
        .get(`http://localhost:3001/api/contact`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              this.data = this.info.data.datas;
            } else {
              alert("Error");
              console.log("Error");
            }
          }
        });
    },
    check_cookie() {
      var Role = VueCookies.get("role");
      if (Role.role != "Admin") {
        this.$router.push({ name: "login" });
      }
    }
  },
  beforeCreate() {
    this.check_cookie();
  },
  mounted(){
    this.check_cookie();
    this.list_item();
  }
};
</script>