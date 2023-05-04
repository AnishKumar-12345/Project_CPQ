<template>
    <div>
        <Navbar/>
      <v-card flat tile>
        <v-toolbar
          color=" mt-2"
          dark
          flat
          style="position: sticky; z-index: 9;"
          class="bgtab"
        >
          <v-toolbar-sub-title class="mt-7">
            <v-row>
              <v-col>
                <v-text-field
                  type="search"
                  v-model="searchItem"
                  placeholder="Search Tool Type Code"
                  label="Search Tool Type Code"
                  @input="getItem()"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Tool Type Name"
                  placeholder="Tool Type Name"
                  v-model="itemDetails.itemTypeName"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar-sub-title>
          <v-spacer></v-spacer>
          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>
  
              <v-tab
                v-for="item in items"
                :key="item"
                style="font-size: 14px; text-transform: capitalize"
              >
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
                  <b> Tool Type Details</b>
                </p>
                <div>
                  <v-icon
                    v-show="this.searchItem != ''"
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="editItem(itemDetails)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    v-if="activefiled == false"
                    v-show="this.searchItem == ''"
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="saveSingleItem()"
                    >mdi-plus</v-icon
                  >
                  <v-icon
                    v-show="activefiled == true"
                    large
                    style="font-weight: 800; font-size: 22px; color: black"
                    @click="backToCard"
                    >mdi-arrow-left</v-icon
                  >
                </div>
              </div>
              <!-- read the Item TYpe details -->
              <div v-if="isItemDetails != false" v-show="this.searchItem != ''"  style="background-color:rgba(225,246,240,255); padding:20px;border: 1px solid rgba(129,207,252,255);border-radius:5px;">
                <v-form readonly v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.itemTypeCode"
                        label="Tool Type Code"
                        dense
                        filled
                        outlined
                        disabled
                        hint="Mandatory Field"
                      >
                        <template #label>
                          Tool Type Code<strong class="red--text">* </strong>
                        </template>
                      </v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.itemTypeName"
                        label="Tool Type Name"
                        dense
                        filled
                        disabled
                        outlined
                        hint="Mandatory Field"
                      >
                        <template #label>
                          Tool Type Name<strong class="red--text">* </strong>
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
                          Sub Category Name<strong class="red--text">* </strong>
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
                          Unit 1<strong class="red--text">* </strong>
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
                          Unit 1 Type<strong class="red--text">* </strong>
                        </template>
                      </v-select>
                    </v-col>
                      
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.unit2"
                        label="Unit 2"
                        type="number"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="itemDetails.unit2_type"
                        label=" Unit 2 Type"
                        dense
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
                        outlined
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        v-model="itemDetails.unit3_type"
                        label="Unit 3 Type "
                        dense
                        outlined
                        :items="unitTypeList"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="itemDetails.daimeter"
                        dense
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
                        outlined
                        label="Wastage Percent(%)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                   
  
                    <v-col cols="12" sm="12" md="9">
                      <v-textarea
                        rows="4"
                        v-model="itemDetails.itemTypeDescription"
                        label=" Tool Type Description"
                        dense
                        outlined
                        hint="Mandatory Field"
                      >
                        <template #label>
                          Tool Type Description<strong class="red--text"
                            >*
                          </strong>
                        </template>
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
              <!--  ended read the Item TYpe details -->
  
              <!-- create/edit the Item TYpe details -->
              <div v-if="activefiled == true" style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
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
                        v-model="editedCategory.itemTypeCode"
                        label="Consumable Type Code"
                        :rules="nameRules"
                        hint="Mandatory Field"
                        :disabled="isItemEdited"
                        dense
                        filled
                        outlined
                      >
                        <template #label>
                          Tool Type Code<strong class="red--text">* </strong>
                        </template>
                      </v-text-field>
                    </v-col>
  
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedCategory.itemTypeName"
                        label="Consumable Type Name"
                        :rules="nameRules"
                        hint="Mandatory Field"
                        :disabled="isItemEdited"
                        filled
                        dense
                        outlined
                      >
                        <template #label>
                          Tool Type Name<strong class="red--text">* </strong>
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
                          Unit 1<strong class="red--text">* </strong>
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
                          Unit 1 Type<strong class="red--text">* </strong>
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
                      >
                      </v-autocomplete>
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
                      >
                      </v-autocomplete>
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
                        v-model="editedCategory.itemTypeDescription"
                        label=" Tool Type Description"
                        :rules="messageRules"
                        hint="Mandatory Field"
                        dense
                        outlined
                      >
                        <template #label>
                          Tool Type Description<strong class="red--text"
                            >*
                          </strong>
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
                  <v-divider></v-divider>
                  <v-card-title v-if="this.searchItem != ''">
                    <h5 class="pl-2">Add Tool</h5>
                    <v-spacer></v-spacer>
                    <v-icon
                      class="white red--text mr-3"
                      v-show="itemCard != true"
                      @click="itemCard = !itemCard"
                      >mdi-plus</v-icon
                    >
                    <v-icon
                      class="white red--text mr-3"
                      v-show="itemCard == true"
                      @click="closeItemCard"
                      >mdi-close</v-icon
                    >
                  </v-card-title>
                  <v-divider></v-divider>
  
                  <v-card-text v-if="itemCard != false">
                    <div style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
                      <v-form ref="form" @submit.prevent="postTool">
                        <v-row>
                          <v-col cols="12" sm="12" md="2">
                            <v-text-field
                              dense
                              outlined
                              placeholder="Tool Name"
                              label="Tool Name"
                              v-model="consumableModel.itemName"
                            ></v-text-field>
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
                                Make code<strong class="red--text">* </strong>
                              </template>
                            </v-autocomplete>
                          </v-col>
  
                          <v-col sm="12" md="2">
                            <v-icon
                              class="mt-0"
                              medium
                              style="color: black; cursor: pointer"
                              @click="refreshItem"
                              >mdi-refresh</v-icon
                            >
                            <v-btn
                              type="submit"
                              class="red white--text mt-0 ml-3"
                            >
                              Save</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </div>
                  </v-card-text>
                <!-- item fitting -->
                <div class="overView">
                  <v-data-table
                    max-height="400"
                    :search="itemSearch"
                    :headers="itemHeaders"
                    :items="itemDetails.items"
                    fixed-header
                    dense
                  >
                    <template v-slot:item="row">
                      <tr>
                        <td style="text-align: left">
                          {{ row.item.itemCode }}
                        </td>
                        <td style="text-align: left">{{ row.item.itemName }}</td>
                        <!-- <td style="text-align:left"> {{row.item.classType }}</td> -->
                        <!-- <td style="text-align:left"> {{row.item.materialType }}</td> -->
                        <td style="text-align: left">
                          {{ row.item.makeName }}
                        </td>
                        <!-- <td style="text-align:left"> {{row.item.makeCode }}</td> -->
                        <!-- <td style="text-align:left"> {{row.item.partnerNumber }}</td> -->
                        <!-- <td style="text-align:left"> {{row.item.standards }}</td> -->
                        <td>
                          <v-icon
                            small
                            class="mr-2 blue--text"
                            @click="copyItem(row.item)"
                          >
                            mdi-content-copy
                          </v-icon>
                          <v-icon
                            small
                            class="mr-2 red--text"
                            @click="deleteItemRow(row.item)"
                          >
                            mdi-delete
                          </v-icon>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </div>
              </v-card-text>
            <!-- </v-card> -->
          </v-tab-item>
  
          <v-tab-item>
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
                    v-model="itemFittingSearch"
                    append-icon="mdi-magnify"
                    label="Search"
                  ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-card-title v-if="this.searchItem != ''">
                      <h5 class="pl-2">Add Tool Fitting Mapping</h5>
                      <v-spacer></v-spacer>
                      <v-icon
                        class="white red--text mr-3"
                        v-if="itemTypeFittingCard == false"
                        @click="itemTypeFittingCard = !itemTypeFittingCard"
                        >mdi-plus</v-icon
                      >
                      <v-icon
                        class="white red--text mr-3"
                        v-if="itemTypeFittingCard == true"
                        @click="closefiitingcard()"
                        >mdi-close</v-icon
                      >
                    </v-card-title>
  
                    <v-divider></v-divider>
  
                    <v-card-text v-if="itemTypeFittingCard == true">
                      <v-form @submit.prevent="saveFitting" ref="form" style="margin-top:8px;background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
                        <v-row>
                          <v-col cols="12" sm="12" md="3">
                            <!-- {{fittingCategoryList}} -->
                            <v-autocomplete
                              placeholder="Select Ft Category"
                              label="Select Ft Category"
                              :items="fittingCategoryList"
                              dense
                              outlined
                              v-model="itemFittingMapping.subCategoryName"
                              @change="getaccessoriestypecode(itemFittingMapping.subCategoryName)"
                            >
                            </v-autocomplete>
                          </v-col>
  
                          <v-col cols="12" sm="12" md="3">
                            <!-- {{fittingTypeList}} -->
                            <v-autocomplete
                              placeholder="Select Fitting Type"
                              label="Select Fitting Type"
                              v-model="itemFittingMapping.fittingTypeCode"
                              :items="fittingTypeList"
                              dense
                              outlined
                            >
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="3">
                            <v-autocomplete
                              placeholder="Input Type"
                              v-model="itemFittingMapping.inputType"
                              :items="classTypeList"
                              label="Input Type"
                              :rules="nameRules"
                              dense
                              outlined
                          
                            >
                              <template #label>
                                Input Type <strong class="red--text">* </strong>
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="3"
                            v-show="itemFittingMapping.inputType == 'FIXED'"
                          >
                            <v-text-field
                              placeholder="Quantity"
                              v-model="itemFittingMapping.quantity"
                              label="Quantity"
                              dense
                              outlined
                            >
                              <template #label>
                                Quantity<strong class="red--text">* </strong>
                              </template>
                            </v-text-field>
                          </v-col>
  
                          <v-col
                            cols="12"
                            sm="12"
                            md="3"
                            v-show="itemFittingMapping.inputType == 'DERIVED'"
                          >
                            <v-select
                              placeholder="Formula"
                              v-model="itemFittingMapping.formula"
                              :items="formulasList"
                              label="Formula"
                              dense
                              outlined
                            >
                              <template #label>
                                Formula<strong class="red--text">* </strong>
                              </template>
                            </v-select>
                          </v-col>
  
                          <v-col cols="12" sm="12" md="2">
                            <v-select
                              placeholder="Status"
                              label="Status"
                              v-model="itemFittingMapping.status"
                              :items="statusList"
                              :rules="nameRules"
                              dense
                              outlined
                            >
                              <template #label>
                                Status<strong class="red--text">* </strong>
                              </template>
                            </v-select>
                          </v-col>
  
                          <v-col cols="12" sm="12" md="1">
                            <v-btn class="red white--text mt-0" type="submit">
                              save</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                </div>
                <!-- item fitting -->
                  <v-data-table
                    max-height="400"
                    fixed-header
                    :search="itemFittingSearch"
                    :headers="itemMappingHeaders"
                    :items="itemDetails.itemTypeFittingTypeMappings"
                    dense
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="copyFittingItem(item)">
                        mdi-content-copy
                      </v-icon>
                    </template>
                  </v-data-table>
              </v-card-text>
            <!-- </v-card> -->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  
      <v-dialog v-model="dialogDelete" max-width="550px" persistent>
        <v-card style="background-color:#fde4e4;border:3px solid rgba(243,145,146,255);border-radius:4px;padding:15px;">
          <v-card-title  style="font-size: 20px;background-color:#fde4e4;"
            >Are you sure you want to delete item ?</v-card-title
          >
          <v-card-actions class="mr-3">
            <v-spacer></v-spacer>
            <v-btn  color="red white--text"
                              style="width:80px;" @click="cancel">Cancel</v-btn>
            <v-btn
             color="green white--text"
                              style="width:80px;"
              class="mr-3"
              @click="confirmToDelete"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- dailog box for adding category in adding item type -->
  
      <v-dialog v-model="showcategorydailog" max-width="500px" persistent>
        <v-card>
          <v-card-title class="white" style="font-size: 20px"
            >Add Category</v-card-title
          >
          <v-form
            @submit.prevent="postAddCategory"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    v-model="addFiledCategory.subCategoryName"
                    placeholder="Category Name"
                  >
                    <template #label>
                      Category Name<strong class="red--text">* </strong>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    v-model="addFiledCategory.margin"
                    placeholder="Margin"
                    type="number"
                    label="Margin"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="">
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="showcategorydailog = false"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text class="mr-3" type="submit"
                >OK</v-btn
              >
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
  import Navbar from '@/components/Navbar'
