<template>
    <v-card>
    <v-toolbar
      color="#313940"
      dark
      flat
    style="height:50px;"
    >
   
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
          style="margin-bottom:120px;"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar> 

    <v-tabs-items v-model="tab">
      <v-tab-item>      
        <!-- <v-card flat>
          <v-card-text> -->
                 <v-data-table
                 dense
                 fixed-header
              
                 :headers="headers"
                 :items="allCategory"
                 :search="search"
                 >
                 <template v-slot:top>
                    <v-toolbar flat >
                      <v-toolbar-title>
           <v-text-field
            rounded
            solo
          v-model="search"
          label="Search "
          class=" mt-6"
          dense
        ></v-text-field>
        </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <vue-excel-xlsx
                        :data="allCategory"
                        :columns="jsonfields"
                        :file-name="'Tool Category'"
                        :file-type="'xlsx'"
                        :sheet-name="'sheetname'"
                        v-if="allCategory != ''"
                        >
                        <v-icon
                        large
                        color="green"
                        >
                          mdi-cloud-download
                        </v-icon>
                      </vue-excel-xlsx> 
                         <vue-excel-xlsx :data="json_data" :columns="json_data"
                        :file-name="'Tool Category'"
                        :file-type="'xlsx'"
                        :sheet-name="'sheetname'" v-if="allCategory == ''">                    
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
                        <v-icon 
                    color="red"
                    large
                    @click="addToolMake"
                    >mdi-plus</v-icon>
                    </v-toolbar>
                 </template>
                    
                 

                 <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2 blue--text"   @click="editToolcat(item)" >
        mdi-pencil
        
      </v-icon>

      <v-icon class="pa-2 red--text"
        small
       @click="deleteCard(item)"
      >
        mdi-delete
      </v-icon>
    </template>

                 </v-data-table>
        <!-- add Item Category -->
         <v-dialog v-model="dialog2" max-width="600px">
             <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
                <v-card-title>Add Tool Category</v-card-title>
                <v-card-text>
                    <v-form 
                    v-model="valid" ref="form"
                    @submit.prevent="saveToolCategories"
                   
                    >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                         <v-text-field
                           label="Tool Category Name"
                           placeholder="Tool Category Name"
                           :rules="nameRules"
                           v-model="addToolCategory.categoryName"                         
                           dense
                           outlined
                         >

                         </v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                           <v-text-field
                           label="Margin"
                           placeholder="Margin"
                           v-model="addToolCategory.margin"
                            :rules="nameRules"
                           dense
                           outlined
                         >

                         </v-text-field>
                   </v-col>
                        <v-card-actions class="mr-3">
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red white--text"
                            style="width:80px;margin-left:10px;"
                            @click="cancelToolMake()"
                            >Cancel</v-btn
                          >
                          <v-btn
                          class="mr-4"
                             color="green white--text"
                            style="width:80px;"
                           type="submit"
                            >Save</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      
                 </v-row>
                     </v-form>
                </v-card-text>
             </v-card>
          </v-dialog>
