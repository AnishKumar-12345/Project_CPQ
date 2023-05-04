<template>
    <div>
            <v-data-table
              dense
              fixed-header
   
              :headers="headers"
              :items="allMakes"
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
                  <v-spacer></v-spacer>
                  <vue-excel-xlsx
                          :data="allMakes"
                          :columns="jsonfields"
                          :file-name="'Accessories Makes'"
                          :file-type="'xlsx'"
                          :sheet-name="'sheetname'"
                            v-if="allMakes != ''"
                          >
                          <v-icon
                          large
                          color="green"
                          >
                            mdi-cloud-download
                          </v-icon>
                        </vue-excel-xlsx>
                  <vue-excel-xlsx
                    :data="json_data"
                    :columns="json_data"
                          :file-name="'Accessories Makes'"
                          :file-type="'xlsx'"
                          :sheet-name="'sheetname'"
                    v-if="allMakes == ''"
                  >
                    <v-icon large color="green darken-2">
                      mdi-cloud-download
                    </v-icon>
                  </vue-excel-xlsx>
                  <v-icon
                    class="pa-2 mt-0 blue--text"
                    medium
                    color="red"
                    @click="activeUploadCard"
                    large
                  >
                    mdi-cloud-upload
                  </v-icon>
                  <v-icon color="red" large @click="addAccessoriresMake">mdi-plus</v-icon>
                </v-toolbar>
              </template>
  
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 blue--text" @click="editAccessoriresCode(item)">
                  mdi-pencil
                </v-icon>
  
                <v-icon class="pa-2 red--text" small @click="deleteCard(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
      <v-dialog v-model="dialog2" max-width="600px">
        <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
          <v-card-title>Add Accessories Make</v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form" @submit.prevent="saveAccessoriresMakes">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Accessories Make Code"
                    placeholder="Accessories Make Code"
                    :rules="nameRules"
                    v-model="makeModel.makeCode"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Accessories Make Name"
                    placeholder="Accessories Make Name"
                    v-model="makeModel.makeName"
                    :rules="nameRules"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-card-actions class="mr-3">
                  <v-spacer></v-spacer>
                  <v-btn  color="red white--text"
                              style="width:80px;margin-left:10px;" @click="cancelAccessoriresMake()"
                    >Cancel</v-btn
                  >
                  <v-btn class="mr-4" color="green white--text"
                              style="width:80px;" type="submit"
                    >Save</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialog" max-width="600">
        <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
          <v-card-title>Edit Accessories Code</v-card-title>
          <v-form ref="form" @submit.prevent="editAccessoriresMake">
            <v-card-text>
              <v-row justify="space-around" class="ma-3">
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    placeholder="Accessories Make Code"
                    label="Accessories Make Code"
                    v-model="editMakeModel.makeCode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    placeholder="Accessories Make Name"
                    label="Accessories Make Name"
                    v-model="editMakeModel.makeName"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red white--text"
                  style="width:80px;" @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn class="mr-4" color="green white--text"
                  style="width:80px;" type="submit">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialogDelete" max-width="700px" persistent>
        <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
          <v-card-title style="font-size: 20px"
            >Are you sure you want to delete Accessories Make ?</v-card-title
          >
          <v-card-actions class="mr-3">
            <v-spacer></v-spacer>
            <v-btn color="red white--text"
                              style="width:80px;" @click="dialogDelete = false"
              >Cancel</v-btn
            >
            <v-btn
             color="green white--text"
              style="width:80px;"
              class="mr-3"
              @click="confirmToDelete"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- upload card function -->
      <div v-if="this.activeUpload == true">
        <v-dialog persistent max-width="600px" v-model="activeUpload">
          <v-card>
            <v-card-title style="background-color:#2cb1fe;color:white;"
              >Upload Accessories Makes
            </v-card-title>
            <v-card-text class="mt-4">
              <v-row align="center">
                <v-col>
                  <input type="file" ref="myFileInput" v-on:change="uploadFile" />
                </v-col>
              </v-row>
              <v-progress-circular
                v-show="isProgress == true"
                indeterminate
                :size="100"
                color="green"
              >
              </v-progress-circular>
            </v-card-text>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn class="green white--text mb-2" @click="submitFIle"
                >Upload</v-btn
              >
              <v-btn @click="activeUpload = false" class="red white--text mb-2"
                >cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
  
      <v-snackbar :color="activeColor" v-model="snackbar" timeout="5000">
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import servicescall from "@/Services";
  import downloadexcel from "vue-json-excel";
  export default {
    name: "accessoriesmake",
    mixins: [servicescall],
    components: {
      downloadexcel,
    },
    data() {
      return {
        dialog2: false,
        json_data: [{
          label: "Make_Code",
             field: "",
          },{
          label: "Make_Name",
             field: "",
        }],
        editedIndex: -1,
        file: "",
        isProgress: false,
        activeUpload: false,
        jsonfields: [{
          label: "Make_Code",
             field: "makeCode",
          },{
          label: "Make_Name",
             field: "makeName",
        }],
        search: "",
        textbgColor: "",
        valid: false,
        text: "",
        dialog: false,
        snackbar: false,
        activeColor: "",
        dialogDelete: false,
        deleteModel: {},
        makeModel: {
          makeCode: "",
          makeName: "",
        },
        editMakeModel: {
          makeCode: "",
          makeName: "",
        },
        allMakes: [],
        headers: [
          { text: "Accessories Make Code", value: "makeCode" },
          { text: "Accessories Make Name", value: "makeName" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        nameRules: [
          (v) => !!v || " Field  is required",
          //  (v) => v.length <= 30 || "Name allows below 30 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
        ],
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Add Accessories make" : "Edit Accessories make";
      },
    },
    mounted() {
      this.getAllMakes();
    },
  
    methods: {
      // Add Item make
      addAccessoriresMake() {
        this.dialog2 = true;
      },
      cancelAccessoriresMake() {
        this.dialog2 = false;
        this.makeModel = {};
        this.$refs.form.reset();
        // this.makeModel = [];
      },
      // uploadItem Makes
      uploadFile(event) {
        this.file = event.target.files[0];
        if (
          this.file.name.split(".").pop() == "xlsx" ||
          this.file.name.split(".").pop() == "xls"
        ) {
        } else {
          alert("upload only .xlsx or .xls");
          this.file = "";
        }
      },
  
      activeUploadCard() {
        // alert("hello")
        this.activeUpload = true;
      },
      submitFIle() {
        if (this.file == "") {
          alert("Please choose file");
        } else {
          if (
            this.file.name.split(".").pop() == "xlsx" ||
            this.file.name.split(".").pop() == "xls"
          ) {
            var formData = new FormData();
            this.isProgress = true;
            formData.append("makes", this.file);
            this.isUploadCard = true;
            this.uploadAccessoriresMakes(formData).then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.isProgress = false;
                this.activeColor = "green";
                this.activeUpload = false;
                this.snackbar = true;
                this.file = "";
                this.getAllMakes();
              } else {
                this.text = response.data.message;
                this.isProgress = false;
                this.activeColor = "red";
                this.snackbar = true;
                //setInterval(location.reload(), 1000);
              }
            });
          } else {
            alert("upload only .xlsx or .xls");
            this.$refs.myFileInput.value = "";
            this.file = "";
          }
        }
      },
      //deleteCard
      deleteCard(item) {
        this.deleteModel = item;
        this.dialogDelete = true;
      },
      //confirmToDelete
      confirmToDelete() {
        var reqJSON = this.deleteModel;
        this.deleteAllAccessoriresMake(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
  
            this.dialogDelete = false;
  
            this.getAllMakes();
          } else {
            this.text = response.data.message;
            this.activeColor = "red";
            this.snackbar = true;
            this.dialogDelete = false;
          }
        });
      },
  
      //edit item code
      editAccessoriresCode(item) {
        this.editMakeModel = item;
        this.dialog = true;
      },
      getAllMakes() {
        this.getAccessoriresMakes().then((response) => {
          this.allMakes = response;
        });
      },
  
      saveAccessoriresMakes() {
        if (this.$refs.form.validate()) {
          var reqJson = this.makeModel;
          this.saveAccessoriresMake(reqJson).then((response) => {
            this.snackbar = false;
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.$refs.form.reset();
              this.getAllMakes();
              this.dialog2 = false;
            } else {
              this.text = response.data.error;
              this.activeColor = "red";
              this.snackbar = true;
            }
  
            this.$refs.form.reset();
          });
        }
      },
  
      editAccessoriresMake() {
        if (this.$refs.form.validate()) {
          var reqJson = this.editMakeModel;
          this.saveAccessoriresMake(reqJson).then((response) => {
            this.snackbar = false;
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.dialog = false;
              this.$refs.form.reset();
              this.getAllMakes();
            } else {
              this.text = response.data.error;
              this.activeColor = "red";
              this.snackbar = true;
            }
  
            this.$refs.form.reset();
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
    /* margin: 20px; */
  }
  </style>