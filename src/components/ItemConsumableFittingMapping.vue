<template>
    <div>
         <v-data-table

           :headers="headers"
           :items="Consumablefittingtypemap"
           fixed-header         
           class="elevation-1"
           :search=search
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
                  :data="Consumablefittingtypemap"
                  :columns="jsonfields"
                  :file-name="'Item Consumable Fitting Mapping'"
                  :file-type="'xlsx'"
                  :sheet-name="'sheetname'"
                  v-if=" Consumablefittingtypemap != ''"
                  >
                  <v-icon
                  large
                  color="green"
                  >
                    mdi-cloud-download
                  </v-icon>
                </vue-excel-xlsx>
                 <vue-excel-xlsx :data="json_data"  :columns="json_data"
                  :file-name="'Item Consumable Fitting Mapping'"
                  :file-type="'xlsx'"
                  :sheet-name="'sheetname'"  v-if=" Consumablefittingtypemap == ''">                    
                        <v-icon large color="green darken-2">
                          mdi-cloud-download
                        </v-icon>
              </vue-excel-xlsx>
                <!-- download option end -->
             <v-icon class="pa-2  mt-0 blue--text"
          medium
          color="red"
         @click="activeUploadCard"
          large
        >
        mdi-cloud-upload
        </v-icon>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="white" style="font-size:20px ">Are you sure you want to delete  Item Type ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="confirmToDelete">OK</v-btn>
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
    
      <div v-if="this.dialog1==true">
         <v-dialog
          v-model="dialog1"
          persistent
          max-width="600px"
        >
         
           <v-card>
            <v-card-title>
              <span class="text-h5">Edit Category List</span>
            </v-card-title>
            <v-card-text>
                 <v-container>
                <v-row v-for=" (item,index) in this.result" :key="index">
                   
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Category Name"
                      placeholder="Category Name"
                      v-model="item.categoryName"
                      required
                      rounded
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Margin"
                      v-model="item.margin"
                      rounded
                      placeholder="Margin"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
                 </v-container>
            </v-card-text>
    
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog1 = false"
              >
                cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="saveAll"
              >
                save
              </v-btn>
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
             <v-card-title style="background-color:#2cb1fe;color:white;">Upload Consumable Type Map</v-card-title>
                <v-card-text class="mt-4">
                   <v-row align="center">
                     <v-col>
                       <input type="file" ref="myFileInput"  v-on:change="uploadFile" />
                     </v-col>
                    
                   </v-row>
    
                </v-card-text>
                <v-card-actions  class="mt-2" >
                  <v-spacer></v-spacer>
                   <v-btn class="green white--text mb-2" @click="submitFIle">Upload</v-btn>
                  <v-btn @click="activeUpload=false" class="red white--text mb-2">cancel</v-btn>
                </v-card-actions>
                
               
        <v-progress-circular
          v-show="isProgress == true"
        
         indeterminate :size="70" :width="7" color="black"
        >
         <v-avatar class="img">
          <!-- <img src="../../assets/trident2.png"  alt="logo"> -->
         </v-avatar>
        
        </v-progress-circular>
           </v-card>       
         </v-dialog>
         </div>
      <v-snackbar :color="activeColor"
          v-model="snackbar"   >
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
    import axios from 'axios';
    import downloadexcel from 'vue-json-excel'
    import servicescall from '@/Services'
    // import store from 'store'
    export default {
        name:'MapConsumablefitting',
        components:{
        //   store,
          downloadexcel
        },
         mixins: [servicescall],
        data(){
            return {
                 isProgress:false,
              file:'',
              activeUpload:'',
              Consumablefittingtypemap:[],
              activeColor:'',
                snackbar:false,
                text:'',
                dialogDelete:false,
                 search:'',
                 valid:false,
                 result:[],             
                 dialog: false,
                delItem:{},
                 dialog1: false,
                 categoryList:[],
                 unitTypeList:[],
          headers: [
            {text: 'Sub Category Name ', value: 'subCategoryName'},
             { text: 'Fitting Type Code', value: 'fittingTypeCode'},
             {text: 'Input Type ', value: 'inputType'},
              {text: 'Item Type Code ', value: 'itemTypeCode'},
             { text: 'Item Type Name', value: 'itemTypeName'},
             {text: 'Quantity ', value: 'quantity'},
            //  { text: 'Actions', value: 'actions', sortable: false,class: "blue-grey lighten-4 text--black" },
          ],
         
          editedIndex: -1,
         
              editedCategory:{
                  
      "categoryName": "",
      "daimeter": '',
      "itemCode": "",
      "itemDescription": "",
      "itemName": "",
      "unit1": '',
      "unit1_type": "",
      "unit2": '',
      "unit2_type": "",
      "unit3": '',
      "unit3_type": "",
      
    
                },
         
            defaultCategory: {
                  "categoryName": "",
      "daimeter": 0,
      "itemCode": "",
      "itemDescription": "",
      "itemName": "",
      "unit1": 0,
      "unit1_type": "",
      "unit2": 0,
      "unit2_type": "",
      "unit3": 0,
      "unit3_type": "",
                },
      json_data:[{
        label: "Item_Type_Code",
               field: "",
            },
            {
            label: "Consumable_Type_Code",
               field: "",
      },
      {
            label: "Input_Type",
               field: "",
      },
      {
            label: "Formula",
               field: "",
      },
      {
            label: "Quantity",
               field: "",
      }],
      jsonfields:[{
        label: "Item_Type_Code",
               field: "itemTypeCode",
            },
            {
            label: "Consumable_Type_Code",
               field: "fittingTypeCode",
      },
      {
            label: "Input_Type",
               field: "inputType",
      },
      {
            label: "Formula",
               field: "formula",
      },
      {
            label: "Quantity",
               field: "quantity",
      }],
        filename:'All-Itemtype-Fittings',
              // validations
              emailRules: [
                  (v) => !!v || "Filed is required",
                   (v) =>
                           /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                            "E-mail must be valid",
                         ],
             phoneRules: [
                       (v) => !!v || "Filed is required",
                       (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                       (v) => (v && v.length <= 10 && v.length >= 10) || "Mobile must be  10 number",
                       ],
             numberRule:[
                           (v) => !!v || "Filed is required",
                            (v) => /^[0-9]+$/.test(v) || "only number are accepted",
             ],
    
            nameRules: [
            (v) => !!v || "Field is required",
            (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
            }
        },
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Add Item ' : 'Edit Item'
          },
        },
    
        
        mounted(){
            this.getItems();
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
                                    this.isProgress=true
                   formData.append('item-type-consumable-type-map',this.file)
                         this.uploadConsumableFittingTypeMap(formData).then((response) => {
    
                  if(response.status==200){
                     this.isProgress=false
                     this.text=response.data.message;
                     this.activeColor='green';
                     this.snackbar=true;
                     this.activeUpload=false;
                   // this.$refs.myFileInput.value = ''
                   //setInterval(location.reload(), 1000);
                     this.file='';
                     this.getItems();
                 }
                 else{
                    this.isProgress=false
                     this.text=response.data.message;
                     this.activeColor='red';
                     this.snackbar=true;
                    // setInterval(location.reload(), 1000);
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
                     // cancel
                     cancel(){
                       this.dialogDelete=false
                     },
                    // get delete item
                    deleteitem(item){
                      this.delItem=item.fittingCode;
                       this.dialogDelete=true;
                    },
                    // confirm to delete
    
                    confirmToDelete(){
                       this.delItem=  this.delItem.replace("/", "$")
                     var reqJSON= this.delItem
                       this.deleteAccessoriesType(reqJSON).then((response) => {
                    if(response.status==200){
                         this.text=response.data.message;
                         this.snackbar=true
                         this.activeColor='';
                         this.activeColor='green'
                          this.dialogDelete=false;
                           this.getItems();
                          
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
                  gotoSearch(c){
                   // alert("hello",c)
                   this.$emit('ItemTypeCode',c);
                    this.$store.commit("updateData",c);
                  },
                 // add the vendor
            saveItem(){
                  this.$refs.form.validate()
                     this.postItem()
                     
                     this.getItems();
            },
    
            editVendor (item) {
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
            });
            //this.resetForm();
          },
    
           
    
          // post API calls
    
    
          postItem() {
          var reqJSON = this.editedCategory;
          this.addItem(reqJSON).then(response => {
             if(response.status==200){
              this.text=response.data.message;
              this.snackbar=true;
    
              setInterval(this.close(), 3000);
             } else{
                 this.text=response.data.message;
              this.snackbar=true;
    
             }
          }).then(()=>{
          })
        },
    
                    getCategoryList(){
                      this.getAllCategories().then((response) => {
                  for(var i=0;i<response.length;i++){
                    this.categoryList.push(response[i].categoryName)
                  }       
            }
            )
                    },
    
                      getUnitTypeList(){
                        this.getAllUnitType().then((response) => {
                     this.unitTypeList=response
    
            });
                      },
    
                   // save all updated records
               saveAll(){
                   var reqJSON=this.result
             this.saveAllCatagory(reqJSON).then(response => {
             if(response.status==200){
              this.text=response.data.message;
              this.snackbar=true;
              this.dialog1=false
             } else{
                  this.text=response.data.message;
              this.snackbar=true;
              this.dialog1=false
             }
          }).then(()=>{
            setInterval(this.close(), 3000);
          })
    
               },
                  //GET API Calls
               getItems(){
                    
                    this.getConsumablefittingtypemap().then((response) => {       
               this.Consumablefittingtypemap = response  
            }
            )},
            
               },
    
            
    
        }
        
    
    </script>
    
    <style  scoped>
    .v-list-item__content {
      text-align: left;
    }
    .v-data-table{
        line-height: 2.8;
        max-width: 100%;  

        
    }
    </style> 
    
    