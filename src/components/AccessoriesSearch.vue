<template>
    <div >
        <Navbar/>
      <v-card flat tile style="margin-left:15px;">
       
        <v-toolbar color=" mt-2" dark flat style="    position: sticky;
      z-index: 9;" class="bgtab">
          
          <v-toolbar-sub-title class="mt-7">
            <v-row>
            
            <v-col>
            <v-text-field
              type="search"
              v-model="searchItem"
              placeholder="Search Accessories Type Code"
              label="Search Accessories Type Code"
              
              @input="getItem()"
            >
            </v-text-field>
            </v-col>
              <v-col>
            <v-text-field
              label="Accessories Type Name"
              placeholder="Accessories Type Name"
              v-model="itemDetails.fittingTypeName"
              readonly
            ></v-text-field>
              </v-col>
              
              </v-row>
             
          </v-toolbar-sub-title>
          <v-spacer></v-spacer>
          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>
  
              <v-tab v-for="item in items" :key="item" style="font-size:14px;  text-transform: capitalize; ">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <!-- items -->
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
                 <b> Accessories Type Details</b>
                </p>
                <div>
                  <v-icon v-show="this.searchItem !=''"  
                   
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="editItem(itemDetails)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    v-if="activefiled == false"  v-show="this.searchItem== ''"
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="saveSingleItem()" 
                    >mdi-plus</v-icon
                  >
                  <v-icon v-show="activefiled == true"
                    large
                   
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="backToCard"
                    >mdi-arrow-left</v-icon
                  >
                </div>
              </div>
                        <!-- read the Item TYpe details -->
                   <div  v-if="isItemDetails!=false" v-show="this.searchItem !=''" style="background-color:rgba(225,246,240,255); padding:20px;border: 1px solid rgba(129,207,252,255);border-radius:5px;">
                <v-form readonly
                
                 
                  v-model="valid"
                  lazy-validation
                >
                  <v-row>
                   
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field 
                        v-model="itemDetails.fittingTypeCode"
                        label="Accessories Type Code"
                         dense
                         filled
                         outlined
                         disabled
                         hint="Mandatory Field"
                       
                      >
                      <template #label>
      Accessories Type Code<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.fittingTypeName"
                        label="Accessories Type Name"
                      dense
                      filled
                      disabled
                         outlined
                        hint="Mandatory Field"
                       
                      >
                        <template #label>
      Accessories Type Name<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
  
  
  
  
                     <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.subCategoryName"
                        label="Sub Category Name"
                       dense
                       filled
                       disabled
                       outlined
                        hint="Mandatory Field"
                      >
                       <template #label>
     Sub Category Name<strong  class="red--text">* </strong>
    </template>
                      
                      </v-text-field>
                       
                    </v-col>                 
                     <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.margin"
                       dense
                       filled
                       disabled
                       outlined
                        label="Margin"
                        type="number"
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.unit1"
                        label="Unit 1"
                        dense
                        filled
                        disabled
                       outlined
                        type="number"
                        hint="Mandatory Field"
                      >
                      <template #label>
      Unit 1<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="itemDetails.unit1_type"
                        label="Unit 1 Type"
                        filled
                        disabled
                     dense
                       outlined
                        :items="unitTypeList"
                        
                      >
                      <template #label>
      Unit 1 Type<strong  class="red--text">* </strong>
    </template>
                      
                      </v-select>
                    </v-col>
                    
  
                    
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.unit2"
                        label="Unit 2"
                        type="number"
                        dense
                        filled
                       outlined
                        
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="itemDetails.unit2_type"
                        label=" Unit 2 Type"
                      dense
                      filled
                       outlined
                        :items="unitTypeList"
                        
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.unit3"
                        label="Unit 3 "
                        type="number"
                        dense
                        filled
                       outlined
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                     <v-autocomplete
                        v-model="itemDetails.unit3_type"
                        label="Unit 3 Type "
                        dense
                        filled
                       outlined
                        :items="unitTypeList"
                       
                      >
                     </v-autocomplete>
                    </v-col>
                     <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.daimeter"
                       dense
                       filled
                       outlined
                        label="Diameter(mm)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.transportRate"
                        label="Transport Rate"
                         dense
                         filled
                         disabled
                       outlined
                       
                        
                      ></v-text-field>
                    </v-col>
  
                     <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.wastagePercent"
                       dense
                       filled
                       outlined
                        label="Wastage Percent(%)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    
  
                    <v-col cols="12" sm="12" md="9">
                      <v-textarea
                        rows="4"
                        v-model="itemDetails.fittingTypeDescription"
                        label=" Accessories Type Description"
                       dense
                       filled
                       outlined
                        hint="Mandatory Field"
                      >
                      <template #label>
     Accessories Type Description<strong  class="red--text">* </strong>
    </template>
                      </v-textarea>
                    </v-col>
                  </v-row>
                 
                </v-form>
              </div>
                       <!--  ended read the Item TYpe details -->
  
  
                  <!-- create/edit the Item TYpe details -->
              <div v-if="activefiled == true" style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;" >
                <v-form
                  @submit.prevent="saveItem"
                  ref="form1"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row>
                   <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        v-model="editedCategory.subCategoryName"
                        label="Sub Category Name" 
                        :rules="nameRules"
                        :items="categoryList"
                        hint="Mandatory Field"
                        dense
                       outlined
                      >
               <template #label>
                Sub Category Name<strong  class="red--text">* </strong>
              </template>  
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.fittingTypeCode"
                        label="Accessories Type Code"
                        :rules="nameRules"
                         hint="Mandatory Field"
                         :disabled=isItemEdited
                         dense
                         filled
                       outlined
                      >
                      <template #label>
      Accessories Type Code<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.fittingTypeName"
                        label="Accessories Type Name"
                        :rules="nameRules"
                        hint="Mandatory Field"
                        :disabled=isItemEdited
                        filled
                        dense
                       outlined
                      >
                        <template #label>
      Accessories Type Name<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
                       <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.margin"
                       dense
                       outlined
                        label="Margin"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.unit1"
                        label="Unit 1"
                        :rules="numberRule"
                        type="number"
                        hint="Mandatory Field"
                        dense
                       outlined
                      >
                      <template #label>
      Unit 1<strong  class="red--text">* </strong>
    </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        v-model="editedCategory.unit1_type"
                        label="Unit 1 Type"
                        :rules="nameRules"
                        :items="unitTypeList"
                        dense
                       outlined
                      >
                      <template #label>
      Unit 1 Type<strong  class="red--text">* </strong>
    </template>
                      
                      </v-autocomplete>
                    </v-col>
                     
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.unit2"
                        label="Unit 2"
                        type="number"
                        dense
                       outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        v-model="editedCategory.unit2_type"
                        label=" Unit 2 Type"
                      dense
                       outlined
                        :items="unitTypeList"
                        
                      > </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.unit3"
                        label="Unit 3 "
                        type="number"
                        dense
                       outlined
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                     <v-autocomplete
                        v-model="editedCategory.unit3_type"
                        label="Unit 3 Type "
                        dense
                       outlined
                        :items="unitTypeList"
                       
                      > </v-autocomplete>
                    </v-col>
  
                  <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.daimeter"
                       dense
                       outlined
                        label="Diameter(mm)"
                        type="number"
                      ></v-text-field>
                    </v-col>
  
                 
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.transportRate"
                       dense
                       outlined
                        label="Transport Rate"
                        type="number"
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.wastagePercent"
                       dense
                       outlined
                        label="Wastage Percent(%)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="9">
                      <v-textarea
                        rows="4"
                        v-model="editedCategory.fittingTypeDescription"
                        label=" Accessories Type Description"
                        :rules="messageRules"
                        hint="Mandatory Field"
                        dense
                       outlined
                      >
                      <template #label>
     Accessories Type Description<strong  class="red--text">* </strong>
    </template>
                      </v-textarea>
                    </v-col>
                  </v-row>
                  <v-btn type="submit" class="red white--text">save</v-btn>
                </v-form>
              </div>
                    <!--  ended create/edit the Item TYpe details -->
              
            </div>
           
          </v-tab-item>
  
          <!-- Item Specification -->
         
          <!-- Item Price -->
          <v-tab-item>
              <v-spacer></v-spacer>
              <v-divider height="20px"></v-divider>
              <v-card-text>
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
          v-model="itemSearch"
          append-icon="mdi-magnify"
          label="Search"
           ></v-text-field>
                </div>
                <div class="overView">
                  <v-data-table
                    :search="itemSearch"
                    :headers="itemHeaders"
                    :items="itemDetails.fittings"
                    fixed-header
                    dense
                  >
                    <template v-slot:item="row" >
                       <tr>
                        
               
                <td style="text-align:left">
                     {{row.item.fittingCode }}
               </td>
               <td style="text-align:left"> {{row.item.fittingName }}</td>
                <td style="text-align:left"> {{row.item.classType }}</td>
                 <td style="text-align:left"> {{row.item.materialType }}</td>
                  <td style="text-align:left"> {{row.item.makeName }}</td>
                   <td style="text-align:left"> {{row.item.makeCode }}</td>
                    <!-- <td style="text-align:left"> {{row.item.partnerNumber }}</td> -->
                    <!-- <td style="text-align:left"> {{row.item.standards }}</td> -->
                   <td><v-icon small class="mr-2 blue--text" @click="copyItem(row.item)">
                        mdi-content-copy
                      </v-icon>
                      <v-icon small class="mr-2 red--text" @click="deleteItemRow(row.item)">
                        mdi-delete
                      </v-icon>
                      </td>
                      
                       </tr>
  
                    </template>
                  </v-data-table>
                </div>
                  <v-divider></v-divider>
                  <v-card-title v-if="this.searchItem !=''">
        <h5 class="pl-2">Add Accessories</h5>
        <v-spacer></v-spacer>
        <v-icon class="white red--text mr-3"  v-show="itemCard!=true"  @click="itemCard=!itemCard">mdi-plus</v-icon>
         <v-icon class="white red--text mr-3" v-show="itemCard==true" @click="closeItemCard">mdi-close</v-icon>
      </v-card-title>
                  <v-divider></v-divider>
  
                  <v-card-text v-if="itemCard!=false">
                    <div style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;" >
                      <v-form ref="form"  @submit.prevent="postAcc">
                      <v-row >
  
                        <v-col cols="12" sm="12" md="2">
                            <v-text-field
                          dense
                       outlined
                            placeholder="Accessories Name"
                            label="Accessories Name"
                            v-model="consumableModel.fittingName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="2">
                          <v-autocomplete
                            placeholder="ClassType"
                            :items="classTypeListData"
                            label="Class Type"
                            dense
                       outlined
                            v-model="consumableModel.classType"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="12" md="2">
                         <v-autocomplete
                            placeholder="Material Type"
                            :items="materialList"
                            label="Material Type"
                            dense
                       outlined
                            v-model="
                              consumableModel.materialType
                            "
                            
                          ></v-autocomplete>
                        </v-col>
                        
                        <v-col cols="12" sm="12" md="2">
                         <v-autocomplete
                            placeholder="Make Code"
                            label="Make Code"
                            :items="allMakes"
                            :rules="nameRules"
                            dense
                       outlined
                            v-model="consumableModel.makeCode"
                          >
                           <template #label>
     Make code<strong  class="red--text">* </strong>
    </template>
                          
                         </v-autocomplete>
                        
                        </v-col>              
                        <v-col cols="12" sm="12" md="2">
                          <v-text-field
                          dense
                       outlined
                            placeholder="Part Number"
                            label="Part Number"
                            v-model="consumableModel.partnerNumber"
                          ></v-text-field>
                        </v-col>
                       <v-col sm="12" md="2">
  
                           <v-icon  class="mt-0"  medium   style=" color: black;cursor:pointer" @click="refreshItem">mdi-refresh</v-icon>
                          <v-btn  type="submit" class=" red white--text mt-0 ml-3" >
                            Save</v-btn >
           </v-col>
                        
                      </v-row>
                      </v-form>
                    </div>
                  </v-card-text>
                <!-- </v-card> -->
              </v-card-text>
            <!-- </v-card> -->
          </v-tab-item>
         
  
        </v-tabs-items>
      </v-card>
  
  
       <v-dialog v-model="dialogDelete" max-width="500px" persistent >
            <v-card>
              <v-card-title class=" white " style="font-size:20px">Are you sure you want to delete  item ?</v-card-title>
              <v-card-actions class="mr-3">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                <v-btn color="blue darken-1" text class="mr-3" @click="confirmToDelete">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
  
                  <!-- dailog box for adding category in adding item type -->
  
                   <v-dialog v-model="showcategorydailog" max-width="500px" persistent >
            <v-card>
              <v-card-title class="white " style="font-size:20px">Add Category</v-card-title>
              <v-form @submit.prevent="postAddCategory"  ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                    outlined
                    dense
                    v-model="addFiledCategory.categoryName"
                    placeholder="Category Name"
                    >
                     <template #label>
      Category Name<strong  class="red--text">* </strong>
    </template>
                    </v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="6">
                      <v-text-field
                    outlined
                    dense
                    v-model="addFiledCategory.subCategoryName"
                    placeholder="Margin"
                    type="number"
                    label="Margin"
                    ></v-text-field>
                   </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="showcategorydailog=false;">Cancel</v-btn>
                <v-btn color="blue darken-1" text class="mr-3" type="submit">OK</v-btn>
                <!-- <v-spacer></v-spacer> -->
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
                 
        
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
//   import store from 'store'
import Navbar from '@/components/Navbar'
  export default {
    name: "NewItem",
    mixins: [servicescall],
    components:{
    //   store
    Navbar
    },
    data() {
      return {
        itemSearch:'',
        allStandards:[],
        showcategorydailog:'',
        addFiledCategory:{
                 "categoryName": "", 
                 "subCategoryName": "",  
              },
        expanded: [],
          singleExpand: false,
          activeColor:"",
        fittingCode:'',
        fittingTypeList:[],
        fittingType:'',
        fittingCategory:'',
        fittingCategoryList:[],
        installationCard:false,
        allMakes:[],
        isItemDetails:true,
        itemTypeFittingCard:false,
        itemCard:false,    
        isItemEdited:false,
        dialogDelete:false,
        statusList:[
          {text:'Active',value:'true'},
          {text:'Inactive',value:'false'},
  
        ],
        disabled:false,
        installationCard: 0,
        selectedImage: null,
        selectedDoc: null,
        snackbar: false,
        categoryList: [],
        fittingCodeList: [],
        unitTypeList: [],
        activefiled: false,
        text: "",
        link: "",
        doclink: "",
        imageurl:'',
        activeCard: false,
        itemVisible: false,
        weldingList: [],
        tab: null,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        menu: false,
        modal: false,
        pricecount: 0,
        materialList: [],
        classTypeListData: [],
        items: [
          "Accessories Type",
          "Accessories",
          // "Installation Rates",
          // "Fitting Mapping",
        ],
  
        itemheaders: [
          { text: "Item Name", value: "itemName",class: "blue-grey lighten-4 text--black"},
          { text: "Item Code ", value: "itemCode",class: "blue-grey lighten-4 text--black" },
          { text: "Unit1 Type", value: "unit1_type",class: "blue-grey lighten-4 text--black"},
          { text: "Actions", value: "actions", sortable: false,class: "blue-grey lighten-4 text--black"},
        ],
        itemsList: [],
         itemInstallation:'',
        itemInstallHeaders: [
          // { text: "Item Name", value: "itemName",class: "blue-grey lighten-4 text--black" },
          // { text: "Item Code", value: "itemCode",class: "blue-grey lighten-4 text--black",sortable: false, },
           { text: "Class Type", value: "classType",class: "blue-grey lighten-4 text--black",sortable: false, },
           { text: "Material Type", value: "materialType",class: "blue-grey lighten-4 text--black",sortable: false, },
          { text: "Welding Type", value: "weldingType",class: "blue-grey lighten-4 text--black", },
          { text: "Inches", value: "inchNumber",class: "blue-grey lighten-4 text--black",sortable: false, },
          { text: "Purchase Rate With Tools", value: "purchageRateWithTools",class: "blue-grey lighten-4 text--black",sortable: false, },
          { text: "Purchase Rate Without Tools", value: "purchageRateWithoutTools",class: "blue-grey lighten-4 text--black",sortable: false, },
          { text: "Selling Rate", value: "sellingRate",class: "blue-grey lighten-4 text--black" ,sortable: false,},
            { text: "Actions", value: "actions", sortable: false,class: "blue-grey lighten-4 text--black" },
        ],
         itemFittingSearch:'',
        itemMappingHeaders: [
           { text: "Fitting Category", value: "fittingCategory",class: "blue-grey lighten-4 text--black"},
           { text: "Fitting Type Code", value: "fittingTypeCode",class: "blue-grey lighten-4 text--black"},
          { text: "Fitting Name", value: "fittingName", align: "left",class: "blue-grey lighten-4 text--black" },
         
          { text: "Input Type", value: "inputType",class: "blue-grey lighten-4 text--black" },
          { text: "Quantity", value: "quantity",class: "blue-grey lighten-4 text--black" },
          // { text: "Start Date", value: "startDate",class: "blue-grey lighten-4 text--black"},
          // { text: "End Date", value: "endDate",class: "blue-grey lighten-4 text--black" },
   { text: "Status", value: "status",class: "blue-grey lighten-4 text--black" },
          { text: "Actions", value: "actions", sortable: false,class: "blue-grey lighten-4 text--black" },
          //  { text: '', value: 'data-table-expand' },
        ],
  
        itemHeaders: [
          { text: " Accessories Code", value: "fittingCode",   },
          { text: "Accessories Name", value: "fittingName",  }, 
          { text: "Class Type", value: "classType", },
          { text: "Material Type", value: "materialType",  },
          { text: "Make Name ", value: "itemMakeName",  },
          { text: "Make Code ", value: "itemMakeCode",  },
  
        //  { text: "Part Number", value: "partnerNumber",  },
         // { text: "Standards", value: "standards",  },
         
          //{ text: "Transport Rate", value: "transportRate", sortable: false, },
         
          // text: "Wastage Rate", value: "wastageRate", sortable: false,},
          //{ text: "Wastage Percent(%)", value: "wastagePercent", sortable: false,},
          { text: "Actions", value: "actions", sortable: false, }
        ],
  
        //models
          
  
        fittingMapping: {
          itemCode: "",
          itemFittingMapping: [],
        },
        itemFittingMapping: {
          fittingTypeCode: "",
          inputType: "",
          itemTypeCode:"",
          quantity: 0,
          status:'',
        },
  
        itemDefaultFittingMapping: {
          fittingCode: "",
          inputType: "",
          quantity: 0,
          status:'',
        },
  
        itemPrices: [
          {
            list: {
              itemTypeCode:'',
              itemName: "",
              classType: "",
              materialType: "",
              itemMakeCode: "",
              actualItemRate: "",
              transportRate: "",
              partnerNumber: "",
             
              wastageRate: " ",
              wastagePercent: " ",
            },
            priceindex: 0,
          },
        ],
        editedCategory: {
          daimeter: '',
          fittingTypeCode: '',
          fittingTypeName:'',
          fittingTypeDescription:'',
          unit1:'',
          unit1_type:'',
          unit2:'',
          unit2_type:'',
          unit3:'',
          unit3_type:'',
          margin:'',
          wastagePercent:'',
          transportRate:'',
         // weldingJoints:'',
         subCategoryName:""
          
        },
  
         defaultEditedCategory: {
          subCategoryName: "",
          daimeter: "",
          itemTypeCode: "",
          itemTypeDescription: "",
          itemTypeName: "",
          unit1: "",
          unit1_type: "",
          unit2: "",
          unit2_type: "",
          unit3: "",
          unit3_type: "",
          margin:'',
          wastagePercent:'',
          transportRate:'',
        },
  
  
        count: 0,
  
        installationModel:{
              classType: "",
              inchNumber: '',
              itemTypeCode: "",
              itemName: "",
              purchageRateWithTools: '',
              purchageRateWithoutTools: '',
              sellingRate: '',
              weldingType: "",
              materialType:'',
  
        },
        installationPrices: [
          {
            list: {
              classType: "",
              inchNumber: '',
              itemCode: "",
              itemName: "",
              purchageRateWithTools: '',
              purchageRateWithoutTools: '',
              sellingRate: '',
              weldingType: "",
            },
            index: 0,
          },
        ],
        consumableModel: {
       "classType":"",  
    "fittingCode": "",
    "fittingName": "",
    "fittingTypeCode": "",
    "fittingTypeName": "",
    "makeCode": "",
    "makeName": "",
    "materialType": "",
    "partnerNumber": "",
    
  
  
        },
        searchItem: "",
        itemDetails: {},
        classTypeList: [],
        valid: false,
        delItem:{},
        //validations
  
        emailRules: [
          (v) => !!v || "Filed is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
         numberRule: [
          (v) => !!v || "Filed is required",
          (v) => /^\d+(\.\d{1,2})?$/.test(v) || "only number are accepted",
                   /^\d+\.\d{0,2}$/
                  // /^[0-9]+$/.test(v)
        ],
        phoneRules: [
          (v) => !!v || "Filed is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Mobile must be  10 number",
        ],
        numberRule: [
          (v) => !!v || "Filed is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
        ],
        messageRules: [
          (v) => !!v || "Field is required",
          (v) => v.length <= 5000 || "Name allows below 5000 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
  
        nameRules: [
          (v) => !!v || "Field is required",
          (v) => v.length <= 100 || "Name allows below 100 characters only",
        ],
         numberRules: [
          (v) => !!v || "Field is required",
           (v) =>  /^\d\.\d{0,2}$/.test(v) || "Number with decimals",
        ],
      };
    },
    mounted() {
      this.getItems();
      this.getCategoryList();
      this.getClassTypes();
      this.getMaterialTypes();
     // this.getFittingcodes();
      this.getClassTypesData();
      this.getWeldingTypes();
      this.getUnitTypeList();
      this.getAllMakes();
      this.getFittingCategories()
      this.getStandards();
      this.searchItem='';
      if(this.$route.params.fittingTypeCode){
        this.searchItem=this.$route.params.fittingTypeCode;
                this.searchItem=  this.searchItem.replace("/", "$")
        this.getItem()
      }
       
    },
      watch:{
        fittingCategory:function() {
               this.getFittingTypeByCategory(this.fittingCategory).then((response)=>{
                   this.fittingTypeList=[];
                   this.fittingType='';
                   for(var i=0;i<response.length;i++){
                     this.fittingTypeList.push(response[i].fittingTypeCode)
                   }
                })           
  
        },
  
               fittingType:function(){
                 this.getfittingCodeByFittingType(this.fittingType).then((response)=>{
                   this.fittingCodeList=[];
                   for(var i=0;i<response.length;i++){
                     this.fittingCodeList.push(response[i].fittingCode)
                   }
                 })
               }
      },
    methods: {
  
               // ger all standards
                getStandards(){
               this.getAllStandards().then((response) => {
                  this.allStandards=response;
          });},
               // add category field in v-select level
               addCatField(){
                 this.showcategorydailog=true
               },
               // save add category
               postAddCategory(){
                 if(this.$refs.form.validate()){
                   var reqJSON = this.addFiledCategory;
                     this.addCategory(reqJSON).then(response => {
                       if(response.status==200){
            this.text=response.data.message;
            this.activeColor='green'
            this.snackbar=true;
             this.showcategorydailog=false;
             this.addFiledCategory={}
            this.getCategoryList();
      // this.isEdited=false;
            
           } else{
               this.text=response.data.message;
                this.activeColor='red'
                 this.showcategorydailog=false;
            this.snackbar=true;
  
           }
                     })
                   
                 }
                 // var reqJSON = this.addCategory;
               },
               // delete Item
               deleteItemRow(item){
                 this.delItem=item.fittingCode;
                   this.dialogDelete=true;
       
               },
                   cancel(){
                      this.dialogDelete=false;
                   },
               // confirm to delete
               confirmToDelete(){
                 var reqJson=this.delItem;
  
                  this.deleteAccessoriesFittingType(reqJson)
          .then((response) => {
          
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor='green'
              this.snackbar = true;
              this.dialogDelete=false;
              this.getItem(this.searchItem)
            }
             else if  (response.status == 400) {
              this.text = "Please Check  Data";
               this.activeColor='red'
              this.snackbar = true;
              this.dialogDelete=false;
              //location.reload();
            } else {
              this.text = response.data.message;
               this.activeColor='red'
              this.snackbar = true;
              this.dialogDelete=false;
            }
          })
          .then(() => {
  
          });
       
  
  
               },
               //close items card and refresh form
               closeItemCard(){
                 this.consumableModel.classType="";
                 this.consumableModel.materialType='';
                 this.consumableModel.fittingCode='';
                 this.consumableModel.fittingName='';
                 this.consumableModel.fittingTypeCode=''; 
                 this.consumableModel.fittingTypeName='',
  
                  this.consumableModel.makeCode='';
                 this.consumableModel.makeName=''; 
                 this.consumableModel.materialType='',
                  this.consumableModel.partnerNumber='',
                 this.itemCard=false;
               },
              // close Installation add card and remove data in fileds
              closeInstallationCard(){
             // this.installationModel={}
                this.installationCard=false;
              },
  
              // get all fitting category List
              getFittingCategories(){
                this.getAllFittingCategory().then((response)=>{
                  for(var i=0;i<response.length;i++){
                   this.fittingCategoryList.push(response[i].categoryName);
                  }
                })
              },
  
               // get all item makes list
  
               getAllMakes(){
              this.getAccessoriresMakes().then((response) => {
             for(var i=0;i<response.length;i++){
               this.allMakes.push({text:response[i].makeName,value:response[i].makeCode})
             }
          });
         },
            //  backward to disbled card
            backToCard(){
            this.isItemDetails=true;
               this.isItemEdited=false;
               this.activefiled=false;
               this.editedCategory=this.defaultEditedCategory
              // this.activefiled=false;
              
            },
  
         // save from item details card
         saveSingleItem(){
            this.isItemDetails=false;
            this.editedCategory.categoryName='';
             this.editedCategory.itemTypeCode='';
            this.editedCategory.itemTypeName='';
             this.editedCategory.itemTypeDescription='';
              this.editedCategory.daimeter='';
               this.editedCategory.unit1='';
               this.editedCategory.unit1_type='';
                this.editedCategory.unit2='';
               this.editedCategory.unit2_type='';
                this.editedCategory.unit3='';
               this.editedCategory.unit3_type='';
               this.editedCategory.margin='';
               this.editedCategory.wastagePercent='';
               this.editedCategory.transportRate='';
          //  this.editedCategory=this.defaultEditedCategory
            this.isItemEdited=false;
           this.activefiled = !this.activefiled
          
  
         },
     // clear fiting item
     clearFitingItem(){},
      //copy item fiiting mapping
  
      copyFittingItem(item) {
          if(item.fittingCategory !=''){
        this.fittingCategory = item.fittingCategory;
          }
        this.itemFittingMapping.fittingTypeCode = item.fittingTypeCode;
        this.itemFittingMapping.inputType = item.inputType;
        this.itemFittingMapping.quantity = item.quantity;
        if(item.status==true){
        this.itemFittingMapping.status =this.statusList[0].value;
        }
        else{
           this.itemFittingMapping.status =this.statusList[1].value;
        }
         this.fittingCode=item.fittingCode;
         this.itemTypeFittingCard=true;
      },
  // cpy install item
      copyInstalItem(item){
        this.installationModel=item;
        this.installationCard=true;  
      },
  
      
  
      //save fitting
      saveFitting() {
        if(this.itemFittingMapping.inputType!='FIXED'){
            this.itemFittingMapping.quantity=0;
          }
         if(this.$refs.form.validate()){
        // this.fittingMapping.itemFittingMapping=[]
        this.itemFittingMapping.fittingCode=this.fittingCode;
          this.searchItem=  this.searchItem.replace("$", "/")
        this.itemFittingMapping.itemTypeCode = this.searchItem;     
        this.addFittngItem(this.itemFittingMapping).then((response) => {
          //console.log("In post", response);
          if (response.status == 200) {
            this.text = response.data.message;
             this.activeColor='green'
            this.snackbar = true;
             this.fittingMapping.itemCode='';
             this.fittingMapping.itemFittingMapping=[]
             this.itemFittingMapping.fittingCode='';
             this.itemFittingMapping.quantity=0;
             this.itemFittingMapping.status='';
             this.itemFittingMapping.inputType='';
             this.fittingCode='';
             this.fittingType='';
             this.fittingCategory='';
  
               this.itemFittingMapping=[];
               this.itemTypeFittingCard=false;
            this.getItem(this.searchItem)
          } else {
            this.text = response.data.message;
             this.activeColor='red'
            this.snackbar = true;
          }
        });
      }
      },
  
      //load image
      loadImage(event) {
        this.selectedImage = event.target.files[0];
        //console.log("event", this.selectedImage);
      },
  
      //load docs
      loadDocs(event) {
      
        this.selectedDoc = event.target.files[0];
       
       ;
      },
      //send image and docs
      loadSpecification() {
         
      
       
        var item = this.searchItem;
        
        const fd = new FormData();
        
        fd.append("image", this.selectedImage);
        fd.append("specification", this.selectedDoc);
  
        this.postspecifications(item, fd).then((response) => {
          //console.log("image", response);
          if (response.status == 200) {
            this.text = response.data.message;
             this.activeColor='green'
            this.snackbar = true;
          //  this.searchItem=  this.searchItem.replace("$", "/")
            this.getItem(this.searchItem)
          }else{
            this.text=response;
             this.activeColor='green'
             this.snackbar=true;
          }
        
        });
         
      },
      downloadImage(link) {
          //console.log("link",link)
           if(link !=''){
             link.click();
           }
           else{
             alert("  No Specification for Item")
           }
       
      },
  
      //  search Item Edit
      editItem(item) {
        this.isItemEdited=true;
        this.isItemDetails=false;
     
        this.activefiled = true;
           this.editedCategory.subCategoryName = item.subCategoryName;
        this.editedCategory.fittingTypeCode = item.fittingTypeCode;
       
        this.editedCategory.fittingTypeName = item.fittingTypeName;
        this.editedCategory.fittingTypeDescription = item.fittingTypeDescription;
        this.editedCategory.unit1 = item.unit1;
        this.editedCategory.unit1_type = item.unit1_type;
        if(item.unit2!=''){
          this.editedCategory.unit2 = item.unit2;
        }
         if(item.unit2_type!=''){
          this.editedCategory.unit2_type = item.unit2_type;
        }
        
       
        this.editedCategory.unit3 = item.unit3;
        this.editedCategory.unit3_type = item.unit3_type;
         this.editedCategory.daimeter = item.daimeter;
          this.editedCategory.margin = item.margin;
           this.editedCategory.wastagePercent = item.wastagePercent;
            this.editedCategory.transportRate = item.transportRate;
      },
  
      //AllUnit types
  
      getUnitTypeList() {
        this.getAllUnitType().then((response) => {
         
          this.unitTypeList = response;
        });
      },
  
      // All Category List
  
      getCategoryList() {
        this.getAllSubAccsory().then((response) => {
         
          for (var i =0; i < response.length; i++) {
            this.categoryList.push(response[i].subCategoryName);
          }
  
       
        });
      },
  
      // get all items
  
      getItems() {
      
        this.getAllItems().then((response) => {
         
          this.itemsList = response;
        });
      },
      //delete install Item
      deleteItem(index) {
        {
        
  
          this.installationPrices.splice(index, 1);
          this.decrement();
  
          for (var i = 0; i <= this.count; i++) {
            this.installationPrices[i].index = i;
          }
        }
      },
      // delete price item
  
      deletepriceItem(index) {
        {
      
  
          this.itemPrices.splice(index, 1);
          this.pricedecrement();
  
          for (var i = 0; i <= this.pricecount; i++) {
            this.itemPrices[i].index = i;
          }
        }
      },
      decrement() {
        this.count = this.count - 1;
      },
      pricedecrement() {
        this.pricecount = this.pricecount - 1;
      },
      // add Item
      saveItem(){
         if(this.$refs.form1.validate())
          this.saveAccessories() ;
      },
      saveAccessories() {     
            var reqJSON = this.editedCategory;
          this.addAccessoriresType(reqJSON).then((response) => {
            
            if (response.status == 200) {
              this.text = response.data.message;
               this.activeColor='green'
              this.snackbar = true;
              this.editedCategory = {};
              this.activefiled = false;
              this.isItemDetails=true
              this.editedCategory.itemTypeCode=''
            
              this.searchItem=  this.searchItem.replace("$", "/")
              this.getItem(this.searchItem)
            } else {
              this.text = response.data.message;
               this.activeColor='red'
              this.snackbar = true;
            }
          });
        //}
      },
      //  list of classType
      getClassTypes() {
        this.getAllInputType().then((response) => {
         
          this.classTypeList = response;
        });
      },
  
      //get classtype data
  
      getClassTypesData() {
        this.getAllClassType().then((response) => {
       
          this.classTypeListData = response;
        });
      },
  
      //  adding Installation Price
      addInstalPrice() {
        this.count++;
        this.installationPrices.push({
          list: {
            classType: "",
            inchNumber: "",
            itemCode: "",
            itemName: "",
            purchageRateWithTools: "",
            purchageRateWithoutTools: "",
            sellingRate: "",
            weldingType: "",
          },
          index: this.count,
        });
      },
      getWeldingTypes() {
        this.getAllWeldingType().then((response) => {
        
          this.weldingList = response;
        });
      },
  
      addItemPrice() {
        this.pricecount++;
        this.itemPrices.push({
          list: {
            itemCode: "",
            itemName: "",
            classType: "",
            materialType: "",
            itemMake: "",
            actualItemRate: "",
            transportRate: "",
            margin: "",
            startDate: "",
            endDate: "",
            wastageRate: "0",
            wastagePercent: "0",
          },
          priceindex: this.pricecount,
        });
      },
  
      //save item installation price
      saveInstallPrice() {
          this.installationModel.itemTypeCode=this.itemDetails.itemTypeCode;         
          var reqJSON = this.installationModel;
            if(this.$refs.form.validate()){
               this.addInstallPrice(reqJSON)
          .then((response) => {
         
            if (response.status == 200) {
              this.text = response.data.message;
               this.activeColor='green'
              this.snackbar = true;
              this.installationCard++;
              this.installationCard=false;
              this.$refs.form.reset();
              this.installationPrices[0].list = {};
             // this.searchItem=  this.searchItem.replace("$", "/")
              this.getItem(this.searchItem);
              //location.reload();
            } else {
              this.text = response.data.message;
               this.activeColor='red'
              this.snackbar = true;
            }
          })
          .then(() => {
            //this.close(), setInterval(this.getVendors(), 3000);
          });
            }
      
      },
  
      postAcc(item) {
          if(this.searchItem ==''){
            alert("Search Accessories Type code")
          }else{
          this.consumableModel.fittingTypeCode=  this.searchItem
          //this.consumableModel.fittingTypeName= this.itemDetails.fittingTypeName;
        var reqJSON = this.consumableModel;
       if(this.$refs.form.validate()){
        this.postAccessorires(reqJSON)
          .then((response) => {
          
            if (response.status == 200) {
              this.text = response.data.message;
               this.activeColor='green'
              this.snackbar = true;
  
              this.consumableModel={}
             // this.itemPrices[pricecount].list.itemCode='';
               // this.searchItem=  this.searchItem.replace("$", "/") 
              this.getItem(this.searchItem)
              //location.reload();
            }
             else if  (response.status == 400) {
              this.text = "Please Check  Data";
               this.activeColor='red'
              this.snackbar = true;
            } else {
              this.text = response.data.message;
               this.activeColor='green'
              this.snackbar = true;
            }
          })
          .then(() => {
          });
       }
          }
      },
      //add price item row
      add(index) {
       
        // this.itemDetails.itemPrice.forEach(item => { item.rows.push(0) })
        this.itemDetails.itemPrice.splice(index + 1, 0, this.price);
        //this.index++
      },
  
      getItem() {
       this.searchItem=  this.searchItem.replace("/", "$")
        var reqJSON = this.searchItem;
        this.getaccessoriresId(reqJSON)
          .then((response) => { 
          
            this.itemDetails = response;
             this.itemPrices[0].list={}
              this.itemFittingMapping={}
              this.installationPrices[0].list={};
            if (response.status == 200) {          
              this.itemVisible = true;
             this.itemFittingMapping.fittingCode='';
             this.itemFittingMapping.quantity=0;
             this.itemFittingMapping.status='';
             this.itemFittingMapping.inputType='';
            } else {
              //this.text=response.data.message;
              // this.snackbar=true;
            }
          })   
      },
  
      //item prices
  
      getMaterialTypes() {
        this.getAllMaterialType().then((response) => {
         
          this.materialList = response;
        });
      },
  
      copyItem(obj) {
        this.consumableModel = obj;
        this.itemCard=true;
      },
      refreshItem() {
        
        this.itemModel = {};
      },
    },
  };
  </script>
  <style  scoped>
  .v-data-table>.v-data-table__wrapper>table>thead>tr>td {
      font-size: .875rem;
      height: 48px;
      border: 1px solid white;
  }
  .v-data-table>.v-data-table__wrapper>table>thead>tr{
      background-color: #ccc;
  }
  .v-data-table>.v-data-table__wrapper>table>thead>tr>th{
      background-color:brown lighten-5;
  }
  .v-data-table>.v-data-table__wrapper>table>thead>tr>th{
       border: 1px solid white;
  }
  
  
  .detail-list li:first-child {
    font-weight: 600;
    line-height: 18px;
    color: #07182b;
    font-size: 14px;
  }
  .overView {
    padding: 10px;
  }
  .detail-list {
    padding: 10 px 20 px 0;
    min-height: 46 px;
  }
  ul {
    padding: 0;
    list-style-type: none;
  }
  ul li {
    list-style-type: none;
  }
    .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
      color: darkblue;
      background: #E4EDF8;
      border-bottom: thin solid rgba(0,0,0,.12);
      border-right: thin solid rgba(0,0,0,.12);
  }
  .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th:hover{
      color:#3468c0;
      border-bottom: thin solid rgba(0,0,0,.12);
      border-right: thin solid rgba(0,0,0,.12);
  }
  .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {
      color:black;
      border-bottom: thin solid rgba(0,0,0,.12);
      border-right: thin solid rgba(0,0,0,.12);
  }
    .theme--light.v-data-table tbody tr:nth-of-type(even) {
      background-color:#f0f2f5
  }
  .theme--dark.v-data-table tbody tr:nth-of-type(even) {
      background-color: rgba(0, 0, 0, .5);
  }
  
  .v-data-table-header th {
    white-space: nowrap;
  }
  .v-data-table  tbody td {
    white-space: nowrap;
  }
  
  
  .v-icon{
    border-radius: 20px;
    color: black;
  
  }
  .v-card__title {
    background-color: #ccc;
      padding: 2px;
      border-radius: 5px;
     
  }
  
  .v-data-table {
      line-height: 2.5;
      max-width: 100%;
      
  }
  .bgtab{ background-color:#313940 !important;}
  
  </style>