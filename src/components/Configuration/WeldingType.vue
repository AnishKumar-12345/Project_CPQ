<template>
  <div>
    <!-- <v-container style="background-color:white"   > -->
    <v-card min-height="100px" elevation="0">
      <v-form @submit.prevent="saveWeldingType()" v-model="valid" ref="form">
        <div>
          <v-row
            align="center"
            justify="center"
            style="margin: 0%; padding: 0%"
            dense
          >
            <v-col>
              <h3 class="pt-2">Welding Type</h3>
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
              <v-btn class="mt-2" :disabled="!valid" type="submit" color="red">
                save</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>

    <!-- <v-card  > -->
    <v-data-table
      :headers="header"
      :items="result"
      dense
      :search="search"
      fixed-header
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
        <v-icon class="pa-2 red--text" small @click="deleteWeldingType(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="600px" persistent>
      <v-card>
        <v-card-title class="white" style="font-size: 20px"
          >Are you sure you want to delete Welding Type ?</v-card-title
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

    <v-snackbar :color="activeColor" v-model="snackbar" timeout="2000"
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
  name: "WeldingType",
  mixins: [servicescall],
  data() {
    return {
      dialogDelete: false,
      delItem: "",
      result: [],
      search: "",
      item: "",
      valid: false,
      snackbar: "",
      activeColor: "",
      text: "",
      header: [
        { text: "S.No", value: "sno" },
        { text: "Welding Type", value: "weldingType" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      nameRules: [
        (v) => !!v || "Field is required",
        (v) => v.length <= 30 || "Name allows below 30 characters only",
        // v => /[^a-z ]*$/gmi || 'Name must be characters',
        // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
      ],
    };
  },
  mounted() {
    this.getWeldings();
  },

  methods: {
    // delete Welding Type
    deleteWeldingType(item) {
      this.delItem = item.weldingType;
      this.dialogDelete = true;
    },
    // cancel
    cancel() {
      this.dialogDelete = false;
    },

    //confirmToDelete
    confirmToDelete() {
      var reqItem = this.delItem;
      this.deleteWeldingTypeItem(reqItem).then((response) => {
        if (response.status == 200) {
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.dialogDelete = false;
          this.getWeldings();
        } else {
          this.text = response.data.message;
          this.activeColor = "red";
          this.snackbar = true;
          this.dialogDelete = false;
        }
      });
    },
    getWeldings() {
      this.getAllWeldingType().then((response) => {
        // this.result=response
        this.result = [];
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, weldingType: response[i] });
        }
      });
    },

    saveWeldingType() {
      this.postWeldingType(this.item).then((response) => {
        this.text = response.data.message;
        this.activeColor = "green";
        this.snackbar = true;

        this.getWeldings();
        this.item = "";
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