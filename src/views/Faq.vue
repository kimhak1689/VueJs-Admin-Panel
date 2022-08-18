<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <v-btn color="primary" dark class="mb-2" @click.stop="dialogCreate = true">NEW FAQ</v-btn>
      <h3>FAQ (Frequently Asked Questions)</h3>
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
      <v-btn color="primary" dark class="mb-2" href="/typefaq">Type FAQ</v-btn>
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
          <span class="text-h5">Create FAQ</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Question"
                    type="text"
                    :rules="questionRole"
                    v-model="submit_data.question"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Answer"
                    :rules="AnswerRules"
                    type="text"
                    v-model="submit_data.answer"
                    clearable
                    required
                  ></v-textarea>
                </v-col>
                <!-- <v-col cols="12">
                <v-text-field
                  label="type"
                  type="text"
                   :items="typefaq"
                  v-model="submit_data.typefaq_id"
                  clearable
                  required
                ></v-text-field>
                </v-col>-->
                <v-col cols="12">
                  <v-select
                    v-model="submit_data.typefaq_id"
                    :items="type_faq"
                    :rules="typefaqRules"
                    item-text="type"
                    item-value="_id"
                    label="Type Faq"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="resource"
                    type="text"
                    v-model="submit_data.resource"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
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

    <!-- dialog create -->
    <v-dialog v-model="dialogUpdate" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit FAQ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Question"
                  type="text"
                  v-model="submit_data_edit.question"
                  required
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Answer"
                  type="text"
                  v-model="submit_data_edit.answer"
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
                <v-text-field
                  label="resource"
                  type="text"
                  v-model="submit_data_edit.resource"
                  required
                  clearable
                ></v-text-field>
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
      SERVICE_LINK: process.env.VUE_APP_SERVICE_URL,
      valid: true,
      search: "",
      questionRole: [
        v => !!v || "Question is required"
      ],
      AnswerRules: [v => !!v || "Answer is required"],
      typefaqRules: [v => !!v || "Typefaq is required"],
      headers: [
        // {
        //   text: "No.",
        //   align: "start",
        //   sortable: true,
        //   value: "_id"
        // },
        { text: "Question", value: "question", width: "20%" },
        { text: "Answer", value: "answer", width: "35%" },
        { text: "Created At", value: "create_at", width: "20%" },
        { text: "Created By", value: "create_by.username" },
        { text: "Actions", value: "action" }
      ],
      data: [
        {
          id: 1,
          Question: "Covid 19 has spread...",
          Answer: "Covid 19 has spread...",
          created: "12-05-2022",
          createdBy: "Admin"
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
        question: null,
        answer: null,
        typefaq_id: null,
        resource: null
      },
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
      delete_id: null,
      type_faq: ""
    };
  },
  methods: {
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
    // changeFormatDate(){
    //   this.data.forEach((data)=>{
    //     console.log(this.moment(data.create_at));
    //   })
    // },
    list_item() {
      axios
        .get(`${this.SERVICE_LINK}/api/faq`)
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
            if (this.info) {
              if (this.info.data.msg == "success") {
                //console.log( this.info.data.datas);
                this.type_faq = this.info.data.datas;
              } else {
                alert("Error1");
              }
            }
          }
        });
    },

    submit_from() {
      // console.log(this.submit_data);
      axios
        .post(`${this.SERVICE_LINK}/api/faq/admin`, this.submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info.data.msg == "success") {
              //console.log("Create Success");
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
      console.log(item);
      this.submit_data_edit = Object.assign({}, item);
      this.submit_data_edit.typefaq_id = item.type._id;
    },
    edit_submit() {
      axios
        .put(
          `${this.SERVICE_LINK}/api/faq/${this.submit_data_edit._id}`,
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
    deleteItem(item) {
      this.delete_id = item._id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`${this.SERVICE_LINK}/api/faq/${this.delete_id}`)
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
