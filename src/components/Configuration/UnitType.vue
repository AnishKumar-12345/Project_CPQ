<template>
  <div>
    <!-- <v-container > -->
    <v-card elevation="0">
      <v-form @submit.prevent="saveUnitType()" ref="form" v-model="valid">
        <div>
          <v-row align="center" justify="center" dense>
            <v-col>
              <h3 class="pt-2">Unit Type</h3>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                solo
                rounded
                class="pt-9"
                dense
                :rules="nameRules"
                v-model="item"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn type="submit" class="red" :disabled="!valid"> save</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
    <!-- 
           <v-card  > -->

    <v-data-table
      :headers="header"
      :items="result"
      dense
      fixed-header
      :search="search"
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
        <v-icon class="pa-2 red--text" small @click="deleteUnitType(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="600px" persistent>
      <v-card>
        <v-card-title class="white" style="font-size: 20px"
          >Are you sure you want to delete Unit type ?</v-card-title
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
  name: "UnitType",
  mixins: [servicescall],
  data() {
    return {
      activeColor: "",
      search: "",
      colorList: ["green", "red"],
      result: [],
      item: "",
      valid: "",
      snackbar: "",
      text: "",
      dialogDelete: false,
      deleteItem: "",
      header: [
        { text: "S.No", value: "sno" },
        { text: "Unit Type", value: "unitType" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      nameRules: [(v) => !!v || "Field is required"],
    };
  },
  mounted() {
    this.getUnitType();
  },

  methods: {
    // cancel
    cancel() {
      this.dialogDelete = false;
    },

    deleteUnitType(item) {
      this.deleteItem = item.unitType;
      this.dialogDelete = true;
    },

    // Confirm to delete class type
    confirmToDelete() {
      var reqItem = this.deleteItem;
      this.deleteUnitTypeItem(reqItem).then((response) => {
        if (response.status == 200) {
          this.text = response.data.message;
          this.snackbar = true;
          this.activeColor = "";
          this.activeColor = "green";
          this.dialogDelete = false;

          this.getUnitType();
        } else {
          this.text = response.data.message;
          this.snackbar = true;
          this.activeColor = "";
          this.activeColor = "red";
          this.dialogDelete = false;
        }
      });
    },

    saveUnitType() {
      this.postUnitType(this.item).then((response) => {
        this.text = response.data.message;
        this.snackbar = true;
        this.activeColor = "green";
        this.getUnitType();
        this.$refs.form.reset();
      });
    },

    getUnitType() {
      this.getAllUnitType().then((response) => {
        this.result = [];
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, unitType: response[i] });
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