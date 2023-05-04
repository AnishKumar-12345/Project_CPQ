<template>
    <div>
               <v-data-table
                   dense
                   fixed-header
           
                   :headers="headers" 
                   :items="allvendor"
                   :search="search"
                   >
                   
                    <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>
                          <v-text-field
                            rounded
                            solo
                          v-model="search"
                          label="Search "
                          class=" mt-6"
                        ></v-text-field>
                        </v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                    <vue-excel-xlsx
                          :data="allvendor"
                          :columns="Jsonfields"
                          :file-name="'All Vendor Mapping'"
                          :file-type="'xlsx'"
                          :sheet-name="'sheetname'"
                          v-if="allvendor != ''"
                          >
                          <v-icon
                          large
                          color="green"
                          >
                            mdi-cloud-download
                          </v-icon>
                        </vue-excel-xlsx>
                   <vue-excel-xlsx :data="json_data" :columns="json_data"
                          :file-name="'All Vendor Mapping'"
                          :file-type="'xlsx'"
                          :sheet-name="'sheetname'" v-if="allvendor == ''">                    
                      <v-icon large color="green darken-2">
                        mdi-cloud-download
                      </v-icon>
                </vue-excel-xlsx>
                     <v-icon class="pa-2  mt-0 blue--text"
                      medium
                      color="red"
                    @click="activeUploadCard"
                      large
                    >
                    mdi-cloud-upload
                    </v-icon>
                      </v-toolbar>
                  </template>          
  </v-data-table>
  <!-- </v-card> -->
  
   <div v-if="this.activeUpload==true">
       <v-dialog
        persistent
        max-width="600px"
        v-model="activeUpload" >
  
         <v-card>
           <v-card-title style="background-color:#2cb1fe;color:white;">Upload Item Makes </v-card-title>
              <v-card-text class="mt-4">
                 <v-row align="center">
                   <v-col>
                     <input type="file" ref="myFileInput"  v-on:change="uploadFile" />
                   </v-col> 
                 </v-row>
                 <v-progress-circular
        v-show="isProgress == true"
       indeterminate :size="100"  color="green"
      >
       
      </v-progress-circular>
  
              </v-card-text>
              <v-card-actions  class="mt-2" >
                <v-spacer></v-spacer>
                 <v-btn class="green white--text mb-2"  @click="submitFIle">Upload</v-btn>
                <v-btn @click="activeUpload=false" class="red white--text mb-2">cancel</v-btn>
              </v-card-actions>
         </v-card>
       </v-dialog>
       </div>
  
  
      <v-snackbar :color="activeColor" v-model="snackbar">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      </v-container>
    </div>
    
  </template>
  
  <script>
  import servicescall from "@/Services";
  import downloadexcel from "vue-json-excel";
  export default {
    name: "Allvendormapping",
    mixins: [servicescall],
    components: {
      downloadexcel,
    },
  
  
    data() {
      return {
        file:'',
       snackbar:false,
          text:'',
         search:'',
        headers:[
          {text:'Vendor_Code',value:'vendorCode'},
           {text:'Type',value:'type'},
            {text:'category',value:'category'},
             {text:'Make_Name',value:'makeName'},
             
        ],
        allvendor:[],
        form:'',
        filename: "VendorMappping",
        json_data: [{
          label: "vendor_Code",
             field: "",
          },{
          label: "type",
             field: "",
        },
        {
          label: "category",
             field: "",
        },
        {
          label: "Make_Name",
             field: "",
        },
      ],
        Jsonfields: [{
          label: "vendor_Code",
             field: "vendorCode",
          },{
          label: "type",
             field: "type",
        },
        {
          label: "category",
             field: "category",
        },
        {
          label: "Make_Name",
             field: "makeName",
        },
      ],
        isUploadCard: false,
        isProgress: false,
        activeUpload: false,   
        activeColor: "",     
        dialogDelete: false,      
        fittingTypeCard: false,
       
       
      };
    },
    mounted(){
      this.getallvednors();
    },
    methods: {
      getallvednors(){
        this.getvendormappings().then((response) => {
          this.allvendor = response;
        })
      },
        // activate file upload Card
          uploadFile(event){
              this.file=event.target.files[0];
              if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
              } else{
                  alert("upload only .xlsx or .xls")
                  this.file='';
              }
  
          },
  
       activeUploadCard(){
                   // alert("hello")
                    this.activeUpload=true;
                  },
  
      submitFIle(){
              if(this.file ==''){
                  alert("Please choose file")
              }
              else{
                   if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
                          var formData = new FormData();
                             this.isProgress=true
                 formData.append('vendor-mapping',this.file)
                 this.isUploadCard=true;
                       this.uploadVendorMappingsFile(formData).then((response) => {                      
               if(response.status==200){
                this.text=response.data.message;
                   this.isProgress=false;
                   this.activeColor='green';
                   this.activeUpload=false;
                   this.snackbar=true;
                   this.file='';
               }         
               else{
                   this.text=response.data.message;
                   this.isProgress=false;
                   this.activeColor='red';
                   this.snackbar=true;
               }
             })
  
                   }
                   else{
                       alert("upload only .xlsx or .xls")
                        this.$refs.myFileInput.value = ''
                  this.file='';
                   }
            }
          },     
  
  
  
    },
  };
  </script>
  
  <style scoped>
  .v-data-table {
    line-height: 2.8;
    max-width: 100%;
    /* margin-left: 20px; */
  }
  </style>