//   import store from "store";
  export default {
    name: "NewItem",
    mixins: [servicescall],
    components: {
    //   store,
    Navbar
    },
    data() {
      return {
        itemSearch: "",
        allStandards: [],
        formulasList: [],
        showcategorydailog: "",
        addFiledCategory: {
          categoryName: "",
          subCategoryName: "",
        },
        expanded: [],
        singleExpand: false,
        activeColor: "",
        fittingCode: "",
        fittingTypeList: [],
        fittingType: "",
        // subCategoryName: "",
        fittingCategoryList: [],
        installationCard: false,
        allMakes: [],
        isItemDetails: true,
        itemTypeFittingCard: false,
        itemCard: false,
        isItemEdited: false,
        dialogDelete: false,
        statusList: [
          { text: "Active", value: "true" },
          { text: "Inactive", value: "false" },
        ],
        disabled: false,
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
        imageurl: "",
        activeCard: false,
        itemVisible: false,
        weldingList: [],
        tab: 0,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        menu: false,
        modal: false,
        pricecount: 0,
        materialList: [],
        classTypeListData: [],
        items: [
          "Tool Type",
          "Tools",
          "Tool Mapping",
        ],
  
        itemheaders: [
          {
            text: "Item Name",
            value: "itemName",
           
          },
          {
            text: "Item Code ",
            value: "itemCode",
           
          },
          {
            text: "Unit1 Type",
            value: "unit1_type",
           
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
           
          },
        ],
        itemsList: [],
        itemInstallation: "",
        itemInstallHeaders: [
          // { text: "Item Name", value: "itemName",class: "blue-grey lighten-4 text--black" },
          // { text: "Item Code", value: "itemCode",class: "blue-grey lighten-4 text--black",sortable: false, },
          {
            text: "Class Type",
            value: "classType",
           
            sortable: false,
          },
          {
            text: "Material Type",
            value: "materialType",
           
            sortable: false,
          },
          {
            text: "Welding Type",
            value: "weldingType",
           
          },
          {
            text: "Inches",
            value: "inchNumber",
           
            sortable: false,
          },
          {
            text: "Purchase Rate With Tools",
            value: "purchageRateWithTools",
           
            sortable: false,
          },
          {
            text: "Purchase Rate Without Tools",
            value: "purchageRateWithoutTools",
           
            sortable: false,
          },
          {
            text: "Selling Rate",
            value: "sellingRate",
           
            sortable: false,
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
           
          },
        ],
        itemFittingSearch: "",
        itemMappingHeaders: [
          {
            text: "Fitting Sub Category",
            value: "subCategoryName",
           
          },
          {
            text: "Fitting Type Code",
            value: "fittingTypeCode",
           
          },
          {
            text: "Fitting Name",
            value: "fittingTypeName",
            align: "left",
           
          },
  
          {
            text: "Input Type",
            value: "inputType",
           
          },
          {
            text: "Quantity",
            value: "quantity",
           
          },
          // { text: "Start Date", value: "startDate",class: "blue-grey lighten-4 text--black"},
          // { text: "End Date", value: "endDate",class: "blue-grey lighten-4 text--black" },
          {
            text: "Status",
            value: "status",
           
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
           
          },
          //  { text: '', value: 'data-table-expand' },
        ],
  
        itemHeaders: [
          {
            text: " Tool Code",
            value: "itemCode",
           
          },
          {
            text: "Tool Name",
            value: "itemName",
           
          },
          // { text: "Class Type", value: "classType", class: "blue-grey lighten-4 text--black" },
          // { text: "Material Type", value: "materialType", class: "blue-grey lighten-4 text--black" },
          {
            text: "Make Name ",
            value: "itemMakeName",
           
          },
          //  { text: "Make Code ", value: "itemMakeCode", class: "blue-grey lighten-4 text--black" },
  
          //  { text: "Part Number", value: "partnerNumber", class: "blue-grey lighten-4 text--black" },
          // { text: "Standards", value: "standards", class: "blue-grey lighten-4 text--black" },
  
          //{ text: "Transport Rate", value: "transportRate", sortable: false,class: "blue-grey lighten-4 text--black" },
  
          // text: "Wastage Rate", value: "wastageRate", sortable: false,class: "blue-grey lighten-4 text--black"},
          //{ text: "Wastage Percent(%)", value: "wastagePercent", sortable: false,class: "blue-grey lighten-4 text--black"},
          {
            text: "Actions",
            value: "actions",
            sortable: false,
           
          },
        ],
  
        //models
  
        fittingMapping: {
          itemCode: "",
          itemFittingMapping: [],
        },
        itemFittingMapping: {
          fittingTypeCode: "",
          inputType: "",
          itemTypeCode: "",
          quantity: 0,
          status: "",
          subCategoryName: ""
        },
  
        itemDefaultFittingMapping: {
          fittingCode: "",
          inputType: "",
          quantity: 0,
          status: "",
        },
  
        itemPrices: [
          {
            list: {
              itemTypeCode: "",
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
          daimeter: "",
          itemTypeCode: "",
          itemTypeName: "",
          itemTypeDescription: "",
          unit1: "",
          unit1_type: "",
          unit2: "",
          unit2_type: "",
          unit3: "",
          unit3_type: "",
          margin: "",
          wastagePercent: "",
          transportRate: "",
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
          margin: "",
          wastagePercent: "",
          transportRate: "",
        },
  
        count: 0,
  
        installationModel: {
          classType: "",
          inchNumber: "",
          itemTypeCode: "",
          itemName: "",
          purchageRateWithTools: "",
          purchageRateWithoutTools: "",
          sellingRate: "",
          weldingType: "",
          materialType: "",
        },
        installationPrices: [
          {
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
            index: 0,
          },
        ],
        consumableModel: {
          "certificationBody": "",
    "classType": "",
    "itemCode": "",
    "itemDescription": "",
    "itemName": "",
    "itemTypeCode": "",
    "itemTypeName": "",
    "makeCode": "",
    "makeName": "",
    "materialType": "",
    "partnerNumber": "",
    "standards": [
      ""
    ],
    "type": ""
     
        },
        searchItem: "",
        itemDetails: {},
        classTypeList: [],
        valid: false,
        delItem: {},
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
          /^\d+\.\d{0,2}$/,
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
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
        numberRules: [
          (v) => !!v || "Field is required",
          (v) => /^\d\.\d{0,2}$/.test(v) || "Number with decimals",
          // (v) => v.length <= 100 || "Name allows below 100 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
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
      this.getFittingCategories();
      this.getStandards();
      this.getFormulas();
      this.searchItem = "";
      if (this.$route.params.toolTypeCode) {
        this.searchItem = this.$route.params.toolTypeCode;
        this.searchItem = this.searchItem.replace("/", "$");
        var id = this.$route.params.tabValue;
        this.tab = id;
        this.getItem();
      }
    },
    watch: {
      fittingType: function () {
        this.getfittingCodeByFittingType(this.fittingType).then((response) => {
          this.fittingCodeList = [];
          for (var i = 0; i < response.length; i++) {
            this.fittingCodeList.push(response[i].fittingCode);
          }
        });
      },
    },
    methods: {
      getaccessoriestypecode(cat){
        this.getFittingTypeByCategory(cat).then((response) => {
          this.fittingTypeList = [];
         for (var i = 0; i < response.length; i++) {
            this.fittingTypeList.push(response[i].fittingTypeCode);
         }
        })
      },
      closefiitingcard(){
              this.fittingCategory = "";
              this.itemFittingMapping = {};
              this.itemTypeFittingCard = false;
        
      },
      //get all Formulas
      getFormulas() {
        this.getAllFormula().then((response) => {
          this.formulasList = response;
        });
      },
  
      // ger all standards
      getStandards() {
        this.getAllStandards().then((response) => {
          this.allStandards = response;
        });
      },
      // add category field in v-select level
      addCatField() {
        this.showcategorydailog = true;
      },
      // save add category
      postAddCategory() {
        if (this.$refs.form.validate()) {
          var reqJSON = this.addFiledCategory;
          this.addCategory(reqJSON).then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.showcategorydailog = false;
              this.addFiledCategory = {};
              this.getCategoryList();
            } else {
              this.text = response.data.message;
              this.activeColor = "red";
              this.showcategorydailog = false;
              this.snackbar = true;
            }
          });
        }
      },
      // delete Item
      deleteItemRow(item) {
        this.delItem = item.itemCode;
        this.dialogDelete = true;
      },
      cancel() {
        this.dialogDelete = false;
      },
      // confirm to delete
      confirmToDelete() {
        var reqJson = this.delItem;
  
        this.deleteTool(reqJson)
          .then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.dialogDelete = false;
              this.getItem(this.searchItem);
            } else if (response.status == 400) {
              this.text = "Please Check  Data";
              this.activeColor = "red";
              this.snackbar = true;
              this.dialogDelete = false;
            } else {
              this.text = response.data.message;
              this.activeColor = "red";
              this.snackbar = true;
              this.dialogDelete = false;
            }
          })
          .then(() => {
          });
      },
      //close items card and refresh form
      closeItemCard() {
      this.consumableModel = {};
  
        this.itemCard = false;
      },
      // close Installation add card and remove data in fileds
      closeInstallationCard() {
        // this.installationModel={}
        this.installationCard = false;
      },
  
      // get all fitting category List
      getFittingCategories() {
        this.getAccessoriresSubCategory().then((response) => {
          for (var i = 0; i < response.length; i++) {
            this.fittingCategoryList.push(response[i].subCategoryName);
          }
        });
      },
  
      // get all item makes list
  
      getAllMakes() {
        this.getToolMakes().then((response) => {
          for (var i = 0; i < response.length; i++) {
            this.allMakes.push({
              text: response[i].makeName,
              value: response[i].makeCode,
            });
          }
        });
      },
      //  backward to disbled card
      backToCard() {
        this.isItemDetails = true;
        this.isItemEdited = false;
        this.activefiled = false;
        this.editedCategory = this.defaultEditedCategory;
        // this.activefiled=false;
      },
  
      // save from item details card
      saveSingleItem() {
        this.isItemDetails = false;
        this.editedCategory.subCategoryName = "";
        this.editedCategory.itemTypeCode = "";
        this.editedCategory.itemTypeName = "";
        this.editedCategory.itemTypeDescription = "";
        this.editedCategory.daimeter = "";
        this.editedCategory.unit1 = "";
        this.editedCategory.unit1_type = "";
        this.editedCategory.unit2 = "";
        this.editedCategory.unit2_type = "";
        this.editedCategory.unit3 = "";
        this.editedCategory.unit3_type = "";
        this.editedCategory.margin = "";
        this.editedCategory.wastagePercent = "";
        this.editedCategory.transportRate = "";
        //  this.editedCategory=this.defaultEditedCategory
        this.isItemEdited = false;
        this.activefiled = !this.activefiled;
      },
      // clear fiting item
      clearFitingItem() {},
      //copy item fiiting mapping
  
      copyFittingItem(item) {
       this.itemFittingMapping = item;
        if (item.subCategoryName != "") {
          this.subCategoryName = item.subCategoryName;
        }   
        this.itemFittingMapping.fittingTypeCode = item.fittingTypeCode;
        this.itemFittingMapping.inputType = item.inputType;
        this.itemFittingMapping.quantity = item.quantity;
     
        if (item.status == true) {
          this.itemFittingMapping.status = this.statusList[0].value;
        } else {
          this.itemFittingMapping.status = this.statusList[1].value;
        }
     
        this.fittingCode = item.fittingCode;
        this.itemTypeFittingCard = true;
        
      },
      // cpy install item
      copyInstalItem(item) {
        this.installationModel = item;
        this.installationCard = true;
      },
  
      //save fitting
      saveFitting() {
        if (this.itemFittingMapping.inputType != "FIXED") {
          this.itemFittingMapping.quantity = 0;
        }
        if (this.$refs.form.validate()) {
          this.searchItem = this.searchItem.replace("$", "/");
          this.itemFittingMapping.itemTypeCode = this.searchItem;
          this.addToolMapping(this.itemFittingMapping).then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.fittingMapping.itemCode = "";
              this.fittingMapping.itemFittingMapping = [];
              this.itemFittingMapping.fittingCode = "";
              this.itemFittingMapping.quantity = 0;
              this.itemFittingMapping.status = "";
              this.itemFittingMapping.inputType = "";
              this.fittingCode = "";
              this.fittingType = "";
              this.subCategoryName = "";
  
              this.itemFittingMapping = [];
              this.itemTypeFittingCard = false;
              this.$refs.form.reset();
              this.getItem(this.searchItem);
            } else {
              this.text = response.data.message;
              this.activeColor = "red";
              this.snackbar = true;
            }
          });
        }
      },
  
      //load image
      loadImage(event) {
        this.selectedImage = event.target.files[0];
      },
  
      //load docs
      loadDocs(event) {
        this.selectedDoc = event.target.files[0];
      },
      //send image and docs
      loadSpecification() {
        var item = this.searchItem;
  
        const fd = new FormData();
  
        fd.append("image", this.selectedImage);
        fd.append("specification", this.selectedDoc);
  
        this.postspecifications(item, fd).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
            this.getItem(this.searchItem);
          } else {
            this.text = response;
            this.activeColor = "green";
            this.snackbar = true;
          }
        });
      },
      downloadImage(link) {
        if (link != "") {
          link.click();
        } else {
          alert("  No Specification for Item");
        }
      },
  
      //  search Item Edit
      editItem(item) {
        this.isItemEdited = true;
        this.isItemDetails = false;
  
        this.activefiled = true;
        this.editedCategory.subCategoryName = item.subCategoryName;
        this.editedCategory.itemTypeCode = item.itemTypeCode;
  
        this.editedCategory.itemTypeName = item.itemTypeName;
        this.editedCategory.itemTypeDescription = item.itemTypeDescription;
        this.editedCategory.unit1 = item.unit1;
        this.editedCategory.unit1_type = item.unit1_type;
        if (item.unit2 != "") {
          this.editedCategory.unit2 = item.unit2;
        }
        if (item.unit2_type != "") {
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
        this.getAllSubTool().then((response) => {
          for (var i = 0; i < response.length; i++) {
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
                       this.Posttools() ;
      },
      Posttools() { 
        var reqJSON = this.editedCategory;
        this.addToolType(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
            this.editedCategory = {};
            this.activefiled = false;
            this.isItemDetails = true;
            this.editedCategory.itemTypeCode = "";
  
            this.searchItem = this.searchItem.replace("$", "/");
            this.getItem(this.searchItem);
          } else {
            this.text = response.data.message;
            this.activeColor = "red";
            this.snackbar = true;
          }
        });
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
        this.installationModel.itemTypeCode = this.itemDetails.itemTypeCode;
        var reqJSON = this.installationModel;
        if (this.$refs.form.validate()) {
          this.addInstallPrice(reqJSON)
            .then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.installationCard++;
                this.installationCard = false;
                this.$refs.form.reset();
                this.installationPrices[0].list = {};
                this.getItem(this.searchItem);
              } else {
                this.text = response.data.message;
                this.activeColor = "red";
                this.snackbar = true;
              }
            })
            .then(() => {
            });
        }
      },
  
      postTool(item) {
        if (this.searchItem == "") {
          alert("Search Tool code");
        }
        this.consumableModel.itemTypeCode = this.searchItem;
        var reqJSON = this.consumableModel;
        if (this.$refs.form.validate()) {
          this.postTools(reqJSON)
            .then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.consumableModel = {};
                this.getItem(this.searchItem);
              } else if (response.status == 400) {
                this.text = "Please Check  Data";
                this.activeColor = "red";
                this.snackbar = true;
              } else {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
              }
            })
            .then(() => {
            });
        }
      },
      //add price item row
      add(index) {
        this.itemDetails.itemPrice.splice(index + 1, 0, this.price);
        //this.index++
      },
  
      getItem() {
        this.searchItem = this.searchItem.replace("/", "$");
        var reqJSON = this.searchItem;
        this.getToolTypeById(reqJSON).then((response) => {
          this.itemDetails = response;
          this.itemPrices[0].list = {};
          this.itemFittingMapping = {};
          this.installationPrices[0].list = {};
          if (response.status == 200) {
            this.itemVisible = true;
            this.itemFittingMapping.fittingCode = "";
            this.itemFittingMapping.quantity = 0;
            this.itemFittingMapping.status = "";
            this.itemFittingMapping.inputType = "";
          } else {
          }
        });
      },
  
      //item prices
  
      getMaterialTypes() {
        this.getAllMaterialType().then((response) => {
          this.materialList = response;
        });
      },
  
      copyItem(obj) {
        this.consumableModel = obj;
        this.itemCard = true;
      },
      refreshItem() {
        this.consumableModel = {};
      },
    },
  };
  </script>
  <style  scoped>
  .v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    font-size: 0.875rem;
    height: 48px;
    border: 1px solid white;
  }
  .v-data-table > .v-data-table__wrapper > table > thead > tr {
    background-color: #ccc;
  }
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    background-color: brown lighten-5;
  }
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
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
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr:last-child
    > th {
    color: darkblue;
    background: #e4edf8;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr:last-child
    > th:hover {
    color: #3468c0;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    color: black;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
  .theme--light.v-data-table tbody tr:nth-of-type(even) {
    background-color: #f0f2f5;
  }
  .theme--dark.v-data-table tbody tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .v-data-table-header th {
    white-space: nowrap;
  }
  .v-data-table tbody td {
    white-space: nowrap;
  }
  
  .v-icon {
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