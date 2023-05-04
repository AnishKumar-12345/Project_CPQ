<template>
    <div> 
        <Navbar/>
        <v-card >
          <v-toolbar  dark flat style="position: sticky;
        z-index: 9;
       " class="bgtab">
            <v-toolbar-sub-title class="mt-7">
              <v-row dense>
              <v-col>
              <v-text-field
                type="search"
               v-model="searchFittingTypeCode"
                placeholder="Search Fitting Type Code"
                label="Search Fitting Type Code"
                @input="getFittingTypecodeDetails"
                
              >
              </v-text-field>
              </v-col>
                <v-col>
              <v-text-field
                label=" Fitting Type Name"
                placeholder=" Fitting Type Name"
               v-model="this.fittingTypeDetails.fittingTypeName"
                readonly
              ></v-text-field>
                </v-col>
                </v-row>
            </v-toolbar-sub-title>
            <v-spacer></v-spacer>
           
    
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
    
                <v-tab v-for="item in items" :key="item" style="font-size:14px;  text-transform: capitalize;  ">
                 <b> {{ item }}</b>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
    
           <v-tabs-items v-model="tab">
               <v-tab-item>
                    <div class="overView">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e4e6e4;
                  "
                >
                  <p style=" color: black font-size:14px; font-weight:700">
                   <b> Fitting Type Details</b>
                  </p>
                  <div>
                    <v-icon v-show="searchFittingTypeCode!=''"
                     
                      style="font-weight: 800; font-size: 22px; color: black"
                     @click="editFittingType()"
                      >mdi-pencil</v-icon
                    >
                    <v-icon v-show="searchFittingTypeCode==''"  v-if="fittingTypeCard==false"
                      style="font-weight: 800; font-size: 22px; color: black"
                      @click="addNewFittingType()"
                      >mdi-plus</v-icon
                    >
                    <v-icon v-show="fittingTypeCard==true"
                      large
                     
                      style="font-weight: 800; font-size: 22px; color: black"
                      @click="backToCard()"
                      >mdi-arrow-left</v-icon
                    >
                  </div>
                </div>
                  <!-- Fitting Type  View Details -->
                     <div  v-if="isItemDetails!=false" v-show="searchFittingTypeCode !=''" class="mt-2"  style="background-color:rgba(225,246,240,255); padding:20px;border: 1px solid rgba(129,207,252,255);border-radius:5px;">
                      <!-- <div> -->
                  <v-form readonly class="mt-2"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row dense>
                        <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Ft Sub Category Name"
                         v-model="this.fittingTypeDetails.subCategoryName"
                         placeholder="Ft Category Name"
                          hint="Mandatory Field"
                          dense
                          outlined
                        >
                         <template #label>
       Ft Sub Category Name<strong  class="red--text">* </strong>
      </template>    
                        </v-text-field>
                      </v-col>
                     
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          
                          label="Fitting Type Code"
                          v-model="this.fittingTypeDetails.fittingTypeCode"
                           hint="Mandatory Field"
                            dense
                            outlined
                        >
                        <template #label>
        Fitting Type Code<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          label="Fitting Type Name"
                        v-model="this.fittingTypeDetails.fittingTypeName"
                          hint="Mandatory Field"
                          dense
                          outlined
                         
                        >
                          <template #label>
        Fitting Type Name<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
    
                         <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          v-model="this.fittingTypeDetails.margin"
                          label="Margin"
                          type="number"
                          dense
                          outlined
                        ></v-text-field>
                      </v-col>             
                   
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        
                          label="Unit 1"
                          v-model="this.fittingTypeDetails.unit1"
                          type="number"
                          dense
                          outlined
                          hint="Mandatory Field"
                        >
                        <template #label>
        Unit 1<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          label="Unit 1 Type"
                         v-model="this.fittingTypeDetails.unit1_type"
                          dense
                          outlined
                          
                        >
                        <template #label>
        Unit 1 Type<strong  class="red--text">* </strong>
      </template>
                        
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        
                          label="Unit 2"
                          v-model="this.fittingTypeDetails.unit2"
                          type="number"
                          dense
                          outlined
                          hint="Mandatory Field"
                        >
                        
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          label="Unit 2 Type"
                         v-model="this.fittingTypeDetails.unit2_type"
                          dense
                          outlined
                          
                        >
                      
                        
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        
                          label="Unit 3"
                          v-model="this.fittingTypeDetails.unit3"
                          type="number"
                          dense
                          outlined
                          hint="Mandatory Field"
                        >
                       
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          label="Unit 3 Type"
                         v-model="this.fittingTypeDetails.unit3_type"
                          dense
                          outlined
                          
                        >
                        
                        </v-text-field>
                      </v-col>
                        <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          v-model="this.fittingTypeDetails.daimeter"
                          label="Diameter"
                          type="number"
                          dense
                          outlined
                        ></v-text-field>
                      </v-col>
                       <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Transport Rate"
                           v-model="fittingTypeDetails.transportRate"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                       <v-col cols="12" sm="6" md="3">
                        <v-text-field
                         
                          v-model="fittingTypeDetails.wastagePercent"
                          label="Wastage Percent(%)"
                          type="number"
                          dense
                          outlined
                        ></v-text-field>
                      </v-col>
    
                      <v-col cols="12" sm="12" md="9">
                        <v-textarea
                          rows="4"
                          v-model="this.fittingTypeDetails.fittingTypeDescription"
                           dense
                           outlined
                          label=" Fitting Type Description"
                         
                          hint="Mandatory Field"
                        >
                        <template #label>
       Fitting Type Description<strong  class="red--text">* </strong>
      </template>
                        </v-textarea>
                      </v-col>
                    </v-row>
                   
                  </v-form>
                </div>
    
                     <div  v-if="fittingTypeCard ==true" style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
         <v-form @submit.prevent="saveItem" ref="form" v-model="valid" lazy-validation >
          <v-row class="mt-2 pl-3 pr-3" dense>
    
             <v-col cols="12" sm="12" md="3">
               <v-autocomplete
              label="Ft Sub Category Name"
              placeholder="Ft Sub Category Name"
               v-model="fittingModel.subCategoryName"
               :items="fittingCategoryList"
               :rules="nameRules"
               :disabled="isItemDetails"
    
              dense
              outlined
             >
              <template #label>
        Ft Sub Category Name<strong  class="red--text">* </strong>
      </template>
    
               </v-autocomplete>
              </v-col> 
            <v-col cols="12" sm="12" md="3">
              <v-text-field
              placeholder="Fitting Type Name"
              label="Fitting Name"
              dense
              v-model="fittingModel.fittingTypeName"
              :rules="nameRules"
              :disabled="isItemEdited"
               outlined
              >
               <template #label>
        Fitting Type Name<strong  class="red--text">* </strong>
      </template>
             
    
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Fitting Type Code"
              label="Fitting Type Code"
              v-model="fittingModel.fittingTypeCode"
              :rules="nameRules"
              :disabled="isItemEdited"
              dense
              outlined
              >
    
              <template #label>
        Fitting Type Code<strong  class="red--text">* </strong>
      </template>
    
              </v-text-field>
            </v-col>
    
              <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Margin"
              label="Margin"
              type="number"
              v-model="fittingModel.margin"
              dense
              outlined
              >
              </v-text-field>
            </v-col>
    
    
            <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Unit-1"
              label="Unit-1"
               :rules="numberRule"
              type="number"
              v-model="fittingModel.unit1"
              dense
              outlined
              >
    
              <template #label>
        Unit-1<strong  class="red--text">* </strong>
      </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-autocomplete
              label="Unit Type-1"
              placeholder="Unit-1 Type"
               v-model="fittingModel.unit1_type"
               :items="unitTypeList"
               :rules="nameRules"
              dense
              outlined
             >
             <template #label>
        Unit Type-1<strong  class="red--text">* </strong>
      </template>
    
              </v-autocomplete>
              </v-col> 
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          v-model="fittingModel.unit2"
                          label="Unit 2"
                          type="number"
                          dense
                         outlined
                          
                        ></v-text-field>
                      </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-autocomplete
              label="Unit Type-2"
              placeholder="Unit-2 Type"
               v-model="fittingModel.unit2_type"
               :items="unitTypeList"
               :rules="nameRules"
              dense
              outlined
             >
            
              </v-autocomplete>
              </v-col> 
              <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Unit-3"
              label="Unit-3"
               :rules="numberRule"
              type="number"
              v-model="fittingModel.unit3"
              dense
              outlined
              >
    
              
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-autocomplete
              label="Unit Type-3"
              placeholder="Unit-3 Type"
               v-model="fittingModel.unit3_type"
               :items="unitTypeList"
               :rules="nameRules"
              dense
              outlined
             >
             <v-col cols="12" sm="12" md="3">
               <v-text-field                     
                 v-model="fittingModel.daimeter"
                label="Diameter"
                type="number"
                dense
               outlined
              ></v-text-field>
            </v-col>
    
    <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Welding Joints"
              label="Welding Joints"
              type="number"
              v-model="fittingModel.weldingJoints"
              dense
              outlined
              >
              </v-text-field>
            </v-col>
    
              </v-autocomplete>
              </v-col> 
               
                 <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Transport Rate"
              label="Transport Rate"
              type="number"
              v-model="fittingModel.transportRate"
              dense
              outlined
              >
              </v-text-field>
            </v-col>
    
    
             <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="WastagePercent(%)"
              label="WastagePercent(%)"
              type="number"
              v-model="fittingModel.wastagePercent"
              dense
              outlined
              >
              </v-text-field>
            </v-col>
    
            <v-col cols="12" sm="12" >
               <v-textarea
              placeholder="Fitting Type Discription"
              label="Fitting Type Description"
              type="number"
              v-model="fittingModel.fittingTypeDescription"
              dense
              outlined
              >
              </v-textarea>
            </v-col>
           
            <v-col cols="12" sm="12" >
              <v-btn type="submit"    class="red white--text ml-0 mt-1">Save</v-btn></v-col>
          </v-row>
          </v-form>
    
                     </div>
    
    
    
    
                 
    
                
              </div>
               </v-tab-item>
    
             <!-- Fitting -->
                   <v-tab-item>
                       <div class="overView">
    <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e4e6e4;
                  "
                >
                  <v-text-field 
                     dense
                     outlined
                    v-model="fittingSearch"
                    append-icon="mdi-magnify"
                    label="Search"
             ></v-text-field>
    </div>
                <div  class="ma-3">
        <v-card-title v-if="searchFittingTypeCode !=''">
          <h5>Add Fitting</h5>
          <v-spacer></v-spacer>
          <v-icon class="white red--text mr-3" @click="addFittingCard=!addFittingCard" v-if="addFittingCard==false">mdi-plus</v-icon>
          <v-icon class="white red--text mr-3" @click="closefittingcard()" v-if="addFittingCard==true">mdi-close</v-icon>
        </v-card-title>
    
        <v-card-content v-if="addFittingCard==true" >
          <v-form @submit.prevent="saveSingleFitting" ref="form" v-model="valid" lazy-validation style="margin-top:8px;background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
          <v-row class="mt-2 pl-3 pr-3" dense>
    
            <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Fitting Type Code"
              label="Fitting Type Code"
              v-model="searchFittingTypeCode"
              readonly      
              dense
              outlined
              >
    
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
              placeholder="Fitting Name"
              label="Fitting Name"
               :rules="nameRules"
              dense
              v-model="singleFittingModel.fittingName"
               outlined
              >
               <template #label>
        Fitting Name<strong  class="red--text">* </strong>
      </template>
             
    
              </v-text-field>
            </v-col>
    
            <v-col cols="12" sm="12" md="3">
               <v-autocomplete
              label="Make Name"
              :rules="nameRules"
              placeholder="Make Name"
               v-model="singleFittingModel.makeCode"
               :items="allMakes"
              dense
              outlined
             >
              <template #label>
        Make Name<strong  class="red--text">* </strong>
      </template>
    
             </v-autocomplete>
              </v-col> 
             <v-col cols="12" sm="12" md="3">
               <v-autocomplete
              label="Class Type"
              placeholder="Class Type"
               v-model="singleFittingModel.classType"
               :items="allClassTypes"
              dense
              outlined
             > </v-autocomplete>
              </v-col> 
              
    
              <v-col cols="12" sm="12" md="3">
               <v-autocomplete
              label="Material Type"
              placeholder="Material Type"
               v-model="singleFittingModel.materialType"
               :items="allMaterialTypes"
              dense
              outlined
             >
    
           </v-autocomplete>
              </v-col> 
            
    
              <v-col cols="12" sm="12" md="3">
               <v-text-field
              placeholder="Part Number" 
              label="Part Number" 
              v-model="singleFittingModel.partnerNumber"
              dense
              outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
               <v-textarea
               rows="2"
              placeholder="Fitting Description" 
              label="Fitting Description" 
              v-model="singleFittingModel.fittingDescription"
              dense
              outlined
              >
               </v-textarea>
            </v-col>
            <v-col cols="12" sm="12" >
              <v-btn type="submit"    class="red white--text ml-0 mt-1">Save</v-btn></v-col>
          </v-row>
          </v-form>
        </v-card-content>
                </div>
    
                  <v-data-table 
                  max-height="400"
                  fixed-header
                  :headers="fittingHeaders"
                  :items="fittingTypeDetails.fittings"
                   :search="fittingSearch"
                   dense
                  >
                   <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2 blue--text"
             @click="editClassType(item)"
          >
            mdi-pencil
          </v-icon>
    
          <v-icon class="pa-2 red--text"
            small
            @click="deleteFitting(item)"
          >
            mdi-delete
          </v-icon>
        </template>
                  
                  </v-data-table>
                </div>
                         
             <v-dialog v-model="dialogDelete" max-width="500px" persistent >
              <v-card>
                <v-card-title class="white" style="font-size:20px">Are you sure you want to delete  Fitting ?</v-card-title>
                <v-card-actions class="mr-3">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                  <v-btn color="blue darken-1" text class="mr-3" @click="confirmToDelete">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
                     
                   </v-tab-item>
              
           </v-tabs-items>
        </v-card>
    
    
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
    import servicescall from "@/Services";
    import Navbar from '@/components/Navbar'
    export default {
        name:'FittingManagement',
        components:{
            Navbar
        },
        mixins: [servicescall],
        mounted(){
            this.getFittingCategories();
            this.getUnitTypes();
            this.getClassTypes();
            this.getMaterialTypes();
            this.getAllMakes();
            if(this.$route.params.fittingTypeCode){
             this.searchFittingTypeCode=this.$route.params.fittingTypeCode;
             this.searchFittingTypeCode=  this.searchFittingTypeCode.replace("/", "$")
             this.getFittingTypecodeDetails()
             }
        },
    
         data(){
             return{
               fittingSearch:"",
               activeColor:'',
               delFitting:'',
               dialogDelete:false,
                 fittingTypeCard:false,
                  fittingModel:{
                      "subCategoryName": "",
                      "fittingTypeCode": "",
                      "fittingTypeDescription": "",
                      "fittingTypeName": "",
                      "daimeter":'',
                      "margin": '',
                      "transportRate": '',
                      "unit1": '',
                      "unit1_type": "",
                      "unit2": '',
                      "unit2_type": "",
                      "unit3": '',
                      "unit3_type": "",
                      "wastagePercent": '',
                      "weldingJoints":''
                    },
                 addFittingCard:false,
                 allMaterialTypes:[],
                 allClassTypes:[],
                 allMakes:[],
                 snackbar:false,
                 text:'',
                 unitTypeList:[],
                 fittingCategoryList:[],
                 isItemEdited:false,
                 valid:false,
                 activefiled:false,
                 fittingTypeDetails:{},
                 searchFittingTypeCode:'',
                 isItemDetails:true,
                 tab: null,
                 singleFittingModel:{
                  "classType": "",
                  "fittingCode": "",
                  "fittingName": "",
                  "fittingTypeCode": "",
                  "fittingTypeName": "",
                  "makeName": "",
                  "makeCode": "",
                  "weldingType": "",
                  "materialType": "",
                  "partnerNumber": "",
                  "joints":"",
                  "fittingDescription":'',            
                }
    
                 ,
                  items: [
            "Fitting Type",
            "Fittings",
            
          ], 
    
    
             fittingHeaders: [
            { text: 'Fitting  Code', value: 'fittingCode',},
            {text: 'Fitting  Name ', value: 'fittingName',},
            {text: 'Material Type', value: 'materialType',},
            {text: 'Make Name', value: 'makeName',},
            // { text: 'Make Code', value: 'makeCode',},
            { text:'Class Type', value:"classType" },
            { text: 'Part Number', value: 'partnerNumber',},
            { text: 'Actions', value: 'actions', sortable: false,},
          ],
    
    
           fittingModel:{
      "subCategoryName": "",
      "fittingTypeCode": "",
      "fittingTypeDescription": "",
      "fittingTypeName": "",
      "margin": '',
      "transportRate": '',
      "unit1": '',
      "unit1_type": "",
      "wastagePercent": ''
    },
    
    phoneRules: [
                       (v) => !!v || " Field  is required",
                       (v) => /^[0-9]+$/.test(v) || "Only numbers are accepted",
                       (v) => (v && v.length <= 10 && v.length >= 10) || "Number must be  10 number",
                       ],
      nameRules: [
            (v) => !!v || "Field is required",
            //(v) => v.length <= 100 || "Name allows below 100 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
           numberRule: [
            (v) => !!v || "Filed is required",
            (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          ],
             }
         },
    
         methods:{
                  // refresh fittings
                  closefittingcard(){
                    this.singleFittingModel={};
                     this.addFittingCard = false;
                  },
                      // cancel dialog nox
                      cancel(){
                        this.dialogDelete=false;
                      },
                    //edit the fitting
                    editClassType(obj){
                      this.addFittingCard = true;
                      this.singleFittingModel = {};
                      this.singleFittingModel = obj;
                      this.searchFittingTypeCode = obj.fittingTypeCode
                    },
                    // get delete Item
                    deleteFitting(item){
                      this.delFitting=item.fittingCode;
                      this.dialogDelete=true;
                    },
                    // conform to delete
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
                         this.getFittingTypecodeDetails()
                          
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
                      //backward arrow Action
                      backToCard(){
                           this.fittingTypeCard=false;
                           this.isItemDetails=true;
                           this.isItemEdited=false;
                           this.fittingModel={}
                      },
                         // add new Fitting Type
                         addNewFittingType(){
                             this.fittingTypeCard=true;
                             this.isItemDetails=false;
                             this.isItemEdited=false;
                         },
                        //all makes List
    
                         getAllMakes(){
                this.getFittingMakes().then((response) => {
               for(var i=0;i<response.length;i++){
                 this.allMakes.push({text:response[i].makeName,value:response[i].makeCode})
               }
            });
           },
                       //all class type
                       getClassTypes(){
                 this.getAllClassType().then((response) => {
               this.allClassTypes=response
    
            });},    
            
                //all Material Types
                getMaterialTypes(){
                 this.getAllMaterialType().then((response) => {
               this.allMaterialTypes=response
            });},
    
                     //save Fitting Type
    
                     saveItem(){
                       if(this.$refs.form.validate())
                         this.postItem() ;
                     },
                       postItem() {  
          var reqJSON = this.fittingModel;
          this.addFittingType(reqJSON).then(response => {
           
             if(response.status==200){
               this.activeColor=''
               this.activeColor='green'
              this.text=response.data.message;
               
              this.snackbar=true;
             
              this.isEdited=false;
              this.searchFittingTypeCode=  this.searchFittingTypeCode.replace("/", "$")
              this.getFittingTypecodeDetails();
              this.fittingTypeCard=false;
              
              
             // this.fittingModel=this.defaultFittingModel
             // this.getFittings();
             } else{
                 this.text=response.data.message;
                 this.activeColor='red'
              this.snackbar=true;
    
             } 
             //this.close();
          })
        },
                //editFittingType
                editFittingType(){
                 this.fittingTypeCard=true;
                   this.isItemDetails=false;
                   this.isItemEdited=true;
                   this.fittingModel.subCategoryName=this.fittingTypeDetails.subCategoryName;
                   this.fittingModel.fittingTypeName=this.fittingTypeDetails.fittingTypeName;
                   this.fittingModel.fittingTypeCode=this.fittingTypeDetails.fittingTypeCode;
                   this.fittingModel.fittingTypeDescription=this.fittingTypeDetails.fittingTypeDescription;
                 this.fittingModel.margin=this.fittingTypeDetails.margin;
                 this.fittingModel.daimeter=this.fittingTypeDetails.daimeter;
                 this.fittingModel.wastagePercent=this.fittingTypeDetails.wastagePercent;
                   this.fittingModel.transportRate=this.fittingTypeDetails.transportRate;
                   this.fittingModel.unit1=this.fittingTypeDetails.unit1;
                   this.fittingModel.unit1_type=this.fittingTypeDetails.unit1_type;
                   this.fittingModel.unit2=this.fittingTypeDetails.unit2;
                   this.fittingModel.unit2_type=this.fittingTypeDetails.unit2_type;
                   this.fittingModel.unit3=this.fittingTypeDetails.unit3;
                   this.fittingModel.unit3_type=this.fittingTypeDetails.unit3_type;
                   this.fittingModel.weldingJoints=this.fittingTypeDetails.weldingJoints;
                },
                     // all unit Types
                   getUnitTypes(){
    
                 this.getAllUnitType().then((response) => {
               
               this.unitTypeList=response
    
            });},
                 //all fitting Type Categories
                getFittingCategories(){
                 
                  this.getAllFittingCategory().then((response)=>{
                      for(var i=0;i<response.length;i++){
                        this.fittingCategoryList.push(response[i].subCategoryName)
                      }
                  })
                },
                // search based on fitting Type code
             getFittingTypecodeDetails(){
               this.searchFittingTypeCode=  this.searchFittingTypeCode.replace("/", "$")
                 this.getFittingTypeWithCode(this.searchFittingTypeCode).then((response)=>{
                     this.fittingTypeDetails=response;
                     this.fittingTypeCard=false;
                     
                    
                 })
    
             },
    
             saveSingleFitting(){
               this.searchFittingTypeCode=this.searchFittingTypeCode.replace("/", "$")
               this.singleFittingModel.fittingTypeCode=this.searchFittingTypeCode
                this.singleFittingModel.fittingTypeName=this.fittingTypeDetails.fittingTypeName
                    this.snackbar=false
                       if(this.$refs.form.validate()){
                 this.postSingleFitting(this.singleFittingModel).then((response)=>{
                       if(response.status==200){
                           this.text=response.data.message;
                           this.activeColor='green'
                           this.snackbar=true;
                           this.singleFittingModel={}
                           this.searchFittingTypeCode=  this.searchFittingTypeCode.replace("/", "$")
                           this.getFittingTypecodeDetails();
                       }
                 })
             }
             }
         }
        
    }
    </script>
    
    <style scoped>
    /* .overView {
      padding: 10px;
    } */
    
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
    .bgtab{ background-color:#313940 !important;}
    </style>