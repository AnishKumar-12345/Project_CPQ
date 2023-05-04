<template>
  <div>
    <!-- <v-container color="green"> -->
    <v-card elevation="0">
      <v-form @submit.prevent="saveMaterialType()" ref="form" v-model="valid">
        <div>
          <v-row align="center" justify="center" dense>
            <v-col>
              <h3 style="margin-top: -8px">Material Type</h3>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="pt-9">
              <v-text-field
                solo
                rounded
                v-model="item"
                :rules="nameRules"
                class="mt-0"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn
                type="submit"
                class="red"
                :disabled="!valid"
                style="margin-top: 0px"
              >
                save</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>

    <!-- <v-card > -->
    <v-data-table
      dense
      fixed-header
      :headers="header"
      :items="result"
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
              dense
              class="mt-6"
            ></v-text-field>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="pa-2 red--text"
          small
          @click="deleteMaterialTypeItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="600px" persistent>
      <v-card>
        <v-card-title class="white" style="font-size: 20px"
          >Are you sure you want to delete Material Type?</v-card-title
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

    <!-- </v-card> -->

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
  name: "MaterialType",
  mixins: [servicescall],
  data() {
    return {
      result: [],
      item: "",
      search: "",
      snackbar: false,
      activeColor: "",
      text: "",
      dialogDelete: false,
      delMaterialType: "",
      header: [
        { text: "S. NO", value: "sno" },
        { text: "Material Type", value: "materialType" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      valid: false,

      nameRules: [(v) => !!v || "Field is required"],
    };
  },
  mounted() {
    this.getMaterialTypes();
  },

  methods: {
    deleteMaterialTypeItem(item) {
      console.log("meterial", item.materialType);
      this.delMaterialType = item.materialType;
      this.dialogDelete = true;
    },
    //cancel
    cancel() {
      this.dialogDelete = false;
    },
    // delete
    confirmToDelete() {
      this.deleteMaterialType(this.delMaterialType).then((response) => {
        if (response.status == 200) {
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.dialogDelete = false;
          this.getMaterialTypes();
        } else {
          this.text = response.data.message;
          this.activeColor = "red";
          this.snackbar = true;
          this.dialogDelete = false;
        }
      });
    },

    getMaterialTypes() {
      this.getAllMaterialType().then((response) => {
        this.result = [];
        //console.log("Get All class types",response)
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, materialType: response[i] });
        }
      });
    },

    saveMaterialType() {
      if (this.valid == true) {
        this.postMaterialType(this.item).then((response) => {
          this.text = response.data.message;
          this.activeColor = "green";
          this.snackbar = true;
          this.getMaterialTypes();
          this.$refs.form.reset();
        });
      } else {
        this.text = response.data.error;
        this.activeColor = "red";
        this.snackbar = true;
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