<template>
    <div style="margin: 0; padding: 0">
        <Navbar/>
      <v-card flat tile elevation="0">
        <v-toolbar
        dark
          flat
          style="position: sticky; z-index: 9; background-color:#313940 !important;"
  
   
        >
            <v-row class="mt-7">
              <v-col>
                <v-text-field
                  type="search"
                  v-model="boqId"
                  placeholder="Search Boq Code"
                  label="Search Boq  Code"
                  @input="getBoqId()"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="search"
                  v-model="boqObj.clientName"
                  placeholder="Client Name"
                  label="Client Name"
                  @input="getBoqId()"
                >
                </v-text-field>
              </v-col>
            </v-row>
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
        <!-- Items Start -->
        <v-tabs-items v-model="tab"> 
          <v-tab-item>
            <div class="overview">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px solid #e4e6e4;
                "
              >
                <p style="color: black; font-size: 14px; font-weight: 700">
                  <b> Contact Details</b>
                </p>
                <div>
                   <v-icon v-show="this.boqId !=''"
                   v-if="activefield == false"
                   @click="editcontact(boqObj)"
                   medium
                   >mdi-pencil
                  </v-icon>
                  <v-icon  v-show="this.boqId ==''"
                    v-if="activefield == false"
                    @click="savesinglecontact()"
                    medium
                    style="color: black"
                    >mdi-plus
                  </v-icon>
                  
                  <v-icon
                    v-if="activefield == true"
                    @click="backToCard()"
                    medium
                    style="color: black"
                    >mdi-arrow-left
                  </v-icon>
                </div>
              </div>
            </div>
            <div class="one" v-if="isItemDetails != false" v-show="this.boqId !=''" style="background-color:rgba(225,246,240,255); padding:20px;border: 1px solid rgba(129,207,252,255);border-radius:5px;" >
              <!-- first form start -->
              <v-form readonly >
                <v-row dense>
                  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.contactPersonName"
                      label="Contact Person Name"
                      dense
                      outlined
                      filled
                      
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Contact Person Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.contactPersonEmail"
                      label="Email ID"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Email ID<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.contactPersonPhone"
                      label="Phone Number"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Phone Number<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.clientCode"
                      label="Client Code"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Client Code<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.projectName"
                      label="Project Name"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Project Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.projectAddress"
                      label="Project Address"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Project Address<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.noOfBlocks"
                      label="No Of Blocks"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of Blocks<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.noOfFloors"
                      label="No Of Floors"
                      dense
                      filled
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of Floors<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.noOfPumpRooms"
                      label="No Of PumpRooms"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of PumpRooms<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.blockNames"
                      label="Block Names"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Block Names<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.noOfSections"
                      label="No Of Sections"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of Sections<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="boqObj.typeOfWork"
                      label="Type Of Work"
                      dense
                      outlined
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Type Of Work<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </div>
            <!-- second form start -->
            <div class="one" v-if="activefield == true"  style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
              <v-form 
              @submit.prevent="savecontact"
              ref="form"
              v-model="valid"
              lazy-validation
              >
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      v-model="saveboqdetails.clientCode"
                      label="Client Code"
                      dense
                      class="text-input"
                      outlined  
                      :items="allClientCodes"            
                      :disabled="isItemEdited"
                      @change="getClientDetails(saveboqdetails.clientCode)"
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Client Code<strong class="red--text">* </strong>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.clientName"
                      label="Client Name"
                      :rules="nameRules2"
                      
                      dense
                      outlined
                      hint="Mandatory Field"
                     
                    >
                      <template #label>
                        Client Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.contactPersonName"
                      label="Contact Person Name"
                      dense
                      :rules="nameRules2"
                      outlined
                      hint="Mandatory Field"
                       
                    >
                      <template #label>
                        Contact Person Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.contactPersonEmail"
                      label="Contact Person Email"
                      dense
                      :rules="emailRules"
                      outlined
                      hint="Mandatory Field"
               
                    >
                      <template #label>
                       Contact Person Email<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.contactPersonPhone"
                      label="Contact Person Phone "
                      dense
                      :rules="phoneRules"
                      outlined
                      hint="Mandatory Field"
                 
                    >
                      <template #label>
                        Contact Person Phone<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.projectName"
                      label="Project Name"
                      dense
                      outlined
                    
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Project Name<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.projectAddress"
                      label="Project Address"
                      dense
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                       Project Address<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.noOfBlocks"
                      label="No Of Blocks"
                      dense
                      outlined
                      :rules="numberRules"
                      type="number" 
                      hint="Mandatory Field"
                      @keyup="addBlocks(saveboqdetails.noOfBlocks)"
                    >
                      <template #label>
                        No Of Blocks<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.noOfFloors"
                      label="No Of Floors"
                      dense
                      outlined
                      :rules="numberRules"
                      type="number" 
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of Floors<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="saveboqdetails.noOfPumpRooms"
                      label="No Of PumpRooms"
                      dense
                      :rules="numberRules"
                      type="number" 
                      outlined
                      hint="Mandatory Field"
                    >
                      <template #label>
                        No Of PumpRooms<strong class="red--text">* </strong>
                      </template>
                    </v-text-field>
                  </v-col>
                    <v-col cols="12" sm="6" md="3">
                   <v-text-field
                    label="No Of Sessions"
                    placeholder="No Of Sessions"
                    v-model="saveboqdetails.noOfSections"
                    outlined
                    :rules="numberRules"
                    type="number" 
                    dense
                    hint="Mandatory Field"  
                  >  
                    <template #label>
                        No Of Sections<strong class="red--text">* </strong>
                    </template>   
                  </v-text-field> 
                  </v-col>
                   <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      v-model="saveboqdetails.typeOfWork"
                      label="Type Of Work"
                      dense
                      outlined
                      :items="typeOfWorks"
                      filled
                      hint="Mandatory Field"
                    >
                      <template #label>
                        Type Of Work<strong class="red--text">* </strong>
                      </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <h4 style="float:left;margin-top:10px;">BLOCK NAMES</h4>
                  <v-row v-for="(block,index) in saveboqdetails.blockNames"
                      :key="index" style="margin-top:40px;margin-top:60px;">   
                    <v-col 
                      cols="3" 
                                
                     > 
                      <v-text-field
                        class="pl-2 pr-2 pt-2"
                        label="block"
                        placeholder="block"
                        v-model='block.blockName'                     
                        outlined
                        dense                         
                        hint="Mandatory Field"
                        required
                      >
                      </v-text-field>                   
                    </v-col>
                  </v-row>
                <v-btn type="submit" class="red white--text">save</v-btn>
              </v-form>
              <!-- Third form start -->      
            </div>
            <!-- second form end -->
          </v-tab-item>
          <!-- second section started -->
          <v-tab-item  v-if="this.boqId !=''">
            <v-dialog v-model="dialog" max-width="300px" persistent>
              <template v-slot:activator="{ on, attrs }" class="text-center" >
                <div style="padding: 10px; float: right" >
                  <b> Add New Section </b>
  
                  <v-icon
                    class="red white--text"
                    style="border-radius: 20px"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >mdi-plus</v-icon
                  >
                </div>
              </template>
  
              <v-card elevation="0">
                <v-form  @submit.prevent = "saveSection"
                          lazy-validation
                          v-model="valid"
                          ref="form">
                <v-card-text>
                 
                  <v-text-field
                    placeholder="Section Number"
                    label="Section Number"
                    v-model="sectionModel.boqSectionSNo"
                    outlined                
                    :rules="nameRules2"
                    dense
                  ></v-text-field>
                  <v-text-field
                    placeholder="Section Name"
                    label="Section Name"
                    v-model="sectionModel.sectionName"
                    outlined
                    :rules="nameRules2"
                    dense
                  ></v-text-field>
                </v-card-text>            
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click.prevent="closeSection">
                    Cancel
                  </v-btn>
                  <v-btn color="green darken-1" text type="submit">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
              </v-card>
            </v-dialog>
  
            <template >
              <v-expansion-panels focusable style="padding:10px;">
                <v-expansion-panel
                  style="1px dotted #a5a5a5 ;"
                  v-for="(section, index) in boqObj.sections"
                  :key="index"
                  @click="refreshItem()"
                >
                  <v-expansion-panel-header
                    style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;"
                  >
                    <span
                      style="
                        font-size: 20px;
                        font-weight:bold;
                        color: #1a1818;
                        padding: 5px;
               
                        margin-bottom:7px;
                        max-width: 50px;
                        text-align:center;
                        height: 24px;
                      "
                      >{{ section.boqSectionSNo }}.</span
                    >
                    <span style="color: #1a1818; font-weight: bolder"
                      >{{ section.sectionName }}</span
                    >
                    <span
                      style="
                        display: flex;
                        justify-content: right;
                        align-items: right;
                      "
                    >
                    <v-icon
                        medium
                        class="blue--text mr-5"
                        @click="editSection(section)"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        medium
                        class="red--text mr-5"
                        @click="deleteSection(section)"
                      >
                        mdi-delete
                      </v-icon></span
                    >
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="border: 1px dotted #a5a5a5"
                    ><br />
                        <v-card-text style="margin-top: -20px; margin-bottom: 20px">
                        <div style="height: 40px;background-color: #c6d6c2;"
                          class="
                            
                            lighten-5
                            text--black
                            mb-4
                            pt-2
                            pr-3
                            font-weight-black
                          "
                          align="right">
                          Add New Description
                              <v-icon
                            class="red white--text"
                            style="border-radius: 20px"
                            @click="itemCard2 = !itemCard2"
                            v-show="itemCard2 != true"
                            >mdi-plus</v-icon
                          >
                          <v-icon
                            v-show="itemCard2 == true"
                            class="red white--text"
                            style="border-radius: 20px"
                            @click="closeDesccard()"
                            >mdi-close</v-icon
                          >
                        </div>
                        <div v-if="itemCard2 != false">
                          <v-form style="mt-3" ref="form2" @submit.prevent="saveSectionItemDesc(section)"
                            v-model="valid"
                            lazy-validation>
                            <v-row class="mt-3">
                               <v-col cols="2">
                                <v-text-field
                                 label="I BOQ Item Desc No"
  
                                  outlined
                                  dense                               
                                  v-model="addItemDescription.iboqSecItemDesrSNo"
                                  no-resize
                                >                                
                                </v-text-field>
                              </v-col>
                              <v-col cols="10">
                                <v-textarea
                                 label="I BOQ Item Description"                               
                                  outlined
                                  dense                               
                                  v-model="addItemDescription.description"
                                  no-resize
                                  style="height:140px;"
                                >                                
                                </v-textarea>
                              </v-col>
                               <v-col cols="12" align="center">
                                <v-icon
                                  class="mt-0"
                                  medium
                                  style="color: black; cursor: pointer"
                                  @click="refreshSecItemDesc"
                                  >mdi-refresh</v-icon
                                >&nbsp;&nbsp;
                                <v-btn
                                  class="red white--text" 
                                 type="submit"
                                  >Save</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-form>
                        </div>
                      </v-card-text>
                      <!-- {{section.iboqSecItemDescr}} -->
                        <div style="margin-top:-30px">
                           <!-- :key="renderdescItem" -->
                        <v-data-table                      
                        :headers="DescHeaders"
                        :items="section.iboqSecItemDescr"             
                        :single-expand="singleExpand"             
                        dense
                        show-expand
                        class="elevation-1" 
                        sort-by="iboqsecItemDesrId"
                        item-key="iboqsecItemDesrId"                  
                        >
                        <template v-slot:item.actions="{ item }">
                          <v-icon small @click="editSecDesc(item)" color="blue"> mdi-pencil</v-icon>&nbsp;
                          <v-icon small @click="deleteSecDesc(item)" color="red"> mdi-delete</v-icon>
                        </template>
                          <template  v-slot:expanded-item="{ item }" >                           
                               <td :colspan="headers.length" style="padding: 10px">
                           <v-card-text style="margin-top: -20px; margin-bottom: 20px">
                        <div
                          style="height: 40px;background-color:#c6d6c2;"
                          class="
                            
                            lighten-5
                            text--black
                            mb-4
                            pt-2
                            pr-3
                            font-weight-black
                          "
                          align="right"
                        >
                        <!-- {{item}} -->
                          Add New Item
                          <v-icon
                            class="red white--text"
                            style="border-radius: 20px"
                            @click="itemCard = !itemCard"
                            v-show="itemCard != true"
                            >mdi-plus</v-icon
                          >
                          <v-icon
                            v-show="itemCard == true"
                            class="red white--text"
                            style="border-radius: 20px"
                            @click="closeItemCard"
                            >mdi-close</v-icon
                          >
                        </div>
                        <div :key="itemrender" v-if="itemCard != false">
                          <v-form class="mt-3" ref="form" @submit.prevent="saveItemForSection(section, index,item.iboqsecItemDesrId)"  
                            v-model="valid"
                            lazy-validation 
                            style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;"
                            >
  
                            <v-row class="mt-3">
                              <v-col cols="3">
                                <v-text-field
                                  label="Boq Item No"
                                  rows="3"
                                  outlined
                                  dense
                                  
                                  
                                  v-model="addItemModel.iboqItemSNo"
                                 
                                  no-resize
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-autocomplete
                                  class="col-sm col-md"
                                  label="Select Item Type"
                                  v-model="itemTypeCode"
                                  :items="itemTypeCodes"
                                  :rules="nameRules2"
                                  outlined
                                  dense                              
                                >
                                  <template #label>
                                    Select Item Type<strong class="red--text"
                                      >*
                                    </strong>
                                  </template>
                                </v-autocomplete>
                              </v-col>
  
                              <v-col cols="3">
                                <v-text-field
                                  readonly
                                  label="Item Type Name"  
                                  :items="itemTypeCodes"                           
                                  v-model="addItemModel.itemTypeName"
                                  :rules="nameRules2"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  label="Sub Category Name"
                                  v-model="addItemModel.subCatogeryName"
                                  outlined
                                  dense
                                  :rules="nameRules2"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-autocomplete
                                  class="col-sm col-md"
                                  label="Select Material Type"
                                  :items="materialList"
                                  v-model="addItemModel.materialType"
                                  outlined                                               
                                  required
                                  dense
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="4">
                             
                                <v-autocomplete
                                  class="col-sm col-md"
                                  label="Select Class Type"
                                  :items="itemClassTypeList"
                                  v-model="addItemModel.classType"
                                  outlined                                               
                                  required
                                  dense
                                ></v-autocomplete>
                              </v-col>
                              <v-col
                                v-for="(item, index) in boqObj.blockNames"
                                :key="index"
                              >
                                <v-text-field
                                  :label="item"
                                  v-model="finalblockListValues[index]"
                                  outlined
                                  dense
                                  :rules="nameRules2"
                                  required
                                
                                  :placeholder="item"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" align="center">
                                <v-icon
                                  class="mt-0"
                                  medium
                                  style="color: black; cursor: pointer"
                                  @click="refreshItem"
                                  >mdi-refresh</v-icon
                                >&nbsp;&nbsp;
                                <v-btn
                                  class="red white--text" 
                                 type="submit"
                                  >Save</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-form>
                        </div>
                      </v-card-text>
  
                      <br />
                      <br />
                      <br />
  
                      <!-- ADD Fitting Types -->
  
                        <!-- :expanded.sync="expanded" -->
                        <div style="margin-top:-80px">
                          <v-data-table                           
                            :headers="headers"
                            :items="item.iboqItems"
                            dense
                            class="elevation-1 sample1"                          
                          >                   
                            <template v-slot:item.totalQuantity="{ item }">                          
                              <td>{{item.totalQuantity}}</td>                                                                                   
                            </template>
                               <template v-slot:item.actions="{ item }">
                               <v-icon small @click="editItem(item)" color="blue">
                                mdi-pencil</v-icon
                              >&nbsp;
                              <v-icon
                                small
                                @click="deletesectionItem(item)"
                                color="red"
                              >
                                mdi-delete</v-icon
                              >                                                                                  
                            </template>
                              </v-data-table>
                              </div>
                               </td>
                             </template>
                        </v-data-table>
                        </div>
                      
                      <v-dialog v-model="dialogedit" max-width="300px">
                        <v-card style="text-align:center;">
                          <v-card-title class="white" style="font-size: 15px;"
                            > Edit your Section Details
                            ?</v-card-title
                          >
                        
                          <v-form 
                          @submit.prevent="confirmedit(section)"
                          lazy-validation
                          v-model="valid"
                           ref="form"
                          style="padding:20px; width:200px;margin-left:10px;">
                          <v-text-field
                              outlined
                              dense
                              label="Section Number"
                              v-model="section.boqSectionSNo"
                              :rules="nameRules2"
                              >
  
                              </v-text-field>
                              <v-text-field
                              outlined
                              dense
                              label="Section Name"
                              v-model="section.sectionName"
                              :rules="nameRules2"
                              >
  
                              </v-text-field>
                      
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="canceledit()"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                             type="submit"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-dialog>
  
                  
  
                      <v-dialog v-model="dialogDelete2" max-width="500px">
                        <v-card>
                          <v-card-title class="white" style="font-size: 20px"
                            >Are you sure you want to delete whole Section
                            ?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialogDelete2 = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="confirmToDelete()"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- Delete Whole section Description Details -->
                       <v-dialog v-model="dialogDeleteDesc" max-width="650px">
                        <v-card>
                          <v-card-title class="white" style="font-size: 20px"
                            >Are you sure you want to delete Description details
                            ?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialogDeleteDesc = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="confirmdeleteSecDesc()"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- Delete Whole Item Details -->
  
                      <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                          <v-card-title class="white" style="font-size: 20px"
                            >Are you sure you want to delete Item details
                            ?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialogDelete = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="confirmdeleteItem()"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    <!-- </v-card> -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>           
            </template>
            <!-- c-boq table generate -->
                         <!-- {{cboqshow}}  -->
            <div style="margin-top:20px; float:right; margin-right:5px; padding:10px;" >
            
               <v-btn  color="error" @click="boqidcboqgenerate(boqId)" 
               :disabled="boqObj.hasOwnProperty('cboqs')" 
               >C-BOQ Generate</v-btn>       
            </div>
                      
           
          </v-tab-item>
          <!-- second section ended -->
  
          <!-- Third section started -->
          <v-tab-item v-if="this.boqId !=''">    
            <v-card-text v-for="(bObject , index) in boqObj.cboqs" :key="index">
            <!-- {{bObject.cboqItems}}   -->
             <v-data-table
              :headers="cheaders"
              :items="bObject.cboqItems"
              :single-expand="singleExpand"           
              item-key="cboqItemId"
              dense
              show-expand
             @item-expanded="onExpand"
              class="elevation-1"
             >    
             <template v-slot:expanded-item="{ headers , item }">
                 <td :colspan="headers.length">
                   <v-card-text style="margin-bottom: 40px;">
                     <div
                         style="height: 45px;background-color:#c6d6c2;"
                        class="
                             
                            lighten-5
                            text--black
                            mb-4
                            pt-2
                            pr-3
                            font-weight-black
                          "
                              align="right"
                            >
                        <!-- <span style="float:left; margin-left:4px;">All Fitting Lists</span> -->
                        <v-btn small color="blue white--text"  @click="getFittings(item)" style="float:left;margin-left:10px;">Show Existing Fittings</v-btn>&nbsp;
  
                          Add New Fittings                          
                          <v-icon class="red white--text"
                                      style="border-radius: 20px;" v-if="fittingcard==false"  @click="openItemFittings()">mdi-plus</v-icon>
                          <v-icon  class="red white--text"
                                      style="border-radius: 20px"  v-if="fittingcard==true" @click="refreshFittings()">mdi-close</v-icon>
                                      
                          Add Consumable Fittings            
                          <v-icon class="red white--text"
                                      style="border-radius: 20px" v-if="fittingcard2==false"  @click="openConsItemFittings()">mdi-plus</v-icon>
                          <v-icon  class="red white--text"
                                      style="border-radius: 20px"  v-if="fittingcard2==true" @click="refreshConsFittings()">mdi-close</v-icon>
                      </div>
                      
                      <div v-if="fittingcard == true">
                          <v-form ref="form"  @submit.prevent="saveFittingTypes123(item)" v-model="valid" lazy-validation style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;">
                            <h3>Add Fittings</h3>
                                <v-row class="mt-3" v-for="(fitting,index) in boqFittingArray" :key="index">
                                  <v-col md="3">
                                     <v-autocomplete
                                    required
                                    placeholder="Select Ft Sub Category"
                                    label="Select Ft Sub Category"
                                    :items="fittingCategoryList"
                                    :rules="nameRules"
                                    dense
                                    outlined
                                    v-model="boqFittingArray[index].itemFittingMapping.subCategoeryName"
                                    @change="getFittingtypebycategory(boqFittingArray[index].itemFittingMapping.subCategoeryName,index)"
                                    >
                                    </v-autocomplete>
                                  </v-col>
                                  <v-col md="3">
                                     <v-autocomplete
                                    placeholder="Select Fitting Type"
                                    label="Select Fitting Type"                             
                                     v-model="boqFittingArray[index].itemFittingMapping.fittingTypeCode"
                                    :items="boqFittingArray[index].fittingTypeList"
                                    :rules="nameRules"
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col>  
  
                                     <v-col md="3">
                                       <!-- {{boqFittingArray[index].materialsType}} -->
                                     <v-autocomplete
                                    placeholder="Material Type"
                                    label="Material Type"                             
                                    v-model="boqFittingArray[index].itemFittingMapping.materialType"
                                    :items="boqFittingArray[index].materialsType"
                                 
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col> 
                                 <v-col md="3">
                                     <v-autocomplete
                                    placeholder="Class Type"
                                    label="Class Type"                             
                                     v-model="boqFittingArray[index].itemFittingMapping.classType"
                                    :items="boqFittingArray[index].ClassTypes"
                                  
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col> 
                                  
                                  <v-col md="3">
                                      <v-autocomplete
                                        placeholder="Input Type"
                                        v-model="boqFittingArray[index].itemFittingMapping.inputType"
                                        :items="classTypeList"
                                        label="Input Type"
                                        :rules="nameRules"
                                        dense
                                       outlined
                                       required
                                      >
                                      <template #label>
                    Input Type <strong  class="red--text">* </strong>
                                </template>
                                      </v-autocomplete>
                                    </v-col>   
                                     <v-col md="3"  v-show="boqFittingArray[index].itemFittingMapping.inputType == 'INPUT_BOQ' || boqFittingArray[index].itemFittingMapping.inputType == 'FIXED'"> 
                                      <v-text-field
                                        placeholder="Quantity"
                                        v-model="boqFittingArray[index].itemFittingMapping.quantity"
                                        label="Quantity" 
                                        dense
                                        type="number"
                                    outlined
                                      >
                                      <template #label>
                    Quantity<strong  class="red--text">* </strong>
                  </template>
                                      </v-text-field>
                                    </v-col>  
                                    <!-- v-show="boqFittingArray[index].itemFittingMapping.inputType=='DERIVED'"  -->
                                     <v-col md="3" v-show="boqFittingArray[index].itemFittingMapping.inputType=='DERIVED'">
                                      <v-autocomplete 
                                        placeholder="Formula"                                   
                                        :items="formulasList"
                                        label="Formula" 
                                         v-model="boqFittingArray[index].itemFittingMapping.formula"
                                        required
                                        dense
                                        outlined
                                      >
                                      <template #label>
                                        Formula<strong  class="red--text">* </strong>
                                      </template>
                                      </v-autocomplete>                             
                                    </v-col>  
                                    
                                    <v-col>
                                      <v-icon class="green--text pl-2 pr-2 pt-2" @click="addFittingModelboq()">mdi-plus</v-icon>
                                          <v-icon class="red--text pl-2 pr-2 pt-2" @click="deleteFittingModelboq(index)" v-if="boqFittingArray.length > 1" >mdi-delete</v-icon>
                                      </v-col>                  
                                </v-row> 
                                 <v-btn type="submit" class="red white--text">save</v-btn> 
                          </v-form>
                      </div> 
  
                      <!-- Item Consumable fitting mapping form start -->
  
                       <div v-if="fittingcard2==true">
                         
                          <v-form ref="form"  @submit.prevent="saveConsFittingTypes123(item)" v-model="valid" lazy-validation style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;">
                            <h3>Add Consumable</h3>
                                <v-row class="mt-3" v-for="(fitting,index) in boqFittingArray2" :key="index">
                                  <v-col md="3">
                                     <v-autocomplete
                                    required
                                    placeholder="Select Ft Sub Category"
                                    label="Select Ft Sub Category"
                                    :items="fittingCategoryList2"
                                    :rules="nameRules"
                                    dense
                                    outlined
                                    v-model="boqFittingArray2[index].itemFittingMapping2.subCategoeryName"
                                    @change="getFittingtypebyconcategory(boqFittingArray2[index].itemFittingMapping2.subCategoeryName,index)"
                                    >
                                    </v-autocomplete>
                                  </v-col>
                                  <v-col md="3">
                                     <v-autocomplete
                                    placeholder="Select Fitting Type"
                                    label="Select Fitting Type"                             
                                     v-model="boqFittingArray2[index].itemFittingMapping2.fittingTypeCode"
                                    :items="boqFittingArray2[index].fittingTypeList2"
                                    :rules="nameRules"
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col> 
                                  <v-col md="3">
                                     <v-autocomplete
                                    placeholder="Material Type"
                                    label="Material Type"                             
                                     v-model="boqFittingArray2[index].itemFittingMapping2.materialType"
                                    :items="boqFittingArray2[index].materialssType"
                                  
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col>  
                                  <v-col md="3">
                                     <v-autocomplete
                                    placeholder="Class Type"
                                    label="Class Type"                             
                                     v-model="boqFittingArray2[index].itemFittingMapping2.classType"
                                    :items="boqFittingArray2[index].ClassTypess"
                                    
                                    dense
                                  outlined
                                  required
                                    >
                                    </v-autocomplete>
                                  </v-col> 
                                  <v-col md="3">
                                      <v-autocomplete
                                        placeholder="Input Type"
                                        v-model="boqFittingArray2[index].itemFittingMapping2.inputType"
                                        :items="classTypeList"
                                        label="Input Type"
                                        :rules="nameRules"
                                        dense
                                       outlined
                                       required
                                      >
                                      <template #label>
                    Input Type <strong  class="red--text">* </strong>
                  </template>
                                      </v-autocomplete>
                                    </v-col>   
                                     <v-col md="3" v-show="boqFittingArray2[index].itemFittingMapping2.inputType == 'INPUT_BOQ' || boqFittingArray2[index].itemFittingMapping2.inputType == 'FIXED'"> 
                                      <v-text-field
                                        placeholder="Quantity"
                                        v-model="boqFittingArray2[index].itemFittingMapping2.quantity"
                                        label="Quantity" 
                                        dense
                                        type="number"
                                    outlined
                                      >
                                      <template #label>
                    Quantity<strong  class="red--text">* </strong>
                  </template>
                                      </v-text-field>
                                    </v-col>  
                                    <!-- v-show="boqFittingArray[index].itemFittingMapping.inputType=='DERIVED'"  -->
                                     <v-col md="3" v-show="boqFittingArray2[index].itemFittingMapping2.inputType=='DERIVED'">
                                      <v-autocomplete 
                                        placeholder="Formula"                                   
                                        :items="formulasList"
                                        label="Formula" 
                                         v-model="boqFittingArray2[index].itemFittingMapping2.formula"
                                        required
                                        dense
                                        outlined
                                      >
                                      <template #label>
                                        Formula<strong  class="red--text">* </strong>
                                      </template>
                                      </v-autocomplete>                             
                                    </v-col>  
                                    <v-col>
                                      <v-icon class="green--text pl-2 pr-2 pt-2" @click="addConsFittingModelboq()">mdi-plus</v-icon>
                                          <v-icon class="red--text pl-2 pr-2 pt-2" @click="deleteConsFittingModelboq(index)" v-if="boqFittingArray2.length > 1" >mdi-delete</v-icon>
                                      </v-col>                  
                                </v-row> 
                                 <v-btn type="submit" class="red white--text">save</v-btn> 
                          </v-form>
                      </div>                 
                      
                       <v-data-table                 
                        v-if="item.cboqItemFittings"
                       :headers="fittingmapping"
                       :items="item.cboqItemFittings"
                       :hide-default-footer="true"
                        disable-pagination
                       >  
  
                         <template v-slot:item.quantity="{ item }">
                                    <input
                                     style="
                                     border:1px solid black; 
                                     width:50px;
                                     text-align:center;
                                     font-weight:bold;
                                     border-radius:4px;
                                    "                                   
                                    label="quantity"
                                    v-model="item.quantity"
                                    dense
                                    solo
                                    :disabled="item.isFixed"
                                    @blur ="updateAllFittings(item)"
                                      
                                    /> 
                                   </template>                     
                       </v-data-table>
                  
                       <div v-if="isdatatable == true" style="margin-top:15px;">
                        <v-data-table    
                        v-show="isdatatable"                  
                        :key="existingFittingMapKey"               
                        :headers="fittingmapping123"
                        :items="globalFittingList"                      
                        >
                      </v-data-table>
                       <v-btn @click="saveFittingTypes1234()" color="green" class="white--text" :disabled="existingbtn"  style="margin-top:10px;">Save</v-btn>
                       <v-btn @click="cancelsaveFittingTypes1234()" color="red" class="white--text"  style="margin-top:10px;">Cancel</v-btn>
                     </div>
                   </v-card-text>
                 </td>
              </template>         
             </v-data-table>
             <br>
             <v-btn color="red" class="white--text" @click="cboqfittingsgenerate(bObject.cboqId)" style="float:right;margin:20px;"  :disabled="boqObj.cboqs[index].hasOwnProperty('cboqFittings')">C-BOQ Fittings generate</v-btn>           
            </v-card-text>
            
          </v-tab-item>
          <!-- Third section ended -->
          <!-- fourth section start -->
          <v-tab-item v-if="this.boqId != ''" >
              <v-toolbar
              color="black"
              dark
              flat
              >
                <v-tabs
              v-model="tab1"
               align-with-title            
              >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                v-for="item in items1"
                :key="item"
              >
              {{ item }}
            </v-tab>
            </v-tabs>
          </v-toolbar>
            <!-- </template> -->
  
            <v-tabs-items v-model="tab1">
              <!-- first inside c-boq item tab started -->
              <v-tab-item>
                  <v-data-table :key="cbogItemRender"
                   :headers="cbItemheaders"
                   :items="citemsArray"
                   :single-expand="singleExpand"             
                   dense            
                   class="elevation-1" 
                   sort-by="itemTypeCode"
                   item-key="itemTypeCode" 
                   :hide-default-footer="true"
                   disable-pagination 
                  >  
                  <template v-slot:item.selectedMakes="{ item }"  >
                  <v-autocomplete
                                  :items="item.makeList"
                                  v-model="item.selectedMakes"
                                
                                  dense
                                   
                                  multiple                          
                                  
                                >
                                </v-autocomplete>              
                   </template>
                    <template v-slot:item.weldingType="{ item }"  >
                      <v-autocomplete
                       :items="weldings"
                        v-model="item.weldingType"                              
                        dense                                 
                          
                      >
  
                      </v-autocomplete>
                    </template>
                </v-data-table>
                <span><v-btn class="white--text" color="green" @click="UpdateItemmakes(citemsArray)" style="float:left;margin-top:10px;margin:10px;">Save Item Makes</v-btn></span>
              </v-tab-item>
              <!-- first inside c-boq item tab ended -->
  
              <!-- second inside c-boq fittings tab started -->
              <v-tab-item  >
                <v-data-table :key ="rendercbfitting"
                :headers="cbfittingmapping"
                :items="cfittingsArray"
                :hide-default-footer="true"
                disable-pagination              
                >    
                <template v-slot:item.selectedMakes="{ item }"  >
                      <v-autocomplete
                                  :items="item.makeFittingList"
                                  v-model="item.selectedMakes"                                                                
                                  dense                                 
                                  multiple                        
                                  
                                >
                                </v-autocomplete>
                      </template>
                      
                <template v-slot:item.contingencyQuantity="{ item }" >
                  <input   
                  style="
                    border:1px solid black; 
                    width:50px;
                    text-align:center;
                    font-weight:bold;
                    border-radius:4px;
                  "   
                  v-model="item.contingencyQuantity"
                  dense
                  solo
                  
                  >
  
                </template>             
                </v-data-table>
                <span style="float:left;margin:10px;"><v-btn class="white--text" color="green" @click="Updatefittingmakes(cfittingsArray)">save fitting makes</v-btn></span>
              </v-tab-item>
                <!-- second inside c-boq fittings tab ended -->
  
                <!-- third inside tab-item started -->
                <v-tab-item :key="cboqMakerefresh">                
                  
                  <v-data-table 
                  :headers="getcboqMakeVendorMapping"
                  :items="cboqmakesvendorarray"
                  :hide-default-footer="true"
                  disable-pagination
                  >
                  <template v-slot:item.vendorCodes="{ item }"  >
                    <v-select             
                    :items="item.makeList"
                    v-model="item.vendorCodes"
                    multiple
                    dense      
                   
                                
                    >
  
                    </v-select>
                
                  </template>
                
                  </v-data-table>
                  <span style="float:left;margin:10px;"><v-btn class="white--text" color="green" @click="saveCboqvendorcodes()">Save Vendors</v-btn></span>
                      <v-btn color="red" class="white--text" @click="generateCboqvendors()" style="float:right;margin:10px;" :disabled="cboqsdata.hasOwnProperty('cboqVendorDtos')">
                        Generate C-BOQ Vendor
                      </v-btn>
                      <v-progress-circular
        v-show="isProgress == true"
       indeterminate :size="100"  color="green"
      >
       <v-avatar class="img">
        <!-- <img src="../../assets/trident2.png" size="30" alt="logo"> -->
       </v-avatar>
      </v-progress-circular>
                </v-tab-item>
                <!-- third inside tab-item ended -->             
            </v-tabs-items>
          </v-tab-item>
          <!-- fourth section end -->   
          <!-- fifth section start -->
          <v-tab-item v-if="this.boqId != ''">
            
            <v-expansion-panels focusable style="padding:10px;">
              <v-expansion-panel   
              v-for="(CVendor, index) in cboqgetVendorDtos"     
              :key="index"
              >
             
                <v-expansion-panel-header  style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;">
                    <span style="font-weight:bold;">{{ CVendor.vendorCode }} :  {{ CVendor.vendorName}}</span>
                
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <span style="background-color:#032c5a;color:white;float:left;padding:5px;border-radius:3px;" >Makes : {{CVendor.makes}}</span>
                  <span><v-btn class="white--text" color="green" style="float:right;margin-bottom:5px;" @click="resendenquiry(CVendor.id)">Resend enquiry</v-btn></span>
                  <v-data-table style="margin-top: 45px; "
                  :headers="cboqenquiries"
                  :items="CVendor.enquiries"
                  show-expand
                  :single-expand="singleExpand"
  
                 item-key="enquiryId"
                  >
                  <template  v-slot:expanded-item="{ item }" >
                   
                    <td :colspan="headers.length" style="padding: 10px">
                    
                      <v-card-text v-for="(cVendoritem,index) in CVendor.enquiries" :key="index">
                        
                      <v-data-table
                      style="margin-top:40px;"
                      :headers="cboqvendorallItems"
                      :items="cVendoritem.vendorItems"
                      :hide-default-footer="true"
                      disable-pagination
                      >
                      </v-data-table>
                      </v-card-text>
                    </td>
                  </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn class="white--text" color="red" style="float:right;margin:10px;" @click="Generateeboq()">Generate E-BOQ</v-btn>
          </v-tab-item>
          <!-- fifth section end -->
          <!-- sixth section start -->
          <v-tab-item v-if="this.boqId != ''">
             
            <v-expansion-panels focusable style="padding:10px;">
                 <v-expansion-panel   
                  v-for="(eBoqs,index) in Eboqsdata" :key="index"
                >
                 <v-expansion-panel-header  style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;">
                <span style="font-weight:bold;max-width:70px">ID: {{ eBoqs.id }} </span> 
                <span style="font-weight:bold;margin-right:10%;">Status: {{ eBoqs.status}} </span>
                <span style="font-weight:bold;text-align:right;margin-right:15px;">Type Of Work: {{boqObj.typeOfWork}}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>     
                <div  style="border:1px solid black;padding:10px 0px;background-color: #032c5a;color: white;">
                  <span style="font-weight:bold;font-size: 14px;">  Margin Price: </span> <span style="color:red;">&#8377;</span>{{ eBoqs.marginPrice }}&nbsp;&nbsp;
                    <span style="font-weight:bold;font-size: 14px;">Supply Price: </span> <span style="color:red;">&#8377;</span>{{ eBoqs.supplyPrice }}&nbsp;&nbsp;
                  <span style="font-weight:bold;font-size: 14px;">  Transport Price:</span> <span style="color:red;">&#8377;</span>{{ eBoqs.transportPrice }}&nbsp;&nbsp;
                 <span style="font-weight:bold;font-size: 14px;">   Fitting Price:</span> <span style="color:red;">&#8377;</span>{{ eBoqs.fittingsPrice }}&nbsp;&nbsp;
                   <span  style="font-weight:bold;font-size: 14px;"> Installation price:</span> <span style="color:red;">&#8377;</span> {{ eBoqs.insatllationPrice }}&nbsp;&nbsp;<br>
                    <span style="font-weight:bold;color: red;font-size: 14px;">Total Price:</span> <span style="color:green;">&#8377;</span>{{ eBoqs.totalPrice }}&nbsp;&nbsp;   
                </div>
                     <v-toolbar
                     style="margin-top:20px;"
              color="black"
              dark
              flat
              >
                <v-tabs
              v-model="tab2"
               align-with-title            
              >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                v-for="item in items2"
                :key="item"
              >
              {{ item }}
            </v-tab>
            </v-tabs>
            <v-btn color="red" @click="GenerateQuotes(index)" >Generate Quote</v-btn> &nbsp;
                    <v-btn color="red" @click="ReGenerateQuotes(index)" >Re Generate Quote</v-btn>
          </v-toolbar>
                  <v-tabs-items v-model="tab2">
                    <v-tab-item>
                  
                      <v-data-table
                        :headers="eboqAllItems"
                        :items="eBoqs.eboqItems"
                        :hide-default-footer="true"
                         disable-pagination
                      >
                      <template v-slot:item.availableMakeVendors="{item}">
                        <v-autocomplete
                       :items="item.availableMakeVendors"
                        v-model="item.selectedMakeVendor"
                     
                      dense
                   
                        >
  
                        </v-autocomplete>
                      
                      </template>
                      <template v-slot:item.makeVendorPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.makeVendorPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.marginAmount="{ item }">                          
                        <td><span>&#8377;</span>{{item.marginAmount.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.itemSellingRate="{ item }">                          
                        <td><span>&#8377;</span>{{item.itemSellingRate.toLocaleString()}}</td>                                                                                   
                      </template>
                      
                      <template v-slot:item.transport="{ item }">  
                                           
                        <input   
                            style="
                              border:1px solid black; 
                              width:50px;
                              text-align:center;
                              font-weight:bold;
                              border-radius:4px;
                            "   
                            v-model="item.transport"
                            dense
                            type="number"
                            solo
                            >    
                                                                                                     
                      </template>
                      <template v-slot:item.fittingsRate="{ item }">                          
                        <td><span>&#8377;</span>{{item.fittingsRate.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.makeSellingRate="{ item }">                          
                        <td><span>&#8377;</span>{{item.makeSellingRate.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.totalRate="{ item }">                          
                        <td><span>&#8377;</span>{{item.totalRate.toLocaleString()}}</td>                                                                                   
                      </template>
                      </v-data-table>
                      <v-btn  style="float:left;margin-top: 20px;" class="white--text" color="green" @click="saveItemMakevendorsdata(index,eBoqs.eboqItems)">Save</v-btn>
                    </v-tab-item>
                    <!-- first Inside tab item ended -->
                     <!-- second Inside tab-item started -->
                    <v-tab-item>
                       <v-data-table
                        :headers="eboqAllFittings"
                        :items="eBoqs.eboqFittings"
                        :hide-default-footer="true"
                        disable-pagination
                      >
                      <template v-slot:item.availableMakeVendors="{item}">
                        <v-autocomplete
                       :items="item.availableMakeVendors"
                        v-model="item.selectedMakeVendor"                     
                        dense                     
                        >
                        </v-autocomplete>
                      
                      </template>
                      <template v-slot:item.transport="{ item }">
                        <input
                            style="
                              border:1px solid black;
                              width:50px;
                              text-align:center;
                              font-weight:bold;
                              border-radius:4px;
                            "
                            v-model="item.transport"
                            dense
                            type="number"
                            solo
                            >
                      </template>
                      <template v-slot:item.marginAmount="{ item }">                          
                        <td><span>&#8377;</span>{{item.marginAmount.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.makeVendorPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.makeVendorPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.fittingSellingRate="{ item }">                          
                        <td><span>&#8377;</span>{{item.fittingSellingRate.toLocaleString()}}</td>                                                                                   
                      </template>
                      </v-data-table>
                      <v-btn style="float:left;margin-top: 20px;" class="white--text" color="green" @click="saveFittingMakevendorsdata(index,eBoqs.eboqFittings)">Save</v-btn>
                    </v-tab-item>
                    <!-- second Inside tab item ended -->
                     <!-- Third Inside tab-item started -->
                    <v-tab-item>
                        <v-data-table
                        :headers="eboqdashboard"
                        :items="eBoqs.dashBoard"
                        :hide-default-footer="true"
                         disable-pagination
                      >
                      <template v-slot:item.marginPercent="{ item }">
                  <input   
                  style="
                    border:1px solid black; 
                    width:50px;
                    text-align:center;
                    font-weight:bold;
                    border-radius:4px;
                  "   
                  v-model="item.marginPercent"
                  dense
                  type="number"
                  solo
                  >
                  </template>
                      </v-data-table>
                      <v-btn class="white--text" color="green" @click="updateMarginPercent(index,eBoqs.dashBoard)" style="float:left;margin-top: 20px;">Save</v-btn>
                    </v-tab-item>
                    <!-- Third Inside tab item ended -->
                  </v-tabs-items>
                </v-expansion-panel-content>
                 </v-expansion-panel>
            </v-expansion-panels>
          </v-tab-item>
          <!-- sixth section end -->
          <!-- seventh section start -->
          <v-tab-item v-if="this.boqId != ''">
            <v-expansion-panels focusable style="padding:10px;">
                 <v-expansion-panel   
                  v-for="(Quotes,index) in this.Quotesdata" :key="index"
                >
                <v-expansion-panel-header style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;margin-bottom:10px;">
                 <span style="font-weight:bold;">Quote ID:  {{ Quotes.quoteId }}</span>
                 <span style="float:right;text-align:right;">
                  <v-icon
                  large
                  color="green"
                  @click="getQuoteExceldata(Quotes.quoteId)"
                  >              
                    mdi-file-excel-box
                  </v-icon>
                  <v-icon
                  large
                  color="red"
                  @click="getQuotePdfdata(Quotes.quoteId)"
                  >               
                   mdi-file-pdf-box
                  </v-icon>
               
            </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content  v-for="(Quotesalldata,index) in Quotes.quoteSections" :key="index"> 
                  <span style="font-weight:bold;">{{ Quotesalldata.sectionName }}</span> 
             
                   <v-data-table
                   style="margin-top:10px;"
                   :headers="quotesdatatable"
                  :items="Quotesalldata.quoteSecItems"
                  :hide-default-footer="true"
                  disable-pagination
                   >
                   <template v-slot:item.insatllationPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.insatllationPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.supplyPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.supplyPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.fittingsPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.fittingsPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                      <template v-slot:item.totalPrice="{ item }">                          
                        <td><span>&#8377;</span>{{item.totalPrice.toLocaleString()}}</td>                                                                                   
                      </template>
                   </v-data-table>
                  
                  </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
          </v-tab-item>
          <!-- seventh section end -->
        </v-tabs-items>
      </v-card>
  
      <!-- </v-container> -->
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
//   import enquiryVue from './enquiry.vue';
  export default {
    name: "BoqCreation",
    mixins: [servicescall],
    props: ["modelValue"],
    emits: ["update:modelValue"],
    components:{
        Navbar,
    },
    data() {
      return {
        componentKey:0,     
        editedIndex:-1,
        defaultCategory:{
          "selectedMakes":[],
        },
        Quotesexceldata2:[],
        Quotesexceldata:[],
       ExcelQuotes:[],
        gQuote:true,
        quotesdatatable:[
          {text:'QuoteSectionItemNo', value:'quoteSecItemSno'},
          {text:'Description', value:'description',width:'400px'},
          {text:'Quantity', value:'quantity'},
          {text:'InstallationPrice', value:'insatllationPrice'},
          {text:'SupplyPrice', value:'supplyPrice'},
          {text:'FittingPrice', value:'fittingsPrice'},
          {text:'TotalPrice', value:'totalPrice'},
        ],
        Quotesdata:[],
        weldingsall:{
          weldingType:'',
        },
        cboqsdata:[],
        saveMakevendors:[],
        saveFittingMakevendors:[],
        Eboqsdata:[],
        cboqFgenerate:false,
        isProgress:false,
        cboqgetVendorDtos:[],
        allvendorcodes:[],
        makesLists:[],
        saveCboq:false,
        cboqfittingg:false,
        getvendorcodes:[],
        vendorcodearray:[],
        getcboqid:'',
        cboqmakesvendorarray:[],
        cboqgetVendorDtos:[],
        cboqVendorscode:[],
        cbVendorItemdetails:[],
        showfittingcategorydailog:false,
        showcategorydailog:false,
        showvendordailog:false,
        citemsArray:[],
        cfittingsArray:[],
        cMakevendormappings:[],
        cboqVendorenquiries:[],
        cboqVendorItems:[],
        allmakes:[],
        getallmakes:[],
        getallfittingmakes:[],
        getfittingallmakes:[],
        cboqItemselectedmakes:{},
        cboqFittingselectedmakes:{},
        cboqvendorCodemakes:{},
        vcodes:{
          vendorCodes:[],
        },
        makess:{
          selectedMakes:[],
        },
        gridApi:null,
        getMakes:[],
        Itemselectmakes:[],
        Fittingselectmakes:[],
        Fittingselectmakes:[],
        fittingselectmakes:[],
        cboqshow:false,
        refreshfittingselectbox:"",
        //  generateCboq : false,
  
        existingbtn:false,
       
        isdatatable:false,
        typeOfWorks:['Supply Only','Supply & Installation', 'Installation Only','Fittings Only','Fittings & Installation'],
        isgenerate: false,
        eboqAllItems:[
          {text:'CategoryName', value:'categoryName'},
           {text:'Sub CategoryName', value:'subCategoryName',width: "300px"},
            {text:'ItemTypeCode', value:'itemTypeCode'},
            {text:'ItemTypeName', value:'itemTypeName',width: "300px"},
            {text:'WeldingType', value:'weldingType'},
             {text:'MakeVendors', value:'availableMakeVendors',width: "300px"},
              {text:'SelectMake', value:'selectedMake',width: "300px"},
               {text:'SelectedVendor', value:'selectedVendor',width: "400px"},           
                 {text:'Transport', value:'transport'},
                  {text:'WastagePercent', value:'wastagePercent'},
                   {text:'WastageAmount', value:'wastageAmount'},
                    {text:'MarginPercent', value:'marginPercent'},                 
                     {text:'MarginAmount', value:'marginAmount'},  
                     {text:'VendorPrice', value:'makeVendorPrice'},             
                      {text:'ItemSellingRate', value:'itemSellingRate'},                   
                       {text:'FittingsRate', value:'fittingsRate'},
                       {text:'Installation Rate', value:'installationRate'},
                        {text:'MakeSellingRate', value:'makeSellingRate'},
                         {text:'TotalQuantity', value:'totalQuantity'},
                          {text:'TotalRate',value:'totalRate',width: "200px" },
                         
  
        ],
        eboqAllFittings:[
           {text:'CategoryName', value:'categoryName'},
           {text:'Sub CategoryName', value:'subCategoryName'},
            {text:'FittingTypeCode', value:'fittingTypeCode'},
            {text:'FttingTypeName', value:'fittingTypeName'},
             {text:'MakeVendors', value:'availableMakeVendors',width: "300px"},
              {text:'SelectMake', value:'selectedMake',width: "300px"},
               {text:'SelectedVendor', value:'selectedVendor',width: "350px"},           
                 {text:'Transport', value:'transport'},
                  {text:'WastagePercent', value:'wastagePercent'},
                 
                   {text:'WastageAmount', value:'wastageAmount'},
                    {text:'TotalQuantity', value:'totalQuantity'},
                    {text:'MarginPercent', value:'marginPercent'},
                     {text:'MarginAmount', value:'marginAmount'},
                     {text:'VendorPrice', value:'makeVendorPrice'},
                      {text:'FittingSellingRate', value:'fittingSellingRate'},
                      
                     
        ],
        eboqdashboard:[
          {text:'CategoryName', value:'categoryName'},
          {text:'MarginPercent', value:'marginPercent'},
        ],
        cboqvendorallItems: [
          {text:'Sno', value:'sno'},
          { text: 'Item Code', value : 'itemCode' },
          { text: 'Make Name', value : 'makeName' },
          { text: 'Item Description', value : 'itemDescription' },
          { text: 'Part No', value : 'partNumber' },
          { text: 'Quantity', value : 'quanity' },
          { text: 'Price', value : 'price' },
        ],
        cboqenquiries: [
          { text: 'Enquiry ID', value : 'enquiryId' },
          { text: 'Enquiry Date', value : 'enquiryDate' },
          { text: 'Enquiry Response Date', value : 'enquiryResponseDate' },
          { text: 'Status', value : 'status' },
  
        ],
        getcboqMakeVendorMapping: [
          { text: 'Make Code', value : 'makeCode' },
          { text: 'Make Name', value : 'makeName' },
          { text: 'Vendors', value : 'vendorCodes' },
        ],
        cboqMakerefresh:0,
        cboqMakeVendorMapping: [
          { text: 'Make Code', value : 'makeCode' },
          { text: 'Make Name', value : 'makeName' },
          { text: 'Vendors', value : 'vendors' },
        ],
        cbItemheaders: [
          { text: 'Sub Category Name', value: 'subCatogeryName' },
          { text: 'ItemTypeCode', value: 'itemTypeCode' },
          {  text: 'ItemTypeName', value: 'itemTypeName' },
          { text: 'Selected Makes', value: 'selectedMakes' },
          { text: 'Welding Types', value: 'weldingType'},
          { text: "Type Key", value: "typeKey" },
          { text: "Total Quantity", value: "totalQuantity"}
        ],
          cheaders: [      
          { text: 'Sub Category Name', value: 'subCatogeryName' },
          { text: 'ItemTypeCode', value: 'itemTypeCode' },
          {  text: 'ItemTypeName', value: 'itemTypeName' },
          { text: "Type Key", value: "typeKey" },
          { text: 'Section Item Info', value: 'makeString' },
          { text: 'Total Quantity', value: 'totalQuantity' },
        ],
         cheaders2: [
           { text: 'Sub Category Name', value: 'subCatogeryName' },
          { text: 'ItemTypeCode', value: 'itemTypeCode' },
             {  text: 'ItemTypeName', value: 'itemTypeName' },
          // { text: 'Section Item Info', value: 'secItemInfo' },
          { text: 'Sub Category Name', value: 'subCatogeryName' },
          { text: 'Total Quantity', value: 'totalQuantity' },
        ],
        expanded:[],
        // singleExpand2: true,
        renderdescItem:0,
        set1:[],
        set2:[],
        dialogDeleteDesc : false,
        // iboqsecItemDesrId:'',
        DescHeaders: [
          { text: " Desc No ", value: "iboqSecItemDesrSNo"},
          { text: " Description ", value: "description",class:"pa-1",width: "750px" },
          { text: " Actions ", value: "actions"}
        ],
        addItemDescription:{
          description: '',
          boqSectionId: '',
          iboqsecItemDesrId: '',
          iboqSecItemDesrSNo:''
        },
         allClientDetails:[],
        allClientCodes:[],
        isItemDetails:true,
        dialogedit:false,
          // form:'',
          existingFittingMapKey:0,
          itemClassTypeList:[],
          classTypeListData:[],
          selectedBoqItemId:'',
          globalFittingList:[],
          ItemSelectedFittings:[],
         statusList:[
          {text:'Active',value:'true'},
          {text:'Inactive',value:'false'},
  
        ],
    
        classTypeList: [],
        fittingTypeList:[],
        fittingTypeList2:[],
        fittingCategoryList:[],
        fittingCategory:'',
        inputTyped:"INPUT_BOQ",
        isDisbled:false,
        fittingBlockInfoList:[],
        selectBoqItemTypeCode:'',
        finalblockList:[],
        finalblockListValues: [],
        fittingsList: [],
        inputTypeList: [],
        formulasList: [],
        allfittingsData: [],
        fittingcard: false,
        fittingcard2: false,
        cbvendorcard: false,
        expanded: [],
        singleExpand: true,
        // singleExpands: true,
        itemCard: false,
        itemCard2: false,
        delsectionitems: "",
        deleteSectionDesc: "",
        deleteSections: "",
        sections: [],
        dialogDelete: false,
        dialogDelete2: false,
        fittingList: [],
        headers1: [
          { text: " S.No ", value: "iboqItemSNo",width: "40px",sortable: true,class:"  pa-1",width: "40px"},
          // {
          //   text: " Description",
          //   sortable: false,
          //   value: "description",
          //   width: "200px"
          // },
          // { text: " Type Code", value: "itemTypeCode",width: "80px",sortable: false,class:"pa-1" },
          { text: "I.Name", value: "itemTypeName" ,class:"  pa-1", },
          { text: " Sub Cat Name", value: "subCatogeryName",class:"  pa-1",},
          { text: " Material", value: "materialType",class:"  pa-1",},
          // { text: " Makes", value: "selectedMakes",class:"pa-1",width: "80px" },
          { text: "Class Type", value: "classType",class:"  pa-1",},
          { text: "Quantity", value: "totalQuantity", sortable: false,class:"  pa-1", },
          { text: "Action", value: "actions", sortable: false,class:"  pa-1",width: "80px" },
        ],
        headers: [
          { text: " S.No ", value: "iboqItemSNo" },
          // {
          //   text: " Description",
          //   sortable: false,
          //   value: "description",
          //   width: "200px"
          // },
          // { text: " Item Type Code", value: "itemTypeCode" },
          { text: " Item Type Name", value: "itemTypeName" },
          { text: " Category name", value: "subCatogeryName" },
            { text: " Sub Cat Name", value: "subCatogeryName"},
          { text: " Material Type", value: "materialType" },
          // { text: " Makes", value: "selectedMakes" },
          { text: "Class Type", value: "classType"},
          // { text: " Total Quantity ", value: " totalQuantity "},
            { text: "Quantity", value: "totalQuantity", sortable: false },
          { text: "Action", value: "actions", sortable: false },
        ],
        cbfittingmapping: [
          { text: "Ft Type Code", value: "fittingTypeCode" },
           { text: "S Category Name", value: "subCatogeryName" },
           { text: "Makes", value: "selectedMakes"},
           {text: "Contingency Quantity", value: "contingencyQuantity"},
          { text: "Type Key", value: "typeKey"},
          { text: "F.Quantity", value: "quantity" ,sortable: false },        
          {  text: "T.Quantity", value: "totalQuantity"  },
        ],
        fittingmapping: [
          // {'text':'S.No' , 'value':'S.no'},
          
          { text: "Ft Type Code", value: "fittingTypeCode" },
           { text: "S Category Name", value: "subCategoeryName" },
          { text: "Type", value: "inputType" },
          { text: "Formula ", value: "formula" },
          { text: "ClassType ", value: "classType" },
          { text: "Material Type ", value: "materialType" },
          { text: "F.Quantity", value: "quantity" ,sortable: false },        
          {  text: "T.Quantity", value: "totalQuantity"  },
      
  
        ],
        fittingmapping123: [
          // {'text':'S.No' , 'value':'S.no'},
          { text: "Ft Sub Cat", value: "subCategoryName",class:"light-blue darken-4" },
          { text: "Ft Type Code", value: "fittingTypeCode",class:"light-blue darken-4" },
          // { text: "Fittings", value: "fittings",class:"light-blue darken-4" },
          { text: "Formula ", value: "formula",class:"light-blue darken-4" },
          // { text: "Quantity ", value: "quantity",class:"light-blue darken-4" },
          { text: "ClassType ", value: "classType",class:"light-blue darken-4" },
          { text: "Material Type ", value: "materialType",class:"light-blue darken-4" },
          { text: "Type", value: "inputType",class:"light-blue darken-4" },
          { text: "Quantity", value: "quantity" ,sortable: false,class:"light-blue darken-4" },
          
         // {  text: "T.Quantity", value: "totalQuantity"  },
         // { text: "Formula ", value: "formula" },
  
        ],
        itemBlockSave: false,
        dialog: false,
        isItemrender: 0,
        boolean: ["True", "False"],
        // item: ["totalQuantity"],
        check: false,
        itemrender: 0,
        itemrender2: 0,
        isItemEdited: false,
        activeColor: "",
        snackbar: false,
        status: "",
        searchItem: "",
        items: ["CONTACT DETAILS", "SECTION DETAILS", "ADD ITEM-FITTINGS / CONSUMABLES", "C-BOQ","C-BOQ VENDORS","E-BOQS","QUOTES"],
        items1: ["Items", "Fittings","Makes"],
        items2: ["E-BOQ ITEMS","E-BOQ-FITTINGS","DASHBOARD"],
        text: "",
        tab: null,
        tab1: null,
        tab2: null,
        text: "",
        // valids: false,
        valid: false,
        activefield: false,
        boqName: "",
        boqId: "",
        itemTypeCodeMakes: [],
        ani: [],
        sectionnamelist:[],
        CBoqSec: [],
        fit:[],
        // itemTypeList:[],
        itemTypeList: {},
        updateSectionKey: 0,
        boqSection: [
          {
            sectionDescription: "",
            itemType: "",
            materialType: "",
            classType: "",
            margin: "",
            wastageRate: "",
            transportRate: "",
            finalMake: "",
            finalItem: "",
          },
          // index:0,
        ],
        selectCategoryID: "",
        activeSection: false,
        materialList: [],
        itemTypeCodes: [],
  
        itemTypeCode: "",
        allItemsCodes: [],
        allitemsList: [],
        itemArray: [],
        selectedItems: [],
        boqObj: {},
  
        selectedItemMaterialList: [],
        selectedItemMakeList: [],
        selectedItemClassList: [],
        addBoqItemModel: {
          itemTypeCode: "",
          itemTypeName: "",
          categoryName: "",
          transportRate: "",
          materialType: [],
          selectedMakes: [],
          itemCode: [],
          // itemFittings: {},
          makes: {},
        },
        // blockNames:[],
        blockNamelist: [],
        itemBlockInfo: [
          {
            //  blockNames:[],
            quantity: "",
          },
        ],
        sectionJson: {
          itemType: "",
          ItemMake: "",
        },
  
        //section model
        sectionModel: {
          boqId: "",
          sectionName: "",
          boqSectionSNo: "",
        },
        // dymanically boq adding
        listModel: [
          {
            materialTypeList: [],
            classTypeList: [],
            itemMakeList: [],
          },
        ],
        selectedMakesList: [],
        iconChange: false,
          boqModel:{
              "clientCode":'',
              "projectName":'',
              // "clientCode":'',
              "blockNames":[
                {blockName:""}
              ],
              "clientName":'',
              "noOfBlocks":'',
              "noOfFloors":'',
              "noOfSections":'',
              "noOfPumpRooms":'',
              "supplyOnly" :false,
              "supplyAndInstallation":false,
              "installationOnly":false,
              "projectAddress":'',
              "contactPersonName":'',
              "contactPersonEmail":'',
              "contactPersonPhone":'', 
               "boqId": "",   
            },
        saveboqdetails: {
          "blockNames":[
                {blockName:""}
              ],
          boqId: "",
          noOfSections: "",
          clientName: "",
          contactPersonName: "",
          contactPersonEmail: "",
          contactPersonPhone: "",
         
          noOfBlocks: "",
          noOfFloors: "",
          noOfPumpRooms: "",
          typeOfWork: "",
          projectAddress:"",
          projectName:"",
          clientCode:"",
        },
         
            
        addItemModel: {
          iboqItemId: 0,
          subCatogeryName:'',
          iboqItemSNo: "",
          iboqsecItemDesrId: "",
          itemTypeName: "",
          catogeryName: "",
          description: "",
          materialType: "",
          classType:"",
          makes: [],
          transportRate: "",
          wastagePercent: "",
          quoteRate: "",
          itemBlockInfo: {},
          finalItem: "",
          finalmake: "",
          boqItemSNo: "",
          // fittingTypeCode:"",
          totalQuantity: "",
        },
        boqFittingArray:[{
          itemFittingMapping:
         {
            boqItemFittingId: 0,
            cboqItemId: 0,
            fittingTypeCode: "",
            formula: "",
            fittings:"",
            inputType: "",
            quantity: 0,
            subCategoeryName: "",
            finalFitting: "",
            materialType:'',
            classType:'',
          },
          // allFittings:[]
             materialsType:[], 
             ClassTypes:[],
          fittingTypeList:[]    
             
         }
        ],
        fittingCategoryList2:[],
          boqFittingArray2:[{
          itemFittingMapping2:
         {
            boqItemFittingId: 0,
            cboqItemId: 0,
            fittingTypeCode: "",
            formula: "",
            fittings:"",
            inputType: "",
            quantity: 0,
            subCategoeryName: "",
            finalFitting: "",
            materialsType:"",
            classType:"",
          },
          // allFittings:[] 
          materialssType:[], 
             ClassTypess:[],
          fittingTypeList2:[]    
             
         }
        ],
        editallItemmodel: [],
        messages: "Please add Block Info",
        nameRules: [
          (v) => !!v || "Field is required",
          // (v) => v.length <= 20 || "Name allows below 20 characters only",
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
        nameRules2: [
          (v) => !!v || "Field is required",        
        ],
        numberRules: [
          (v) => !!v || "Field is required",
          (v) =>
            /^[0-9]+(\.([0-9]{1,8})?)?$/.test(v) ||
            "only number with decimal are accepted",
        ],
        textareaRules: [
          // (v) =>
          //   (v || "").length <= 500 ||
          //   "Description must be 200 characters or less",
            (v) => !!v || "Field is required",
        ],
        emailRules: [
              v => !!v || "E-mail is required",
              v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
        phoneRules: [
        (v) => !!v || "Number is required",
        (v) => /^[0-9]+$/.test(v) || "only number are accepted",
        (v) =>
          (v && v.length <= 10 && v.length >= 10) ||
          "Mobile must be  10 number",
      ],
      };
    },
  
    mounted() { 
      this.getallweldingtypes();
      this.getClients();
      this.getAllClientdetails();
      this.getAllItemType();
      this.getFormulas();
      this.getFittingCategories();
      this.getConsFittingCategories();
      this.getInputType();
      if (this.$route.params.boqId) {
        this.boqId = this.$route.params.boqId;
        this.boqName = this.$route.params.boqName;
        
        this.getBoqId();
       
      }
    },
    watch: {
     
      itemType: function (item, idx) {
        this.getItemBySearch(this.itemType).then((response) => {
          this.addItemModel.itemTypeName = response.itemTypeName;
  
          this.selectCategoryID = response.categoryName;
          this.allitemsList = response.items;
  
          this.allItemsCodes = [];
          for (var i = 0; i < response.items.length; i++) {
            this.allItemsCodes.push({
              text: response.items[i].itemName,
              value: response.items[i].itemCode,
            });
          }
          var matlist = [];
          var classList = [];
          var itemMake = [];
          for (var i = 0; i < response.items.length; i++) {
            matlist.push(response.items[i].materialType);
            itemMake.push(response.items[i].itemMakeCode);
            classList.push(response.items[i].classType);
          }
          this.selectedItemMaterialList = [...new Set(matlist)];
  
          this.selectedItemMakeList = [...new Set(itemMake)];
          this.selectedItemClassList = [...new Set(classList)];
          this.selectedItemClassList = this.selectedItemClassList.filter(
            function (element) {
              return element !== undefined;
            }
          );
        });
      },
      
      itemArray: function () {
        this.selectedItems = [];
        for (var i = 0; i < this.itemArray.length; i++) {
          for (var j = 0; j < this.allitemsList.length; j++) {
            if (this.allitemsList[j].itemCode == this.itemArray[i]) {
              this.selectedItems.push(this.allitemsList[j]);
            }
          }
        }
      },
  
      itemTypeCode: function () {
        this.getItemTypeByBoq(this.itemTypeCode).then((response) => {
          this.getAllItemType();
          this.itemTypeList = response;
          this.addItemModel.itemTypeName = response.itemTypeName;
          // this.addItemModel.catogeryName = response.categoryName;
          this.addItemModel.classType = response.classType
          this.addItemModel.subCatogeryName = response.subCategoryName;
          this.addItemModel.transportRate = response.transportRate;
          this.addItemModel.margin = response.margin;
          this.addItemModel.wastagePercent = response.wastagePercent;
          this.addItemModel.itemCode = response.itemCode;
          this.materialList = response.materialType;
  
          this.itemTypeCodeMakes = Object.entries(response.makes).map((e) => ({
            text: e[0],
            // value: e[0],
          }));
                if(response.hasOwnProperty("classType")){   
           this.itemClassTypeList = Object.entries(response.classType).map(
            (entry) => entry[1]
          );   
                }
                else{
                  this.itemClassTypeList=[]
                }
        });
      },
    },
  
    methods: {
         getQuotePdfdata(ids){
        this.getQuotePDF(ids).then((response)=>{
         const link = document.createElement('a');
          link.href = window.URL.createObjectURL(
                  new Blob([response])
              );
      
              // Tell the browser to download, not render, the file.
              link.setAttribute('download', `${ids}.pdf`);
      
              // Place the link in the DOM.
              document.body.appendChild(link);
      
              // Make the magic happen!
              link.click();
        })
      },
      getQuoteExceldata(ids){
        this.getQuoteExcel(ids).then((response)=>{
         const link = document.createElement('a');
          link.href = window.URL.createObjectURL(
                  new Blob([response])
              );
      
              // Tell the browser to download, not render, the file.
              link.setAttribute('download', `${ids}.xlsx`);
      
              // Place the link in the DOM.
              document.body.appendChild(link);
      
              // Make the magic happen!
              link.click();
        })
      },
      ReGenerateQuotes(idx){
            var id=this.Eboqsdata[idx].id;
        this.regenerateQuote(id).then((response)=>{
          this.getBoqId();
          this.activeColor = "green";
          this.snackbar = true; 
          this.text = "Quote generated Successfully";
        })
      },
      getAllQuotes(){
        this.getQuotes(this.AllboqId).then((response)=>{
          this.Quotesdata = response;
        })
      },
      GenerateQuotes(idx){
        var id=this.Eboqsdata[idx].id;
        this.generateQuote(id).then((response)=>{
          this.getBoqId();
          this.activeColor = "green";
          this.snackbar = true; 
          this.text = "Quote generated Successfully";
        })
      },
      getallweldingtypes(){
        this.getAllWeldingType().then((response)=>{
          this.weldings=response;
        })
      },
     
      Generateeboq(){
        this.generateEboq(this.getcboqid).then((response)=>{
          this.getBoqId();
          this.activeColor = "green";
          this.gQuote=false;
          this.snackbar = true; 
          this.text = "E-BOQ generated Successfully";
        })
      },
      updateMarginPercent(idx,data){
        var id=this.Eboqsdata[idx].id;
          var reqdata=[];
          data.forEach((el)=>{
            reqdata.push({id:el.id,marginPercent:el.marginPercent})
          })
          this.upadteDashboardMargin(id,reqdata).then((response) => {
            if(response.status == 200){
                this.text = "marginPercent updated sucessfully";
                this.activeColor='green'
                this.snackbar = true;
                this.getBoqId();
              }else{
              this.text = response.data.message;
              this.activeColor = "red";
              this.snackbar = true;
              }       
              });
        },
      saveFittingMakevendorsdata(idx,item){
        var id=this.Eboqsdata[idx].id;
        var reqjson = [];
        for(var i=0;i<item.length;i++){        
          reqjson.push({id:item[i].id,selectedMakeVendor:item[i].selectedMakeVendor,transport:item[i].transport});
        }
        this.updateFittingmakeVendor(id,reqjson).then((response) =>{
          if (response.status == 200) {
            this.text = 'Fitting-Make-Vendor Prices are updated';
            this.snackbar = true;         
            this.activeColor = "green";        
            this.getBoqId();         
          } else {
            this.text = response.data.message;
            this.snackbar = true;     
            this.activeColor = "red";
        
          }
        })
      },
      saveItemMakevendorsdata(idx,item){
        var id=this.Eboqsdata[idx].id;
        var reqjson = [];
        for(var i=0;i<item.length;i++){        
          reqjson.push({id:item[i].id,selectedMakeVendor:item[i].selectedMakeVendor,transport:item[i].transport});
        }
        this.updateItemmakeVendor(id,reqjson).then((response) =>{
          if (response.status == 200) {
            this.text = 'Item-Make-Vendor Prices are updated';
            this.snackbar = true;         
            this.activeColor = "green";        
            this.getBoqId();         
          } else {
            this.text = response.data.message;
            this.snackbar = true;     
            this.activeColor = "red";
        
          }
        })
      },
      resendenquiry(id){
        this.sendresendenquiry(id).then((response) => {        
        this.text = "enquiry send successfully";
        this.activeColor='green'
        this.snackbar = true;
        this.getBoqId();
        })
      },
  
      generateCboqvendors(){
        this.isProgress=true;
        this.generateEnquiries(this.getcboqid).then((response) => {
          this.cboqgetVendorDtos = response;
          this.isProgress=false;
          this.getBoqId();
          this.activeColor = "green";
          this.snackbar = true; 
          this.text = "C-BOQ vendors generated Successfully";
        })
      },
  
      generatecboqMakes(){
        this.getMakeVendormappings(this.getcboqid).then((response) => {
  
          this.cboqmakesvendorarray = response;
          this.cboqmakesvendorarray.forEach((ele)=>{
            ele.makeList=[];
  
            this.getVendorCodes(ele.makeCode).then((response) => {
              ele.makeList=response;
  
            })
  
          })
          this.saveCboq = true;     
        })
      },
      
      opencvendorcard(){
        this.cbvendorcard = true;
      },
      refreshcvendorcard(){
        this.cbvendorcard = false;
      },
     openItemFittings(){
       this.fittingcard = true;
       this.fittingcard2 = false;
     },
     openConsItemFittings(){
       this.fittingcard = false;
       this.fittingcard2 = true;
     },
      onExpand({item,value}){
         this.globalFittingList = [];
         this.fittingcard = false;
           this.fittingcard2 = false;
           this.isdatatable = false;
      },
      getFittings(item){
        this.isdatatable = true;
         this.selectedBoqItemId=item.cboqItemId;
        this.getItemTypeByBoq(item.itemTypeCode).then((response) => {
          this.globalFittingList = Object.entries(response.itemFittings).map(
            (entry) => entry[1]
          );
        for(var i=0;i<this.globalFittingList.length;i++){               
                 this.globalFittingList[i].selectedFittings=[];
                  if(this.globalFittingList[i].inputType=="FIXED"){
                      this.globalFittingList[i].isFixed= true;
                  }
                  else{
                     this.globalFittingList[i].isFixed= false;
                  }
                
        }
        });
      },
      cboqfittingsgenerate(id){
        var Gfittings = id;
  
        this.generateCboqFittings(Gfittings).then((response) => {
        this.cboqFgenerate=true;
      // this.getfittingmakes();
          this.getBoqId();
           this.activeColor = "green";
           this.snackbar = true; 
           this.text = "C-BOQ Fittings generated Successfully";
        })
      },
      boqidcboqgenerate(id){
        var cboqId = id;
        this.getCboqbyId(cboqId).then((response) => {
          this.getBoqId();
           this.isgenerate = true;      
           this.activeColor = "green";
                this.snackbar = true; 
                this.text = "C-BOQ Item generated Successfully";
          //  if (response.data.status == 200) {
          //       this.text = response.data.message;
          //       this.activeColor = "green";
          //       this.snackbar = true;        
                
          //       // this.resetAddItemModel();
          //       this.getBoqId();
          //       this.isgenerate = true;
          //     } else {
          //       this.text = response.data.message;
          //       this.activeColor = "red";
          //       this.snackbar = true;
            
          //     }
        })
      },
      //block validation
      addBlocks(count){
              this.saveboqdetails.blockNames=[
                {blockName:""}
              ]
              for(var i=0;i<count-1;i++){
                 this.saveboqdetails.blockNames.push({'blockName':
            ''})
              }
           
          },
        getFittingtypebyconcategory(cat,index){
          this.getFittingTypeByCategory(cat).then((response)=>{
                   this.fittingTypeList2=[];
                   this.fittingType='';
                   for(var i=0;i<response.length;i++){
                     this.boqFittingArray2[index].fittingTypeList2.push(response[i].fittingTypeCode)
                     this.boqFittingArray2[index].materialssType = response[i].materialTypes
                     this.boqFittingArray2[index].ClassTypess = response[i].classType
                     // this.boqFittingArray[index].addFittingModel.fittingTypeCode = response.fittingTypeCode;                  
                   }
                }) 
        },
  
        //get all fitting categories
         getFittingtypebycategory(cat,index) {
               this.getFittingTypeByCategory(cat).then((response)=>{
                   this.fittingTypeList=[];
                   this.fittingType='';
                   for(var i=0;i<response.length;i++){
                     this.boqFittingArray[index].fittingTypeList.push(response[i].fittingTypeCode) 
                     this.boqFittingArray[index].materialsType = response[i].materialTypes
                     this.boqFittingArray[index].ClassTypes = response[i].classType
                     // this.boqFittingArray[index].addFittingModel.fittingTypeCode = response.fittingTypeCode;                  
                   }
                })           
  
        },
      
      getFormulas() {
        this.getAllFormula().then((response) => {
          this.formulasList = response;
        });
      },
      //get all Input type
      getInputType() {
        this.getAllInputType().then((response) => {
         
          this.classTypeList = response;
        });
      },
      // get all Class type
       getAllClassTypes() {
       this.getAllClassType().then((response) => {
       
          this.classTypeListData = response;
        });
      },
  
      //dynmic multiple Consumable fittings list
      getConsFittingCategories(){
        this.getConsumableSubCategory().then((response) => {
           for(var i=0;i<response.length;i++){
                   this.fittingCategoryList2.push(response[i].subCategoryName);
                  }
        })
      },      
      //dynamic multiple fittings list
        getFittingCategories(){
                this.getFittingSubCategory().then((response)=>{
                  for(var i=0;i<response.length;i++){
                   this.fittingCategoryList.push(response[i].subCategoryName);
                  }
                })
              },
            //add dynamic block names on conatct details
        addItemBoqInfo(){
          this.saveboqdetails.blockNames.push({
          "blockName":'',       
        });
      },
      deleteItemBoqInfo(idx){
        this.saveboqdetails.blockNames.splice(idx, 1)
      },
  
            //for add consumable fittings
            addConsFittingModelboq(){
              this.boqFittingArray2.push( {itemFittingMapping2 : {
                  boqItemFittingId: 0,
                  cboqItemId: 0,
                  fittingTypeCode: "",
                  formula: "",
                  inputType: "",
                  quantity: 0,
                  subCategoeryName: "",
                  finalFitting: "",
                },fittingTypeList2:[]})
            },
              deleteConsFittingModelboq(idx){
              this.boqFittingArray2.splice(idx, 1)
            },
            // for add fitting model
            addFittingModelboq(){
              this.boqFittingArray.push( {itemFittingMapping : {
                  boqItemFittingId: 0,
                  cboqItemId: 0,
                  fittingTypeCode: "",
                  formula: "",
                  inputType: "",
                  quantity: 0,
                  subCategoeryName: "",
                  finalFitting: "",
                },fittingTypeList:[]})
            },
            deleteFittingModelboq(idx){
              this.boqFittingArray.splice(idx, 1)
  
            },
            addfittingField(item,idx){
              this.getfittingallmakes = item.selectedMakes;
                 this.showfittingcategorydailog=true;
                this.cboqFittingselectedmakes = item;
            },
         //update vendor codes
         addVendorField(item){
          this.makesLists = item.vendorCodes;
          this.showvendordailog = true;
          // this.getallVendorCodes(item);
          this.cboqvendorCodemakes = item;
  
         },
         //Update Item makes
          addCatField(item,idx){
                this.getallmakes = item.selectedMakes;
                 this.showcategorydailog=true;
                // this.getItemMakes(item,idx);
                this.cboqItemselectedmakes = item;
               },
  
               Updatefittingmakes(item){
                var savefittingmakes = [];
               
                this.selectedMakes='';
                for(var i=0;i<item.length;i++){
                  savefittingmakes.push({cboqFittingId:item[i].cboqFittingId,selectedMakes:item[i].selectedMakes,contingencyQuantity:item[i].contingencyQuantity});
                }
                
                this.updatefittingtype(savefittingmakes).then((response) => {
                      if(response.status == 200){
                      this.text = response.data.message;
                      this.activeColor='green'
                      this.snackbar = true;                  
                      this.getBoqId();  
                      this.rendercbfitting++;                              
                    }else{
                      this.text = response.data.message;
                      this.activeColor = "red";
                      this.snackbar = true;
                    }
                   }) 
               },
  
               selectthemakes(){
                this.showcategorydailog = false;
               },
               selectthevendors(){
                this.showvendordailog = false;
               },
               //save vendor codes
               saveCboqvendorcodes(){
                    var reqJSON = [];
                    var array1 = [];
                   // this.cboqmakesvendorarray.forEach((ele)=>{
                      for(var j=0;j<this.cboqmakesvendorarray.length;j++){
                      array1=[]
                      for(let i=0;i<this.cboqmakesvendorarray[j].vendorCodes.length;i++){
                      var split = this.cboqmakesvendorarray[j].vendorCodes[i].split("-")[0];
                      array1.push(split);  
                                    
                    }  
                      reqJSON.push({makeCode:this.cboqmakesvendorarray[j].makeCode,makeName:this.cboqmakesvendorarray[j].makeName,vendorCodes:array1})
                   // })
                  }
                    this.saveMakeVendormappings(this.getcboqid,reqJSON).then((response) => {
                      if(response.status == 200){
                        this.text = "Vendor codes saved successfully";
                        this.activeColor='green'
                        this.snackbar = true;
                     //   this.getBoqId();
                        this.cboqMakerefresh++;
                        // this.getBoqId();
                      //  this.getallVendorCodes();
                      }else{
                        this.text = response.data.message;
                      this.activeColor = "red";
                      this.snackbar = true;
                      }
                    })
                  },
   //save Item makes
        UpdateItemmakes(item){
          var saveItemmakes = [];
          for(var i=0;i<item.length;i++){
            saveItemmakes.push({cboqItemId:item[i].cboqItemId,selectedMakes:item[i].selectedMakes,weldingType:item[i].weldingType});
          }
          this.updateItemfittingmake(saveItemmakes).then((response) => {
                      if(response.status == 200){
                      this.text = response.data.message;
                      this.activeColor='green'
                      this.snackbar = true;  
                      this.getBoqId();     
                      this.cbogItemRender++;                                           
                    }else{
                      this.text = response.data.message;
                      this.activeColor = "red";
                      this.snackbar = true;
                    }
          }) 
        },
      
        //get vendor Codes
        getallVendorCodes(data, index){
        },
          //Get Item Makes
        getItemMakes(code,idx){        
          this.Itemselectmakes = [];
            this.getItemfittingsmake(code).then((response) =>{            
              for(var i=0;i< response.data.length;i++){
                    this.citemsArray[idx].makeList.push(response.data[i].makeCode)
                   }
            })
        },
  
  
        getfittingmakes(dataa,idx){
          this.Fittingselectmakes = [];
          dataa= dataa.replace("/", "$")
         
          this.getupdatefittingsmake(dataa).then((response) =>{        
              for(var i=0;i< response.data.length;i++){
                    this.cfittingsArray[idx].makeFittingList.push(response.data[i].makeCode);  
  
                   }                
            })
        },
  
          //update update contiginecy
            updatecontigencyqunatity(data){
             var saveconquantity = [];
             saveconquantity.push(data);
             this.updatefittingtype(saveconquantity).then((response) => {
                   if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;        
                
                // this.resetAddItemModel();
                this.getBoqId();
                
  
  
              } else {
                this.text = response.data.message;
                this.activeColor = "red";
                this.snackbar = true;
            
              }
             })
            },
  
          // update  All fittings
          updateAllFittings(data){
            var updateFitting = [];          
            updateFitting.push(data);
              this.saveFittingtype(updateFitting).then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;        
                
                // this.resetAddItemModel();
                this.getBoqId();
                
  
  
              } else {
                this.text = response.data.message;
                this.activeColor = "red";
                this.snackbar = true;
            
              }
          
            });
          },
  
  cancelsaveFittingTypes1234(){
    this.isdatatable = false;              
    this.getBoqId(); 
  },
      saveFittingTypes1234(){
               var arr=[];
               for(var i=0;i<this.globalFittingList.length;i++){
  //selectedBoqItemId
               arr.push({cboqItemId: this.selectedBoqItemId, status:true,quantity:this.globalFittingList[i].quantity,subCategoeryName:this.globalFittingList[i].subCategoryName,
                   inputType:this.globalFittingList[i].inputType,fittingTypeCode:this.globalFittingList[i].fittingTypeCode
               })
               }
  
               this.saveFittingtype(arr).then((response) => {
                if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.itemCard = false;              
                // this.resetAddItemModel();
                for(var i=0;i<this.globalFittingList.length;i++){
                  this.globalFittingList[i].selectedFittings=[];
                }
                this.existingFittingMapKey++;
                this.isdatatable = false;   
                      
                this.getBoqId(); 
               
               // this.globalFittingList = [];             
                 }else {
                  this.text = "Please fill all details";
                  this.activeColor = "red";
                  this.snackbar = true;
                }
              })
       },
       saveFittingTypes123(item){
            for(var i=0;i<this.boqFittingArray.length;i++){
                this.boqFittingArray[i].itemFittingMapping.cboqItemId =item.cboqItemId;
                this.boqFittingArray[i].itemFittingMapping.status=true;
                // this.boqFittingArray[i].addFittingModel.fittingBlockInfo = Object.entri
            }
             var arr=[];
  
               for(var i=0;i<this.boqFittingArray.length;i++){
                    // this.boqFittingArray[i].addFittingModel.fittingTypeCode=this.boqFittingArray[i].fittingTypeCode
                arr.push(this.boqFittingArray[i].itemFittingMapping)
               }
            // this.$refs.form.validate();
             if(this.$refs.form[0].validate()){
            this.saveFittingtype(arr).then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.itemCard = false;
                this.boqFittingArray=[{
                      itemFittingMapping : {
                      boqItemFittingId: 0,
                      cboqItemId: 0,
                      fittingTypeCode: "",
                      formula: "",
                      inputType: "",
                      quantity: "",
                      subCategoeryName: "",
                      finalFitting: "",
                      materialType:""
                    },
                      fittingTypeList:[]     
                  }
                  ]
                // this.resetAddItemModel();
                this.getBoqId();
                this.fittingcard = false;
               this.$refs.form[0].reset();
                  
    
          } else {
            this.text = "Please fill all details";
            this.activeColor = "red";
            this.snackbar = true;
          }
          
        });
  
        }
      },
      saveConsFittingTypes123(item){
        for(var i=0;i<this.boqFittingArray2.length;i++){
                this.boqFittingArray2[i].itemFittingMapping2.cboqItemId =item.cboqItemId;
                this.boqFittingArray2[i].itemFittingMapping2.status=true;
                // this.boqFittingArray[i].addFittingModel.fittingBlockInfo = Object.entri
            }
             var arr=[];
  
               for(var i=0;i<this.boqFittingArray2.length;i++){
                    // this.boqFittingArray[i].addFittingModel.fittingTypeCode=this.boqFittingArray[i].fittingTypeCode
                arr.push(this.boqFittingArray2[i].itemFittingMapping2)
               }
             if(this.$refs.form[0].validate()){
               this.saveFittingtype(arr).then((response) => {
              if (response.status == 200) {
                this.text = response.data.message;
                this.activeColor = "green";
                this.snackbar = true;
                this.itemCard = false;
                this.boqFittingArray2=[{
                      itemFittingMapping2 : {
                      boqItemFittingId: 0,
                      cboqItemId: 0,
                      fittingTypeCode: "",
                      formula: "",
                      inputType: "",
                      quantity: "",
                      subCategoeryName: "",
                      finalFitting: "",
                    },
                      fittingTypeList2:[]     
                  }
                  ]
                // this.resetAddItemModel();
                this.getBoqId();
                this.fittingcard2 = false;
               this.$refs.form[0].reset();
                  
    
          } else {
            this.text = "Please fill all details";
            this.activeColor = "red";
            this.snackbar = true;
          }
          
        });
             }
      },
     refreshConsFittings(){
       this.boqFittingArray2=[{
            itemFittingMapping2 : {
            boqItemFittingId: 0,
            boqItemId: 0,
            fittingTypeCode: "",
            formula: "",
            inputType: "",
            quantity: "",
            ftCatogeryName: "",
            finalFitting: "",
          },
            fittingTypeList2:[]     
         }
        ]
        this.fittingcard2 = false
     },
      refreshFittings(){
        // this.boqFittingArray = [];
          // this.fittingCategoryList = []
          this.boqFittingArray=[{
            itemFittingMapping : {
            boqItemFittingId: 0,
            boqItemId: 0,
            fittingTypeCode: "",
            formula: "",
            inputType: "",
            quantity: "",
            ftCatogeryName: "",
            finalFitting: "",
          },
            fittingTypeList:[]     
         }
        ]
        this.fittingcard = false
        
      },
      closeDesccard(){
        this.itemCard2 = false;
        this.addItemDescription = {};
      },
      closeItemCard() {
        this.addItemModel = {};
  
        this.itemTypeCode = "";
        // this.itemBlockInfo = [
        //   {
        //     quantity: "",
        //   },
        // ];
        this.finalblockListValues = []
        this.itemCard = false;
      },
      refreshSecItemDesc() {
        this.addItemDescription = {};
      },
      refreshItem() {
        this.addItemModel = {};
  
        this.itemTypeCode = "";
        this.finalblockListValues = [];
      },
      editSecDesc(obj){
        this.addItemDescription = obj;
        this.addItemDescription.boqSectionId = obj.boqSectionId;
        this.addItemDescription.iboqsecItemDesrId = obj.iboqsecItemDesrId;
         this.itemCard2 = true;
        // this.
      },
      editItem(obj) {
        this.iboqsecItemDesrId = obj.iboqsecItemDesrId;
        this.addItemModel.iboqItemId = obj.iboqItemId;
         this.finalblockListValues = Object.entries(obj.itemBlockInfo).map((entry) => entry[1]) 
        this.itemTypeCode = obj.itemTypeCode;  
        // this.addItemModel.boqItemId = obj.boqItemId;
        this.addItemModel.materialType = obj.materialType;
        this.addItemModel.subCatogeryName = obj.subCatogeryName;
        this.addItemModel.classType = obj.classType;
        // this.addItemModel.description = obj.description;
        // this.addItemModel.margin = obj.margin;
        this.addItemModel.selectedMakes = obj.selectedMakes;
        // this.addItemModel.transportRate = obj.transportRate;
        // this.addItemModel.wastagePercent = obj.wastagePercent;
        this.addItemModel.iboqItemSNo = obj.iboqItemSNo;
        this.addItemModel.totalQuantity = obj.totalQuantity;
        this.itemCard = true;
      },
      //edit section start
      editSection(section){
        this.dialogedit = true;
      },
      confirmedit(section){ 
        this.sectionModel = section
        this.sectionModel.boqId = section.boqId; 
        if (this.$refs.form[0].validate()) {
        this.postBoqSection(this.sectionModel).then((response) => {
          this.getBoqId();
          this.sectionModel = {};
          this.dialogedit = false;
          this.snackbar = true;
          this.activeColor = "green";
          this.text = 'Boq Section Changed Successfully';
          this.$refs.form[0].reset();
        });  
      }       
      },
      canceledit(){
        this.dialogedit = false;
      },
      deleteSection(section) {
        this.deleteSections = section.boqSectionId;
        this.dialogDelete2 = true;
      },
  
      //edit section end
  
      confirmToDelete() {
        var reqJSON = this.deleteSections;
        this.deleteboqsection(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.snackbar = true;
            this.activeColor = "";
            this.activeColor = "green";
            this.dialogDelete2 = false;
            this.getBoqId();
            // this.cboqshow = false;
          } else {
            this.text = response.data.error;
            this.snackbar = true;
            this.activeColor = "";
  
            this.activeColor = "red";
  
            this.dialogDelete2 = false;
          }
        });
      },
      //delete Section Description 
      deleteSecDesc(item){
        this.deleteSectionDesc = item.iboqsecItemDesrId
        this.dialogDeleteDesc = true;
      },
      confirmdeleteSecDesc(){
        var reqJSON = this.deleteSectionDesc;
        this.deleteBoqSecDescription(reqJSON).then((response) => {
           if (response.status == 200) {
            this.text = response.data.message;
            this.snackbar = true;
            this.activeColor = "";
            this.activeColor = "green";
            this.dialogDeleteDesc = false;
            this.getBoqId();
            this.refreshItem();
          } else {
            this.text = response.data.error;
            this.snackbar = true;
            this.activeColor = "";
  
            this.activeColor = "red";
  
            this.dialogDeleteDesc = false;
          }
        })
      },
      // delete section item starts
      deletesectionItem(item) {
        this.delsectionitems = item.iboqItemId;
        this.dialogDelete = true;
      },
      confirmdeleteItem() {
        var reqJSON = this.delsectionitems;
        this.deleteboqsectionItem(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.snackbar = true;
            this.activeColor = "";
            this.activeColor = "green";
            this.dialogDelete = false;
            this.getBoqId();
            this.refreshItem();
          } else {
            this.text = response.data.error;
            this.snackbar = true;
            this.activeColor = "";
  
            this.activeColor = "red";
  
            this.dialogDelete = false;
          }
        });
      },
      resetAddItemModel() {
        (this.addItemModel.boqSectionId = ""),
          (this.addItemModel.itemTypeName = ""),
          (this.addItemModel.catogeryName = ""),
          (this.addItemModel.description = ""),
          (this.addItemModel.materialType = ""),
          (this.addItemModel.makes = []),
          (this.addItemModel.transportRate = ""),
          (this.addItemModel.wastagePercent = ""),
          (this.addItemModel.boqItemSNo = ""),
          (this.addItemModel.itemBlockInfo = {}),
          (this.addItemModel.finalItem = ""),
          (this.addItemModel.finalmake = "");
      },
  
      //get Item type code
      getItemTypeDetails(itemTypeCode) {
        this.getItemBySearch(itemTypeCode).then((response) => {
          this.selectCategoryID = response.categoryName;
          this.allitemsList = response.items;
  
          this.allItemsCodes = [];
          for (var i = 0; i < response.items.length; i++) {
            this.allItemsCodes.push({
              text: response.items[i].itemName,
              value: response.items[i].itemCode,
            });
          }
        });
      },
      backToCard() {
        this.activefield = false;
        this.isItemEdited = false;
        this.saveboqdetails = this.boqModel;
        this.isItemDetails = true;
      },
      // save item for section
    saveSectionItemDesc(sec){
      var saveSecItemDescription = {};
      saveSecItemDescription.boqSectionId = sec.boqSectionId;
      saveSecItemDescription.iboqsecItemDesrId = this.addItemDescription.iboqsecItemDesrId;
      saveSecItemDescription.iboqSecItemDesrSNo = this.addItemDescription.iboqSecItemDesrSNo
      saveSecItemDescription.description = this.addItemDescription.description
      var reqJSON = saveSecItemDescription;
      
      this.saveBoqSectionDesc(reqJSON).then((response) => {
        if(response.status == 200){
          this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
            this.itemCard2 = false;
            this.addItemDescription = {};         
            this.getBoqId();
            // this.renderdescItem++;
            
            // this.$router.go();
            // this.itemrender2++;
            // this.$refs.form2.reset();
        }else {
            this.text = "Please fill all Mandatory Field ";
            this.activeColor = "red";
            this.snackbar = true;
          }
      });
      },
      // getallItemTypeDetails(item){
       
      // },
      saveItemForSection(sec, idx,secid) {
        var dat = {};
        this.finalblockListValues.forEach((element, index) => {
          dat[this.boqObj.blockNames[index]] = element;
        });
        var saveItemObj = {};
        saveItemObj.itemBlockInfo = dat;
        saveItemObj.iboqsecItemDesrId = secid;
        saveItemObj.itemTypeCode = this.itemTypeCode;
        saveItemObj.itemTypeName = this.addItemModel.itemTypeName;
        saveItemObj.iboqItemId = this.addItemModel.iboqItemId;
        saveItemObj.materialType = this.addItemModel.materialType;
        saveItemObj.subCatogeryName = this.addItemModel.subCatogeryName;
        // saveItemObj.margin = this.addItemModel.margin;
        saveItemObj.selectedMakes = this.addItemModel.selectedMakes;
        // saveItemObj.transportRate = this.addItemModel.transportRate;
        // saveItemObj.wastagePercent = this.addItemModel.wastagePercent;
        saveItemObj.iboqItemSNo = this.addItemModel.iboqItemSNo;
        saveItemObj.totalQuantity = this.addItemModel.totalQuantity
        saveItemObj.classType=this.addItemModel.classType;
        this.addItemModel.iboqItemId = this.boqId;
        this.addItemModel.boqSectionId = sec.boqSectionId;
        this.addItemModel.itemTypeCode = this.itemTypeCode;
        if (this.$refs.form[0].validate()) {
        var reqJSON = saveItemObj;    
        this.saveSectionItem(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
            this.itemCard = false;
            this.addItemModel = {};
            this.itemTypeCodeMakes = [];
            this.itemClassTypeList = [];
            this.itemTypeCode = "";
            this.finalblockListValues = [];
            this.$refs.form[0].reset();
      
            // this.cboqshow = true;
            // (this.itemBlockInfo = [
            //   {
            //     quantity: "",
            //   },
            // ]),
              this.resetAddItemModel();
            sec.itemBlockSave = false;
            this.getBoqId();
          } else {
            this.text = "Please fill all Mandatory Field ";
            this.activeColor = "red";
            this.snackbar = true;
          }
        });
     }
     
      },
         getClientDetails(code){
                for(var i=0;i<this.allClientDetails.length;i++){
                  if(code==this.allClientDetails[i].clientCode){
                    this.saveboqdetails.clientName=this.allClientDetails[i].clientName;
                    this.saveboqdetails.contactPersonName=this.allClientDetails[i].contactPersonName;
                    this.saveboqdetails.contactPersonEmail =this.allClientDetails[i].contactPersonEmail;
                    this.saveboqdetails.contactPersonPhone =this.allClientDetails[i].contactPersonPhone;
                  }
                }
              },
          getClients(){
            this.getAllClients().then((response) => {
             this.allClientDetails=response
            }
          )},
      getAllClientdetails(){
        this.getAllClients().then((response) => {
          this.allClientCodes = response.map(a => a.clientCode);        
       
        })
      },
        savesinglecontact(){
             this.isItemDetails = false;
             this.saveboqdetails.clientCode = '' ;
             this.saveboqdetails.boqId = '';
             this.saveboqdetails.noOfSections = '';
             this.saveboqdetails.clientName = '';
             this.saveboqdetails.contactPersonName = '' ;
             this.saveboqdetails.contactPersonEmail = '' ;
             this.saveboqdetails.contactPersonPhone = '';
            
             this.saveboqdetails.noOfBlocks = '';
             this.saveboqdetails.noOfFloors = '' ;
             this.saveboqdetails.noOfPumpRooms = '';
             this.saveboqdetails.blockNames = [
                {blockName:""}
              ]; 
                this.saveboqdetails.typeOfWork = '';           
            // this.saveboqdetails.supplyOnly = '';
            // this.saveboqdetails.supplyAndInstallation =  '';
            // this.saveboqdetails.installationOnly = '' ;
            this.saveboqdetails.projectAddress = '';
            this.saveboqdetails.projectName = '';
            this.activefield = !this.activefield;
            this.isItemEdited=false;
                  
        },
      editcontact(item) {
        this.saveboqdetails.clientCode = item.clientCode;
        this.saveboqdetails.boqId = item.boqId;
        this.saveboqdetails.noOfSections = item.noOfSections;
        this.saveboqdetails.clientName = item.clientName;
        this.saveboqdetails.contactPersonName = item.contactPersonName;
        this.saveboqdetails.contactPersonEmail = item.contactPersonEmail;
        this.saveboqdetails.contactPersonPhone = item.contactPersonPhone;
       this.saveboqdetails.typeOfWork = item.typeOfWork;
        this.saveboqdetails.noOfBlocks = item.noOfBlocks;
        this.saveboqdetails.noOfFloors = item.noOfFloors;
        this.saveboqdetails.noOfPumpRooms = item.noOfPumpRooms;
        // this.saveboqdetails.blockNames = Object.entries(item.blockNames).map((entry) => entry[1])
         var blocksnames=[];
                for(var i=0;i < item.blockNames.length;i++){
                  blocksnames.push({blockName: item.blockNames[i]})
        }
        this.saveboqdetails.blockNames = blocksnames;
        this.saveboqdetails.projectAddress = item.projectAddress;
        this.saveboqdetails.projectName = item.projectName;
        this.activefield = true;
        this.isItemDetails=false;
        this.isItemEdited=true;
      },
      savecontact() {
        var finalcontact = {};
         var blockNames=[];
                for(var i=0;i<this.saveboqdetails.blockNames.length;i++){
                  blockNames.push(this.saveboqdetails.blockNames[i].blockName)
                }
        
        finalcontact.blockNames = blockNames;
        finalcontact.clientCode = this.saveboqdetails.clientCode;
        finalcontact.boqId = this.saveboqdetails.boqId; 
        finalcontact.projectAddress = this.saveboqdetails.projectAddress;
        finalcontact.projectName = this.saveboqdetails.projectName; 
  
        finalcontact.clientName = this.saveboqdetails.clientName;
        finalcontact.contactPersonName = this.saveboqdetails.contactPersonName;
        finalcontact.contactPersonEmail = this.saveboqdetails.contactPersonEmail;
        finalcontact.contactPersonPhone = this.saveboqdetails.contactPersonPhone;
   
        finalcontact.noOfBlocks = this.saveboqdetails.noOfBlocks;
        finalcontact.noOfFloors = this.saveboqdetails.noOfFloors;
        finalcontact.noOfSections = this.saveboqdetails.noOfSections
        finalcontact.noOfPumpRooms = this.saveboqdetails.noOfPumpRooms;
        finalcontact.typeOfWork = this.saveboqdetails.typeOfWork;
        // finalcontact.supplyOnly = this.saveboqdetails.supplyOnly;
        // finalcontact.supplyAndInstallation = this.saveboqdetails.supplyAndInstallation;
        // finalcontact.installationOnly = this.saveboqdetails.installationOnly;
        var reqJSON = finalcontact;
        if (this.$refs.form.validate()) {
        this.postBoq(reqJSON).then((response) => {
          if (response.status == 200) {
            this.text = response.data.message;
            this.activeColor = "green";
            this.snackbar = true;
            this.saveboqdetails = {};
            this.activefield = false;
            this.isItemDetails=true;
            this.saveboqdetails.boqId = "";
            this.getBoqId();
            this.$refs.form.reset();
            // this.saveboqdetails.supplyOnly = '';
            // this.saveboqdetails.supplyAndInstallation = '';
            // this.saveboqdetails.installationOnly = '';
            this.saveboqdetails = {
             blockNames:[
                {blockName:""}
              ]};
               this.$router.push({name:'BoqAllList', params: {id: '[clientCode]'}}); 
           } else {
            this.text = this.messages;
            this.activeColor = "red";
            this.snackbar = true;
          }
        });
       }
      },
      // end of add Item
      addItem(item, idx, id, secId) {
        this.listModel.push({
          materialTypeList: [],
          classTypeList: [],
          itemMakeList: [],
        });
        if (this.boqObj.sections[idx].hasOwnProperty("items")) {
        } else {
        }
        this.boqObj.sections[idx].items.push({
          boqItemId: id,
          boqSectionId: secId,
          boqSectionName: item,
          catageryName: "",
          classType: "",
          description: "",
          materialType: "",
          finalItem: "",
          finalMake: "",
          itemBlockInfo: {
            additionalProp1: 0,
            additionalProp2: 0,
            additionalProp3: 0,
          },
        });
      },
  
      //Boq Section creation
      saveSection() {
        this.sectionModel.boqId = this.boqId;
        if (this.$refs.form.validate()) {
        this.postBoqSection(this.sectionModel).then((response) => {
          this.getBoqId();
          this.sectionModel = {};
          this.dialog = false;
          this.snackbar = true;
          this.activeColor = "green";
          this.text = 'Boq Section Added Successfully';
          this.$refs.form.reset();        
        });
        }
      },
      closeSection() {
        this.sectionModel = {};
        this.dialog = false;
     
      },
      getBoqId() {
        this.headers = Array(...this.headers1);
        this.getBoqById(this.boqId).then((response) => {
          this.boqObj = response;
          console.log('check all the data',this.boqObj);
       
          this.blockNamelist = response.blockNames;
          this.ani = Object.entries(this.blockNamelist).map((arr) => ({
            text: arr[1],
            value: arr[1],
          }));
          for (let i = 0; i < this.ani.length; i++) {
            this.headers.splice(5 + i, 0, this.ani[i]);
            
          }
          for (var i = 0; i < this.boqObj.sections.length; i++) {
            this.boqObj.sections[i].isDisbled = false;
            this.boqObj.sections[i].isItems = false;
            this.boqObj.sections[i].isInfo = false;
  
            if (!this.boqObj.sections[i].hasOwnProperty("iboqSecItemDescr")) {
            
            this.boqObj.sections[i].iboqSecItemDescr = [];
            
            } else {
              for (var j = 0; j < this.boqObj.sections[i].iboqSecItemDescr.length; j++) {            
                     
                this.boqObj.sections[i].iboqSecItemDescr[j] = {
                  ...this.boqObj.sections[i].iboqSecItemDescr[j],
                  ...this.boqObj.sections[i].iboqSecItemDescr[j].iboqItems,
                               
                };
             
               if(this.boqObj.sections[i].iboqSecItemDescr[j].hasOwnProperty("iboqItems")){
                for(var k = 0; k < this.boqObj.sections[i].iboqSecItemDescr[j].iboqItems.length; k++){
               
                  //  if(this.boqObj.sections[i].items[j].itemFittings[k].inputType=="FIXED"){
                  //   this.boqObj.sections[i].items[j].itemFittings[k].isFixed=true;
                  //  }
                  //  else{
                  //    this.boqObj.sections[i].items[j].itemFittings[k].isFixed=false;
                  //  }
                  this.boqObj.sections[i].iboqSecItemDescr[j].iboqItems[k] = {
                    ...this.boqObj.sections[i].iboqSecItemDescr[j].iboqItems[k],
                    ...this.boqObj.sections[i].iboqSecItemDescr[j].iboqItems[k].itemBlockInfo,
                  }
                  
                }
              }
              }           
            }
          }
  
           for(var i = 0; i < this.boqObj.cboqs.length; i++){
             if(!this.boqObj.cboqs[i].hasOwnProperty("cboqItems")){
               this.boqObj.cboqs[i].cboqItems = [];
             }else{
               for(var m = 0; m <  this.boqObj.cboqs[i].cboqItems.length; m++){
                 this.boqObj.cboqs[i].cboqItems[m].makeString='';
                   for( const  key  in this.boqObj.cboqs[i].cboqItems[m].secItemInfo){                                      
                      this.boqObj.cboqs[i].cboqItems[m].makeString= this.boqObj.cboqs[i].cboqItems[m].makeString + `${key}:${ this.boqObj.cboqs[i].cboqItems[m].secItemInfo[key]}` +", ";
                }
               }
             }
           }
  
                  for(var n=0;n < this.boqObj.cboqs.length;n++){
                    if(!this.boqObj.cboqs[n].hasOwnProperty("cboqItems")){
                     this.boqObj.cboqs[n].cboqItems = [];
                  }else{
                    for(var o = 0; o <  this.boqObj.cboqs[n].cboqItems.length; o++){
                      if(!this.boqObj.cboqs[n].cboqItems[o].hasOwnProperty("cboqItemFittings")){
                        this.boqObj.cboqs[n].cboqItems[o].cboqItemFittings = [];
                      }else{
                        for(var p = 0; p < this.boqObj.cboqs[n].cboqItems[o].cboqItemFittings.length; p++){
                          
                           if(this.boqObj.cboqs[n].cboqItems[o].cboqItemFittings[p].inputType=="FIXED"){
                                this.boqObj.cboqs[n].cboqItems[o].cboqItemFittings[p].isFixed=true;
                              }
                              else{
                                this.boqObj.cboqs[n].cboqItems[o].cboqItemFittings[p].isFixed=false;
                              }
                        }
                      }
                    }
                  }
                }
            this.AllboqId=this.boqObj.boqId;
            this.cboqsdata=this.boqObj.cboqs[0];
            this.citemsArray=this.boqObj.cboqs[0].cboqItems;
            this.cfittingsArray = this.boqObj.cboqs[0].cboqFittings;
            this.citemsArray.forEach((ele,index) =>{
              ele.makeList=[];         
              this.getItemMakes((ele.itemTypeCode),index);
           
            });
            
            this.cfittingsArray.forEach((ele,index)=>{
              ele.makeFittingList=[];
              
              this.getfittingmakes((ele.fittingTypeCode),index);
              
            });
            this.cMakevendormappings = this.boqObj.cboqs[0].cboqMakeVendorMappings;
            this.cboqgetVendorDtos = this.boqObj.cboqs[0].cboqVendorDtos;
            this.getcboqid = this.boqObj.cboqs[0].cboqId;
           
        }).then(()=>{
          console.log("check it", this.boqObj.cboqs[0].hasOwnProperty('cboqMakeVendorMappings'),this.getcboqid )
            if(!this.boqObj.cboqs[0].hasOwnProperty('cboqMakeVendorMappings')){
              this.generatecboqMakes(this.getcboqid)
            }
            else{   
              this.cboqmakesvendorarray=[]                   
              var cboqmakes= this.boqObj.cboqs[0].cboqMakeVendorMappings;
              cboqmakes.forEach((ele)=>{
               this.cboqmakesvendorarray.push({makeCode:ele.makeCode,makeName:ele.makeName,makeList:[],vendorCodes:ele.vendors          
               
               })
  
              })
              this.cboqmakesvendorarray.forEach((ele)=>{
                this.getVendorCodes(ele.makeCode).then((response) => {
                    for(var i=0;i<response.length;i++){
                      ele.makeList.push({text:response[i],value:response[i].split("-")[0]})
                      ele.makeList= [...new Set(ele.makeList)]
                       
                    }
  
            })
              })
             
              
  
           
            }
  
            this.Eboqsdata = this.boqObj.cboqs[0].eboqs;
            this.saveMakevendors = this.Eboqsdata[0].eboqItems;
            this.saveFittingMakevendors = this.Eboqsdata[0].eboqFittings; 
          
           
            
        }).then(()=>{
          this.getAllQuotes(this.AllboqId);       
        })
      },
      getAllItemType() {
        this.getAllItems().then((response) => {
          for (var i = 0; i < response.length; i++) {
            this.itemTypeCodes.push({
              text: response[i].itemTypeName,
              value: response[i].itemTypeCode,
            });
          }
        });
      },
  
    
    },
  };
  </script>
  
  <style>
  .overview {
    padding: 10px;
  }
  
  dt {
    margin-top: 5px;
    font-size: 16px;
  }
  #ani {
    font-size: 18px;
    color: black;
    font-weight: 200;
  }
  #move {
    margin-left: 40%;
  }
  #set {
    float: right;
    color: black;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
  } 
  .botton {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rk {
    background-color: red;
  }
  
  .v-data-table.sample1 {
    width: 100%;
  }
  .v-data-table {
    max-width: 100%;
  }
  .v-expansion-panel-header__icon .mdi:before {
      display: inline-block;
      font: normal normal normal 24px/1 "Material Design Icons";
      font-size: inherit;
      color: rgb(52, 107, 39);
      text-rendering: auto;
      line-height: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }
  /* .v-expansion-panel-header__icon {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      margin-bottom: -4px;
      margin-top: -4px;
      background-color: #315c44;
      border-radius: 20px;
      color: white;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  } */
  /* .v-data-table.sample1 {
    width: 100%;
    border: 4px solid red;
  } */
  /* .bgtab{ background-color:#313940 !important;} */
  /* .text-input input{
    background-color: rgb(162, 196, 225) !important;
    height: 23px;
    padding: 10px;
  } */
  .v-text-field--filled>.v-input__control>.v-input__slot, .v-text-field--full-width>.v-input__control>.v-input__slot, .v-text-field--outlined>.v-input__control>.v-input__slot {
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      min-height: 56px;
      background-color:  rgb(252, 253, 255) !important;
  }
  /* .v-dialog__container {
      display: unset; 
  } */
  </style>
   
  