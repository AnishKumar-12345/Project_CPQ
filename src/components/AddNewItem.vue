<template>
  <div>  
    <Navbar/>
    <v-card flat tile >
      <v-toolbar color=" mt-2" dark flat style="position: sticky;">
        <v-toolbar-sub-title class="mt-7">
          <v-row>
            <v-col>
              <v-text-field
                type="search"
                v-model="searchItem"
                placeholder="Search Item Type Code"
                label="Search Item Type Code"
                @input="getItem()"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Item Type Name"
                placeholder="Item Type Name"
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
              <p style=" color: black;font-size:14px; font-weight:700">
                <b> Item Type Details</b>
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
            <div
              v-if="isItemDetails != false"
              v-show="this.searchItem != ''"
              style="
                background-color: rgba(225, 246, 240, 255);
                padding: 20px;
                border: 1px solid rgba(129, 207, 252, 255);
                border-radius: 5px;
              "
            >
              <v-form readonly v-model="valid" lazy-validation>
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="itemDetails.itemTypeCode"
                      label="Item Type Code"
                      dense
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Item Type Code<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="itemDetails.itemTypeName"
                      label="Item Type Name"
                      dense
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Item Type Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="itemDetails.subCategoryName"
                      label="Sub Category Name"
                      dense
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
                      label=" Item Type Description"
                      dense
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Item Type Description<strong class="red--text"
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
            <div
              v-if="activefiled == true"
              style="
                background-color: rgba(225, 246, 240, 255);
                padding: 20px;
                border: 1px solid rgba(27, 212, 160, 255);
                border-radius: 5px;
              "
            >
              <!-- <div> -->
              <v-form
                @submit.prevent="saveItem"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedCategory.itemTypeCode"
                      label="Item Type Code"
                      :rules="nameRules"
                      hint="Mandatory Field"
                      :disabled="isItemEdited"
                      filled
                      dense
                      outlined
                    >
                      <template #label>
                        Item Type Code<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedCategory.itemTypeName"
                      label="Item Type Name"
                      :rules="nameRules"
                      hint="Mandatory Field"
                      :disabled="isItemEdited"
                      filled
                      dense
                      outlined
                    >
                      <template #label>
                        Item Type Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>

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
                      <template v-slot:append-outer>
                        <v-icon @click="addCatField" class="red white--text">
                          mdi-plus
                        </v-icon>
                      </template>
                      <template #label>
                        Sub Category Name<strong class="red--text">* </strong>
                      </template>
                    </v-autocomplete>
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
                      hint="Only enter name"
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
                      label=" Item Type Description"
                      :rules="messageRules"
                      hint="Mandatory Field"
                      dense
                      outlined
                    >
                      <template #label>
                        Item Type Description<strong class="red--text"
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
          <!-- <v-card style="border:1px solid red;"  elevation="0"> -->
          <v-spacer></v-spacer>
          <v-divider height="20px"></v-divider>
          <v-card-text>
            <div
              style="
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e4e6e4;
                margin-bottom: 2px;
              "
            >
              <!-- <p style="font-weight: 700; font-size: 16px; color: black"> -->
              <v-text-field
                dense
                outlined
                v-model="itemSearch"
                append-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
              <!-- </p> -->
            </div>
            <v-divider></v-divider>
            <v-card-title v-if="this.searchItem != ''">
              <h5 class="pl-2">Add Item</h5>
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
              <div
                style="
                  background-color: rgba(225, 246, 240, 255);
                  padding: 20px;
                  border: 1px solid rgba(129, 207, 252, 255);
                  border-radius: 5px;
                "
              >
                <v-form ref="form" @submit.prevent="postSingleItem">
                  <v-row>
                    <v-col cols="12" sm="12" md="2">
                      <!-- {{itemModel.classType}} -->
                      <v-autocomplete
                        placeholder="ClassType"
                        :items="classTypeListData"
                        label="Class Type"
                        dense
                        outlined
                        v-model="itemModel.classType"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="2">
                      <v-autocomplete
                        placeholder="Material Type"
                        :items="materialList"
                        label="Material Type"
                        dense
                        outlined
                        v-model="itemModel.materialType"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="2">
                      <v-text-field
                        dense
                        outlined
                        placeholder="Item Name"
                        label="Item Name"
                        :rules="nameRules"
                        v-model="itemModel.itemName"
                        hint="Only enter name"
                      >
                        <template #label>
                          Item Name<strong class="red--text">* </strong>
                        </template></v-text-field
                      >
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <v-autocomplete
                        placeholder="Make"
                        label="Make"
                        :items="allMakes"
                        :rules="nameRules"
                        dense
                        outlined
                        v-model="itemModel.makeCode"
                      >
                        <template #label>
                          Item Make<strong class="red--text">* </strong>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="2">
                      <v-text-field
                        dense
                        outlined
                        placeholder="Part Number"
                        label="Part Number"
                        v-model="itemModel.partnerNumber"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <v-autocomplete
                        dense
                        outlined
                        placeholder="Standards"
                        label="Standards"
                        multiple
                        :items="allStandards"
                        v-model="itemModel.standards"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-textarea
                        v-model="itemModel.certificationBody"
                        outlined
                        dense
                        label=" Certification Body"
                        placeholder="Certification Body"
                      >
                      </v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-textarea
                        v-model="itemModel.itemDescription"
                        outlined
                        dense
                        label=" Item Description "
                        placeholder="Item Description "
                      >
                      </v-textarea>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-icon
                        class="mt-0"
                        medium
                        style="color: black; cursor: pointer"
                        @click="refreshItem"
                        >mdi-refresh</v-icon
                      >
                      <v-btn type="submit" class="red white--text mt-0 ml-3">
                        Save</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-card-text>
            <!-- {{itemDetails.items}} -->
            <div class="overView">
              <v-data-table
                max-height="360"
                fixed-header
                :search="itemSearch"
                :headers="itemHeaders"
                style="overflow-x: scroll"
                :items="itemDetails.items"
                dense
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2 blue--text" @click="copyItem(item)">
                    mdi-content-copy
                  </v-icon>
                  <v-icon
                    small
                    class="mr-2 red--text"
                    @click="deleteItemRow(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
          <!-- </v-card> -->
        </v-tab-item>
        <!-- instalation -->
        <v-tab-item>
          <!-- <v-card style="margin: 10px 10px" max-width="auto" elevation="0"> -->
          <v-spacer></v-spacer>
          <v-divider height="20px"></v-divider>
          <v-card-text>
            <div
              style="
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e4e6e4;
                margin-bottom: 5px;
              "
            >
              <v-text-field
                dense
                outlined
                v-model="itemInstallation"
                append-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
            </div>
            <!-- <v-card :key="installationCard" elevation="0" v-show="searchItem !=''"> -->
            <v-card-title
              :key="installationCard"
              elevation="0"
              v-show="searchItem != ''"
            >
              <h5 class="pl-2">Add Item Installation</h5>
              <v-spacer></v-spacer>
              <v-icon
                class="white red--text mr-3"
                v-if="installationCard == false"
                @click="installationCard = true"
                >mdi-plus</v-icon
              >
              <v-icon
                class="white red--text mr-3"
                v-if="installationCard == true"
                @click="closeInstallationCard"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text
              class="mt-3"
              v-if="installationCard == true"
              style="
                background-color: rgba(225, 246, 240, 255);
                padding: 20px;
                border: 1px solid rgba(27, 212, 160, 255);
                border-radius: 5px;
              "
            >
              <v-form ref="form" @submit.prevent="saveInstallPrice">
                <v-row>
                  <v-col cols="12" sm="12" md="2">
                    <v-autocomplete
                      placeholder="ClassType"
                      :items="classTypeListData"
                      label="Class Type"
                      dense
                      outlined
                      v-model="installationModel.classType"
                    >
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="12" md="2">
                    <v-autocomplete
                      placeholder="Material Type"
                      :items="materialList"
                      label="Material Type"
                      dense
                      outlined
                      v-model="installationModel.materialType"
                    >
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="12" md="2">
                    <v-autocomplete
                      placeholder="Welding Type"
                      :items="weldingList"
                      label="Welding Type"
                      :rules="nameRules"
                      dense
                      outlined
                      v-model="installationModel.weldingType"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      placeholder="Inches"
                      label="Inches"
                      :rules="numberRules"
                      dense
                      outlined
                      v-model="installationModel.inchNumber"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      placeholder=" Purchase Rate With Tool"
                      label="Purchase Rate With Tool"
                      :rules="numberRules"
                      dense
                      outlined
                      v-model="installationModel.purchageRateWithTools"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    placeholder=" PurchaseRate With Tool"
                    label="Purchase Rate With Tool"
                    :rules="numberRules"
                    dense
                    outlined
                    md="2"
                  >
                    <v-text-field
                      placeholder="Purchase Rate Without Tool"
                      label="Purchase Rate Without Tool"
                      :rules="numberRules"
                      dense
                      outlined
                      v-model="installationModel.purchageRateWithoutTools"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      placeholder="Selling rate"
                      label="Selling Rate"
                      dense
                      outlined
                      :rules="numberRules"
                      v-model="installationModel.sellingRate"
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="12">
                    <v-btn
                      style="color: white"
                      class="red text--white"
                      type="submit"
                      >Save</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <!-- item fitting -->
            <div class="overView">
              <v-data-table
                max-height="400"
                fixed-header
                :search="itemInstallation"
                :headers="itemInstallHeaders"
                :items="itemDetails.itemInstallationPrice"
                dense
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="copyInstalItem(item)">
                    mdi-content-copy
                  </v-icon>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-tab-item>

        <!-- Fitting Mapping -->

        <v-tab-item>
          <v-card-text>
            <div
              style="
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e4e6e4;
                margin-bottom: 5px;
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
              <v-card-title elevation="0" v-if="this.searchItem != ''">
                <h5 class="pl-2">Add Item Fitting Mapping</h5>
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
                  @click="refreshFittings()"
                  >mdi-close</v-icon
                >
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text v-if="itemTypeFittingCard == true">
                <v-form
                  @submit.prevent="saveFitting"
                  ref="form"
                  style="
                    background-color: rgba(225, 246, 240, 255);
                    padding: 20px;
                    border: 1px solid rgba(27, 212, 160, 255);
                    border-radius: 5px;
                  "
                >
                  <v-row>
                    <v-col cols="12" sm="12" md="3">
                      <v-autocomplete
                        placeholder="Select Ft Category"
                        label="Select Ft Category"
                        :items="fittingCategoryList"
                        dense
                        outlined
                        v-model="subCategoryName"
                      >
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="3">
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
                      <v-select
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
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="3"
                      v-show="
                        itemFittingMapping.inputType == 'FIXED' ||
                        itemFittingMapping.inputType == 'INPUT_BOQ'
                      "
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
            <div class="overView">
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
            </div>
          </v-card-text>
          <!-- </v-card> -->
        </v-tab-item>

        <!-- consumable fitting Mapping started -->
        <v-tab-item>
          <v-card-text>
            <div
              style="
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e4e6e4;
                margin-bottom: 5px;
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
              <!-- <v-card elevation="0" v-if="this.searchItem !=''"> -->

              <v-card-title elevation="0" v-if="this.searchItem != ''">
                <h5 class="pl-2">Add Item Consumable Fitting Mapping</h5>
                <v-spacer></v-spacer>
                <v-icon
                  class="white red--text mr-3"
                  v-if="itemTypeFittingCard2 == false"
                  @click="itemTypeFittingCard2 = !itemTypeFittingCard2"
                  >mdi-plus</v-icon
                >
                <v-icon
                  class="white red--text mr-3"
                  v-if="itemTypeFittingCard2 == true"
                  @click="refreshConsumableFittings()"
                  >mdi-close</v-icon
                >
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text v-if="itemTypeFittingCard2 == true">
                <!-- {{}} -->
                <v-form
                  @submit.prevent="saveConsumableFitting()"
                  ref="form1"
                  style="
                    background-color: rgba(225, 246, 240, 255);
                    padding: 20px;
                    border: 1px solid rgba(27, 212, 160, 255);
                    border-radius: 5px;
                  "
                >
                  <v-row>
                    <v-col cols="12" sm="12" md="3">
                      <!-- {{ConsumablefittingCategoryList}} -->
                      <v-autocomplete
                        placeholder="Select Ft Category"
                        label="Select Ft Category"
                        :items="ConsumablefittingCategoryList"
                        dense
                        outlined
                        v-model="itemConsumableFittingMapping.subCategoryName"
                        @change="
                          getsubcategory(
                            itemConsumableFittingMapping.subCategoryName
                          )
                        "
                      >
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="3">
                      <!-- {{ConsumablefittingTypeList}} -->
                      <v-autocomplete
                        placeholder="Select Fitting Type"
                        label="Select Fitting Type"
                        v-model="itemConsumableFittingMapping.fittingTypeCode"
                        :items="ConsumablefittingTypeList"
                        dense
                        outlined
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="3">
                      <v-select
                        placeholder="Input Type"
                        v-model="itemConsumableFittingMapping.inputType"
                        :items="classTypeList"
                        label="Input Type"
                        :rules="nameRules"
                        dense
                        outlined
                      >
                        <template #label>
                          Input Type <strong class="red--text">* </strong>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="3"
                      v-show="
                        itemConsumableFittingMapping.inputType == 'FIXED' ||
                        itemConsumableFittingMapping.inputType == 'INPUT_BOQ'
                      "
                    >
                      <v-text-field
                        placeholder="Quantity"
                        v-model="itemConsumableFittingMapping.quantity"
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
                      v-show="
                        itemConsumableFittingMapping.inputType == 'DERIVED'
                      "
                    >
                      <v-select
                        placeholder="Formula"
                        v-model="itemConsumableFittingMapping.formula"
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
                        v-model="itemConsumableFittingMapping.status"
                        :items="statusList2"
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
            <div class="overView">
              <v-data-table
                max-height="400"
                fixed-header
                :search="itemFittingSearch"
                :headers="itemConsumableMappingHeaders"
                :items="itemDetails.itemTypeConsumableTypeMappings"
                dense
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="copyFittingSubItem(item)">
                    mdi-content-copy
                  </v-icon>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
          <!-- </v-card> -->
        </v-tab-item>
        <!-- consumable fitting mapping ended -->
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card
        style="
          background-color: #fde4e4;
          border: 3px solid rgba(243, 145, 146, 255);
          border-radius: 4px;
          padding: 15px;
        "
      >
        <v-card-title style="font-size: 20px; background-color: #fde4e4"
          >Are you sure you want to delete item ?</v-card-title
        >
        <v-card-actions class="mr-3">
          <v-spacer></v-spacer>
          <v-btn color="red white--text" style="width: 80px" @click="cancel"
            >Cancel</v-btn
          >
          <v-btn
            color="green white--text"
            style="width: 80px"
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
                  v-model="addFiledCategory.categoryName"
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
                  v-model="addFiledCategory.subCategoryName"
                  placeholder="SubCategoryName"
                  label="SubCategoryName"
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
import ItemManagement from "../views/ItemManagement.vue";
import Navbar from "@/components/Navbar";
//   import store from 'store'
export default {
  name: "NewItem",
  mixins: [servicescall],
  components: {
    //   store,
    Navbar,
    ItemManagement,
  },
  data() {
    return {
      formulasList: [],
      itemSearch: "",
      allStandards: [],
      showcategorydailog: "",
      addFiledCategory: {
        //  "categoryName": "",
        //  "margin": 0,
        categoryName: "",
        subCategoryName: "",
      },
      expanded: [],
      singleExpand: false,
      activeColor: "",
      fittingCode: "",
      fittingTypeList: [],
      fittingTypeList1: [],
      fittingType: "",
      subCategoryName: "",
      subCategoryName1: "",
      fittingCategoryList: [],
      ConsumablefittingCategoryList: [],
      installationCard: false,
      allMakes: [],
      isItemDetails: true,
      itemTypeFittingCard: false,
      itemTypeFittingCard2: false,
      itemCard: false,
      isItemEdited: false,
      dialogDelete: false,
      statusList: [
        { text: "Active", value: "true" },
        { text: "Inactive", value: "false" },
      ],
      statusList2: [
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
        "Item Type",
        "Items",
        "Installation Rates",
        "Fitting Mapping",
        "Consumable Fitting Mapping",
      ],

      itemheaders: [
        { text: "Item Name", value: "itemName" },
        { text: "Item Code ", value: "itemCode" },
        { text: "Unit1 Type", value: "unit1_type" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      itemsList: [],
      itemInstallation: "",
      itemInstallHeaders: [
        // { text: "Item Name", value: "itemName" },
        // { text: "Item Code", value: "itemCode",sortable: false, },
        { text: "Class Type", value: "classType", sortable: false },
        { text: "Material Type", value: "materialType", sortable: false },
        { text: "Welding Type", value: "weldingType" },
        { text: "Inches", value: "inchNumber", sortable: false },
        { text: "PRW Tools", value: "purchageRateWithTools", sortable: false },
        {
          text: "PRWO Tools",
          value: "purchageRateWithoutTools",
          sortable: false,
        },
        { text: "Selling Rate", value: "sellingRate", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      itemFittingSearch: "",
      itemMappingHeaders: [
        { text: "Fitting Category", value: "subCategoryName" },
        { text: "Fitting Type Code", value: "fittingTypeCode" },
        { text: "Fitting Type Name", value: "fittingTypeName", align: "left" },

        { text: "Input Type", value: "inputType" },
        { text: "Formula", value: "formula" },
        { text: "Quantity", value: "quantity" },
        // { text: "Start Date", value: "startDate",class: "blue-grey lighten-4 text--black"},
        // { text: "End Date", value: "endDate",class: "blue-grey lighten-4 text--black" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
        //  { text: '', value: 'data-table-expand' },
      ],
      itemConsumableMappingHeaders: [
        { text: "Fitting Category", value: "subCategoryName" },
        { text: "Fitting Type Code", value: "fittingTypeCode" },
        { text: "Fitting Type Name", value: "fittingTypeName", align: "left" },

        { text: "Input Type", value: "inputType" },
        { text: "Formula", value: "formula" },
        { text: "Quantity", value: "quantity" },
        // { text: "Start Date", value: "startDate",class: "blue-grey lighten-4 text--black"},
        // { text: "End Date", value: "endDate",class: "blue-grey lighten-4 text--black" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
        //  { text: '', value: 'data-table-expand' },
      ],

      itemHeaders: [
        { text: "Item Code", value: "itemCode", width: "150px" },
        { text: "Item Name", value: "itemName", width: "200px" },
        { text: "Class ", value: "classType" },
        { text: "Material ", value: "materialType" },
        { text: "Make Name ", value: "makeCode" },

        { text: "Part Number", value: "partnerNumber" },
        { text: "Standards", value: "standards" },
        { text: "Certification ", value: "certificationBody" },
        {
          text: "Description ",
          value: "itemDescription",
          sortable: false,
          width: "300px",
        },

        // text: "Wastage Rate", value: "wastageRate", sortable: false,class: "blue-grey lighten-4 text--black"},
        //{ text: "Wastage Percent(%)", value: "wastagePercent", sortable: false,class: "blue-grey lighten-4 text--black"},
        { text: "Actions", value: "actions", sortable: false },
      ],

      //models

      fittingMapping: {
        itemCode: "",
        itemFittingMapping: [],
        // itemConsumableFittingMapping: [],
      },
      itemFittingMapping: {
        fittingTypeCode: "",
        inputType: "",
        itemTypeCode: "",
        quantity: 0,
        status: "",
        formula: "",
      },
      itemConsumableFittingMapping: {
        fittingTypeCode: "",
        inputType: "",
        itemTypeCode: "",
        quantity: 0,
        status: "",
        formula: "",
        subCategoryName: "",
      },
      ConsumablefittingTypeList: [],
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
        subCategoryName: "",
        daimeter: "",
        itemTypeCode: "",
        itemTypeDescription: "",
        itemTypeName: "",
        unit1: "",
        unit1_type: "",
        unit2: null,
        unit2_type: null,
        unit3: null,
        unit3_type: null,
        margin: "",
        wastagePercent: "",
        transportRate: "",
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
      itemModel: {
        classType: "",
        makeCode: "",
        itemMakeCode: "",
        itemName: "",
        itemTypeCode: "",
        materialType: "",
        partnerNumber: "",
        standards: [],
        certificationBody: "",
        itemDescription: "",
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
        (v) => !!v || "name is required",
        (v) => v.length <= 100 || "Name allows below 100 characters only",
        // v => /[^a-z ]*$/gmi || 'Name must be characters',
        // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
      ],
      numberRules: [
        (v) => !!v || "Field is required",
        (v) =>
          /^[0-9]+(\.([0-9]{1,8})?)?$/.test(v) ||
          "only number with decimal are accepted",
        // (v) =>  /^\d\.\d{0,2}$/.test(v) || "Number with decimals",
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
    this.getFormulas();
    this.getClassTypesData();
    this.getWeldingTypes();
    this.getUnitTypeList();
    this.getAllMakes();
    this.getFittingCategories();
    this.getConsumableFittingCategories();
    this.getStandards();
    this.searchItem = "";
    if (this.$route.params.itemTypeCode) {
      this.searchItem = this.$route.params.itemTypeCode;
      this.searchItem = this.searchItem.replace("/", "$");
      var id = this.$route.params.tabValue;
      this.tab = id;
      this.getItem();
    }
  },
  watch: {
    subCategoryName: function () {
      this.getFittingTypeByCategory(this.subCategoryName).then((response) => {
        this.fittingTypeList = [];
        this.fittingType = "";
        for (var i = 0; i < response.length; i++) {
          this.fittingTypeList.push(response[i].fittingTypeCode);
        }
      });
    },

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
    getsubcategory(cat) {
      this.getFittingTypeByCategory(cat).then((response) => {
        this.ConsumablefittingTypeList = [];

        for (var i = 0; i < response.length; i++) {
          this.ConsumablefittingTypeList.push(response[i].fittingTypeCode);
        }
      });
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
            // this.isEdited=false;
          } else {
            this.text = response.data.message;
            this.activeColor = "red";
            this.showcategorydailog = false;
            this.snackbar = true;
          }
        });
      }
      // var reqJSON = this.addCategory;
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

      this.deleteOneItem(reqJson)
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
        .then(() => {});
    },
    closeItemCard() {
      this.itemModel = {};
      this.itemCard = false;
    },
    closeInstallationCard() {
      this.installationModel = {};
      this.installationCard = false;
    },

    // get all fitting category List
    getFittingCategories() {
      this.getFittingSubCategory().then((response) => {
        for (var i = 0; i < response.length; i++) {
          this.fittingCategoryList.push(response[i].subCategoryName);
        }
      });
    },
    getConsumableFittingCategories() {
      this.getConsumableSubCategory().then((response) => {
        for (var i = 0; i < response.length; i++) {
          this.ConsumablefittingCategoryList.push(response[i].subCategoryName);
        }
      });
    },

    // get all item makes list

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
      //  this.itemFittingMapping = item;
      //  this.fittingTypeCode=item.fittingTypeCode;
      this.itemTypeFittingCard = true;
    },
    copyFittingSubItem(item) {
      this.itemConsumableFittingMapping = item;
      this.itemConsumableFittingMapping.subCategoryName = item.subCategoryName;
      this.itemConsumableFittingMapping.fittingTypeCode = item.fittingTypeCode;
      this.itemConsumableFittingMapping.inputType = item.inputType;
      this.itemConsumableFittingMapping.quantity = item.quantity;

      if (item.status == true) {
        this.itemConsumableFittingMapping.status = this.statusList2[0].value;
      } else {
        this.itemConsumableFittingMapping.status = this.statusList2[1].value;
      }
      //  this.itemFittingMapping = item;
      //  this.fittingCode=item.fittingCode;
      this.itemTypeFittingCard2 = true;
    },
    // cpy install item
    copyInstalItem(item) {
      this.installationModel = item;
      this.installationCard = true;
    },
    refreshFittings() {
      this.itemFittingMapping = {};
      this.itemTypeFittingCard = false;
      // this.fittingCategory = '';
      this.subCategoryName = "";
      this.$refs.form.reset();
    },
    refreshConsumableFittings() {
      this.itemFittingMapping = {};
      this.itemTypeFittingCard2 = false;
      // this.fittingCategory = '';
      this.subCategoryName1 = "";
      this.$refs.form1.reset();
    },
    saveConsumableFitting() {
      if (this.itemConsumableFittingMapping.inputType != "FIXED") {
        this.itemConsumableFittingMapping.quantity = 0;
      }
      if (this.$refs.form1.validate()) {
        // this.fittingMapping.itemFittingMapping=[]
        // this.itemConsumableFittingMapping.fittingCode=this.fittingCode;
        this.searchItem = this.searchItem.replace("$", "/");
        this.itemConsumableFittingMapping.itemTypeCode = this.searchItem;

        this.addConsumableFittingItem(this.itemConsumableFittingMapping).then(
          (response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              //  this.fittingMapping.itemCode='';
              this.itemConsumableFittingMapping = [];
              //  this.itemConsumableFittingMapping.fittingCode='';
              this.itemConsumableFittingMapping.quantity = 0;
              this.itemConsumableFittingMapping.status = "";
              this.itemConsumableFittingMapping.inputType = "";
              //  this.fittingCode='';
              //  this.fittingType='';
              //  this.fittingCategory='';
              this.subCategoryName1 = "";
              this.itemConsumableFittingMapping = [];
              this.itemTypeFittingCard2 = false;
              this.$refs.form1.reset();
              this.getItem(this.searchItem);
            } else {
              this.text = response.data.message;
              this.activeColor = "red";
              this.snackbar = true;
            }
          }
        );
      }
    },

    //save fitting
    saveFitting() {
      if (this.$refs.form.validate()) {
        this.searchItem = this.searchItem.replace("$", "/");
        this.itemFittingMapping.itemTypeCode = this.searchItem;
        this.addFittngItem(this.itemFittingMapping).then((response) => {
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
            this.fittingCategory = "";
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
          //  this.searchItem=  this.searchItem.replace("$", "/")
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
      this.editedCategory.itemTypeCode = item.itemTypeCode;
      this.editedCategory.subCategoryName = item.subCategoryName;
      this.editedCategory.itemTypeName = item.itemTypeName;
      this.editedCategory.itemTypeDescription = item.itemTypeDescription;
      this.editedCategory.unit1 = item.unit1;
      this.editedCategory.unit1_type = item.unit1_type;
      this.editedCategory.unit2 = item.unit2;
      this.editedCategory.unit2_type = item.unit2_type;
      this.editedCategory.unit3 = item.unit3;
      this.editedCategory.unit3_type = item.unit3_type;
      this.editedCategory.daimeter = item.daimeter;
      this.editedCategory.margin = item.margin;
      this.editedCategory.wastagePercent = item.wastagePercent;
      this.editedCategory.transportRate = item.transportRate;

      itemDescription: "rods";
      itemName: "RODS";
    },

    //AllUnit types

    getUnitTypeList() {
      this.getAllUnitType().then((response) => {
        this.unitTypeList = response;
      });
    },

    // All Category List

    getCategoryList() {
      this.getAllCategories().then((response) => {
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
    saveItem() {
      var finalObj = {};
      finalObj.itemTypeCode = this.editedCategory.itemTypeCode;
      finalObj.itemTypeName = this.editedCategory.itemTypeName;
      finalObj.subCategoryName = this.editedCategory.subCategoryName;
      finalObj.unit1 = this.editedCategory.unit1;
      finalObj.unit1_type = this.editedCategory.unit1_type;
      finalObj.itemTypeDescription = this.editedCategory.itemTypeDescription;

      if (this.editedCategory.unit2 != "") {
        finalObj.unit2 = this.editedCategory.unit2;
      }
      if (this.editedCategory.unit2_type != "") {
        finalObj.unit2_type = this.editedCategory.unit2_type;
      }
      if (this.editedCategory.unit3 != "") {
        finalObj.unit3 = this.editedCategory.unit3;
      }
      if (this.editedCategory.unit3_type != "") {
        finalObj.unit3_type = this.editedCategory.unit3_type;
      }
      if (this.editedCategory.daimeter != "") {
        finalObj.daimeter = this.editedCategory.daimeter;
      }
      if (this.editedCategory.wastagePercent != "") {
        finalObj.wastagePercent = this.editedCategory.wastagePercent;
      }
      if (this.editedCategory.transportRate != "") {
        finalObj.transportRate = this.editedCategory.transportRate;
      }
      if (this.editedCategory.margin != "") {
        finalObj.margin = this.editedCategory.margin;
      }
      var reqJSON = finalObj;
      if (this.$refs.form.validate()) {
        this.addItem(reqJSON).then((response) => {
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
      }
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
      var savePrice = {};
      savePrice.classType = this.installationModel.classType;
      savePrice.inchNumber = this.installationModel.inchNumber;
      savePrice.itemTypeCode = this.installationModel.itemTypeCode;
      savePrice.itemName = this.installationModel.itemName;
      savePrice.purchageRateWithTools =
        this.installationModel.purchageRateWithTools;
      savePrice.purchageRateWithoutTools =
        this.installationModel.purchageRateWithoutTools;
      savePrice.sellingRate = this.installationModel.sellingRate;
      savePrice.weldingType = this.installationModel.weldingType;
      savePrice.materialType = this.installationModel.materialType;
      var reqJSON = savePrice;
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
              // this.searchItem=  this.searchItem.replace("$", "/")
              this.getItem(this.searchItem);
              //location.reload();
            } else {
              this.text = "Installation not saved";
              this.activeColor = "red";
              this.snackbar = true;
            }
          })
          .then(() => {});
      }
    },

    postSingleItem(item) {
      if (this.searchItem == "") {
        alert("Search ItemType code");
      }
      this.itemModel.itemTypeCode = this.itemDetails.itemTypeCode;
      //  this.itemModel.itemName= this.itemDetails.itemTypeName;
      var reqJSON = this.itemModel;
      if (this.$refs.form.validate()) {
        this.postOneItem(reqJSON)
          .then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.activeColor = "green";
              this.snackbar = true;
              this.itemCard = false;
              this.itemModel = {};
              // this.itemPrices[pricecount].list.itemCode='';
              // this.searchItem=  this.searchItem.replace("$", "/")
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
          .then(() => {});
      }
    },
    //add price item row
    add(index) {
      // this.itemDetails.itemPrice.forEach(item => { item.rows.push(0) })
      this.itemDetails.itemPrice.splice(index + 1, 0, this.price);
      //this.index++
    },

    getItem() {
      this.searchItem = this.searchItem.replace("/", "$");
      var reqJSON = this.searchItem;

      this.getItemBySearch(reqJSON).then((response) => {
        this.itemDetails = response;
        this.itemPrices[0].list = {};
        this.itemFittingMapping = {};
        this.itemConsumableFittingMapping = {};
        this.installationPrices[0].list = {};
        if (response.status == 200) {
          this.itemVisible = true;
          this.itemFittingMapping.fittingCode = "";
          this.itemFittingMapping.quantity = 0;
          this.itemFittingMapping.status = "";
          this.itemFittingMapping.inputType = "";
          this.itemConsumableFittingMapping.quantity = 0;
          this.itemConsumableFittingMapping.status = "";
          this.itemConsumableFittingMapping.inputType = "";
        } else {
          //this.text=response.data.message;
          // this.snackbar=true;
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
      this.itemModel = obj;
      this.itemModel.classType = obj.classType;
      this.itemCard = true;
    },
    refreshItem() {
      this.itemModel = {};
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
  line-height: 2.6;
  max-width: 100%;
}
.bgtab {
  background-color: #313940 !important;
}

</style>