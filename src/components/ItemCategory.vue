<template>
    <v-card style="margin-left:14px;">
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
                 <v-data-table                                 
                 dense
                 fixed-header
                :items-per-page="10"                
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
                         <vue-excel-xlsx :data="json_data"  :columns="json_data"
        :file-name="'Item Category'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'" v-if="allCategory == ''">                    
                    <v-icon large color="green darken-2">
                      mdi-cloud-download
                    </v-icon>
          </vue-excel-xlsx>

          <vue-excel-xlsx
        :data="allCategory"
        :columns="jsonfields123"
        :file-name="'Item Category'"
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
                    @click="addItemMake"
                    >mdi-plus</v-icon>
                    </v-toolbar>
                 </template>
                    
                 

                 <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2 blue--text"   @click="editItemcat(item)" >
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
         <v-dialog v-model="dialog2" max-width="600px" >
             <v-card class="ch1" style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
                <v-card-title>Add Item Category</v-card-title>
                <v-card-text>
                       <!-- :key="renderCat" -->
                    <v-form 
               
                    v-model="valid" ref="form"
                    @submit.prevent="saveItemCategories"
                   
                    >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                         <v-text-field
                           label="Item Category Name"
                           placeholder="Item Category Name"
                           :rules="nameRules"
                           v-model="addItemCategory.categoryName"                         
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
                           v-model="addItemCategory.margin"
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
                            @click="cancelItemMake()"
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
            <v-card  style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
              <v-card-title>Edit Item Category</v-card-title>
               <v-form ref="form" @submit.prevent="editItemcategories">
              <v-card-text>
                <v-row justify="space-around" class="ma-3">
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                    disabled
                    outlined
                    dense
                    placeholder="Item Category Name"
                    label="Item Category Name"
                    v-model="editItemCategory.categoryName"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="6">
                     <v-text-field
                    outlined
                    dense
                    placeholder="Item margin"
                    label="Item margin"
                    v-model="editItemCategory.margin"
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
                 <v-dialog v-model="dialogDelete" max-width="650px"  persistent >
          <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
            <v-card-title style="font-size:20px;">Are you sure you want to delete Item Category ?</v-card-title>
            <v-card-actions class="mr-3">
              <v-spacer></v-spacer>
              <v-btn color="red white--text"
                            style="width:80px;"  @click="dialogDelete=false">Cancel</v-btn>
              <v-btn  color="green white--text"
                            style="width:80px;"  class="mr-3" @click="confirmToDelete">OK</v-btn>
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

       <v-card style="">
         <v-card-title style="background-color:#2cb1fe;color:white;">Upload Item Category </v-card-title>
            <v-card-text class="mt-4">
               <v-row align="center">
                 <v-col>
                   <input type="file" ref="myFileInput"  v-on:change="uploadFile"  accept=".xls"/>
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
                 height="350"
                 :headers="SubCategory"
                 :items="allSubCategory"
                 :search="search"
                 style=""
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
                        :columns="jsonfields234"
                        :file-name="'Item Sub Category'"
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
                         <vue-excel-xlsx :data="json_data2"  :columns="json_data2"
                        :file-name="'Item Sub Category'"
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
                    @click="addItemMakeSub"
                    >mdi-plus</v-icon>
                    </v-toolbar>
                 </template>
                    
                 

                 <template v-slot:item.actions="{ item }">
      <!-- <v-icon
        small
        class="mr-2 blue--text"   @click="editItemSubcat(item)" >
        mdi-pencil
        
      </v-icon> -->

      <v-icon class="pa-2 red--text"
        small
       @click="deleteSubItemCard(item)"
      >
        mdi-delete
      </v-icon>
    </template>

                 </v-data-table>
        <!-- add Sub Item Category -->
         <v-dialog v-model="dialog4" max-width="600px">
             <v-card style="background-color:rgba(223,240,254,255);border:3px solid rgba(138,222,199,255);border-radius:4px;">
                <v-card-title>Add Item SubCategory</v-card-title>
                <v-card-text>
                    <v-form 
                    v-model="valid" ref="form1"
                    @submit.prevent="saveItemSubCategories"
                   
                    >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <!-- {{renderCategories}} -->
                         <v-autocomplete                      
                           label="Item Category Name"
                           placeholder="Item Category Name"
                           :rules="nameRules"
                           v-model="addItemSubCategory.categoryName" 
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
                           v-model="addItemSubCategory.subCategoryName"
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
                            @click="cancelItemSubMake()"
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
            <v-card  >
              <v-card-title>Edit Sub Item category</v-card-title>
               <v-form ref="form" @submit.prevent="editItemSubCategories">
              <v-card-text>
                <v-row justify="space-around" class="ma-3">
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                    disabled
                    outlined
                    dense
                    placeholder="Category name"
                    label="Category name"
                    v-model="editItemSubCategory.categoryName"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="6">
                     <v-text-field
                    outlined
                    dense
                    placeholder="Sub Item Category"
                    label="Sub Item Category"
                    v-model="editItemSubCategory.subCategoryName"
                    ></v-text-field>
                   </v-col>
                </v-row>
             
              </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                       <v-btn
                color="blue darken-1"
                text
                 @click="dialog3=false"
              >
                Cancel
              </v-btn>
              <v-btn class="mr-4"
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
          <!-- delete the Item Sub category -->
                 <v-dialog v-model="dialogDelete2" max-width="700px" persistent >
          <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
            <v-card-title style="font-size:20px">Are you sure you want to delete Item SubCategory ?</v-card-title>
            <v-card-actions class="mr-3">
              <v-spacer></v-spacer>
              <v-btn color="red white--text"
                            style="width:80px;" @click="dialogDelete2=false">Cancel</v-btn>
              <v-btn color="green white--text"
                            style="width:80px;" class="mr-3" @click="confirmSubItemToDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Upload Item Category -->
         <div v-if="this.activeUpload2==true">
     <v-dialog
      persistent
      max-width="600px"
      v-model="activeUpload2" >

       <v-card style="">
         <v-card-title style="background-color:#2cb1fe;color:white;margin-top:-5px;">Upload Item SubCategory </v-card-title>
            <v-card-text class="mt-4" >
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
              <v-btn @click="activeUpload2=false" class="red white--text mb-2">cancel</v-btn>
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
    name:'Itemcategory',
     mixins: [servicescall],
    data(){
        return{
          renderCategories: 0,
          dialog4: false,
            tab: null,
        items: [
          'CATEGORY', 'SUB CATEGORY',
        ],
          dialog2:false,
          editedIndex: -1,
        file:'',
         isProgress:false,
        activeUpload:false,
        activeUpload2:false,
        json_data:[{
          label: "Category_Name",
           field: "",
        },{
        label: "margin",
           field: "",}
      ],
        jsonfields123:[{
          label: "Category_Name",
           field: "categoryName",
        },{
        label: "margin",
           field: "margin",}
      ],
        json_data2:[{
          label: "Category_Name",
           field: "",
        },{
        label: "Sub_Category_Name",
           field: "",}
      ],
        jsonfields234:[{
          label: "Category_Name",
           field: "categoryName",
        },{
        label: "Sub_Category_Name",
           field: "subCategoryName",}
      ],
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
           addItemCategory:{
                "categoryName": '',
                "margin": ''
           },
           defaultCategory:{
             "categoryName": '',
              "margin": ''
           },
            addItemSubCategory:{
                "categoryName": '',
                "subCategoryName": ''
           },
           editItemCategory:{
             "categoryName": '',
            "margin": ''
           },
           editItemSubCategory:{
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
          this.getItemCategory().then((response) => {
           this.getAllCategories = response.map(a => a.categoryName);
        });
      },
      getcategory(){
          this.getItemCategory().then((response) => {
           this.allCategory=response;

        });
      },
      getsubcategory(){
        this.getItemSubCategory().then((response) => {
           this.allSubCategory=response;
        });
      },
      addItemMake(){
        this.dialog2 = true;
    },
    addItemMakeSub(){
      this.dialog4 = true;
    },
    cancelItemMake(){
        this.dialog2 = false;
        this.addItemCategory = {};
        this.$refs.form.reset();
    },
    cancelItemSubMake(){
      this.dialog4 = false;
      this.addItemSubCategory = {};
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
                 if (this.file.name.split(".").pop() =="xlsx"){
                        var formData = new FormData();
                           this.isProgress=true
               formData.append('categories',this.file)
               this.isUploadCard=true;
            this.uploadItemCategories(formData).then((response) => {                      
             if(response.status==200){
              this.text=response.data.message;
                 this.isProgress=false;
                 this.activeColor='green';
                 this.activeUpload=false;
                 this.snackbar=true;
                 this.file='';
                 this.getcategory();
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
                     alert("upload only .xlsx")
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
                  this.activeUpload2=true;
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
             this.uploadItemSubCategories(formData).then((response) => {                      
             if(response.status==200){
              this.text=response.data.message;
                 this.isProgress=false;
                 this.activeColor='green';
                 this.activeUpload2=false;
                 this.snackbar=true;
                 this.file='';
                //  this.getcategory();
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
                this.deleteItemCategory(reqJSON).then(response => {
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
            deleteSubItemCard(item){
              this.deleteModel2=item;
               this.dialogDelete2=true;
            },
                  confirmSubItemToDelete(){
             
              var reqJSON=this.deleteModel2
                this.deleteItemSubCategory(reqJSON).then(response => {
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
        editItemcat(item){
          this.editItemCategory=item;
          this.dialog=true;
        },
       saveItemCategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.addItemCategory;
             this.saveItemCategory(reqJson).then((response) => {
                  this.snackbar=false;                  
                 if(response.status==200){                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.$refs.form.reset();
                     this.getcategory();
                     this.getscategory();
                    this.dialog2 = false;
                    this.addItemCategory = {};
                    // $router.go();
                    // this.renderCategories++;                    
                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }
             })
             .then(()=>{
          
        setTimeout(this.getcategory(),this.close(), 1500);
        })
            }
       },
        saveItemSubCategories(){
           
            if(this.$refs.form1.validate()){
                var reqJson= this.addItemSubCategory;
             this.saveItemSubCategory(reqJson).then((response) => {
                  this.snackbar=false;
                 if(response.status==200){
                    
                     this.text=response.data.message;
                     this.activeColor='green'
                     this.snackbar=true;
                     this.$refs.form1.reset()
                     this.getsubcategory();
                        this.getcategory();
                    this.dialog4 = false;
                    this.addItemSubCategory = {};
                 }else{
                    
                     this.text=response.data.error;
                     this.activeColor='red'
                     this.snackbar=true;
                 }
                
                   
                   this.$refs.form.reset()

         
             })
            }
       },

        editItemcategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.editItemCategory;
             this.saveItemCategory(reqJson).then((response) => {
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
        editItemSubCategories(){
           
            if(this.$refs.form.validate()){
                var reqJson= this.editItemSubCategory;
             this.saveItemSubCategory(reqJson).then((response) => {
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

</style>
