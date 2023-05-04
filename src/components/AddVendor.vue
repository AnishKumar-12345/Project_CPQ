<template>
    <div>
         <v-data-table  
           :headers="headers"
           :items="result"
            sort-by="id"
            
           class="elevation-1"
           :search=search
         >
    
         <template v-slot:item="row" >
           <tr >
               <td style="text-align:left"> 
                <router-link :to="{ name: 'VendorInfo', params: { id: row.item.vendorCode,tabValue:0 } }">
                {{ row.item.vendorCode }}
                </router-link>
                </td>
     
               <td style="text-align:left">
                 {{row.item.vendorName }}
                 </td>
                 <td style="text-align:left"> {{ row.item.vendorType }}</td>
                 <td style="text-align:left">{{ row.item.gstNo }}</td>
                  <td style="text-align:left">{{ row.item.ownerName }}</td>
                   <!-- <td style="text-align:left">{{ row.item.ownerMobile }}</td>
                    <td style="text-align:left">{{ row.item.salesPersonName }}</td>
                     <td style="text-align:left">{{ row.item.salesPersonMobile }}</td>
                      <td style="text-align:left">{{ row.item.salesPersonEmail }}</td>
                       <td style="text-align:left">{{ row.item.businessUnitLandLine }}</td>
                        <td style="text-align:left">{{ row.item.businessUnitAddress }}</td>
                         <td style="text-align:left">{{ row.item.businessUnitLocation }}</td> -->
    
                 <td style="text-align:left" ><v-icon medium class="blue--text" @click="seeVendor(row.item)">mdi-eye</v-icon> <v-icon medium class="blue--text" @click="editVendor(row.item)">mdi-pencil</v-icon></td>
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
                    :file-name="'All Vendors'"
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
                            :file-name="'All Vendors'"
                            :file-type="'xlsx'"
                            :sheet-name="'sheetname'" v-if="result == ''">                    
                        <v-icon large color="green darken-2">
                          mdi-cloud-download
                        </v-icon>
              </vue-excel-xlsx>
                 <!-- <download-excel :data="json_data"
                  v-if="result == ''"
                 name="All Vendors">                    
                        <v-icon large color="green darken-2">
                         mdi-cloud-download
                        </v-icon>
              </download-excel> -->
            <v-icon class="pa-2  mt-0 blue--text"
              medium
              color="red"
            @click="activeUploadCard"
              large
            >
            mdi-cloud-upload
        </v-icon>
            <v-dialog 
              v-model="dialog1"
              max-width="800"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"  
                >
                  Add
                </v-btn>
              </template>
              <v-card style="background-color:rgba(225,246,240,255); padding:20px;border: 1px solid rgba(129,207,252,255);border-radius:5px;" >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                 <v-form @submit.prevent="saveVendor" ref="form" v-model="valid" lazy-validation > 
                <v-card-text>
                  <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.vendorCode"
                          label="Vendor Code"
                          :rules="nameRules"
                          dense
                           :readonly="readvendor"
                         outlined
                          hint="Mandatory Field"
                          :disabled=isEdited
                        >
                        <template #label>
        Vendor Code<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.vendorName"
                          label="Vendor Name"
                          :rules="nameRules"
                          dense
                         outlined
                          hint="Mandatory Field"
                          :disabled=isEdited
                           :readonly="readvendor"
                        >
                        <template #label>
        Vendor Name<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.vendorType"
                          label="VendorType"
                          :rules="addressRules"
                          hint="Mandatory Field"
                          dense
                         outlined
                          :readonly="readvendor"
                        >
                         <template #label>
       Vendor Type<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.gstNo"
                          label="GST No"
                          
                          dense
                         
                          :readonly="readvendor"
                         outlined
                        >
                         <template #label>
        GST No
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.ownerName"
                          label="Owner Name"
                          dense
                           :readonly="readvendor"
                         outlined
                        >
                         <template #label>
                          Owner Name
                        </template> 
                        </v-text-field>
                      </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.ownerMobile"
                          label="Owner Mobile"
                          dense
                           :readonly="readvendor"
                         outlined
                        >
                         <template #label>
                          Owner Mobile
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.ownerEmail"
                          label="Owner Email"
                          dense
                           :readonly="readvendor"
                         outlined
                        >
                         <template #label>
                          Owner Email
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.salesPersonName"
                          hint="Mandatory Field"
                          dense
                           :readonly="readvendor"
                         outlined
                        >
                         <template #label>
                          Sales Person Name
                        </template> 
                        </v-text-field>
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.salesPersonMobile"
                          label="Sales Person Mobile"
                          dense
                           :readonly="readvendor"
                         outlined
                        >
                         <template #label>
                          Sales Person Mobile
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.salesPersonEmail"
                          label="sales Person Email"
                          :rules="emailRules"
                          hint="Mandatory Field"
                          dense
                         outlined
                          :readonly="readvendor"
                        >
                         <template #label>
                          Sales Person Email<strong  class="red--text">* </strong>
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.businessUnitEmail"
                          label="Business Unit Email"
                          dense
                         outlined
                          :readonly="readvendor"
                        >
                         <template #label>
                          Business Unit Email
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.businessUnitMobile"
                          hint="Mandatory Field"
                          dense
                         outlined
                          :readonly="readvendor"
                        >
                         <template #label>
                         Business Unit Mobile
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.businessUnitLandLine"
                          label="Business Unit LandLine"
                          :readonly="readvendor"
                          dense
                         outlined
                        >
                         <template #label>
                         Business Unit LandLine
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.businessUnitAddress"
                          label="Business Unit Address"
                           :readonly="readvendor"
                          dense
                         outlined
                        >
                         <template #label>
                         Business Unit Address
                        </template> 
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedVendor.businessUnitLocation"
                          label="Business Unit Location"
                          :readonly="readvendor"
                          dense
                         outlined
                        >
                         <template #label>
                         Business Unit Location
                        </template> 
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions class="mr-3 " >
                  <v-spacer></v-spacer>
                  <v-btn
                   color="red white--text"
                                style="width:80px;"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn class="mr-3" 
                   color="green white--text"
                                style="width:80px;" 
                    :disabled="onsee"
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
                 </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete  Vendor?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" text>OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <!-- <v-icon
            small
            class="mr-2"
            @click="editVendor(item)"
          >
            mdi-pencil
          </v-icon> -->
          <!-- <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon> -->
        </template>
        
      </v-data-table>
    <!-- </div> -->
    
    <div v-if="this.activeUpload==true">
         <v-dialog
          persistent
          max-width="600px"
          v-model="activeUpload" >
           <v-card>
             <v-card-title style="background-color:#2cb1fe;color:white;">Upload Vendor </v-card-title>
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
         indeterminate :size="70" :width="7" color="green"
        >
         <v-avatar class="img">
          <!-- <img src="../assets/trident2.png"  alt="logo"> -->
         </v-avatar>
        </v-progress-circular>
           </v-card>
         </v-dialog>
         </div>
    
      <v-snackbar :color="activeColor"
          v-model="snackbar"
         
        >
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
    import servicescall from "../Services";
    import downloadexcel from "vue-json-excel"
    export default {
        name:'AddVendor',
    
         mixins: [servicescall],
         components:{
          downloadexcel
         },
        data(){
            return {
              readvendor:false,
              onsee:false,
             filename:'All-vendors-info',
            //  json_data:[{
            //   'vendor_Code':'',
            //   'vendor_Name':'',
            //   'vendor_type':'',
            //   'mobile':'',
            //   'gst_no':'',
            //   'email':'',
            //   'address':'',  
            //  }],
            json_data:[{    
              label: "vendor_Code",
               field: "",
            },
            {
            label: "vendor_Name",
               field: "",  
             },
             {
            label: "vendor_type",
               field: "",  
             },
             {
            label: "business_unit_address",
               field: "",  
             },
             {
            label: "business_unit_email",
               field: "",  
             },
             {
            label: "business_unit_url",
               field: "",  
             },
             {
            label: "business_unit_location",
               field: "",  
             },
             {
            label: "business_unit_mobile",
               field: "",  
             },
             {
            label: "business_unit_landline",
               field: "",  
             },
             {
            label: "owner_name",
               field: "",  
             },
             {
            label: "owner_email",
               field: "",  
             },
             {
            label: "owner_mobile",
               field: "",  
             },
             {
            label: "sp_name",
               field: "",  
             },
             {
            label: "sp_mobile",
               field: "",  
             },
             {
            label: "sp_email",
               field: "",  
             },
             {
            label: "gstNo",
               field: "",  
             },
            ],
     // download excel with data
             Jsonfields:[{    
              label: "vendor_Code",
               field: "vendorCode",
            },
            {
            label: "vendor_Name",
               field: "vendorName",  
             },
             {
            label: "vendor_type",
               field: "vendorType",  
             },
             {
            label: "business_unit_address",
               field: "businessUnitAddress",  
             },
             {
            label: "business_unit_email",
               field: "businessUnitEmail",  
             },
             {
            label: "business_unit_url",
               field: "businessUnitUrl",  
             },
             {
            label: "business_unit_location",
               field: "businessUnitLocation",  
             },
             {
            label: "business_unit_mobile",
               field: "businessUnitMobile",  
             },
             {
            label: "business_unit_landline",
               field: "businessUnitLandLine",  
             },
             {
            label: "owner_name",
               field: "ownerName",  
             },
             {
            label: "owner_email",
               field: "ownerEmail",  
             },
             {
            label: "owner_mobile",
               field: "ownerMobile",  
             },
             {
            label: "sp_name",
               field: "salesPersonName",  
             },
             {
            label: "sp_mobile",
               field: "salesPersonMobile",  
             },
             {
            label: "sp_email",
               field: "salesPersonEmail",  
             },
             {
            label: "gstNo",
               field: "gstNo",  
             },
            ],
              isProgress:false,
              activeUpload:false,
              isUploadCard:false,
               activeColor:'',
              file:'',
              isEdited:false,
                snackbar:false,
                text:'',
                 search:'',
                 valid:false,
                 result:[]
    ,             dialog1: false,
                 dialogDelete: false,
          headers: [
            { text: 'Vendor Code', value: 'vendorCode',sortable: true,  width: '15%' },
            { text: 'Vendor Name', value: 'vendorName',  },
            { text: 'Vendor Type', value: 'vendorType',  },
            { text: 'Gst No', value: 'gstNo',sortable: true,  width: '15%' },
            { text: 'Owner Name', value: 'ownerName',sortable: true,  width: '15%' },
            // { text: 'Owner Mobile', value: 'ownerMobile',  },
            // { text: 'Sales Person Name', value: 'salesPersonName',sortable: true,  width: '15%' },
            // { text: 'Sales Person Mobile', value: 'salesPersonMobile',  },
            // { text: 'Sales Person Email', value: 'salesPersonEmail',  },
            // { text: 'Business Unit LandLine', value: 'businessUnitLandLine',  },
            // { text: 'Business Unit Address', value: 'businessUnitAddress',  },
            // { text: 'Business Unit Location', value: 'businessUnitLocation',  },
            { text: 'Actions', value: 'actions', sortable: false,  width: '10%' },
          ],
         
          editedIndex: -1,
         
              editedVendor:{
                    "businessUnitAddress": "",
                    "businessUnitEmail": "",
                    "businessUnitLandLine": "",
                    "businessUnitLocation": "",
                    "businessUnitMobile": "",
                    "gstNo": "",
                    "ownerEmail": "",
                    "ownerMobile": "",
                    "ownerName": "",
                    "salesPersonEmail": "",
                    "salesPersonMobile": "",
                    "salesPersonName": "",
                    "vendorCode": "",
                    "vendorName": "",
                    "vendorType": ""
                   
    },
         
            defaultVendor: {
              
            "address": "",
            "mobile": "",
            "vendorName": "",
            "email":""
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
                       (v) => (v && v.length <= 10 && v.length >= 10) || "Mobile must be  10 number",
                       ],
    
    
            nameRules: [
            (v) => !!v || " Name  is required",
           // (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
          gstRules: [
            (v) => !!v || "GST is required",
            
            (v) =>(v && v.length <= 15) && v.length >= 15 || "Must be  15 combination of Letters and Numbers",
          ],
    
           addressRules: [
            (v) => !!v || "Address is required",
            // (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
          phoneRules: [
          (v) => !!v || "Mobile is required",
           (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Mobile must be  10 characters",
        ],
            }
        },
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Add Vendor' : 'Edit vendor'
          },
        },
    
        
        mounted(){
           if(localStorage.getItem("token")==null){
               this.$router.push({ name: "HelloWorld",});
            }
            this.getVendors();
           
        },
    
        methods: {
          
            // file upload
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
                   formData.append('vendor',this.file)
                   this.isUploadCard=true;
                         this.uploadVendorFile(formData).then((response) => {
                  if(response.status==200){
                     this.isProgress=false
                     this.text=response.data.message;
                     this.activeColor='green';
                     this.snackbar=true;
                     this.activeUpload=false
                     this.isUploadCard=false;
                     this.file='';
                     this.getVendors();
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
                //active
                activeUploadCard(){
                      this.activeUpload=true;
                    },
                 // add the vendor
            saveVendor(){
                  this.$refs.form.validate()
                  if(this.$refs.form.validate()){
                     this.PostVendor();  
                                    
                     }
            },
    
            editVendor (item) { 
              this.isEdited=true;
               var checkVendor=item.vendorCode
               this.vendorById(checkVendor).then(response => {
            if(response.status==200){
              this.editedVendor.vendorCode = response.data.vendorCode;
              this.editedVendor.vendorName =response.data.vendorName;
              this.editedVendor.gstNo=item.gstNo;
              this.editedVendor.vendorType=item.vendorType;
              this.editedVendor.salesPersonName=item.salesPersonName;
              this.editedVendor.salesPersonMobile=item.salesPersonMobile;
              this.editedVendor.salesPersonEmail=item.salesPersonEmail;
              this.editedVendor.ownerName=item.ownerName;
              this.editedVendor.ownerMobile=item.ownerMobile;
              this.editedVendor.ownerEmail=item.ownerEmail;
              this.editedVendor.businessUnitMobile=item.businessUnitMobile;
              this.editedVendor.businessUnitLocation=item.businessUnitLocation;
              this.editedVendor.businessUnitLandLine=item.businessUnitLandLine;
              this.editedVendor.businessUnitEmail=item.businessUnitEmail;
              this.editedVendor.businessUnitAddress=item.businessUnitAddress;
              this.editedIndex = this.result.indexOf(item)
              this.dialog1 = true
              this.onsee = false
              this.readvendor = false;
             }else{
              this.text=response.data.message;
    
            }
          })     
          },
    
           seeVendor (item) { 
            console.log('check the vednor',item);
               var checkVendor=item.vendorCode
               this.vendorById(checkVendor).then(response => {
            if(response.status==200){
              this.editedVendor.vendorCode = response.data.vendorCode;
              this.editedVendor.vendorName =response.data.vendorName;
              this.editedVendor.gstNo=item.gstNo;
              this.editedVendor.vendorType=item.vendorType;
              this.editedVendor.salesPersonName=item.salesPersonName;
              this.editedVendor.salesPersonMobile=item.salesPersonMobile;
              this.editedVendor.salesPersonEmail=item.salesPersonEmail;
              this.editedVendor.ownerName=item.ownerName;
              this.editedVendor.ownerMobile=item.ownerMobile;
              this.editedVendor.ownerEmail=item.ownerEmail;
              this.editedVendor.businessUnitMobile=item.businessUnitMobile;
              this.editedVendor.businessUnitLocation=item.businessUnitLocation;
              this.editedVendor.businessUnitLandLine=item.businessUnitLandLine;
              this.editedVendor.businessUnitEmail=item.businessUnitEmail;
              this.editedVendor.businessUnitAddress=item.businessUnitAddress;
              this.editedIndex = this.result.indexOf(item)
              this.dialog1 = true
              this.onsee = true;
               this.readvendor = true;
             }else{
              this.text=response.data.message;
             // this.snackbar=true;
    
            }
          }) 
           
          },
               // close the dialog box
            close () {
              this.$refs.form.reset(); 
              this.dialog1 = false
              this.$nextTick(() => {
              this.editedVendor = Object.assign({}, this.defaultVendor)
              this.editedIndex = -1
              })
              this.isEdited=false;
          },
    
          // post API calls
    
    
          PostVendor() {     
          var saveallVendors = {}
          saveallVendors.vendorCode = this.editedVendor.vendorCode
          saveallVendors.vendorName = this.editedVendor.vendorName
          saveallVendors.vendorType = this.editedVendor.vendorType
          saveallVendors.gstNo = this.editedVendor.gstNo
          saveallVendors.ownerName = this.editedVendor.ownerName
          saveallVendors.ownerMobile = this.editedVendor.ownerMobile
           saveallVendors.ownerEmail = this.editedVendor.ownerEmail
            saveallVendors.salesPersonEmail = this.editedVendor.salesPersonEmail
             saveallVendors.salesPersonMobile = this.editedVendor.salesPersonMobile
              saveallVendors.salesPersonName = this.editedVendor.salesPersonName
               saveallVendors.businessUnitAddress = this.editedVendor.businessUnitAddress
                saveallVendors.businessUnitEmail = this.editedVendor.businessUnitEmail
                 saveallVendors.businessUnitLandLine = this.editedVendor.businessUnitLandLine
                  saveallVendors.businessUnitLocation = this.editedVendor.businessUnitLocation
                   saveallVendors.businessUnitMobile = this.editedVendor.businessUnitMobile
    
          var reqJSON = saveallVendors
          this.addVendor(reqJSON).then(response => {
            if(response.status==200){
              this.activeColor='green'
              this.text=response.data.message;
              this.isEdited=false;
              this.snackbar=true;
            } else{
               this.activeColor='red'
              this.text=response.data.message;
              this.snackbar=true;
    
            }
          }).then(()=>{
            this.close(),
            setInterval(this.getVendors(), 3000);
          })
        },
    
    
                 getVendorId(vendorCode) {
           
       
          var reqJSON = vendorCode;
          this.vendorById(reqJSON).then(response => {
            if(response.status==200){
                  this.dialog1 = true
             
            } else{
              this.text=response.data.message;
    
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
    
    <style scoped>
    .v-data-table {
        line-height: 2.8;
        max-width: 100%;
       /* margin-left: 20px; */
    }
    </style>