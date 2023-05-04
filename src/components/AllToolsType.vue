<template>
    <div>
         <v-data-table 
           fixed-header

           :headers="headers"
           :items="result"
           sort-by="fittingTypeCode"
           class="elevation-1"
           :search=search
           dense
         >
         <template v-slot:item="row" >
             <tr >
               <td style="text-align:left"> {{ row.item.subCategoryName }}</td>
     
               <td style="text-align:left">
              
                 <router-link :to="{ name: 'ToolSearch', params: { toolTypeCode: row.item.itemTypeCode,tabValue:0 } }" style=" text-decoration: none">
                 {{row.item.itemTypeCode }}
                 </router-link>
                 </td>
                 <td style="text-align:left"> {{row.item.itemTypeName }}</td>
                 <td> 
          <router-link :color="getColor(row.item.isActiveItems)" :to="{ name: 'ToolsSearch', params: { toolTypeCode: row.item.itemTypeCode,tabValue:1 } }">
                 {{row.item.isActiveItemFittings ? 'Yes' : 'No' }}
                 </router-link>
         </td>
         <td> 
          <router-link :color="getColor(row.item.isActiveItemFittings)" :to="{ name: 'ToolsSearch', params: { toolTypeCode: row.item.itemTypeCode,tabValue:2} }">
                 {{row.item.isActiveItemFittings ? 'Yes' : 'No' }}
                 </router-link>
         </td>
                   <td style="text-align:left"><v-icon class="red--text " small @click="deleteitem(row.item)" >mdi-delete</v-icon></td>
              
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
                  :columns="Jsonfields"
                  :file-name="'Tools Type'"
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
                 <vue-excel-xlsx :data="json_data" :columns="json_data"
                  :file-name="'Tools Type'"
                  :file-type="'xlsx'"
                  :sheet-name="'sheetname'" v-if="result == ''">                    
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
              <template v-slot:activator="{ on, attrs }">
              </template>
              <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="saveItem"  > 
                <v-card-text>
                  <v-container>
                       
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedCategory.categoryName"
                          label="Category Name"
                          :rules="nameRules"
                          solo  
                          left
                          rounded
                          :items="categoryList"
                          @click="getCategoryList"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" >
                        <v-text-field
                          v-model="editedCategory.daimeter"
                          :rules="numberRule"
                          label="Margin"
                          type="number"
                          solo
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedCategory.itemCode"
                          label="Item Code"
                          :rules="nameRules"
                          solo  
                          rounded
                        ></v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedCategory.itemName"
                          label="Item Name"
                          :rules="nameRules"
                          solo  
                          rounded
                        ></v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedCategory.unit1"
                          label="Unit-1"
                          :rules="numberRule"
                          solo  
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedCategory.unit1_type"
                          label="Unit1 Type"
                          :rules="nameRules"
                          :items="unitTypeList"
                          @click="getUnitTypeList"
                          solo  
                          rounded
                        ></v-select>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedCategory.unit2"
                          label="Unit 2"
                          :rules="numberRule"
                          solo  
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedCategory.unit2_type"
                          label=" unit2 Type"
                          :rules="nameRules"
                          :items="unitTypeList"
                          @click="getUnitTypeList"
                          solo  
                          rounded
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedCategory.unit3"
                          label="Unit 3 "
                          :rules="numberRule"
                          solo  
                          rounded
                        ></v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedCategory.unit3_type"
                          label="Unit3 Type "
                          :rules="nameRules"
                          solo  
                          rounded
                          :items="unitTypeList"
                          @click="getUnitTypeList"
                        ></v-select>
                      </v-col>
    
                      <v-col cols="12" sm="12" md="12">
                       <v-textarea
                          v-model="editedCategory.itemDescription"
                          label=" Item Description"
                          :rules="nameRules"
                          auto-grow
                          solo  
                          rounded
                        ></v-textarea>
                      </v-col>
    
    
    
                     
                      
                       
                     
                    </v-row>
                      
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    type="submit"
                    :disabled="!valid"
                    
                  >
                    Save
                  </v-btn>
                </v-card-actions>
    </v-form>
                
                
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
                <v-card-title  style="font-size:20px ">Are you sure you want to delete  Item Type ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red white--text"
                                style="width:80px;" @click="cancel">Cancel</v-btn>
                  <v-btn color="green white--text"
                                style="width:80px;"  @click="confirmToDelete">OK</v-btn>
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
             <v-card-title style="background-color:#2cb1fe;color:white;">Upload Consumable Types</v-card-title>
                <v-card-text class="mt-4">
                   <v-row align="center">
                     <v-col>
                       <input type="file" ref="myFileInput"  v-on:change="uploadFile" />
                     </v-col>
                    
                   </v-row>
    
                </v-card-text>
                <v-card-actions  class="mt-2" >
                  <v-spacer></v-spacer>
                   <v-btn class="green white--text mb-2" @click="submitFIle" :disabled=isUploadCard>Upload</v-btn>
                  <v-btn @click="activeUpload=false" class="red white--text mb-2" :disabled=isUploadCard>cancel</v-btn>
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
    import servicescall from '@/Services'
    //import store from 'store'
    import downloadexcel from 'vue-json-excel'
    export default {
        name:'ItemSave',
        components:{
        //   store,
          downloadexcel
        },
         mixins: [servicescall],
        data(){
            return {
              filename:'AllToolsType',
              json_data: [{
            label: "Tool_Type_Code",
               field: "",
            },{
            label: "Tool_Type_Name",
               field: "",
          },
          {
            label: "Sub_Category",
               field: "",
            },{
            label: "Description",
               field: "",
          },
          {
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
        ],
        
              Jsonfields: [{
            label: "Tool_Type_Code",
               field: "itemTypeCode",
            },{
            label: "Tool_Type_Name",
               field: "itemTypeName",
          },
          {
            label: "Sub_Category",
               field: "subCategoryName",
            },{
            label: "Description",
               field: "itemTypeDescription",
          },
          {
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
               field: "unit2_type",
            },
          {
            label: "Margin",
               field: "margin",
            },{
            label: "Transport_Rate",
               field: "transportRate",
          },
        ],
                isProgress:false,
              file:'',
              isUploadCard:false,
              activeUpload:'',
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
            { text: 'Sub Category Name', value: 'subCategoryName' },
            {text: 'Tool Type Code ', value: 'fittingTypeCode'},
            { text: 'Tool Type Name', value: 'fittingTypeName'},
            { text: 'Active Tools', value: 'isActiveItems' },
            { text: 'Active Fittings', value: 'isActiveItemFittings' },
            { text: 'Actions', value: 'actions', sortable: false },
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
          
            this.getToolTypes();
    
        },
    
        methods: {
          saveItemField(){
            this.$router.push({
            path: "/ToolSearch",             
            });
          },
         
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
                   formData.append('item-types',this.file)
                   this.isUploadCard=true;
                         this.uploadToolsType(formData).then((response) => {
    
                  if(response.status==200){
                     this.isProgress=false
                     this.text=response.data.message;
                     this.activeColor='green';
                     this.snackbar=true;
                     this.activeUpload=false;
                     this.getToolTypes();
                      this.isUploadCard=false;
                   // this.$refs.myFileInput.value = ''
                  // setInterval(location.reload(), 1000);
                     this.file='';
                 }
                 else{
                    this.isProgress=false
                     this.text=response.data.message;
                     this.activeColor='red';
                     this.snackbar=true;
                      this.isUploadCard=false;
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
                      this.activeUpload=true;
                    },
                     // cancel
                     cancel(){
                       this.dialogDelete=false
                     },
                    // get delete item
                    deleteitem(item){
                      this.delItem=item.itemTypeCode;
                       this.dialogDelete=true;
                    },
                    // confirm to delete
    
                    confirmToDelete(){
                      // this.delItem=  this.delItem.replace("/", "$")
                     var reqJSON= this.delItem
                       this.deleteToolType(reqJSON).then((response) => {
                    if(response.status==200){
                         this.text=response.data.message;
                         this.snackbar=true
                         this.activeColor='';
                         this.activeColor='green'
                          this.dialogDelete=false;
                           this.getToolTypes();
                          
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
                   this.$emit('ItemTypeCode',c);
                    this.$store.commit("updateData",c);
                  },
                 // add the vendor
            saveItem(){
                  this.$refs.form.validate()
                     this.postItem()
                     
                     this.getToolTypes();
    
           // this.close()
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
          },
    
           
    
          // post API calls
    
    
          postItem() {
          var reqJSON = this.editedCategory;
          this.addItem(reqJSON).then(response => {;
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
               getToolTypes(){
                    this.getAllToolsList().then((response) => {
               this.result=response  
            }
            )},
    
            getColor (status) {
            if (status == true) return 'green'
            else return 'red'
          },
            
               },
    
            
    
        }
        
    
    </script>
    
    <style  scoped>
    .v-list-item__content {
      text-align: left;
    }
     
    
    .v-data-table {
        line-height: 2.8;
       max-width: 100%;

        
    }
    </style>