<!-- edit Item category -->
         <v-dialog v-model="dialog"  max-width="600">
            <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
              <v-card-title>Edit Fitting Code</v-card-title>
               <v-form ref="form" @submit.prevent="editToolcategories">
              <v-card-text>
                <v-row justify="space-around" class="ma-3">
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                    disabled
                    outlined
                    dense
                    placeholder="Fitting Make Code"
                    label="Fitting Make Code"
                    v-model="editToolCategory.categoryName"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="6">
                     <v-text-field
                    outlined
                    dense
                    placeholder="Fitting Make Name"
                    label="Fitting Make Name"
                    v-model="editToolCategory.margin"
                    ></v-text-field>
                   </v-col>
                </v-row>
             
              </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                       <v-btn
                color="red white--text"
                style="width:80px;"
                 @click="dialog=false"
              >
                Cancel
              </v-btn>
              <v-btn class="mr-4"
                 color="green white--text"
                style="width:80px;"
               
                type="submit"
              >
                Save
              </v-btn>

               </v-card-actions>
                </v-form>
            </v-card>

          </v-dialog>
          <!-- delete the Item category -->
                 <v-dialog v-model="dialogDelete" max-width="600px" persistent >
          <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
            <v-card-title style="font-size:20px">Are you sure you want to delete Tool Make ?</v-card-title>
            <v-card-actions class="mr-3">
              <v-spacer></v-spacer>
              <v-btn color="red white--text"
                            style="width:80px;" @click="dialogDelete=false">Cancel</v-btn>
              <v-btn color="green white--text"
                            style="width:80px;" class="mr-3" @click="confirmToDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Upload Item Category -->
         <div v-if="this.activeUpload==true">
     <v-dialog
      persistent
      max-width="600px"
      v-model="activeUpload" >

       <v-card>
         <v-card-title style="background-color:#2cb1fe;color:white;">Upload Tool Category </v-card-title>
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
      </v-tab-item>

      <!-- Sub Item category tab started -->
      <v-tab-item>
                 <v-data-table
                 dense
                 fixed-header
            
                 :headers="SubCategory"
                 :items="allSubCategory"
                 :search="search"
                 >
                 <template v-slot:top>
                    <v-toolbar flat >
                      <v-toolbar-title>
           <v-text-field
            rounded
            solo
          v-model="search"
          label="Search "
          class=" mt-6"
          dense
        ></v-text-field>
        </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <vue-excel-xlsx
                        :data="allSubCategory"
                        :columns="jsonfields2"
                        :file-name="'Tool SubCategory'"
                        :file-type="'xlsx'"
                        :sheet-name="'sheetname'"
                        v-if="allSubCategory != ''"
                        >
                        <v-icon
                        large
                        color="green"
                        >
                          mdi-cloud-download
                        </v-icon>
                      </vue-excel-xlsx> 
                         <vue-excel-xlsx :data="json_data2" :columns="json_data2"
                        :file-name="'Tool SubCategory'"
                        :file-type="'xlsx'"
                        :sheet-name="'sheetname'" v-if="allSubCategory == ''">                    
                    <v-icon large color="green darken-2">
                      mdi-cloud-download
                    </v-icon>
                  </vue-excel-xlsx>
                        <v-icon class="pa-2  mt-0 blue--text"
                          medium
                          color="red"
                        @click="activeUploadCard2"
                          large
                        > 
                        mdi-cloud-upload
                        </v-icon>
                        <v-icon 
                    color="red"
                    large
                    @click="addToolSubMake"
                    >mdi-plus</v-icon>
                    </v-toolbar>
                 </template>
                    
                 

                 <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2 blue--text"   @click="editToolSubcat(item)" >
        mdi-pencil
        
      </v-icon>

      <v-icon class="pa-2 red--text"
        small
       @click="deleteSubToolCard(item)"
      >
        mdi-delete
      </v-icon>
    </template>

                 </v-data-table>
        <!-- add Sub Item Category -->
         <v-dialog v-model="dialog4" max-width="600px">
             <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
                <v-card-title>Add Tool SubCategory</v-card-title>
                <v-card-text>
                    <v-form 
                    v-model="valid" ref="form1"
                    @submit.prevent="saveToolSubCategories"
                   
                    >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                         <v-autocomplete
                           label="Fitting Category Name"
                           placeholder="Fitting Category Name"
                           :rules="nameRules"
                           v-model="addToolSubCategory.categoryName" 
                           :items="getAllCategories"                        
                           dense
                           outlined
                         >

                         </v-autocomplete>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                           <v-text-field
                           label="Sub category Name"
                           placeholder="Sub category Name"
                           v-model="addToolSubCategory.subCategoryName"
                            :rules="nameRules"
                           dense
                           outlined
                         >

                         </v-text-field>
                   </v-col>
                        <v-card-actions class="mr-3">
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red white--text"
                style="width:80px;"
                            @click="cancelToolsubMake()"
                            >Cancel</v-btn
                          >
                          <v-btn
                          class="mr-4"
                            color="green white--text"
                style="width:80px;"
                           type="submit"
                            >Save</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      
                 </v-row>
                     </v-form>
                </v-card-text>
             </v-card>
          </v-dialog>
