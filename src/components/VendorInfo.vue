<template>
    <div>
      <Navbar/>
      <v-card>
        <v-toolbar
          color="black"
          dark
          flat
          style="position: sticky; z-index: 9;"
          class="bgtab"
        >
          <v-toolbar-sub-title class="mt-7">
            <v-row dense>
              <v-col>
                <v-text-field
                  type="search"
                  v-model="searchFittingTypeCode"
                  placeholder="Vendor ID"
                  label="Vendor ID"
                  @input="getVendor"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Vendor Name"
                  placeholder="Vendor Name"
                  v-model="this.fittingTypeDetails.vendorName"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar-sub-title>
          <v-spacer></v-spacer>
  
          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="black"></v-tabs-slider>
  
              <v-tab
                v-for="item in items"
                :key="item"
                style="font-size: 14px; text-transform: capitalize"
              >
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
                <v-text-field
                  dense
                  outlined
                  v-model="fittingSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                ></v-text-field
                >&nbsp;
              </div>
              <div>
              <v-card-title v-if="searchFittingTypeCode != ''">
                  <h5>Add Vendor Mapping</h5>
                  <v-spacer></v-spacer>
                  <v-icon
                    class="white red--text mr-3"
                    @click="addFittingCard = !addFittingCard"
                    v-if="addFittingCard == false"
                    >mdi-plus</v-icon
                  >
                  <v-icon
                    class="white red--text mr-3"
                    @click="refreshSingleFitting()" 
                    v-if="addFittingCard == true"
                    >mdi-close</v-icon
                  >
                </v-card-title>
  
                <v-card-content v-if="addFittingCard == true">
                  <v-form
                    @submit.prevent="saveSingleFitting"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    style="margin-top:8px;background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;"
                  >
                    <v-row class="mt-2 pl-3 pr-3" dense>
                      <v-col cols="12" sm="12" md="3">
                        <v-select
                          placeholder="Category Type"
                          label="Category Type"
                          :items="categoryTypes"
                          v-model="vendorMappings.type"
                          dense
                          outlined
                          :rules="nameRules"
                          @change="getItemCodeByType(vendorMappings.type)"
                        >
                        </v-select>
                      </v-col>
  
                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                          placeholder="Sub Category"
                          label="Sub Category"
                          :items="categoryList"
                          :rules="nameRules"
                          v-model="vendorMappings.category"                       
                          dense
                          outlined
                          @change="getItemMakessAll(vendorMappings.type,vendorMappings.category)"
                        >
                          <template #label>
                            Sub Category<strong class="red--text">* </strong>
                          </template>
                        </v-autocomplete>
                      </v-col>
  
                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                      
                          label="Make Name"                     
                          placeholder="Make Name"
                          v-model="vendorMappings.makes"
                          :items="MakesList"
                          multiple
                          dense
                          outlined
                        >
                          <template #label>
                            Make Name<strong class="red--text">*</strong>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-btn type="submit" class="red white--text ml-0 mt-1"
                          >Save</v-btn
                        ></v-col
                      >
                    </v-row>
                  </v-form>
                </v-card-content>
              </div>
              <!-- {{fittingTypeDetails.vendorMappingDtos}} -->
              <v-data-table
                height="400"
                fixed-header
                :headers="fittingHeaders"
                :items="fittingTypeDetails.vendorMappingDtos"
                :search="fittingSearch"
                dense
                style="margin-top:10px"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
          small
          class="mr-2 blue--text"
           @click="editClassType(item)"
        >
          mdi-pencil
        </v-icon>
  
                  <v-icon
                    class="pa-2 red--text"
                    small
                    @click="deleteFitting(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </div>
  
            <v-dialog v-model="dialogDelete" max-width="500px" persistent>
              <v-card>
                <v-card-title class="white" style="font-size: 20px"
                  >Are you sure you want to delete Fitting ?</v-card-title
                >
                <v-card-actions class="mr-3">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    class="mr-3"
                    @click="confirmToDelete"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  
      <div v-if="this.activeUpload == true">
        <v-dialog persistent max-width="600px" v-model="activeUpload">
          <v-card>
            <v-card-title style="background-color: #ccc; color: black"
              >Upload Vendor Mappings
            </v-card-title>
            <v-card-text class="mt-4">
              <v-row align="center">
                <v-col>
                  <input type="file" ref="myFileInput" v-on:change="uploadFile" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn
                class="green white--text mb-2"
                @click="submitFIle()"
                :disabled="isUploadCard"
                >Upload</v-btn
              >
              <v-btn
                @click="activeUpload = false"
                class="red white--text mb-2"
                :disabled="isUploadCard"
                >cancel</v-btn
              >
            </v-card-actions>
            <v-progress-circular
              v-show="isProgress == true"
              indeterminate
              :size="70"
              :width="7"
              color="green"
            >
              <v-avatar class="img">
                <!-- <img src="../assets/trident2.png" alt="logo" /> -->
              </v-avatar>
            </v-progress-circular>
          </v-card>
        </v-dialog>
      </div>
  
      <v-snackbar :color="activeColor" v-model="snackbar">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import servicescall from "@/Services";
  import Navbar from '@/components/Navbar'
  // import downloadexcel from "vue-json-excel";
  export default {
    name: "FittingManagement",
    mixins: [servicescall],
    components: {
      // downloadexcel,
      Navbar
    },
    mounted() {
      this.getItems();
      // this.getItemMakess();
      // this.getFittingMakess();
      this.getConsumablecategories();
      this.getFittingCategories();
      // this.getUnitTypes();
      // this.getClassTypes();
      //this.getMaterialTypes();
      this.getAllMakes();
      if (this.$route.params.id) {
        this.searchFittingTypeCode = this.$route.params.id;
        this.getVendor();
      }
    },
  
    data() {
      return {
        form:'',
        filename: "VendorMappping",
        isUploadCard: false,
        isProgress: false,
        activeUpload: false,
        typecode: "",
        makecode: "",
        categoryList: [],
        MakesList: [],
        fittingSearch: "",
        CategoryMapping: "",
        FittingTypesByCat: [],
        itemTypeList: [],
        itemMakeList: [],
        categoryType: "",
        activeColor: "",
        delFitting: "",
        dialogDelete: false,
        categoryTypes: ["ITEM", "FITTING","CONSUMABLE"],
        fittingTypeCard: false,
        fittingModel: {
          categoryName: "",
          fittingTypeCode: "",
          fittingTypeDescription: "",
          fittingTypeName: "",
          margin: "",
          transportRate: "",
          unit1: "",
          unit1_type: "",
          unit2: "",
          unit2_type: "",
          unit3: "",
          unit3_type: "",
          wastagePercent: "",
          weldingJoints: "",
        },
        addFittingCard: false,
        allMaterialTypes: [],
        allClassTypes: [],
        allMakes: [],
        snackbar: false,
        text: "",
        unitTypeList: [],
        fittingCategoryList: [],
        consumablecategoryList: [],
        fittingMakeList: [],
        consumableMakeList: [],
        isItemEdited: true,
        valid: false,
        activefiled: false,
        fittingTypeDetails: {},
        searchFittingTypeCode: "",
        isItemDetails: true,
        tab: null,
  
        items: ["Mappings"],
        render:0,
        vendorMappings: {
          category: "",
          type: "",
          makes: [],
          vendorCode: "",
        },
  
        fittingHeaders: [
          {
            text: "Category Type",
            value: "type",
            
          },
          {
            text: "Sub Category",
            value: "category",
            
          },
  
          // {text: 'Make Name', value: 'makeName',class: "blue-grey lighten-4 text--black"},
          // { text: 'Make Code', value: 'makeCode',class: "blue-grey lighten-4 text--black" },
          {
            text: "Makes",
            value: "makeString",
            
          },
          // { text: 'Item type Name', value: 'typecodeName',class: "blue-grey lighten-4 text--black" },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
            
          },
        ],
  
        fittingModel: {
          categoryName: "",
          fittingTypeCode: "",
          fittingTypeDescription: "",
          fittingTypeName: "",
          margin: "",
          transportRate: "",
          unit1: "",
          unit1_type: "",
          wastagePercent: "",
        },
  
        phoneRules: [
          (v) => !!v || " Field  is required",
          (v) => /^[0-9]+$/.test(v) || "Only numbers are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Number must be  10 number",
        ],
        nameRules: [
          (v) => !!v || "Field is required",
          // (v) => v.length <= 100 || "Name allows below 100 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
  
        numberRule: [
          (v) => !!v || "Filed is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
        ],
      };
    },
    watch: {
  
    },
    methods: {
       editClassType(item){
        this.vendorMappings=item;
        this.addFittingCard=true;
       },
  
      CategoryMapping(category) {
        this.FittingTypesByCat = [];
        if (this.categoryType == "FITTING") {
          this.getAllFittingsTypes().then((response) => {
            for (var i = 0; i < response.length; i++) {
              if (response[i].categoryName == this.CategoryMapping) {
                this.FittingTypesByCat.push({
                  text: response[i].fittingTypeName,
                  value: response[i].fittingTypeCode,
                });
              }
            }
          });
        } else {
          for (var i = 0; i < this.allItemTypeList.length; i++) {
            if (this.allItemTypeList[i].categoryName == this.CategoryMapping) {
              this.FittingTypesByCat.push({
                text: this.allItemTypeList[i].itemTypeName,
                value: this.allItemTypeList[i].itemTypeCode,
              });
            }
          }
          // this.FittingTypesByCat=[];
        }
      },
      getItemCodeByType(type) {
        if (type == "ITEM") {
          this.categoryList = this.itemTypeList;
        } else if(type == "FITTING"){
          this.categoryList = this.fittingCategoryList;
        }else{
          this.categoryList=this.consumablecategoryList;
        }
        if(type == "ITEM") {
          this.MakesList = this.itemMakeList;
        } else if((type == "FITTING") ) {
          this.MakesList = this.fittingMakeList;
        } else{
          this.MakesList = this.consumableMakeList;
        }
      },
      uploadFile(event) {
        this.file = event.target.files[0];
        if (
          this.file.name.split(".").pop() == "xlsx" ||
          this.file.name.split(".").pop() == "xls"
        ) {
        } else {
          alert("upload only .xlsx or .xls");
          this.file = "";
        }
      },
      submitFIle() {
        if (this.file == "") {
          alert("Please choose file");
        } else {
          if (
            this.file.name.split(".").pop() == "xlsx" ||
            this.file.name.split(".").pop() == "xls"
          ) {
            var formData = new FormData();
            this.isProgress = true;
            formData.append("vendor-mapping", this.file);
            this.isUploadCard = true;
            this.uploadVendorMappingsFile(formData).then((response) => {
              if (response.status == 200) {
                this.isProgress = false;
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.activeUpload = false;
                this.isUploadCard = false;
                this.getVendor();
                this.file = "";
              } else {
                this.isProgress = false;
                this.text = response.data.message;
                this.activeColor = "red";
                this.snackbar = true;
                this.isUploadCard = false;
              }
            });
          } else {
            alert("upload only .xlsx or .xls");
            this.$refs.myFileInput.value = "";
            this.file = "";
          }
        }
      },
      // active import card
      activeUploadCard() {
        this.activeUpload = true;
      },
      getItemMakessAll(item,data){
        if(item == 'ITEM'){
          this.getItemMakess(item,data);
       
        
        }else if(item == 'FITTING'){
        this.getFittingMakess(item,data);
  
        }else{
          this.getConsumableTypemakes(item,data)
        }
      },
      getItemMakess(item,data){    
        this.getMakesbySubcategory(data,item).then((response) => {    
            // this.itemMakeList = [];    
            for(var i = 0; i < response.data.length; i++){
            this.itemMakeList.push({
              text: response.data[i].makeName,
              value: response.data[i].makeCode,
            });
          }        
          this.itemMakeList = [...new Set(this.itemMakeList)];
  
        })
      },
      getItems() {
        this.getItemSubCategory().then((response) => {
          this.allItemTypeList = response;
          for (var i = 0; i < response.length; i++) {
            this.itemTypeList.push(response[i].subCategoryName);
          }
          this.itemTypeList = [...new Set(this.itemTypeList)];
        });
        
      },
      // cancel dialog nox
      cancel() {
        this.dialogDelete = false;
      },
  
      // get delete Item
      deleteFitting(item) {
        this.delFitting = item.fittingCode;
        this.dialogDelete = true;
      },
      // conform to delete
      confirmToDelete() {
        var reqJSON = this.delFitting;
        this.deleteSingleFitting(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = "This Fitting details Deleted";
            this.snackbar = true;
            this.activeColor = "";
            this.activeColor = "green";
            this.dialogDelete = false;
            this.getVendor();
          } else {
            this.text = response.data.error;
            this.snackbar = true;
            this.activeColor = "";
  
            this.activeColor = "red";
  
            this.dialogDelete = false;
          }
        });
  
        //this.dialogDelete=false;
      },
      //backward arrow Action
      backToCard() {
        this.fittingTypeCard = false;
        this.isItemDetails = true;
        this.isItemEdited = false;
        this.fittingModel = {};
      },
      // add new Fitting Type
      addNewFittingType() {
        this.fittingTypeCard = true;
        this.isItemDetails = false;
      },
      //all makes List
  
      getAllMakes() {
        this.getItemMakes().then((response) => {
          for (var i = 0; i < response.length; i++) {
            this.allMakes.push({
              text: response[i].makeName,
              value: response[i].makeCode,
            });
          }
        });
      },
      //all class type
      getClassTypes() {
        this.getAllClassType().then((response) => {
          this.allClassTypes = response;
        });
      },
  
      //all Material Types
      getMaterialTypes() {
        this.getAllMaterialType().then((response) => {
          this.allMaterialTypes = response;
        });
      },
  
      //save Fitting Type
  
      saveItem() {
        if (this.$refs.form.validate()) this.postItem();
      },
      postItem() {
        var reqJSON = this.fittingModel;
        this.addFittingType(reqJSON).then((response) => {
          if (response.status == 200) {
            this.activeColor = "";
            this.activeColor = "green";
            this.text = response.data.message;
  
            this.snackbar = true;
  
            this.isEdited = false;
            this.getVendor();
            this.fittingTypeCard = false;
          } else {
            this.text = response.data.message;
            this.activeColor = "red";
            this.snackbar = true;
          }
        });
      },
      //editFittingType
      editFittingType() {
        this.fittingTypeCard = true;
        this.isItemDetails = false;
        this.fittingModel.categoryName = this.fittingTypeDetails.categoryName;
        this.fittingModel.fittingTypeName =
          this.fittingTypeDetails.fittingTypeName;
        this.fittingModel.fittingTypeCode =
          this.fittingTypeDetails.fittingTypeCode;
        this.fittingModel.fittingTypeDescription =
          this.fittingTypeDetails.fittingTypeDescription;
        this.fittingModel.margin = this.fittingTypeDetails.margin;
        this.fittingModel.wastagePercent = this.fittingTypeDetails.wastagePercent;
        this.fittingModel.transportRate = this.fittingTypeDetails.transportRate;
        this.fittingModel.unit1 = this.fittingTypeDetails.unit1;
        this.fittingModel.unit1_type = this.fittingTypeDetails.unit1_type;
        this.unit2 = this.fittingTypeDetails.unit2;
        this.fittingModel.unit2_type = this.fittingTypeDetails.unit2_type;
        this.fittingModel.unit3 = this.fittingTypeDetails.unit3;
        this.fittingModel.unit3_type = this.fittingTypeDetails.unit3_type;
        this.fittingModel.weldingJoints = this.fittingTypeDetails.weldingJoints;
      },
      // all unit Types
      getUnitTypes() {
        this.getAllUnitType().then((response) => {
          this.unitTypeList = response;
        });
      },
      getConsumableTypemakes(item,data){
        this.getMakesbySubcategory(data,item).then((response) => {
          for ( var i = 0; i < response.data.length; i++){
            this.consumableMakeList.push({
              text: response.data[i].makeName,
              value: response.data[i].makeCode,
            });
          }
          this.consumableMakeList = [...new Set(this.consumableMakeList)];
        })
      },
      //all fitting Type makess
      getFittingMakess(item,data){
           this.getMakesbySubcategory(data,item).then((response) => {
          for ( var i = 0; i < response.data.length; i++){
            this.fittingMakeList.push({
              text: response.data[i].makeName,
              value: response.data[i].makeCode,
            });
          }
          this.fittingMakeList = [...new Set(this.fittingMakeList)];
        })
      },
      getConsumablecategories(){
        this.getConsumableSubCategory().then((response)=>{
          for(var i=0;i< response.length;i++){
            this.consumablecategoryList.push(response[i].subCategoryName);
          }
          this.consumablecategoryList = [...new Set(this.consumablecategoryList)];
        })
      },
      getFittingCategories() {
        this.getFittingSubCategory().then((response) => {
          for (var i = 0; i < response.length; i++) {
            this.fittingCategoryList.push(response[i].subCategoryName);
          }
          this.fittingCategoryList = [...new Set(this.fittingCategoryList)];
        });
      },
      // search based on fitting Type code
      getVendor() {
        this.getVendorById(this.searchFittingTypeCode).then((response) => {
          this.fittingTypeDetails = response;
          this.fittingTypeCard = false;
            for(var i=0;i< this.fittingTypeDetails.vendorMappingDtos.length;i++){
                 this.fittingTypeDetails.vendorMappingDtos[i].makeString='';
                     for( const  key  in this.fittingTypeDetails.vendorMappingDtos[i].makeCodeNames){
                      this.fittingTypeDetails.vendorMappingDtos[i].makeString= this.fittingTypeDetails.vendorMappingDtos[i].makeString + `${key}: ${this.fittingTypeDetails.vendorMappingDtos[i].makeCodeNames[key]}` +",";
  }
            // this.fittingTypeDetails.vendorMappingDtos[i].makeString=Obj
            }
        });
      },
      refreshSingleFitting(){
        this.vendorMappings = {};
        this.addFittingCard = false;
      },
  
      saveSingleFitting() {
        this.vendorMappings.vendorCode = this.fittingTypeDetails.vendorCode;
        this.snackbar = false;
        if (this.$refs.form.validate()) {
          this.postVendorMapping(this.vendorMappings).then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
               this.categoryList = [];
              this.vendorMappings = {}; 
               this.$refs.form.reset() ; 
              this.getVendor();
            }
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .overView {
    padding: 10px;
  }
  
  .v-icon {
    border-radius: 20px;
    color: black;
  }
  .v-card__title {
    background-color: #ccc;
    padding: 6px;
    border-radius: 5px;
  }
  
  .v-tab--active {
    font-size: 12px;
    /* font-weight: bold; */
    background-color: #ccc;
    color: black !important;
    /* border: 1px solid white; */
    border-radius: 20px;
  }
  
  .v-tab--active {
    color: inherit;
    background-color: white;
  }
  .v-data-table {
    line-height: 2.6;
    max-width: 100%;
  }
  .bgtab{ background-color:#313940 !important;}
  </style>