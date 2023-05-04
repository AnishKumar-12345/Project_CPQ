<template>
  <v-app>
    <!-- <Navbar/> -->
    <v-content class="ma-2" >
      <router-view></router-view>
    </v-content>
    <!-- <Footer/> -->
  </v-app>
</template>
<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>
<style>
#app {
  background-color: #f3f4f8;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  color: #000;
  background: #f3f4f8;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  border-right: thin solid rgba(0, 0, 0, 0.12);
  font-size: 15px;
  height: 45px;
  margin-left: 20%;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th:hover {
  background-color: #f3f4f8;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  color: black;
  /* border: 1px solid rgba(174,211,149,255); */
  border-collapse: collapse;
  /* border-left-width: 0px; */
  height: 26px;
}
.theme--light.v-data-table tbody tr:nth-of-type(even) {
  /* background-color:#e2efda; */
  border: none;
}
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-data-table-header th {
  white-space: nowrap;
}
/* .v-main{
  padding:60px 0px 0px 60px !important;
} */
.v-main{
  padding: 60px 0px 0px 62px !important;
}
</style>
