<template>
    <div>
      <div class="mr-0">
           <v-data-table  
           fixed-header
           :headers="headers"
           :items="AllFittingsList"
            :search=search
            dense
           >
    
            <template v-slot:item.actions="{ item }">
          <v-icon class="pa-2 red--text"
            small
            @click="deleteFitting(item)"
          >
            mdi-delete
          </v-icon>
        </template>
    
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
                  :data="AllFittingsList"
                  :columns="jsonfields"
                  :file-name="'Fittings'"
                  :file-type="'xlsx'"
                  :sheet-name="'sheetname'"
                  v-if="AllFittingsList != ''"
                  >
                  <v-icon
                  large
                  color="green"
                  >
                    mdi-cloud-download
                  </v-icon>
                </vue-excel-xlsx> 
                  <vue-excel-xlsx :data="json_data" :columns="json_data"
                  :file-name="'Fittings'"
                  :file-type="'xlsx'"
                  :sheet-name="'sheetname'" v-if="AllFittingsList == ''">                    
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
    
          </v-toolbar></template>
           
           </v-data-table>
    
      </div>
    
       <v-dialog v-model="dialogDelete" max-width="650px">
              <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
                <v-card-title style="font-size:20px ">Are you sure you want to delete this Item Type ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red white--text"
                                style="width:80px;" @click="cancel">Cancel</v-btn>
                  <v-btn  color="green white--text"
                                style="width:80px;"  @click="confirmToDelete">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
    
    
            <div v-if="this.activeUpload==true">
         <v-dialog
          persistent
          max-width="600px"
          v-model="activeUpload" >
    
           <v-card>
             <v-card-title style="background-color:#2cb1fe;color:white;">Upload Fittings </v-card-title>
                <v-card-text class="mt-4">
                   <v-row align="center">
                     <v-col>
                       <input type="file" ref="myFileInput"  v-on:change="uploadFile"/>
                     </v-col> 
                   </v-row>
                   <v-progress-circular
          v-show="isProgress == true"
         indeterminate :size="100"  color="green"
        >
         <v-avatar class="img">
          <!-- <img src="../assets/trident2.png" size="30" alt="logo"> -->
         </v-avatar>
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
    
    <v-snackbar :color="activeColor"
          v-model="snackbar" timeout="2000">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>        
    
    </div>
        
    </template>
    <script>
    import servicescall from "../Services";
    import downloadexcel from 'vue-json-excel';
    export default {
        name:'FittingList',
        components:{
          downloadexcel
        },
         mixins: [servicescall],
        data(){
            return {
              filename:'AllFittings',
              json_data:[{
                label: "Fitting_Type_Code",
               field: "",
            },{
            label: "Fitting_Name",
               field: "",
              },
              {
                label: "Part_Number",
               field: "",
            },{
            label: "Class_Type",
               field: "",
              },
              {
                label: "Material_Type",
               field: "",
            },{
            label: "Make_Code",
               field: "",
              },
              {
            label: "Description",
               field: "",
              },
            ],
              jsonfields:[{
                label: "Fitting_Type_Code",
               field: "fittingTypeCode",
            },{
            label: "Fitting_Name",
               field: "fittingName",
              },
              {
                label: "Part_Number",
               field: "partnerNumber",
            },{
            label: "Class_Type",
               field: "classType",
              },
              {
                label: "Material_Type",
               field: "materialType",
            },{
            label: "Make_Code",
               field: "makeCode",
              },
              {
            label: "Description",
               field: "fittingTypeDescription",
              },
            ],
              activeUpload:'',
                AllFittingsList:[],
                search:'',
                delFitting:'',
                dialogDelete:'',
                activeColor:"",
                snackbar:false,
                text:'',
                headers:[
                    {text:'Fitting Code', value:'fittingCode'},
                     {text:'Fitting Name', value:'fittingName'},
                    {text:'Class Type', value:'classType'},
                    {text:'Material Type', value:'materialType'},
                    {text:'Make Name', value:'makeName'},
                  //   {text:'Make Code', value:'makeCode',class: "blue-grey lighten-4 text--black"},
                     {text:'Part Number', value:'partnerNumber'},
                     { text: 'Actions', value: 'actions', sortable: false },
                ]
    
    
            }
        },
    
        mounted(){
            this.AllFittings();
        },
        methods:{
    
         
           uploadFile(event){
                this.file=event.target.files[0];
                if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
                } else{
                    alert("upload only .xlsx or .xls")
                    this.file='';
                }
    
            },
    
            submitFIle(){
                if(this.file ==''){
                    alert("Please choose file")
                }
    
                else{
                     if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
                            var formData= new FormData();
                   formData.append('fitting-types',this.file)
                         this.uploadFitting(formData).then((response) => {
                             this.isprogress=true;
    
                  if(response.status==200){
                     this.text=response.data.message;
                     this.isProgress=false;
                     this.activeColor='green';
                     this.activeUpload=false
                     this.snackbar=true;
                     this.file='';
                    this.getFittings();
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
               // active upload card
          activeUploadCard(){
                      this.activeUpload=true;
                    },
          // get delete Item
          deleteFitting(item){
            this.delFitting=item.fittingCode
             this.delFitting=  this.delFitting.replace("/", "$")
             this.dialogDelete=true;
          },
             // cancel dialog card
             cancel(){
               this.dialogDelete=false;
             },
    
             // confirm to delete
    
              confirmToDelete(){
                       this.delFitting=  this.delFitting.replace("/", "$")
                      var reqJSON=this.delFitting;
                       this.deleteSingleFitting(reqJSON).then((response) => {
                    if(response.status==200){
                         this.text=response.data.message;
                         this.snackbar=true
                         this.activeColor='';
                         this.activeColor='green'
                          this.dialogDelete=false;
                          this.AllFittings()
                          
                    }
                    else{
                        this.text=response.data.error;
                         this.snackbar=true
                         this.activeColor='';
                          this.activeColor='red';
                           this.dialogDelete=false;
                    }
                 })
                 
    
                      //this.dialogDelete=false;
                    },
             AllFittings(){
                  this.getAllFittingList().then((response)=>{               
                     this.AllFittingsList=response
                  })
                },
        }
        
    }
    </script>
    
    <style  scoped>
    .v-data-table {
        line-height: 2.8;
        max-width: 100%;
        
    }
    </style>>
    
    </style>