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
               <td style="text-align:left;width:40px;" id="make"> 
                   <router-link :to="{ name: 'BoqCreation', params: { boqId: row.item.boqId  } }">
                 {{ row.item.boqId }}
                 </router-link>
               </td>
           
               <td style="text-align:left" id="make">          
                 {{row.item.clientName}}
                 </td>
                 <!-- <td style="text-align:left"> {{row.item.contactPersonName }}</td> -->
                  <td id="make" style="text-align:left"> {{row.item.clientCode }}</td>
                   <td id="make" style="text-align:left"> {{row.item.projectName }}</td>
                     <td id="make" style="text-align:left"> {{row.item.projectAddress }}</td>
                  <td id="make" style="text-align: left;"><v-icon small class=" red--text mr-2" @click="deletesectionItem(row.item)">
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
          </v-toolbar>
        </template>
      </v-data-table>
       <v-dialog v-model="dialogDelete2" max-width="600px">
                          <v-card>
                            <v-card-title class="white" style="font-size:20px">Are you sure you want to delete BOQ details ?</v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialogDelete2=false">Cancel</v-btn>
                              <v-btn color="blue darken-1" text @click="confirmdeleteItem()">OK</v-btn>
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
             <v-card-title style="background-color:#ccc;color:black">Upload Fitting types</v-card-title>
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
    import servicescall from '@/Services'
    export default {
        name:'AddVendor',
    
         mixins: [servicescall],
        data(){
            return {
              deleteboqId:'',
              dialogDelete2:false,
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
              result:[],
              dialog: false,
              dialogDelete: false,
          headers: [
           {text: 'Boq Id', value: 'boqId'},
           {text: 'Client Name ', value: 'clientName'},
           { text: 'Client ID ', value: 'clientCode' },
           { text: ' Project Name ', value: 'projectName' },
           { text: ' Project Address ', value: 'projectAddress'},
           { text: 'Action', value: 'actions', sortable: false},           
            // {text: ' Material Type', value: 'materialType',},
            // { text: 'Unit 1 Type', value: 'unit1_type',class:  },
            // { text: 'Actions', value: 'actions', sortable: false,class: "blue-grey lighten-4 text--red " },
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
         
            this.getBoqs();
           
        },
    
        methods: {
          deletesectionItem(obj){
            this.deleteboqId = obj.boqId;
            // this.deleteboqId=  this.deleteboqId.replace("/", "$")
            this.dialogDelete2 = true;
          },
          confirmdeleteItem(){
            var reqJSON = this.deleteboqId
            this.deleteBoqid(reqJSON).then((response) => {
                if(response.status==200){
                         this.text=response.data.message;
                         this.snackbar=true
                         this.activeColor='';
                         this.activeColor='green'                     
                         this.dialogDelete2=false;
                         this.getBoqs();
                          
                    }
                    else{
                        this.text=response.data.error;
                        this.snackbar=true
                        this.activeColor='';                     
                        this.activeColor='red';                   
                        this.dialogDelete2=false;
                    }
            })
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
                   formData.append('fitting-types',this.file)
                             this.isProgress =true;
                         this.uploadFittingType(formData).then((response) => {
                  if(response.status==200){
                     this.text=response.data.message;
                     this.isProgress =false;
                     this.activeColor='green';
                     this.snackbar=true;
                     this.activeUpload=false;
                   
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
                      getUnitTypes(){
    
                 this.getAllUnitType().then((response) => {
               
               this.unitTypeList=response
    
            });},
                      saveItem(){
                 if(this.$refs.form.validate()){
                 
                    this.postItem()
                 }
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
              this.getBoqs();
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
    
                    getBoqs(){
                    this.getAllBoqsList().then((response) => {      
                    this.result=response
            }
            )
            },
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
       
        max-width: 100%;
        /* margin-left: 20px; */
        
    }
    .v-application a {
        color: #2503b8;
        text-decoration: none;
        font-weight: bold;
        font-size: 18px;
        padding: 10px;
        border-radius: 5px;    
    }
    .v-application a:hover {
      color: rgb(33, 174, 20);
    }
    </style>