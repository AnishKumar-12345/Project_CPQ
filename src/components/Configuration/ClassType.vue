<template>
  <div :key="textfieldKey">
    <v-card elevation="0" class="ma=0 pa=0">
      <v-form @submit.prevent="saveClassType" v-model="valid" ref="form">
        <div style="margin: 0px">
          <v-row align="center" justify="center" dense>
            <v-col>
              <h3 style="margin-top: 1px">Class Type</h3>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                class="pt-9"
                ref=""
                type="text"
                solo
                rounded
                dense
                :rules="nameRules"
                v-model="item"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn
                class="red white--text pt-1"
                :disabled="!valid"
                type="submit"
              >
                save</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>

    <!-- <v-card elevation="1" > -->
    <v-data-table
      fixed-header
      :headers="header"
      :items="result"
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
              dense
              class="mt-6"
            ></v-text-field>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="pa-2 red--text" small @click="deleteClassType(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
      <v-card>
        <v-card-title class="white" style="font-size: 20px"
          >Are you sure you want to delete Class Type ?</v-card-title
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
  </div>
</template>
    
    <script>
import servicescall from "@/Services";
export default {
  name: "ClassType",
  mixins: [servicescall],
  data() {
    return {
      deleteItem: "",
      textfieldKey: 0,
      result: [],
      search: "",
      snackbar: false,
      activeColor: "",
      text: "",
      valid: "",
      item: "",
      dialogDelete: false,
      header: [
        { text: "S. No", value: "sno" },
        { text: "Class Type", value: "classType" },
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
    this.getClassTypes();
  },

  methods: {
    // cancel
    cancel() {
      this.dialogDelete = false;
    },
    // Confirm to delete class type
    confirmToDelete() {
      var reqItem = this.deleteItem;
      this.deleteClassTypeItem(reqItem).then((response) => {
        if (response.status == 200) {
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.dialogDelete = false;
          this.getClassTypes();
        } else {
          this.text = response.data.message;
          this.activeColor = "red";
          this.snackbar = true;
          this.dialogDelete = false;
        }
      });
    },

    // delete Classtype
    deleteClassType(item) {
      this.deleteItem = item.classType;
      this.dialogDelete = true;
    },
    // edit Class Type
    editClassType(item) {},
    resetForm() {
      this.textfieldKey++;
    },
    getClassTypes() {
      this.getAllClassType().then((response) => {
        this.result = [];
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, classType: response[i] });
        }
      });
    },

    saveClassType() {
      var reqitem = this.item;
      if (this.valid == true) {
        this.postClassType(reqitem).then((response) => {
          if (response.status == 200) {
            this.getClassTypes();
            this.text = response.data.message;
            this.snackbar = true;
            this.$refs.form.reset();
          } else {
            this.text = "response.data.message";
            this.snackbar = true;
          }
        });
      }
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