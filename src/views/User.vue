<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <v-btn color="primary" dark class="mb-2" @click.stop="dialogCreate = true">NEW USER</v-btn>
      <h3>User</h3>
      <!-- <v-col lg="6" cols="12">
        <v-form>
          <v-text-field
            class="p-0 m-0 mt-6"
            full-width
            dense
            append-icon="mdi-magnify"
            outlined
            rounded
            placeholder="Search"
          />
        </v-form>
      </v-col>-->
      <!-- <v-btn
        color="primary"
        dark
        class="mb-2"
        @click.stop="dialogCreate = true"
      >
        Create FAQ
      </v-btn>-->
    </v-subheader>
    <br />
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="5"
            :key="data._id"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-text-field v-model="search" label="Search " class="mx-4"></v-text-field>
            </template>

            <template v-slot:item.action="{ item }">
              <v-btn
                icon
                color="blue"
                @click="changepassword(item)"
                @click.stop="dialogPassword = true"
              >
                <v-icon>mdi-key</v-icon>
              </v-btn>
              <v-btn icon color="blue" @click="editItem(item)" @click.stop="dialogUpdate = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="deleteItem(item)" @click.stop="dialogDelete = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog create -->
    <v-dialog v-model="dialogCreate" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="submit_data.first_name" label="First Name*" type="text"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="submit_data.last_name" label="Last Name*" type="text"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="submit_data.username"
                  label="Username"
                  type="text"
                  placeholder="Used for log in"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="submit_data.email"
                  label="Email"
                  type="text"
                  placeholder="Email"

                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="submit_data.role"
                  :items="role"
                  item-text="name"
                  item-value="_id"
                  label="Role User"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="submit_data.phone" label="Phone Number*" type="text"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="submit_data.password"
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="submit_data.repeatpassword"
                  label="Repeat Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCreate = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submit_from">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog update -->
    <v-dialog v-model="dialogUpdate" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="submit_data_edit.first_name" label="First Name*" type="text"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="submit_data_edit.last_name" label="Last Name*" type="text"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="submit_data_edit.username"
                  label="Username"
                  type="text"
                  placeholder="Used for log in"
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  v-model="submit_data_edit.email"
                  label="Email"
                  type="text"
                  placeholder="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="submit_data_edit.role"
                  :items="role"
                  item-text="name"
                  item-value="_id"
                  label="Role User"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="submit_data_edit.phone" label="Phone Number*" type="text"></v-text-field>
              </v-col>
             
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogUpdate = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="edit_submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog changepassword -->
    <v-dialog v-model="dialogPassword" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Update</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="submit_password_edit.new_password"
                  label="New Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Repeat Password*"
                  v-model="submit_password_edit.repeatpassword"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogPassword = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="changepassword_submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog delete -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  name: "faq",
  data() {
    return {
      search: "",
      SERVICE_LINK: process.env.VUE_APP_SERVICE_URL,
      headers: [
        // {
        //   text: "No.",
        //   align: "start",
        //   sortable: true,
        //   value: "_id"
        // },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Role", value: "role.name" },
        { text: "Created at", value: "create_at" },
        { text: "Actions", value: "action" }
      ],
      data: [
        {
          id: 1,
          username: "Default",
          email: "Default",
          Phone: "0000",
          create_at: "00/00/0000"
        }
      ],

      submit_data_edit: {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        role: null
      },
      submit_password_edit: {
        new_password: null,
        repeatpassword: null
      },

      submit_data: {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        role: null
      },
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
      delete_id: null,
      dialogPassword: false,
      role: ""
    };
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },

    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    changepassword(item) {
      this.submit_password_edit = item;
      alert(this.submit_password_edit.password);
    },
    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      this.dialogDelete = false;
    },

    list_item() {
      axios
        .get(`${this.SERVICE_LINK}/api/user`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              this.data = this.info.data.datas;
            } else {
              alert("Error1");
            }
          }
        });
    },

    gettype() {
      axios
        .get(`${this.SERVICE_LINK}/api/role`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info) {
              if (this.info.data.msg == "success") {
                //console.log( this.info.data.datas);
                this.role = this.info.data.datas;
              } else {
                alert("Error1");
              }
            }
          }
        });
    },

    submit_from() {
      // console.log(this.submit_data);
      if (this.submit_data.password == this.submit_data.repeatpassword) {
        axios
          .post(`${this.SERVICE_LINK}/api/user/register`, this.submit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.data.msg == "success") {
                console.log("Create Success");
                this.list_item();
              } else {
                alert("Create False");
              }
            }
          });
        this.dialogCreate = false;
      } else {
        alert("Password and Repeat Password is not the same");
        this.dialogCreate = true;
      }
    },
    editItem(item) {
      console.log(item);
      this.submit_data_edit = Object.assign({}, item);
      this.submit_data_edit.typefaq_id = item.type._id;
    },

    edit_submit() {
      axios
        .put(
          `${this.SERVICE_LINK}/api/user/information/${this.submit_data_edit._id}`,
          this.submit_data_edit
        )
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              console.log("Create Success");
              this.list_item();
            } else {
              alert("Create False");
            }
          }
        });
      this.dialogUpdate = false;
    },
    changepassword_submit() {
      alert("hi");
      if (this.submit_password_edit.new_password ==this.submit_password_edit.repeatpassword) {
        axios
          .put(
            `${this.SERVICE_LINK}/api/user/changepassword/${this.submit_password_edit._id}`,
            this.submit_password_edit
          )
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.data.msg == "success") {
                console.log("Change Success Success");
                this.list_item();
              } else {
                alert("Create False");
              }
            }
          });
        this.dialogPassword = false;
      } else {
        alert("Password and Repeat Password is not the same");
        this.dialogPassword = true;
      }
    },
    deleteItem(item) {
      this.delete_id = item._id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`${this.SERVICE_LINK}/api/user/delete/${this.delete_id}`)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.data.msg == "success") {
                //console.log("delete Success");
                this.list_item();
              } else {
                alert("Create False");
              }
            }
          });
        this.dialogDelete = false;
      }
    },
    check_cookie() {
      var Role = VueCookies.get("role");
      if (Role.role != "Admin") {
        this.$router.push({ name: "login" });
      }
    }
  },
  mounted() {
    this.check_cookie();
    this.list_item();
    this.gettype();
  },
  beforeCreate() {
    this.check_cookie();
  }
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