<!-- edit Sub Item category -->
         <v-dialog v-model="dialog3"  max-width="600">
            <v-card  style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;" >
              <v-card-title>Edit Tool Code</v-card-title>
               <v-form ref="form" @submit.prevent="editToolSubCategories">
              <v-card-text>
                <v-row justify="space-around" class="ma-3">
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                    disabled
                    outlined
                    dense
                    placeholder="Category name"
                    label="Category name"
                    v-model="editToolSubCategory.categoryName"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="6">
                     <v-text-field
                    outlined
                    dense
                    placeholder="Sub Item Category"
                    label="Sub Item Category"
                    v-model="editToolSubCategory.subCategoryName"
                    ></v-text-field>
                   </v-col>
                </v-row>
             
              </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                       <v-btn
                 color="red white--text"
                style="width:80px;"
                 @click="dialog3=false"
              >
                Cancel
              </v-btn>
              <v-btn class="mr-4"
                 color="green white--text"
                style="width:80px;"
               
                type="submit"
              >
                Save
              </v-btn>

               </v-card-actions>
                </v-form>
            </v-card>

          </v-dialog>
          <!-- delete the Item category -->
                 <v-dialog v-model="dialogDelete2" max-width="700px" persistent >
          <v-card  style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
            <v-card-title style="font-size:20px">Are you sure you want to delete Tool Sub Category ?</v-card-title>
            <v-card-actions class="mr-3">
              <v-spacer></v-spacer>
              <v-btn  color="red white--text"
                            style="width:80px;" @click="dialogDelete2=false">Cancel</v-btn>
              <v-btn color="green white--text"
                            style="width:80px;"  class="mr-3" @click="confirmSubToolToDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Upload Item Category -->
         <div v-if="this.activeUpload==true">
     <v-dialog
      persistent
      max-width="600px"
      v-model="activeUpload" >

       <v-card>
         <v-card-title style="background-color:#2cb1fe;color:white;">Upload Tool SubCategory </v-card-title>
            <v-card-text class="mt-4">
               <v-row align="center">
                 <v-col>
                   <input type="file" ref="myFileInput"  v-on:change="uploadFile2" />
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
               <v-btn class="green white--text mb-2"  @click="submitFIle2">Upload</v-btn>
              <v-btn @click="activeUpload=false" class="red white--text mb-2">cancel</v-btn>
            </v-card-actions>
       </v-card>
     </v-dialog>
     </div>
        <!-- </v-card> -->
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar :color="activeColor" v-model="snackbar" timeout="5000">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>

