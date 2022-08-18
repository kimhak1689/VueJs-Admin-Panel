<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <!-- <v-btn color="success">
                View Activity
      </v-btn>-->
    </v-subheader>
    <br />

    <v-row>
      <!-- <v-alert dense text type="success" class="alert_success">
          Login Successfully! Welcome to
          <strong>COVID-19 Information Admin Panel</strong>
      </v-alert>-->
      <v-col lg="7" cols="12">
        <v-row>
          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(255,198,22,.8);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>Total Cases</strong>
                  <br />
                  <span>WorldWide</span>
                </div>
                <span class="card_number">{{cases}}</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"></v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(255,198,22,.8);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>Today Case</strong>
                  <br />
                  <span>WorldWide</span>
                </div>
                <span class="card_number">{{todaycases}}</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"></v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(159,226,7);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>Recovered</strong>
                  <br />
                  <span>WorldWide</span>
                </div>
                <span class="card_number">{{recovered}}</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"></v-card-actions>
            </v-card>
          </v-col>

          <v-col lg="6" cols="12">
            <v-card elevation="2" class="rounded-lg" style="background-color: rgb(244,67,54,.8);">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>Deaths</strong>
                  <br />
                  <span>WorldWide</span>
                </div>
                <span class="card_number">{{deaths}}</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"></v-card-actions>
            </v-card>
          </v-col>

          <!-- 
          <v-col lg="6" cols="12" v-for="(item,index) in activityLog" :key="index">
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong>
                  <br />
                  <span>Last 3 weeks</span>
                </div>
                <v-avatar size="60" :color="item.color" style="border: 3px solid #444">
                  <span style="color: white">{{item.amount}} +</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"></v-card-actions>
            </v-card>
          </v-col>-->
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <canvas id="myChart2" style="max-width:100%;max-height:41.5vh"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12">
        <v-card>
          <canvas id="myChart1" style="max-width:100%;max-height:50vh"></canvas>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            caption="Recent Users Join"
            :headers="headers"
            :items="data"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.action>
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import VueCookies from "vue-cookies";
export default {
  name: "Dashboard",
  data() {
    return {
      cases: null,
      deaths: null,
      recovered: null,
      todaycases: null,

      activityLog: [
        {
          title: "Total Cases",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3"
        },
        {
          title: "Treatments",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2"
        },
        {
          title: "Death",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1"
        },
        {
          title: "Community Cases",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1"
        },
        {
          title: "Vacinnation",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "purple darken-1"
        }
      ],

      headers: [
        {
          text: "No.",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Role", value: "role" },
        { text: "Joined At", value: "joinAt" },
        { text: "Actions", value: "action" }
      ],
      data: [
        {
          id: 1,
          name: "Han Kimhak",
          role: "Sub-Admin",
          joinAt: "12-05-2022"
        },
        {
          id: 2,
          name: "Han Kimhak",
          role: "User",
          joinAt: "12-05-2022"
        },
        {
          id: 3,
          name: "Han Kimhak",
          role: "User",
          joinAt: "12-05-2022"
        },
        {
          id: 4,
          name: "Han Kimhak",
          role: "User",
          joinAt: "12-05-2022"
        },
        {
          id: 4,
          name: "Han Kimhak",
          role: "User",
          joinAt: "12-05-2022"
        }
      ],
      xValues2: ["Confirm Case", "Deaths", "Recovered"],
      yValues2: null,
      barColors2: ["#f2b809", "#fa1100", "#3e9915"],
      xValues1: [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      yValues1: [70, 80, 80, 90, 90, 96, 100, 110, 140, 150, 56, 15, 160]
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    create_chart() {
      new Chart("myChart1", {
        type: "line",
        data: {
          labels: this.xValues1,
          datasets: [
            {
              label: "ចំនួន(នាក់)",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: this.yValues1
            }
          ]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: -1, max: 500 } }]
          },
          title: {
            display: true,
            text: "Covid Case In Cambodia 2022"
          }
        }
      });
      new Chart("myChart2", {
        type: "pie",
        data: {
          labels: this.xValues2,
          datasets: [
            {
              backgroundColor: this.barColors2,
              data: this.yValues2
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Covid Case In Cambodia"
          }
        }
      });
    },
    get_total_case() {
      axios
        .get(`https://disease.sh/v3/covid-19/all`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            if (this.info != null) {
              this.cases = this.info.data.cases;
              this.deaths = this.info.data.deaths;
              this.recovered = this.info.data.recovered;
              this.todaycases = this.info.data.todayCases;

              this.yValues2 = [this.cases, this.deaths, this.recovered];
              this.create_chart();
              // alert("GET API SUCCESS");
              // console.log(this.info);
            } else {
              console.log("GET TOTAL CASE FALSE");
              //alert("GET TOTAL CASE FALSE");
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
     this.get_total_case();
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
.card_number {
  font-weight: bold;
  padding-right: 25px;
  font-size: 25px;
}
</style>