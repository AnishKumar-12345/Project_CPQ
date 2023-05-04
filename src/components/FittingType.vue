<template>
    <div>
      <div class="mr-4">
         <v-data-table 
           fixed-header
           :headers="headers"
           :items="this.result"
            sort-by="id"
            dense
           class="elevation-1"
           :search=search
         >
            <template v-slot:item="row" >
             <tr >
               <td style="text-align:left"> {{ row.item.subCategoryName }}</td>
     
               <td style="text-align:left">
              
                 <router-link :to="{ name: 'FittingSearch', params: { fittingTypeCode: row.item.fittingTypeCode  } }">
                 {{row.item.fittingTypeCode }}
                 </router-link>
                 </td>
                 <td style="text-align:left"> {{row.item.fittingTypeName }}</td>
                    <td style="text-align: left;"><v-icon small   class=" red--text mr-2" @click="deleteFitting(row.item)">
                          mdi-delete
                        </v-icon></td>
              
             </tr>
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
                :data="result"
                :columns="json_fields"
                :file-name="'Fitting Type'"
                :file-type="'xlsx'"
                :sheet-name="'sheetname'"
                 v-if="result != ''"
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
                :file-name="'Fitting Type'"
                :file-type="'xlsx'"
                :sheet-name="'sheetname'"
                  v-if="result == ''"
                  >                    
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
            <v-icon color="red" large
               @click="saveItemField"
               >mdi-plus </v-icon>
            <v-dialog persistent
              v-model="dialog"
              max-width="500px"
            >
               <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                 <v-form @submit.prevent="saveItem" ref="form" v-model="valid" lazy-validation   > 
                <v-card-text>
                  <v-container>
                     
                    <v-row>
    
                       
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedCategory.fittingName"
                          label="Fitting Name"
                          :rules="nameRules"
                          hint="Mandatory Field"
                          :disabled=isEdited 
                        
                        >
                         <template #label>
        Fitting Name<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedCategory.fittingCode"
                          label="Fitting Code"
                          :rules="nameRules"
                          hint="Mandatory Field"
                          :disabled=isEdited
                         
                        >
                         <template #label>
        Fitting Code<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="6" >
                         <v-select
                           placeholder="Category Name"
                           label="Category Name"
                           :items="categoryList"
                           :rules="nameRules"
                            v-model="editedCategory.categoryName"
                            hint="Mandatory Field"
                         >
                          <template #label>
       Category Name<strong  class="red--text">* </strong>
      </template>
                         </v-select>
                       </v-col>
    
                       <v-col cols="12" sm="6" md="6" >
                         <v-select
                           placeholder="Input Type"
                           label="Input Type"
                           :items="inputList"
                           :rules="nameRules"
                            v-model="editedCategory.inputType"
                         >
                         </v-select>
                       </v-col>
                      <v-col          cols="12"  sm="6"  md="6"  >
                        <v-text-field  
                          v-model="editedCategory.unit1"
                          label="Unit1"
                          type="number"
                           :rules="numberRule"                    
                        ></v-text-field>
                      </v-col>
                      <v-col  cols="12"  sm="6"  md="6"  >
                        <v-select
                          v-model="editedCategory.unit1_type"
                          label="Unit1 Type"
                          :rules="nameRules" 
                          :items="unitTypeList"
                        ></v-select>
                      </v-col>
                       <v-col  cols="12"  sm="6"  md="6"  >
                        <v-text-field  
                          v-model="editedCategory.unit2"
                          label="Unit2"
                          type="number"
                                            
                        ></v-text-field>
                      </v-col>
                      <v-col  cols="12"  sm="6"  md="6"  >
                         <v-select
                          v-model="editedCategory.unit2_type"
                          label="Unit2 Type"
                         
                          :items="unitTypeList"
                        ></v-select>
                      </v-col>
    
                       <v-col cols="12"  sm="6"  md="6"  >
                        <v-text-field  
                          v-model="editedCategory.unit3"
                          label="Unit3"
                          type="number"
                                             
                        ></v-text-field>
                      </v-col>
                      <v-col  cols="12"  sm="6"  md="6"  >
                         <v-select
                          v-model="editedCategory.unit3_type"
                          label="Unit3 Type"
                          
                          :items="unitTypeList"
                        ></v-select>
                      </v-col>
    
                     <v-col  cols="12"  sm="6"  md="6"  >
                        <v-text-field
                        type="number"
                          v-model="editedCategory.weldingRods"
                          label="Welding Rods"
                          placeholder="Welding Rods"
                         
                        ></v-text-field>
                      </v-col>
    
                  
                      <v-col cols="12" sm="12" md="12">
                       <v-textarea
                       rows="4"
                      
                       v-model="editedCategory.fittingDescription"
                      label=" Fitting Description"   
                        ></v-textarea>
                      </v-col>
                    </v-row>
                      <!-- </v-form> -->
                  </v-container>
                </v-card-text>
    
                <v-card-actions class="mr-3 " >
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn class="mr-3" 
                    color="blue darken-1"
                    text
                    
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
                 </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="white" style="font-size:20px" >Are you sure you want to delete  Fitting Type</v-card-title>
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
          <v-icon
            small
            class="mr-2"
            @click="editVendor(item)"
          >
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
    
      
      <v-dialog v-model="dialogDelete" max-width="650px">
              <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
                <v-card-title style="font-size:20px;background-color:#fde4e4">Are you sure you want to delete  Fitting Type ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red white--text"
                                style="width:80px;" @click="cancel">Cancel</v-btn>
                  <v-btn color="green white--text"
                                style="width:80px;" @click="confirmToDelete">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </div>
    
      <div v-if="this.activeUpload==true">
         <v-dialog
          persistent
          max-width="600px"
          v-model="activeUpload" >
    
           <v-card>
             <v-card-title style="background-color:#2cb1fe;color:white;">Upload Fitting types</v-card-title>
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
          <!-- <img src="../../assets/trident2.png" size="30" alt="logo"> -->
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
    
      <v-snackbar :color="activeColor" v-model="snackbar" >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </div>
        
    </template>
    
    <script>
    // import axios from 'axios'
    import servicescall from '@/Services'
    import downloadexcel from 'vue-json-excel'
    export default {
        name:'AddVendor',
        components:{
          downloadexcel
        },
         mixins: [servicescall],
        data(){
            return {
              filename:'FittingTypes',
              json_data: [{
            label: "Fitting_Type_Code",
               field: "",
            },{
            label: "Fitting_Type_Name",
               field: "",
          },
          {
            label: "Description",
               field: "",
            },{
            label: "Sub_Category",
               field: "",
          },
          {
            label: "Daimeter",
               field: "",
            },{
            label: "Unit_1",
               field: "",
          },
          {
            label: "Unit_1_Type",
               field: "",
            },{
            label: "Unit_2",
               field: "",
          },
          {
            label: "Unit_2_Type",
               field: "",
            },{
            label: "Unit_3",
               field: "",
          },
          {
            label: "Unit_3_Type",
               field: "",
          },
          {
            label: "Margin",
               field: "",
            },{
            label: "Transport_Rate",
               field: "",
          },
          {
            label: "Wastage_Percentage",
               field: "",
            },
            {
            label: "Welding_Joints",
               field: "",
            },
        ],
              json_fields: [{
            label: "Fitting_Type_Code",
               field: "fittingTypeCode",
            },{
            label: "Fitting_Type_Name",
               field: "fittingTypeName",
          },
          {
            label: "Description",
               field: "fittingTypeDescription",
            },{
            label: "Sub_Category",
               field: "subCategoryName",
          },
          {
            label: "Daimeter",
               field: "daimeter",
            },{
            label: "Unit_1",
               field: "unit1",
          },
          {
            label: "Unit_1_Type",
               field: "unit1_type",
            },{
            label: "Unit_2",
               field: "unit2",
          },
          {
            label: "Unit_2_Type",
               field: "unit2_type",
            },{
            label: "Unit_3",
               field: "unit3",
          },
          {
            label: "Unit_3_Type",
               field: "unit3_type",
          },
          {
            label: "Margin",
               field: "margin",
            },{
            label: "Transport_Rate",
               field: "transportRate",
          },
          {
            label: "Wastage_Percentage",
               field: "wastagePercent",
            },
            {
            label: "Welding_Joints",
               field: "weldingJoints",
            },
        ],
              file:'',
              isProgress:false,
              activeUpload:'',
              fittingCard:false,
              fittingCategoryList:[],
              allCategoryList:[],
              allMakes:[],
              materialTypeList:[],
              isEdited:false,
              unitTypeList:[],
              inputList:[],
              categoryList:[],
                snackbar:false,
                activeColor:'',
                text:'',
                 search:'',
                 valid:false,
                 result:[]
    ,             dialog: false,
                 dialogDelete: false,
          headers: [
             {text: 'Sub Category Name ', value: 'subCategoryName'},
              {text: 'Fitting Type Code ', value: 'fittingTypeCode'},
            { text: 'Fitting Type Name', value: 'fittingTypeName'},
            
           
            // {text: ' Material Type', value: 'materialType',class: "blue-grey lighten-4 text--black"},
            // { text: 'Unit 1 Type', value: 'unit1_type',class: "blue-grey lighten-4 text--black" },
             { text: 'Actions', value: 'actions', sortable: false },
          ],
                 //validations
    
                 nameRules: [
            (v) => !!v || "Field is required",
            (v) => v.length <= 100 || "Name allows below 100 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
         
          editedIndex: -1,
              fittingModel:{
      "categoryName": "",
      "fittingTypeCode": "",
      "fittingTypeDescription": "",
      "fittingTypeName": "",
      "margin": '',
      "transportRate": '',
      "unit1": '',
      "unit1_type": "",
      "wastagePercent": ''
    },
    
    defaultFittingModel:{
      "categoryName": "",
      "fittingTypeCode": "",
      "fittingTypeDescription": "",
      "fittingTypeName": "",
      "margin": '',
      "transportRate": '',
      "unit1": '',
      "unit1_type": "",
      "wastagePercent": ''
    },
      editedCategory:{
      "categoryName": "",
      "fittingCode": "",
      "fittingDescription": "",
      "fittingName": "",
      "inputType": "",
      "unit1": '',
      "unit1_type": "",
      "unit2": '',
      "unit2_type": "",
      "unit3": '',
      "unit3_type": "",
      "weldingRods": ''
                },
         
            defaultCategory: {
       "categoryName": "",
      "fittingCode": "",
      "fittingDescription": "",
      "fittingName": "",
      "inputType": "",
      "unit1": '',
      "unit1_type": "",
      "unit2": '',
      "unit2_type": "",
      "unit3": '',
      "unit3_type": "",
      "weldingRods": ''
                },
              // validations
              emailRules: [
                 (v) => !!v || " Email  is required",
                   (v) =>
                           /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                            "E-mail must be valid",
                         ],
             phoneRules: [
                       (v) => !!v || " Mobile  is required",
                       (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                      // (v) => (v && v.length <= 10 && v.length >= 10) || "Mobile must be  10 number",
                       ],
                        numberRule:[
                           (v) => !!v || "Filed is required",
                           (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                           // (v) =>  /^\d+\.\d{0,2}$/.test(v) || "Number with decimals",
                           // (v) => /^[0-9]+$/.test(v) || "only number are accepted",
             ],
    
    
            nameRules: [
            (v) => !!v || " Field  is required",
          //  (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
           
          ],
    
           addressRules: [
            (v) => !!v || "Address is required",
            // (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
            }
        },
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Add Fitting' : 'Edit Fitting'
          },
        },
    
        
        mounted(){
           if(localStorage.getItem("token")==null){
               this.$router.push({ name: "HelloWorld",});
            }
    
            this.getFittings();
            this.getMaterialTypes()
           // this.getAllMakes()
            this.getCategories()
            this.getFittingCategories();
            //this.getInputTypes();
           // this.getCategoryList();
           this.getUnitTypes()
     
           
        },
    
        methods: {    
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
                             this.isProgress =true;
                         this.uploadFittingType(formData).then((response) => {
    
                  if(response.status==200){
                     this.text=response.data.message;
                     this.isProgress =false;
                     this.activeColor='green';
                     this.snackbar=true;
                     this.activeUpload=false;
                     this.getFittings();
                 }
                 else{
                     this.text=response.data.message;
                     this.isProgress =false;
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
    
          // activate file upload Card
                  activeUploadCard(){
                     // alert("hello")
                      this.activeUpload=true;
                    },
    
    
                    //  get delete fitting Type
    
                    deleteFitting(item){
                      this.delFittingType=item.fittingTypeCode
                       this.delFittingType=  this.delFittingType.replace("/", "$")
                       this.dialogDelete=true;
                    },
                    //confirm To Delete
                     confirmToDelete(){
                       this.delFittingType=  this.delFittingType.replace("/", "$")
                     var reqJSON= this.delFittingType
                       this.deleteFittingType(reqJSON).then((response) => {
                    if(response.status==200){
                         this.text=response.data.message;
                         this.snackbar=true
                         this.activeColor='';
                         this.activeColor='green'
                         
                          this.dialogDelete=false;
                           this.getFittings();
                          
                    }
                    else{
                        this.text=response.data.error;
                        this.snackbar=true
                        this.activeColor='';                     
                        this.activeColor='red';                   
                        this.dialogDelete=false;
                    }
                 })
                    },
                    //cancel delete card
    
                    cancel(){
    this.dialogDelete=false;
                    },
            //  copy record
    
                 copyItem(obj) {
          this.editedCategory = obj;
          this.fittingCard=true;
        },
    
    
             // all category List
            getCategories(){
                    this.getAllCategories().then((response) => {
              
                  for(var i=0;i<response.length;i++){
                    this.allCategoryList.push(response[i].categoryName)
                    
                  }
              //this.allCategoryList=response;
               } )
               },
          // get all item makes
                getFittingCategories(){
                  this.getAllFittingCategory().then((response)=>{
                      for(var i=0;i<response.length;i++){
                        this.fittingCategoryList.push(response[i].categoryName)
                      }
                  })
                },
          getAllMakes(){
                this.getAllItemMakes().then((response) => {
               
                for(var i=0;i<response.length;i++){
                 this.allMakes.push({text:response[i].itemMakeName,value:response[i].itemMakeCode})
               }
              
    
            });
           },
            // gell all metrial type
                     getMaterialTypes(){
    
                 this.getAllMaterialType().then((response) => {
               
               this.materialTypeList=response
    
            });},
                      //  unit type list
    
                      getUnitTypes(){
    
                 this.getAllUnitType().then((response) => {
               
               this.unitTypeList=response
    
            });},
                      //save fittting item for validations checks
                      saveItem(){
                 if(this.$refs.form.validate()){
                 
                    this.postItem()
                 }
                   //  this.getItems();
    
           // this.close()
            },
    
            //save fitting
    
            postItem() {  
          var reqJSON = this.fittingModel;
          this.addFittingType(reqJSON).then(response => {
           
             if(response.status==200){
              this.text=response.data.message;
               this.activeColor='green';
              this.snackbar=true;
              this.isEdited=false;
              this.fittingModel={}
              this.getFittings();
             } else{
                 this.text=response.data.message;
                  this.activeColor='red';
              this.snackbar=true;
    
             } this.close();
          })
        },
    
                   //allcategory names list
          getCategoryList(){
                      this.getAllCategories().then((response) => {
                      
                     for(var i=0;i<response.length;i++){    
                    this.categoryList.push(response[i].categoryName)    
                  }
              
              
            }
            )
                    },
    
                    // get all fittings
    
                     getFittings(){
                    this.getAllFittingsTypes().then((response) => {      
               this.result=response
            }
            )
            },
    
    
                 // get inpuytypes
           getInputTypes(){
    
                 this.getAllInputType().then((response) => {
               this.inputList=response
    
            });},
                 // add the vendor
            saveVendor(){
                  this.$refs.form.validate()
                  if(this.$refs.form.validate()){
                     this.PostVendor()
                      
                     }
    
           // this.close()
            },
    
            editVendor (item) {
              this.isEdited=true;
            this.editedIndex = this.result.indexOf(item)
            this.editedCategory = Object.assign({}, item)
            this.dialog = true
          },
               // close the dialog box
             close () {
            this.dialog = false
            this.$nextTick(() => {
              this.editedCategory = Object.assign({}, this.defaultCategory)
              this.editedIndex = -1
            })
            this.isEdited=false;
          },
    
          // post API calls
    
    
          PostVendor() {
          var reqJSON = this.editedVendor;
          this.addVendor(reqJSON).then(response => {
            if(response.status==200){
              this.text=response.data.message;
              this.snackbar=true;
              //location.reload();
            } else{
              this.text=response.data.message;
              this.snackbar=true;
    
            }
          }).then(()=>{
            this.close(),
            setInterval(this.getVendors(), 3000);
          })
        },
                 getVendorId(id) {
           
       
          var reqJSON = id;
          this.vendorById(reqJSON).then(response => {
            if(response.status==200){
                  this.dialog = true         
            } else{
              this.text=response.data.message;
             // this.snackbar=true;
    
            }
          }).then(()=>{
            setInterval(this.close(), 3000);
          })
        },
    
        saveItemField(){
          this.$router.push({
            path: "/FittingSearch",             
            });
         },          
                  //GET API Calls
               getVendors(){
                    this.getAllVendors().then((response) => {
               this.result=response
    
            
            }
            )},
               },
    
            
    
        }
        
    
    </script>
    
    <style  scoped>
    .v-icon{
      border-radius: 20px;
      color: black;
    
    }
    .v-card__title {
      background-color: #ccc;
        padding: 6px;
        border-radius: 5px;
    }
    
    .v-data-table {
        line-height: 2.6;
        max-width: 100%;
        
    }
    
    </style>