import servicescall from '@/Services';
export default {
    name:'ToolCategory',
     mixins: [servicescall],
    data(){
        return{
          dialog4: false,
            tab: null,
        items: [
          'CATEGORY', 'SUB CATEGORY',
        ],
          dialog2:false,
        json_data:[{
          label: "Category_Name",
           field: "",
        },{
        label: "margin",
           field: "",
        }],
        json_data2:[{
          label: "Category_Name",
           field: "",
        },{
        label: "Sub_Category_Name",
           field: "",
        }],
          editedIndex: -1,
        file:'',
         isProgress:false,
        activeUpload:false,
        jsonfields:[{
          label: "Category_Name",
           field: "categoryName",
        },{
        label: "margin",
           field: "margin",
        }],
        jsonfields2:[{
          label: "Category_Name",
           field: "categoryName",
        },{
        label: "Sub_Category_Name",
           field: "subCategoryName",
        }],
        search:'',
           textbgColor:'',
           valid:false,
           text:'',
           dialog:false,
           dialog3:false,
           snackbar:false,
           activeColor:'',
           dialogDelete:false,
           dialogDelete2:false,
           deleteModel:{},
           deleteModel2:{},
           getAllCategories:[],
           addToolCategory:{
                "categoryName": '',
                "margin": ''
           },
            addToolSubCategory:{
                "categoryName": '',
                "subCategoryName": ''
           },
           editToolCategory:{
             "categoryName": '',
            "margin": ''
           },
           editToolSubCategory:{
             "categoryName": '',
            "subCategoryName": ''
           },
           allCategory:[],
           allSubCategory:[],
           headers:[
               {text:"Category Name", value:"categoryName"},
               {text:"Margin", value:"margin"},
               { text: 'Actions', value: 'actions', sortable: false,},
           ],
           SubCategory:[
               {text:"Category Name", value:"categoryName"},
               {text:"Sub Category Name", value:"subCategoryName"},
               { text: 'Actions', value: 'actions', sortable: false,},
           ],
           nameRules: [
        (v) => !!v || " Field  is required",
      //  (v) => v.length <= 30 || "Name allows below 30 characters only",
        // v => /[^a-z ]*$/gmi || 'Name must be characters',
       
      ],
        
        }
    },
    
   mounted(){
       this.getcategory();
       this.getsubcategory();
       this.getscategory();
   },
   methods:{
    getscategory(){
          this.getToolCategory().then((response) => {
           this.getAllCategories = response.map(a => a.categoryName);  

        });
      },
      getcategory(){
          this.getToolCategory().then((response) => {
           this.allCategory=response;
        });
      },
      getsubcategory(){
        this.getToolSubCategory().then((response) => {
           this.allSubCategory=response;

        });
      },
      addToolMake(){
        this.dialog2 = true;
    },
    addToolSubMake(){
      this.dialog4 = true;
    },
    cancelToolMake(){
        this.dialog2 = false;
        this.addToolCategory = {};
        this.$refs.form.reset();
        // this.makeModel = [];
    },
    cancelToolsubMake(){
       this.dialog4 = false;
       this.addToolSubCategory = {};
        this.$refs.form1.reset();
    },
    // uploadItem Makes
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
               formData.append('categories',this.file)
               this.isUploadCard=true;
             this.uploadToolCategories(formData).then((response) => {                      
             if(response.status==200){
              this.text=response.data.message;
                 this.isProgress=false;
                 this.activeColor='green';
                 this.activeUpload=false;
                 this.snackbar=true;
                  this.getcategory();
                  this.getsubcategory();
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
        // Upload Sub Item
           uploadFile2(event){
            this.file=event.target.files[0];
            if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
            } else{
                alert("upload only .xlsx or .xls")
                this.file='';
            }

        },

     activeUploadCard2(){
                 // alert("hello")
                  this.activeUpload=true;
                },
    submitFIle2(){
            if(this.file ==''){
                alert("Please choose file")
            }
            else{
                 if (this.file.name.split(".").pop() =="xlsx" || this.file.name.split(".").pop() =='xls'){
                        var formData = new FormData();
                           this.isProgress=true
               formData.append('categories',this.file)
               this.isUploadCard=true;
             this.uploadToolSubCategories(formData).then((response) => {                      
             if(response.status==200){
              this.text=response.data.message;
                 this.isProgress=false;
                 this.activeColor='green';
                 this.activeUpload=false;
                 this.snackbar=true;
                 this.file='';
                // this.getcategory();
                 this.getsubcategory();
             }         
             else{
                 this.text=response.data.message;
                 this.isProgress=false;
                 this.activeColor='red';
                 this.snackbar=true;
                 //setInterval(location.reload(), 1000);
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
             //deleteCard
             deleteCard(item){
               this.deleteModel=item;
               this.dialogDelete=true;
             },
           //confirmToDelete
           confirmToDelete(){
             
              var reqJSON=this.deleteModel
                this.deleteToolCategory(reqJSON).then(response => {
                    if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     
                     this.dialogDelete=false;
                   this.getscategory();
                     this.getcategory()

                 }else{
                    
                     this.text=response.data.message;
                     this.activeColor='red'
                     this.snackbar=true;
                     this.dialogDelete=false;
                 }
                  

                })
            },
            deleteSubToolCard(item){
              this.deleteModel2=item;
               this.dialogDelete2=true;
            },
                  confirmSubToolToDelete(){
             
              var reqJSON=this.deleteModel2
                this.deleteToolSubCategory(reqJSON).then(response => {
                    if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     
                     this.dialogDelete2=false;
                   
                     this.getsubcategory()

                 }else{
                    
                     this.text=response.data.message;
                     this.activeColor='red'
                     this.snackbar=true;
                     this.dialogDelete=false;
                 }
                  

                })
            },
        //edit item code
        editToolcat(item){
          this.editToolCategory=item;
          this.dialog=true;
        },
        editToolSubcat(item){
          this.editToolSubCategory=item;
          this.dialog3=true;
        },
       saveToolCategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.addToolCategory;
             this.saveToolCategory(reqJson).then((response) => {
                  this.snackbar=false;
                 if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.$refs.form.reset()
                     this.getcategory();
                     this.getscategory();
                    this.dialog2 = false;
                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }
                
                   
                   this.$refs.form.reset()

         
             })
            }
       },
        saveToolSubCategories(){
           
            if(this.$refs.form1.validate()){
                var reqJson= this.addToolSubCategory;
             this.saveToolSubCategory(reqJson).then((response) => {
                  this.snackbar=false;
                 if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.$refs.form1.reset()
                     this.getsubcategory();
                        this.getcategory();
                    this.dialog2 = false;
                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }        
             })
            }
       },

        editToolcategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.editToolCategory;
             this.saveToolCategory(reqJson).then((response) => {
                  this.snackbar=false;
                 if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.dialog=false;
                     this.$refs.form.reset()
                     this.getcategory();

                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }                
                   
                   this.$refs.form.reset()

         
             })
            }
       },
        editToolSubCategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.editToolSubCategory;
             this.saveToolSubCategory(reqJson).then((response) => {
                  this.snackbar=false;
                 if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.dialog3=false;
                     this.$refs.form.reset()
                     this.getsubcategory();

                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }                
                   
                   this.$refs.form.reset()

         
             })
            }
       }
   }      
}
</script>
<style scoped>
 .v-data-table {
  line-height: 2.8;
  max-width: 100%;

}
</style>
