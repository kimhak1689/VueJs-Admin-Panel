<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <v-btn color="primary" dark class="mb-2" @click.stop="dialogCreate = true">Create news</v-btn>
      <h3>NEWS</h3>
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

            <template v-slot:item.create_at="{ item }">{{ moment(item.create_at) }}</template>

            <template v-slot:item.command="{ item }">
              <v-btn
                icon
                color="blue"
                @click.stop="dialogComment = true"
                @click="ViewCommand(item)"
              >Comment</v-btn>
            </template>

            <template v-slot:item.action="{ item }">
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
          <span class="text-h5">Create News</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Title"
                      type="text"
                      :rules="TitleRules"
                      v-model="submit_data.title"
                      clearable
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      type="text"
                      v-model="submit_data.description"
                      clearable
                      :rules="DescriptionRules"
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Resource"
                      type="text"
                      v-model="submit_data.resource"
                      clearable
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="submit_data.typefaq_id"
                      :items="type_faq"
                      :rules="TypeRules"
                      item-text="type"
                      item-value="_id"
                      label="Type Faq"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      accept="image/*"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Image"
                      type="file"
                      v-model="submit_data.image"
                      show-size
                    ></v-file-input>
                  </v-col>
                </v-row>
              </form>
              <!-- <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="['Title is Require']"
                label="Item"
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

              <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

              <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
              </v-form>-->
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogCreate = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="validate_submitForm">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- dialog command -->
    <v-dialog v-model="dialogComment" persistent max-width="700px">
      <v-card max-width="100%" class="mx-auto">
        <v-toolbar color="cyan" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Comment</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="dialogComment = false">
            <v-icon dark left>mdi-arrow-left</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <div v-if="comments==null">Not Comment</div>
          <template v-for="(item) in comments" class="comment">
            <v-list-item :key="item._id">
              <v-list-item-avatar>
                <v-img :src="item.create_by.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="user_comment" v-html="item.create_by.username"></v-list-item-title>
                <v-list-item-subtitle class="date_comment">{{moment(item.create_at)}}</v-list-item-subtitle>
                <v-list-item-title class="message_comment" v-html="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- dialog update -->
    <v-dialog v-model="dialogUpdate" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit News</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  type="text"
                  v-model="submit_data_edit.title"
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  type="text"
                  v-model="submit_data_edit.description"
                  clearable
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Resource"
                  type="text"
                  v-model="submit_data_edit.resource"
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="submit_data_edit.typefaq_id"
                  :items="type_faq"
                  item-text="type"
                  item-value="_id"
                  label="Type Faq"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  placeholder="Pick a Picture"
                  prepend-icon="mdi-camera"
                  label="Image"
                  type="file"
                  v-model="submit_data_edit.image"
                  show-size
                ></v-file-input>
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
import moment from "moment";
export default {
  name: "faq",
  data() {
    return {
      search: "",
      valid: true,
      TitleRules: [
        v => !!v || "Title is required",
        v => (v && v.length <= 100) || "Name must be less than 100 characters"
      ],
      DescriptionRules: [v => !!v || "Description is required"],
      TypeRules: [v => !!v || "Type is required"],
      headers: [
        // {
        //   text: "No.",
        //   align: "start",
        //   sortable: true,
        //   value: "_id"
        // },
        { text: "Title", value: "title", width: "20%" },
        // { text: "Description", value: "description", width: "25%" },
        { text: "Type", value: "type.type", width: "4%" },
        { text: "Created At", value: "create_at" },
        { text: "Created By", value: "create_by.username" },
        { text: "Comment", value: "command" },
        { text: "Actions", value: "action", width: "10%" }
      ],
      data: [
        {
          id: 1,
          title: "Example",
          description: "Example",
          create_at: "12-05-2022"
        }
      ],
      dataEdit: {
        question: null,
        answer: null,
        typefaq_id: null,
        resource: null
      },
      submit_data_edit: {
        question: null,
        answer: null,
        typefaq_id: null,
        resource: null
      },
      submit_data: {
        title: "",
        description: "",
        typefaq_id: null,
        resource: null
      },
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
      delete_id: null,
      dialogComment: false,
      image: "",
      type_faq: "",
      comments: null,
      SERVICE_LINK: process.env.VUE_APP_SERVICE_URL
    };
  },
  methods: {
    // validate() {
    //   if (
    //     this.submit_data.title.length > 0 &&
    //     this.submit_data.description.length > 0
    //   ) {
    //     this.invalid = false;
    //   }
    // },

    moment: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
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
    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      this.dialogDelete = false;
    },

    list_item() {
      axios
        .get(`${this.SERVICE_LINK}/api/news`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              this.data = this.info.data.datas;

              this.submit_data = {};
              this.submit_data_edit = {};
            } else {
              alert("Error1");
            }
          }
        });
    },
    gettype() {
      axios
        .get(`${this.SERVICE_LINK}/api/typefaq`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              //console.log( this.info.data.datas);
              this.type_faq = this.info.data.datas;
            } else {
              alert("Error1");
            }
          }
        });
    },
    submit_from() {
      const formData = new FormData();
      var Role = VueCookies.get("role");
      
      formData.append("title", this.submit_data.title);
      formData.append("typefaq_id", this.submit_data.typefaq_id);
      formData.append("resource", this.submit_data.resource);
      formData.append("description", this.submit_data.description);
      formData.append("image", this.submit_data.image);
      formData.append("adminId", Role.user_id);

      axios
        .post(`${this.SERVICE_LINK}/api/news`, formData, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              //console.log("Create Success");
              this.submit_data = {};
              this.list_item();
            } else {
              alert("Create False");
            }
          }
        });
      this.dialogCreate = false;
    },
    validate_submitForm() {
      if (this.$refs.form.validate() == false) {
        alert("Please Input Field Before Submit.");
      } else {
        this.submit_from();
      }
    },
    editItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.submit_data_edit = Object.assign({}, item);
      this.submit_data_edit.typefaq_id = item.type._id;
    },

    edit_submit() {
      const formData = new FormData();

      formData.append("title", this.submit_data_edit.title);
      formData.append("typefaq_id", this.submit_data_edit.typefaq_id);
      formData.append("resource", this.submit_data_edit.resource);
      formData.append("description", this.submit_data_edit.description);
      formData.append("image", this.submit_data_edit.image);
      console.log(this.submit_data_edit.typefaq_id);
      axios
        .put(
          `${this.SERVICE_LINK}/api/news/${this.submit_data_edit._id}`,
          formData
        )
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              console.log("Edit Success");
              this.list_item();
            } else {
              alert("Edit False");
            }
          }
        });
      this.dialogUpdate = false;
    },
    deleteItem(item) {
      this.delete_id = item._id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`${this.SERVICE_LINK}/api/news/${this.delete_id}`)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.data.msg == "success") {
                //console.log("delete Success");
                this.list_item();
              } else {
                alert("Delete False");
              }
            }
          });
        this.dialogDelete = false;
      }
    },
    ViewCommand(item) {
      console.log(item);
      this.getCommand(item._id);
    },
    getCommand(id) {
      axios
        .get(`${this.SERVICE_LINK}/api/comment/${id}`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              this.comments = this.info.data.datas;
              this.comments.forEach((value, index) => {
                var date = new Date(this.comments[index].create_at);
                this.comments[index].create_at = date.toLocaleDateString();

                const default_image =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL-TFBkWINQO9lA-MGeCadLeonmbZN_1hAzHzuw-Osg&s";

                if (this.comments[index].create_by.image == null) {
                  this.comments[index].create_by.image = default_image;
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
      if (Role.role != "Admin") {
        this.$router.push({ name: "login" });
      }
    }
  },
  beforeCreate() {
    this.check_cookie();
  },
  mounted() {
    this.check_cookie();
    this.gettype();
    this.list_item();
  },
  watch: {
    // submit_data: function() {
    //   this.validate();
    // }
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
.message_comment {
  color: #2a81ea;
}
.user_comment {
  font-weight: bold;
}
.date_comment {
  font-size: 12px;
}
</style>
