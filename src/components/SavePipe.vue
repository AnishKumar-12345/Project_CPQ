<template>
    <div>
        <Navbar/>
      <v-data-table
        :headers="headers"
        :items="this.result"
        sort-by="id"
        class="elevation-1"
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
              ></v-text-field>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            <v-dialog persistent v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" dark class="mb-2" v-bind="attrs" v-on="on">
                  Add
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-form
                  @submit.prevent="Savepipe"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-card-text>
                    <v-container>
                      <v-row>                       
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedVendor.classType"
                            label="ClassType"
                            :rules="nameRules"
                            :items="allClassType"
                            hint="Mandatory Field"
                          >
                          <template #label>
     ClassType<strong  class="red--text">* </strong>
    </template>
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.daimeter"
                            label="Diameter(mm)"
                             placeholder="Diameter(mm)"
                            :rules="numberRule"
                            hint="Mandatory Field"
                          >
                          <template #label>
    Diameter(mm)<strong  class="red--text">* </strong>
    </template>
                          </v-text-field>
                        </v-col>
  
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            type="number"
                            v-model="editedVendor.min"
                            label="Min"
                            :rules="numberRule"
                           
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.max"
                            label="Max"
                            :rules="numberRule"
                          ></v-text-field>
                        </v-col>
                        
  
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.plainWtKgPerMeter"
                            label="Plain Wt Kg Per Meter"
                            :rules="numberRule"
                          
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.plainWtMetricsPerTon"
                            label="Plain Wt Metric Per Ton"
                           :rules="numberRule"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.screwedWtKgPerMeter"
                            label="Screwed Wt Kg Per Meter"
                            :rules="numberRule"
                            
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.screwedWtMetricsPerTon"
                            label="Screwed Wt Metric Per Ton"
                           :rules="numberRule"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                           type="number"
                            v-model="editedVendor.thickNessMM"
                            label="Thickness MM"
                          :rules="numberRule"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- </v-form> -->
                    </v-container>
                  </v-card-text>
  
                  <v-card-actions class="mr-3">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn class="mr-3" color="blue darken-1" text type="submit">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" text>OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editVendor(item)">
            mdi-pencil
          </v-icon>
          <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon> -->
        </template>
      </v-data-table>
  
      <v-snackbar color="green" v-model="snackbar">
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import servicescall from "../Services";
  import Navbar from '@/components/Navbar'
  export default {
    name: "SavePipe",
    mixins: [servicescall],
    components:{
        Navbar
    },
    
    data() {
      return {
        isEdited:false,
        snackbar: false,
        text: "",
        search: "",
        valid: false,
        result: [],
        allClassType:[],
        dialog: false,
        dialogDelete: false,
        headers: [
           
          { text: "Id", value: "id", sortable: true, },
          { text: "ClassType", value: "classType",  align: 'start',  },
          { text: "Diameter(mm)", value: "daimeter", },
          { text: "Max", value: "max", },
          { text: "Min", value: "min", },
           { text: "Plain Wt Kg Per Meter", value: "plainWtKgPerMeter", },
            { text: "Plain Wt Metric Per Ton", value: "plainWtMetricsPerTon", },
             { text: "Screwed Wt Kg Per Meter", value: "screwedWtKgPerMeter", },
             { text: "Screwed Wt Metric Per Ton", value: "screwedWtMetricsPerTon", },
             { text: "Thickness in mm", value: "thickNessMM", },
  
           { text: "Actions", value: "actions", sortable: false, },
        ], 
  
        editedIndex: -1,
  
        editedVendor: {
         
          
    classType: "",
    
    daimeter:"" ,
    id: 0,
    max: "",
    min: "",
    plainWtKgPerMeter: "",
    plainWtMetricsPerTon:"" ,
    screwedWtKgPerMeter:"" ,
    screwedWtMetricsPerTon:"" ,
    thickNessMM: "",
    
  
        },
  
        defaultVendor: {
        
         
    classType: "",
    daimeter:"" ,
    id: "",
    max: "",
    min: "",
    plainWtKgPerMeter: "",
    plainWtMetricsPerTon:"" ,
    screwedWtKgPerMeter:"" ,
    screwedWtMetricsPerTon:"" ,
    thickNessMM: "",
    
  
        },
        // validations
        numberRule: [
          (v) => !!v || "Filed is required",
         // (v) => /^[0-9]+$/.test(v) || "only number are accepted",
           (v)=>/^\d+(\.\d{1,2})?$/.test(v)//allow nuber with decimal
        ],
        messageRules: [
          (v) => !!v || "Field is required",
          (v) => v.length <= 5000 || "Name allows below 5000 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
  
        nameRules: [
          (v) => !!v || "Field is required",
          (v) => v.length <= 30 || "Name allows below 30 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ], 
      };
    },
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Add Pipe" : "Edit Pipe";
      },
    },
  
    mounted() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({ name: "HelloWorld" });
      }
      this.getAllPipe();
      this.getClassTypes();
    },
  
    methods: {
      
      // add the user
      Savepipe() {
        this.$refs.form.validate();
        if (this.$refs.form.validate()) {
          this.PostPipe();
        }
  
        // this.close()
      },
  
  
  
      getClassTypes(){
  
               this.getAllClassType().then((response) => {
             this.allClassType=response
  
          });},
  
    
          //edit Pipe
  
           editVendor (item) {
          this.editedIndex = this.result.indexOf(item)
          this.editedVendor = Object.assign({}, item)
          this.dialog = true
        },
      // close the dialog box
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedVendor = Object.assign({}, this.defaultVendor);
          this.editedIndex = -1;
        });
      },
  
      // post API calls
  
      PostPipe() {
        var reqJSON = this.editedVendor;
        this.addPipe(reqJSON)
          .then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.snackbar = true;
               this.getAllPipe();
              //location.reload();
            } else {
              this.text = response.data.message;
              this.snackbar = true;
            }
          })
          .then(()=>{
          this.close(),
          setInterval(this.getAllPipe(), 3000);
        })
      },
      //GET API Calls
      getAllPipe() {
        this.getPipe().then((response) => {
          this.result = response;
        });
      },
    },
  };
  </script>
  
  <style  scoped>
  .table thead th.word-wrap-example {
    word-wrap: break-word;
    white-space: normal; 
  }
  .v-data-table {
    line-height: 2.8;
    max-width: 100%;
  }
  </style>