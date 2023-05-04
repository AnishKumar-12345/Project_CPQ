<template>
  <div>
    <!-- <v-container color="green"> -->
    <v-card elevation="0">
      <v-form @submit.prevent="saveStandards" ref="form" v-model="valid">
        <div>
          <v-row align="center" justify="center" dense>
            <v-col>
              <h3 class="pt-2">Code & Standard Type</h3>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                solo
                rounded
                class="pt-9"
                :rules="nameRules"
                dense
                v-model="standardItem"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn type="submit" class="red" :disabled="!valid"> save</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
    <!-- <v-card  >  -->
    <v-data-table
      :headers="header"
      :items="result"
      fixed-header
      :search="search"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-text-field
              rounded
              solo
              v-model="search"
              label="Search "
              class="mt-6"
              dense
            ></v-text-field>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="pa-2 red--text" small @click="deleteStandard(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- </v-card> -->

    <v-dialog v-model="dialogDelete" max-width="600px" persistent>
      <v-card>
        <v-card-title class="white" style="font-size: 20px"
          >Are you sure you want to delete Standards ?</v-card-title
        >
        <v-card-actions class="mr-3">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            text
            class="mr-3"
            @click="confirmToDelete"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar :color="activeColor" v-model="snackbar"
      >{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <!-- </v-container> -->
  </div>
</template>
    
    <script>
import servicescall from "@/Services";
export default {
  name: "Standards",
  mixins: [servicescall],

  mounted() {
    this.getStandards();
  },
  data() {
    return {
      valid: false,
      standardItem: "",
      activeColor: "",
      snackbar: false,
      text: "",
      search: "",
      result: [],
      dialogDelete: false,
      header: [
        { text: "S. No", value: "sno" },
        { text: "Standard", value: "standard" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      nameRules: [(v) => !!v || "Field is required"],
    };
  },

  methods: {
    saveStandards() {
      var reqitem = this.standardItem;

      this.postStandards(reqitem).then((response) => {
        if (response.status == 200) {
          // this.getClassTypes();
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.$refs.form.reset();
          this.getStandards();
        } else {
          this.text = "response.data.message";
          this.activeColor = "red";
          this.snackbar = true;
        }
      });
    },

    //get all standards

    getStandards() {
      this.getAllStandards().then((response) => {
        this.result = [];
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, standard: response[i] });
        }
      });
    },

    deleteStandard(item) {
      this.deleteItem = item.standard;
      this.dialogDelete = true;
    },

    cancel() {
      this.dialogDelete = false;
    },

    confirmToDelete() {
      var reqItem = this.deleteItem;
      this.deleteStandardItem(reqItem).then((response) => {
        if (response.status == 200) {
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.dialogDelete = false;
          this.getStandards();
        } else {
          this.text = response.data.message;
          this.activeColor = "red";
          this.snackbar = true;
          this.dialogDelete = false;
        }
      });
    },
  },
};
</script>
    
    <style scoped>
.v-data-table {
  line-height: 2.8;
  max-width: 100%;
}
</style>